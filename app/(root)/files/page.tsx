"use client";

import { Container } from "@/components/shared/container";
import { Files } from "@/components/shared/files";
import axiosInstance from "@/services/instance";
import { useSession } from "next-auth/react";
import React from "react";

export default function FilesPage() {
    const [file, setFile] = React.useState<File | null>(null);

    const { data: session } = useSession();

    if (useSession().status === "loading") {
        return (
            <Container className="flex items-center justify-center min-h-screen">
                <h1 className="font-bold">Loading...</h1>
            </Container>
        );
    }

    //Добавить папки
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", "2");

        try {
            await axiosInstance.post("/api/files/upload", formData);
            alert("File uploaded successfully");
        } catch (error) {
            console.error("File upload failed", error);
        }
    };

    if (session) {
        return (
            <Container className="flex items-center justify-center min-h-screen">
                <div>
                    <h1 className="font-bold">Files</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="file"
                            onChange={(e) =>
                                setFile(e.target.files?.[0] || null)
                            }
                            required
                        />
                        <button type="submit">Upload</button>
                    </form>
                </div>
                <Files />
            </Container>
        );
    }
    return (
        <Container className="flex items-center justify-center min-h-screen">
            <h1 className="font-bold">You are not authorized</h1>
        </Container>
    );
}
