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
                "w-[100px] h-[100px] flex flex-col items-center justify-center gap-3",
                className
            )}
        >
            <Folder />
            <h2 className="w-full text-xs overflow-hidden whitespace-pre-wrap break-words">
                {name}
            </h2>
        </Button>
    );
};
