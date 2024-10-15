"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

interface Props {
    className?: string;
}

export const BackButton: React.FC<Props> = ({ className }) => {
    const router = useRouter();
    return (
        <Button className={cn("", className)} onClick={() => router.back()}>
            <ArrowLeft />
        </Button>
    );
};
