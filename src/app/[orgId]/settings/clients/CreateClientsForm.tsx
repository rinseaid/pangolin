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
import { ClientRow } from "./ClientsTable";
import {
    CreateClientBody,
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
import { ScrollArea } from "@app/components/ui/scroll-area";
import { Badge } from "@app/components/ui/badge";
import { X } from "lucide-react";

const createClientFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Name must be at least 2 characters."
        })
        .max(30, {
            message: "Name must not be longer than 30 characters."
        }),
    siteIds: z.array(z.number()).min(1, {
        message: "Select at least one site."
    }),
    subnet: z.string().min(1, {
        message: "Subnet is required."
    })
});

type CreateClientFormValues = z.infer<typeof createClientFormSchema>;

const defaultValues: Partial<CreateClientFormValues> = {
    name: "",
    siteIds: [],
    subnet: ""
};

type CreateClientFormProps = {
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
}: CreateClientFormProps) {
    const api = createApiClient(useEnvContext());
    const { env } = useEnvContext();

    const [sites, setSites] = useState<ListSitesResponse["sites"]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [clientDefaults, setClientDefaults] =
        useState<PickClientDefaultsResponse | null>(null);
    const [olmCommand, setOlmCommand] = useState<string | null>(null);
    const [selectedSites, setSelectedSites] = useState<
        Array<{ id: number; name: string }>
    >([]);

    const handleCheckboxChange = (checked: boolean) => {
        setIsChecked(checked);
        if (setChecked) {
            setChecked(checked);
        }
    };

    const form = useForm<CreateClientFormValues>({
        resolver: zodResolver(createClientFormSchema),
        defaultValues
    });

    useEffect(() => {
        // Update form value when selectedSites changes
        form.setValue(
            "siteIds",
            selectedSites.map((site) => site.id)
        );
    }, [selectedSites, form]);

    useEffect(() => {
        if (!open) return;

        // reset all values
        setLoading?.(false);
        setIsLoading(false);
        form.reset();
        setChecked?.(false);
        setClientDefaults(null);
        setSelectedSites([]);

        const fetchSites = async () => {
            const res = await api.get<AxiosResponse<ListSitesResponse>>(
                `/org/${orgId}/sites/`
            );
            const sites = res.data.data.sites.filter(
                (s) => s.type === "newt" && s.subnet
            );
            setSites(sites);
        };

        const fetchDefaults = async () => {
            api.get(`/org/${orgId}/pick-client-defaults`)
                .catch((e) => {
                    toast({
                        variant: "destructive",
                        title: `Error fetching client defaults`,
                        description: formatAxiosError(e)
                    });
                })
                .then((res) => {
                    if (res && res.status === 200) {
                        const data = res.data.data;
                        setClientDefaults(data);
                        const olmConfig = `olm --id ${data?.olmId} --secret ${data?.olmSecret} --endpoint ${env.app.dashboardUrl}`;
                        setOlmCommand(olmConfig);
                        
                        // Set the subnet value from client defaults
                        if (data?.subnet) {
                            form.setValue("subnet", data.subnet);
                        }
                    }
                });
        };
        fetchSites();
        fetchDefaults();
    }, [open]);

    const addSite = (siteId: number, siteName: string) => {
        if (!selectedSites.some((site) => site.id === siteId)) {
            setSelectedSites([
                ...selectedSites,
                { id: siteId, name: siteName }
            ]);
        }
    };

    const removeSite = (siteId: number) => {
        setSelectedSites(selectedSites.filter((site) => site.id !== siteId));
    };

    async function onSubmit(data: CreateClientFormValues) {
        setLoading?.(true);
        setIsLoading(true);

        if (!clientDefaults) {
            toast({
                variant: "destructive",
                title: "Error creating client",
                description: "Client defaults not found"
            });
            setLoading?.(false);
            setIsLoading(false);
            return;
        }

        const payload = {
            name: data.name,
            siteIds: data.siteIds,
            olmId: clientDefaults.olmId,
            secret: clientDefaults.olmSecret,
            subnet: data.subnet,
            type: "olm"
        } as CreateClientBody;

        const res = await api
            .put<
                AxiosResponse<CreateClientResponse>
            >(`/org/${orgId}/client`, payload)
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
                    id="create-client-form"
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
                        name="subnet"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input
                                        autoComplete="off"
                                        placeholder="Subnet"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    The address that this client will use for connectivity.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="siteIds"
                        render={() => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Sites</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "justify-between",
                                                    selectedSites.length ===
                                                        0 &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                {selectedSites.length > 0
                                                    ? `${selectedSites.length} site${selectedSites.length !== 1 ? "s" : ""} selected`
                                                    : "Select sites"}
                                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0 w-[300px]">
                                        <Command>
                                            <CommandInput placeholder="Search sites..." />
                                            <CommandList>
                                                <CommandEmpty>
                                                    No sites found.
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    <ScrollArea className="h-[200px]">
                                                        {sites.map((site) => (
                                                            <CommandItem
                                                                value={`${site.siteId}:${site.name}:${site.niceId}`}
                                                                key={
                                                                    site.siteId
                                                                }
                                                                onSelect={() => {
                                                                    addSite(
                                                                        site.siteId,
                                                                        site.name
                                                                    );
                                                                }}
                                                            >
                                                                <CheckIcon
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        selectedSites.some(
                                                                            (
                                                                                s
                                                                            ) =>
                                                                                s.id ===
                                                                                site.siteId
                                                                        )
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                                {site.name}
                                                            </CommandItem>
                                                        ))}
                                                    </ScrollArea>
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>

                                {selectedSites.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {selectedSites.map((site) => (
                                            <Badge
                                                key={site.id}
                                                variant="secondary"
                                            >
                                                {site.name}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeSite(site.id)
                                                    }
                                                    className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}

                                <FormDescription>
                                    The client will have connectivity to the
                                    selected sites. The sites must be configured
                                    to accept client connections.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {olmCommand && (
                        <div className="w-full">
                            <div className="mb-2">
                                <div className="mx-auto">
                                    <CopyTextBox
                                        text={olmCommand}
                                        wrapText={false}
                                    />
                                </div>
                            </div>
                            <span className="text-sm text-muted-foreground">
                                You will only be able to see the configuration
                                once.
                            </span>
                        </div>
                    )}

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