import React from "react";
import { cn } from "@/lib/utils";
import { Folder } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
    name: string;
    className?: string;
}

export const FolderCard: React.FC<Props> = ({ name, className }) => {
    return (
        <Button
            className={cn(
                "w-[100px] h-[100px] border rounded-md flex flex-col items-center justify-center",
                className
            )}
        >
            <Folder />
            <h2>{name}</h2>
        </Button>
    );
};
