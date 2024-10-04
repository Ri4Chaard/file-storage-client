import type { Metadata } from "next";
import "./globals.css";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
    title: "File storage",
    description: "Storage for your files",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <header>
                    <Container>
                        <nav>
                            <ul className="flex items-center justify-between">
                                <li>Your files</li>
                                <li>Login</li>
                            </ul>
                        </nav>
                    </Container>
                </header>
                {children}
            </body>
        </html>
    );
}
