"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoginResponse } from "@server/routers/auth";
import { useRouter } from "next/navigation";
import { AxiosResponse } from "axios";
import { formatAxiosError } from "@app/lib/api";
import { LockIcon, FingerprintIcon } from "lucide-react";
import { createApiClient } from "@app/lib/api";
import { useEnvContext } from "@app/hooks/useEnvContext";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot
} from "./ui/input-otp";
import Link from "next/link";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import Image from "next/image";
import { GenerateOidcUrlResponse } from "@server/routers/idp";
import { Separator } from "./ui/separator";
import { useTranslations } from "next-intl";
import { startAuthentication } from "@simplewebauthn/browser";

export type LoginFormIDP = {
    idpId: number;
    name: string;
};

type LoginFormProps = {
    redirect?: string;
    onLogin?: () => void | Promise<void>;
    idps?: LoginFormIDP[];
};

export default function LoginForm({ redirect, onLogin, idps }: LoginFormProps) {
    const router = useRouter();

    const { env } = useEnvContext();

    const api = createApiClient({ env });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const hasIdp = idps && idps.length > 0;

    const [mfaRequested, setMfaRequested] = useState(false);
    const [showSecurityKeyPrompt, setShowSecurityKeyPrompt] = useState(false);

    const t = useTranslations();

    const formSchema = z.object({
        email: z.string().email({ message: t('emailInvalid') }),
        password: z
            .string()
            .min(8, { message: t('passwordRequirementsChars') })
    });

    const mfaSchema = z.object({
        code: z.string().length(6, { message: t('pincodeInvalid') })
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const mfaForm = useForm<z.infer<typeof mfaSchema>>({
        resolver: zodResolver(mfaSchema),
        defaultValues: {
            code: ""
        }
    });

    async function initiateSecurityKeyAuth() {
        setShowSecurityKeyPrompt(true);
        setError(null);
        await loginWithSecurityKey();
        setShowSecurityKeyPrompt(false);
    }

    async function onSubmit(values: any) {
        const { email, password } = form.getValues();
        const { code } = mfaForm.getValues();

        setLoading(true);

        try {
            const res = await api.post<AxiosResponse<LoginResponse>>("/auth/login", {
                email,
                password,
                code
            });

            if (res) {
                setError(null);
                const data = res.data.data;

                if (data?.usePasskey) {
                    await initiateSecurityKeyAuth();
                    return;
                }

                if (data?.codeRequested) {
                    setMfaRequested(true);
                    setLoading(false);
                    mfaForm.reset();
                    return;
                }

                if (data?.emailVerificationRequired) {
                    if (redirect) {
                        router.push(`/auth/verify-email?redirect=${redirect}`);
                    } else {
                        router.push("/auth/verify-email");
                    }
                    return;
                }

                if (onLogin) {
                    await onLogin();
                }
            }
        } catch (e) {
            console.error(e);
            const errorMessage = formatAxiosError(e, t('loginError'));
            if (errorMessage.includes("Please use your security key")) {
                await initiateSecurityKeyAuth();
                return;
            }
            setError(errorMessage);
        }

        setLoading(false);
    }

    async function loginWithIdp(idpId: number) {
        try {
            const res = await api.post<AxiosResponse<GenerateOidcUrlResponse>>(
                `/auth/idp/${idpId}/oidc/generate-url`,
                {
                    redirectUrl: redirect || "/"
                }
            );

            console.log(res);

            if (!res) {
                setError(t('loginError'));
                return;
            }

            const data = res.data.data;
            window.location.href = data.redirectUrl;
        } catch (e) {
            console.error(formatAxiosError(e));
        }
    }

    async function loginWithSecurityKey() {
        try {
            // Check browser compatibility first
            if (!window.PublicKeyCredential) {
                setError(t('securityKeyBrowserNotSupported', {
                    defaultValue: "Your browser doesn't support security keys. Please use a modern browser like Chrome, Firefox, or Safari."
                }));
                return;
            }

            setLoading(true);
            setError(null);

            const email = form.getValues().email;

            // Start WebAuthn authentication
            const startRes = await api.post("/auth/passkey/authenticate/start", {
                email: email || undefined
            });

            if (!startRes) {
                setError(t('securityKeyAuthError', {
                    defaultValue: "Failed to start security key authentication"
                }));
                return;
            }

            const { tempSessionId, ...options } = startRes.data.data;

            // Perform WebAuthn authentication
            try {
                const credential = await startAuthentication(options);
                
                // Verify authentication
                const verifyRes = await api.post(
                    "/auth/passkey/authenticate/verify",
                    { credential },
                    {
                        headers: {
                            'X-Temp-Session-Id': tempSessionId
                        }
                    }
                );

                if (verifyRes) {
                    if (onLogin) {
                        await onLogin();
                    }
                }
            } catch (error: any) {
                if (error.name === 'NotAllowedError') {
                    if (error.message.includes('denied permission')) {
                        setError(t('securityKeyPermissionDenied', {
                            defaultValue: "Please allow access to your security key to continue signing in."
                        }));
                    } else {
                        setError(t('securityKeyRemovedTooQuickly', {
                            defaultValue: "Please keep your security key connected until the sign-in process completes."
                        }));
                    }
                } else if (error.name === 'NotSupportedError') {
                    setError(t('securityKeyNotSupported', {
                        defaultValue: "Your security key may not be compatible. Please try a different security key."
                    }));
                } else {
                    setError(t('securityKeyUnknownError', {
                        defaultValue: "There was a problem using your security key. Please try again."
                    }));
                }
                throw error; // Re-throw to be caught by outer catch
            }
        } catch (e) {
            console.error(formatAxiosError(e));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-4">
            {showSecurityKeyPrompt && (
                <Alert>
                    <FingerprintIcon className="w-5 h-5 mr-2" />
                    <AlertDescription>
                        {t('securityKeyPrompt', {
                            defaultValue: "Please verify your identity using your security key. Make sure your security key is connected and ready."
                        })}
                    </AlertDescription>
                </Alert>
            )}

            {!mfaRequested && (
                <>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                            id="form"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('email')}</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('password')}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="text-center">
                                    <Link
                                        href={`/auth/reset-password${form.getValues().email ? `?email=${form.getValues().email}` : ""}`}
                                        className="text-sm text-muted-foreground"
                                    >
                                        {t('passwordForgot')}
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </>
            )}

            {mfaRequested && (
                <>
                    <div className="text-center">
                        <h3 className="text-lg font-medium">
                            {t('otpAuth')}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {t('otpAuthDescription')}
                        </p>
                    </div>
                    <Form {...mfaForm}>
                        <form
                            onSubmit={mfaForm.handleSubmit(onSubmit)}
                            className="space-y-4"
                            id="form"
                        >
                            <FormField
                                control={mfaForm.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex justify-center">
                                                <InputOTP
                                                    maxLength={6}
                                                    {...field}
                                                    pattern={
                                                        REGEXP_ONLY_DIGITS_AND_CHARS
                                                    }
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        if (e.length === 6) {
                                                            mfaForm.handleSubmit(onSubmit)();
                                                        }
                                                    }}
                                                >
                                                    <InputOTPGroup>
                                                        <InputOTPSlot
                                                            index={0}
                                                        />
                                                        <InputOTPSlot
                                                            index={1}
                                                        />
                                                        <InputOTPSlot
                                                            index={2}
                                                        />
                                                        <InputOTPSlot
                                                            index={3}
                                                        />
                                                        <InputOTPSlot
                                                            index={4}
                                                        />
                                                        <InputOTPSlot
                                                            index={5}
                                                        />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </>
            )}

            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div className="space-y-4">
                {mfaRequested && (
                    <Button
                        type="submit"
                        form="form"
                        className="w-full"
                        loading={loading}
                        disabled={loading}
                    >
                        {t('otpAuthSubmit')}
                    </Button>
                )}

                {!mfaRequested && (
                    <>
                        <Button
                            type="submit"
                            form="form"
                            className="w-full"
                            loading={loading}
                            disabled={loading || showSecurityKeyPrompt}
                        >
                            <LockIcon className="w-4 h-4 mr-2" />
                            {t('login')}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={initiateSecurityKeyAuth}
                            loading={loading}
                            disabled={loading || showSecurityKeyPrompt}
                        >
                            <FingerprintIcon className="w-4 h-4 mr-2" />
                            {t('securityKeyLogin', {
                                defaultValue: "Sign in with security key"
                            })}
                        </Button>

                        {hasIdp && (
                            <>
                                <div className="relative my-4">
                                    <div className="absolute inset-0 flex items-center">
                                        <Separator />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="px-2 bg-card text-muted-foreground">
                                            {t('idpContinue')}
                                        </span>
                                    </div>
                                </div>

                                {idps.map((idp) => (
                                    <Button
                                        key={idp.idpId}
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => {
                                            loginWithIdp(idp.idpId);
                                        }}
                                    >
                                        {idp.name}
                                    </Button>
                                ))}
                            </>
                        )}
                    </>
                )}

                {mfaRequested && (
                    <Button
                        type="button"
                        className="w-full"
                        variant="outline"
                        onClick={() => {
                            setMfaRequested(false);
                            mfaForm.reset();
                        }}
                    >
                        {t('otpAuthBack')}
                    </Button>
                )}
            </div>
        </div>
    );
}
