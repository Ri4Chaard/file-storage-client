import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/shared/providers";

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
                <Providers>
                    {/* <header>
                    <Container>
                        <nav>
                            <ul className="flex items-center justify-between">
                                <li>Your files</li>
                                <li>Login</li>
                            </ul>
                        </nav>
                    </Container>
                </header> */}
                    {children}
                </Providers>
            </body>
        </html>
    );
}
