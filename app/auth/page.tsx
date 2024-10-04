"use client";

import { Container } from "@/components/shared/container";
import axiosInstance, { setAuthToken } from "@/services/instance";
import React from "react";

export default function AuthPage() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    setAuthToken(localStorage.getItem("token"));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axiosInstance.post("/api/auth/add-user", { email, password });
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
                    <button type="submit">Register</button>
                </form>
            </div>
        </Container>
    );
}
