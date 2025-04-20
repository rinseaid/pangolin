"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useClientContext } from "@app/hooks/useClientContext";
import { useForm } from "react-hook-form";
import { toast } from "@app/hooks/useToast";
import { useRouter } from "next/navigation";
import {
    SettingsContainer,
    SettingsSection,
    SettingsSectionHeader,
    SettingsSectionTitle,
    SettingsSectionDescription,
    SettingsSectionBody,
    SettingsSectionForm,
    SettingsSectionFooter
} from "@app/components/Settings";
import { formatAxiosError } from "@app/lib/api";
import { createApiClient } from "@app/lib/api";
import { useEnvContext } from "@app/hooks/useEnvContext";
import { useState } from "react";

const GeneralFormSchema = z.object({
    name: z.string().nonempty("Name is required")
});

type GeneralFormValues = z.infer<typeof GeneralFormSchema>;

export default function GeneralPage() {
    const { client, updateClient } = useClientContext();

    const api = createApiClient(useEnvContext());

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const form = useForm<GeneralFormValues>({
        resolver: zodResolver(GeneralFormSchema),
        defaultValues: {
            name: client?.name
        },
        mode: "onChange"
    });

    async function onSubmit(data: GeneralFormValues) {
        setLoading(true);

        await api
            .post(`/client/${client?.clientId}`, {
                name: data.name
            })
            .catch((e) => {
                toast({
                    variant: "destructive",
                    title: "Failed to update client",
                    description: formatAxiosError(
                        e,
                        "An error occurred while updating the client."
                    )
                });
            });

        updateClient({ name: data.name });

        toast({
            title: "Client updated",
            description: "The client has been updated."
        });

        setLoading(false);

        router.refresh();
    }

    return (
        <SettingsContainer>
            <SettingsSection>
                <SettingsSectionHeader>
                    <SettingsSectionTitle>
                        General Settings
                    </SettingsSectionTitle>
                    <SettingsSectionDescription>
                        Configure the general settings for this client
                    </SettingsSectionDescription>
                </SettingsSectionHeader>

                <SettingsSectionBody>
                    <SettingsSectionForm>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                                id="general-settings-form"
                            >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            <FormDescription>
                                                This is the display name of the
                                                client.
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                    </SettingsSectionForm>
                </SettingsSectionBody>

                <SettingsSectionFooter>
                    <Button
                        type="submit"
                        form="general-settings-form"
                        loading={loading}
                        disabled={loading}
                    >
                        Save Settings
                    </Button>
                </SettingsSectionFooter>
            </SettingsSection>
        </SettingsContainer>
    );
}
