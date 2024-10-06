export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
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
        </main>
    );
}
