"use client";

import { Container } from "@/components/shared/container";
import axiosInstance, { setAuthToken } from "@/services/instance";
import React from "react";

export default function Home() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await axiosInstance.post("/api/auth/login", {
                email,
                password,
            });
            console.log(data);
            localStorage.setItem("token", data.token);
            setAuthToken(data.token);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <Container className="container mx-auto px-3 md:px-1">
            <div>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
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
