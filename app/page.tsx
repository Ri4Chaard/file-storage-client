"use client";

import { Container } from "@/components/shared/container";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Home() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const { data: session } = useSession();
    console.log(session);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signIn("credentials", {
                email: email,
                password: password,
                redirect: false,
            });
        } catch (e) {
            console.log(e);
        }
    };

    if (session) {
        return (
            <Container className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col">
                    <h1 className="font-bold">{`Logged in as ${session.user.role}`}</h1>
                    <div className="flex items-center justify-between">
                        <Link href="/files">Files</Link>
                        <button
                            onClick={() => {
                                signOut();
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container className="flex items-center justify-center min-h-screen">
            <div>
                <h1 className="font-bold text-center">Login form</h1>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </Container>
    );
}
