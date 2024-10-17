"use client";

import { SessionProvider } from "next-auth/react";
import React, { PropsWithChildren } from "react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { UploadProgress } from "./upload-progress";
import { ThemeProvider } from "./theme-provider";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <NextTopLoader />
            <Toaster />
            <UploadProgress />
            <SessionProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </SessionProvider>
        </>
    );
};
