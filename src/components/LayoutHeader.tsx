"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@app/lib/cn";
import Image from "next/image";
import Link from "next/link";
import ProfileIcon from "@app/components/ProfileIcon";
import ThemeSwitcher from "@app/components/ThemeSwitcher";
import { useTheme } from "next-themes";

interface LayoutHeaderProps {
    showTopBar: boolean;
}

export function LayoutHeader({ showTopBar }: LayoutHeaderProps) {
    const { theme } = useTheme();
    const [path, setPath] = useState<string>("");

    useEffect(() => {
        function getPath() {
            let lightOrDark = theme;

            if (theme === "system" || !theme) {
                lightOrDark = window.matchMedia("(prefers-color-scheme: dark)")
                    .matches
                    ? "dark"
                    : "light";
            }

            if (lightOrDark === "light") {
                return "/logo/word_mark_black.png";
            }

            return "/logo/word_mark_white.png";
        }

        setPath(getPath());
    }, [theme]);

    return (
        <div className="shrink-0 hidden md:block">
            <div className="px-6 py-2">
                <div className="container mx-auto max-w-12xl">
                    <div className="h-16 flex items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                {path && (
                                    <Image
                                        src={path}
                                        alt="Pangolin"
                                        width={98}
                                        height={32}
                                        className="h-8 w-auto"
                                    />
                                )}
                            </Link>
                        </div>

                        {/* Profile controls on the right */}
                        {showTopBar && (
                            <div className="flex items-center space-x-2">
                                <ThemeSwitcher />
                                <ProfileIcon />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LayoutHeader;
