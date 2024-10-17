import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/shared/providers";
import { Nunito } from "next/font/google";

const nunito = Nunito({
    subsets: ["cyrillic"],
    variable: "--font-nunito",
    weight: ["400", "500", "600", "700", "800", "900"],
});

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
            <body className={nunito.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
