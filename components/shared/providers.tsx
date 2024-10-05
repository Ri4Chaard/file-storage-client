"use client";

import { SessionProvider } from "next-auth/react";
import React, { PropsWithChildren } from "react";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>;
};
