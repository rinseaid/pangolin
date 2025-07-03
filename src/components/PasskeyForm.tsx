"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@app/hooks/useUserContext";
import { useTranslations } from "next-intl";
import { createApiClient } from "@app/lib/api";
import { useEnvContext } from "@app/hooks/useEnvContext";
import { toast } from "@app/hooks/useToast";
import { formatAxiosError } from "@app/lib/api";
import { startRegistration } from "@simplewebauthn/browser";
import {
    Credenza,
    CredenzaBody,
    CredenzaClose,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle
} from "@app/components/Credenza";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@app/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type PasskeyFormProps = {
    open: boolean;
    setOpen: (val: boolean) => void;
};

type Passkey = {
    credentialId: string;
    name: string;
    dateCreated: string;
    lastUsed: string;
};

type DeletePasskeyData = {
    credentialId: string;
    name: string;
};

export default function PasskeyForm({ open, setOpen }: PasskeyFormProps) {
    const [loading, setLoading] = useState(false);
    const [passkeys, setPasskeys] = useState<Passkey[]>([]);
    const [step, setStep] = useState<"list" | "register" | "delete">("list");
    const [selectedPasskey, setSelectedPasskey] = useState<DeletePasskeyData | null>(null);
    const { user } = useUserContext();
    const t = useTranslations();
    const api = createApiClient(useEnvContext());

    const registerSchema = z.object({
        name: z.string().min(1, { message: t('passkeyNameRequired') }),
        password: z.string().min(1, { message: t('passwordRequired') })
    });

    const deleteSchema = z.object({
        password: z.string().min(1, { message: t('passwordRequired') })
    });

    const registerForm = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            password: ""
        }
    });

    const deleteForm = useForm<z.infer<typeof deleteSchema>>({
        resolver: zodResolver(deleteSchema),
        defaultValues: {
            password: ""
        }
    });

    useEffect(() => {
        if (open) {
            loadPasskeys();
        }
    }, [open]);

    const loadPasskeys = async () => {
        try {
            const response = await api.get("/auth/passkey/list");
            setPasskeys(response.data.data);
        } catch (error) {
            toast({
                title: "Error",
                description: formatAxiosError(error, t('passkeyLoadError')),
                variant: "destructive"
            });
        }
    };

    const handleRegisterPasskey = async (values: z.infer<typeof registerSchema>) => {
        try {
            setLoading(true);

            // Start registration
            const startRes = await api.post("/auth/passkey/register/start", {
                name: values.name,
                password: values.password
            });

            // Handle 2FA if required
            if (startRes.data.data.codeRequested) {
                // TODO: Handle 2FA verification
                toast({
                    title: "2FA Required",
                    description: "Two-factor authentication is required to register a passkey.",
                    variant: "destructive"
                });
                return;
            }

            const options = startRes.data.data;

            // Create passkey
            const credential = await startRegistration(options);

            // Verify registration
            await api.post("/auth/passkey/register/verify", {
                credential
            });

            toast({
                title: "Success",
                description: t('passkeyRegisterSuccess')
            });

            // Reset form and go back to list
            registerForm.reset();
            setStep("list");

            // Reload passkeys
            await loadPasskeys();
        } catch (error) {
            toast({
                title: "Error",
                description: formatAxiosError(error, t('passkeyRegisterError')),
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePasskey = async (values: z.infer<typeof deleteSchema>) => {
        if (!selectedPasskey) return;

        try {
            setLoading(true);
            const encodedCredentialId = encodeURIComponent(selectedPasskey.credentialId);
            await api.delete(`/auth/passkey/${encodedCredentialId}`, {
                data: { password: values.password }
            });
            
            toast({
                title: "Success",
                description: t('passkeyRemoveSuccess')
            });

            // Reset form and go back to list
            deleteForm.reset();
            setStep("list");
            setSelectedPasskey(null);

            // Reload passkeys
            await loadPasskeys();
        } catch (error) {
            toast({
                title: "Error",
                description: formatAxiosError(error, t('passkeyRemoveError')),
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    function reset() {
        registerForm.reset();
        deleteForm.reset();
        setStep("list");
        setSelectedPasskey(null);
        setLoading(false);
    }

    return (
        <Credenza 
            open={open} 
            onOpenChange={(val) => {
                setOpen(val);
                if (!val) reset();
            }}
        >
            <CredenzaContent className="max-w-md">
                <CredenzaHeader className="space-y-2 pb-4 border-b">
                    <CredenzaTitle className="text-2xl font-semibold tracking-tight">{t('passkeyManage')}</CredenzaTitle>
                    <CredenzaDescription className="text-sm text-muted-foreground">
                        {t('passkeyDescription')}
                    </CredenzaDescription>
                </CredenzaHeader>
                <CredenzaBody className="py-6">
                    <div className="space-y-8">
                        {step === "list" && (
                            <>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium leading-none tracking-tight">{t('passkeyList')}</h3>
                                    {passkeys.length === 0 ? (
                                        <div className="flex h-[120px] items-center justify-center rounded-lg border border-dashed">
                                            <p className="text-sm text-muted-foreground">
                                                {t('passkeyNone')}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {passkeys.map((passkey) => (
                                                <div
                                                    key={passkey.credentialId}
                                                    className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
                                                >
                                                    <div>
                                                        <p className="font-medium">{passkey.name}</p>
                                                        <p className="text-sm text-muted-foreground mt-0.5">
                                                            {t('passkeyLastUsed', {
                                                                date: new Date(passkey.lastUsed).toLocaleDateString()
                                                            })}
                                                        </p>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedPasskey({
                                                                credentialId: passkey.credentialId,
                                                                name: passkey.name
                                                            });
                                                            setStep("delete");
                                                        }}
                                                        disabled={loading}
                                                        className="hover:bg-destructive hover:text-destructive-foreground"
                                                    >
                                                        {t('passkeyRemove')}
                                                    </Button>
                                                </div>
                                            ))}
                                            {passkeys.length === 1 && (
                                                <div className="flex p-4 text-sm text-amber-600 bg-amber-50 dark:bg-amber-900/10 rounded-lg">
                                                    {t('passkeyRecommendation')}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <Button
                                        onClick={() => setStep("register")}
                                        className="w-full"
                                    >
                                        {t('passkeyRegister')}
                                    </Button>
                                </div>
                            </>
                        )}

                        {step === "register" && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium leading-none tracking-tight">{t('passkeyRegister')}</h3>
                                <Form {...registerForm}>
                                    <form
                                        onSubmit={registerForm.handleSubmit(handleRegisterPasskey)}
                                        className="space-y-4"
                                    >
                                        <FormField
                                            control={registerForm.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-medium">{t('passkeyNameLabel')}</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="w-full"
                                                            placeholder={t('passkeyNamePlaceholder')}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-sm" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={registerForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-medium">{t('password')}</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            className="w-full"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-sm" />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="flex gap-3 pt-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="flex-1"
                                                onClick={() => setStep("list")}
                                                disabled={loading}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="flex-1"
                                                loading={loading}
                                                disabled={loading}
                                            >
                                                {t('passkeyRegister')}
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        )}

                        {step === "delete" && selectedPasskey && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium leading-none tracking-tight">Remove Passkey</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Enter your password to remove the passkey "{selectedPasskey.name}"
                                    </p>
                                </div>

                                <Form {...deleteForm}>
                                    <form
                                        onSubmit={deleteForm.handleSubmit(handleDeletePasskey)}
                                        className="space-y-4"
                                    >
                                        <FormField
                                            control={deleteForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-medium">{t('password')}</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            className="w-full"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-sm" />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="flex gap-3 pt-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="flex-1"
                                                onClick={() => {
                                                    setStep("list");
                                                    setSelectedPasskey(null);
                                                }}
                                                disabled={loading}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                variant="destructive"
                                                className="flex-1"
                                                loading={loading}
                                                disabled={loading}
                                            >
                                                {t('passkeyRemove')}
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        )}
                    </div>
                </CredenzaBody>
                <CredenzaFooter className="border-t pt-4">
                    <CredenzaClose asChild>
                        <Button variant="outline" className="w-full sm:w-auto">Close</Button>
                    </CredenzaClose>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    );
} 