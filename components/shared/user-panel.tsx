import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

interface Props {
    userId: number;
    className?: string;
}

export const UserPanel: React.FC<Props> = ({ userId, className }) => {
    return (
        <div className={cn("", className)}>
            <Link href={`/user/${userId}`}>
                <Button>My folders</Button>
            </Link>
        </div>
    );
};
