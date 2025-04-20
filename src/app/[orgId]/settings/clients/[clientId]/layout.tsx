import { internal } from "@app/lib/api";
import { AxiosResponse } from "axios";
import { authCookieHeader } from "@app/lib/api/cookies";
import { SidebarSettings } from "@app/components/SidebarSettings";
import Link from "next/link";
import SettingsSectionTitle from "@app/components/SettingsSectionTitle";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@app/components/ui/breadcrumb";
import { GetClientResponse } from "@server/routers/client";
import ClientInfoCard from "./ClientInfoCard";
import ClientProvider from "@app/providers/ClientProvider";
import { redirect } from "next/navigation";

interface SettingsLayoutProps {
    children: React.ReactNode;
    params: Promise<{ clientId: number; orgId: string }>;
}

export default async function SettingsLayout(props: SettingsLayoutProps) {
    const params = await props.params;

    const { children } = props;

    let client = null;
    try {
        const res = await internal.get<AxiosResponse<GetClientResponse>>(
            `/org/${params.orgId}/client/${params.clientId}`,
            await authCookieHeader()
        );
        client = res.data.data;
    } catch (error) {
        console.error("Error fetching client data:", error);
        redirect(`/${params.orgId}/settings/clients`);
    }

    const sidebarNavItems = [
        {
            title: "General",
            href: "/{orgId}/settings/clients/{clientId}/general"
        }
    ];

    return (
        <>
            <div className="mb-4 flex-row">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href="../">Clients</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{client.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <SettingsSectionTitle
                title={`${client?.name} Settings`}
                description="Configure the settings on your site"
            />

            <ClientProvider client={client}>
                <SidebarSettings sidebarNavItems={sidebarNavItems}>
                    <ClientInfoCard />
                    {children}
                </SidebarSettings>
            </ClientProvider>
        </>
    );
}
