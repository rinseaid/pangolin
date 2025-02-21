"use client";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@app/components/ui/form";
import { Input } from "@app/components/ui/input";
import { toast } from "@app/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CopyTextBox from "@app/components/CopyTextBox";
import { Checkbox } from "@app/components/ui/checkbox";
import { formatAxiosError } from "@app/lib/api";
import { createApiClient } from "@app/lib/api";
import { useEnvContext } from "@app/hooks/useEnvContext";
import { AxiosResponse } from "axios";
import { Collapsible } from "@app/components/ui/collapsible";
import { ClientRow } from "./ClientsTable";
import {
    CreateClientResponse,
    PickClientDefaultsResponse
} from "@server/routers/client";
import { ListSitesResponse } from "@server/routers/site";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@app/components/ui/popover";
import { Button } from "@app/components/ui/button";
import { cn } from "@app/lib/cn";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@app/components/ui/command";

const createClientFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Name must be at least 2 characters."
        })
        .max(30, {
            message: "Name must not be longer than 30 characters."
        }),
    siteId: z.coerce.number()
});

type CreateSiteFormValues = z.infer<typeof createClientFormSchema>;

const defaultValues: Partial<CreateSiteFormValues> = {
    name: ""
};

type CreateSiteFormProps = {
    onCreate?: (client: ClientRow) => void;
    setLoading?: (loading: boolean) => void;
    setChecked?: (checked: boolean) => void;
    orgId: string;
};

export default function CreateClientForm({
    onCreate,
    setLoading,
    setChecked,
    orgId
}: CreateSiteFormProps) {
    const api = createApiClient(useEnvContext());
    const { env } = useEnvContext();

    const [sites, setSites] = useState<ListSitesResponse["sites"]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [clientDefaults, setClientDefaults] =
        useState<PickClientDefaultsResponse | null>(null);
    const [olmCommand, setOlmCommand] = useState<string | null>(null);

    const handleCheckboxChange = (checked: boolean) => {
        setIsChecked(checked);
    };

    const form = useForm<CreateSiteFormValues>({
        resolver: zodResolver(createClientFormSchema),
        defaultValues
    });

    useEffect(() => {
        if (!open) return;

        // reset all values
        setLoading?.(false);
        setIsLoading(false);
        form.reset();
        setChecked?.(false);
        setClientDefaults(null);

        const fetchSites = async () => {
            const res = await api.get<AxiosResponse<ListSitesResponse>>(
                `/org/${orgId}/sites/`
            );
            setSites(res.data.data.sites);

            if (res.data.data.sites.length > 0) {
                form.setValue("siteId", res.data.data.sites[0].siteId);
            }
        };

        fetchSites();
    }, [open]);

    useEffect(() => {
        const siteId = form.getValues("siteId");

        if (siteId === undefined || siteId === null) return;

        api.get(`/site/${siteId}/pick-client-defaults`)
            .catch((e) => {
                toast({
                    variant: "destructive",
                    title: `Error fetching client defaults for site ${siteId}`,
                    description: formatAxiosError(e)
                });
            })
            .then((res) => {
                if (res && res.status === 200) {
                    const data = res.data.data;
                    setClientDefaults(data);
                    const olmConfig = `olm --id ${data?.olmId} --secret ${data?.olmSecret} --endpoint ${env.app.dashboardUrl}`;
                    setOlmCommand(olmConfig);
                }
            });
    }, [form.watch("siteId")]);

    async function onSubmit(data: CreateSiteFormValues) {
        setLoading?.(true);
        setIsLoading(true);

        if (!clientDefaults) {
            toast({
                variant: "destructive",
                title: "Error creating site",
                description: "Site defaults not found"
            });
            setLoading?.(false);
            setIsLoading(false);
            return;
        }

        const payload = {
            name: data.name,
            siteId: data.siteId,
            orgId,
            subnet: clientDefaults.subnet,
            secret: clientDefaults.olmSecret,
            olmId: clientDefaults.olmId
        };

        const res = await api
            .put<
                AxiosResponse<CreateClientResponse>
            >(`/site/${data.siteId}/client`, payload)
            .catch((e) => {
                toast({
                    variant: "destructive",
                    title: "Error creating client",
                    description: formatAxiosError(e)
                });
            });

        if (res && res.status === 201) {
            const data = res.data.data;

            onCreate?.({
                name: data.name,
                id: data.clientId,
                mbIn: "0 MB",
                mbOut: "0 MB",
                orgId: orgId as string,
                online: false
            });
        }

        setLoading?.(false);
        setIsLoading(false);
    }

    return (
        <div className="space-y-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                    id="create-site-form"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        autoComplete="off"
                                        placeholder="Client name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="siteId"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Client</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "justify-between",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                {field.value
                                                    ? sites.find(
                                                          (site) =>
                                                              site.siteId ===
                                                              field.value
                                                      )?.name
                                                    : "Select site"}
                                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0">
                                        <Command>
                                            <CommandInput placeholder="Search site..." />
                                            <CommandList>
                                                <CommandEmpty>
                                                    No site found.
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {sites.map((site) => (
                                                        <CommandItem
                                                            value={`${site.siteId}:${site.name}:${site.niceId}`}
                                                            key={site.siteId}
                                                            onSelect={() => {
                                                                form.setValue(
                                                                    "siteId",
                                                                    site.siteId
                                                                );
                                                            }}
                                                        >
                                                            <CheckIcon
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    site.siteId ===
                                                                        field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                            {site.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    The client will be have connectivity to this
                                    site.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="w-full">
                        <div className="mb-2">
                            <Collapsible
                                open={isOpen}
                                onOpenChange={setIsOpen}
                                className="space-y-2"
                            >
                                <div className="mx-auto">
                                    <CopyTextBox
                                        text={olmCommand || ""}
                                        wrapText={false}
                                    />
                                </div>
                            </Collapsible>
                        </div>
                        <span className="text-sm text-muted-foreground">
                            You will only be able to see the configuration once.
                        </span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="terms"
                            checked={isChecked}
                            onCheckedChange={handleCheckboxChange}
                        />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I have copied the config
                        </label>
                    </div>
                </form>
            </Form>
        </div>
    );
}
