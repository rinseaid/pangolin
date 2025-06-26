import { Metadata } from "next";
import {
    Combine,
    LinkIcon,
    Settings,
    Users,
    Waypoints,
    Workflow
} from "lucide-react";
import { verifySession } from "@app/lib/auth/verifySession";
import { redirect } from "next/navigation";
import { internal } from "@app/lib/api";
import { AxiosResponse } from "axios";
import { GetOrgResponse, ListUserOrgsResponse } from "@server/routers/org";
import { authCookieHeader } from "@app/lib/api/cookies";
import { cache } from "react";
import { GetOrgUserResponse } from "@server/routers/user";
import UserProvider from "@app/providers/UserProvider";
import { Layout } from "@app/components/Layout";
import { SidebarNavItem, SidebarNavProps } from "@app/components/SidebarNav";
import { orgNavItems } from "@app/app/navigation";
import { getTranslations } from "next-intl/server";
import { pullEnv } from "@app/lib/pullEnv";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: `Settings - Pangolin`,
    description: ""
};

interface SettingsLayoutProps {
    children: React.ReactNode;
    params: Promise<{ orgId: string }>;
}

export default async function SettingsLayout(props: SettingsLayoutProps) {
    const params = await props.params;

    const { children } = props;

    const getUser = cache(verifySession);
    const user = await getUser();

    const env = pullEnv();

    if (!user) {
        redirect(`/`);
    }

    const cookie = await authCookieHeader();

    const t = await getTranslations();

    try {
        const getOrgUser = cache(() =>
            internal.get<AxiosResponse<GetOrgUserResponse>>(
                `/org/${params.orgId}/user/${user.userId}`,
                cookie
            )
        );
        const orgUser = await getOrgUser();

        if (!orgUser.data.data.isAdmin && !orgUser.data.data.isOwner) {
            throw new Error(t("userErrorNotAdminOrOwner"));
        }
    } catch {
        redirect(`/${params.orgId}`);
    }

    let orgs: ListUserOrgsResponse["orgs"] = [];
    try {
        const getOrgs = cache(() =>
            internal.get<AxiosResponse<ListUserOrgsResponse>>(
                `/user/${user.userId}/orgs`,
                cookie
            )
        );
        const res = await getOrgs();
        if (res && res.data.data.orgs) {
            orgs = res.data.data.orgs;
        }
    } catch (e) {}

    if (env.flags.enableClients) {
        const existing = orgNavItems.find(
            (item) => item.title === "sidebarClients"
        );
        if (!existing) {
            const clientsNavItem = {
                title: "sidebarClients",
                href: "/{orgId}/settings/clients",
                icon: <Workflow className="h-4 w-4" />
            };

            orgNavItems.splice(1, 0, clientsNavItem);
        }
    }

    return (
        <UserProvider user={user}>
            <Layout orgId={params.orgId} orgs={orgs} navItems={orgNavItems}>
                {children}
            </Layout>
        </UserProvider>
    );
}
