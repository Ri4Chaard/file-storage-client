import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/shared/providers";

export const metadata: Metadata = {
    title: "File storage",
    description: "Storage for your files",
};

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
