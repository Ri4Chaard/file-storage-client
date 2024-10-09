import React from "react";
import { cn } from "@/lib/utils";
import { File } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
    name: string;
    className?: string;
}

export const FileCard: React.FC<Props> = ({ name, className }) => {
    return (
        <Button
            variant="outline"
            className={cn(
                "w-[100px] h-[100px] flex flex-col items-center justify-center gap-3",
                className
            )}
        >
            <File />
            <p className="w-full text-xs overflow-hidden whitespace-pre-wrap break-words">
                {name}
            </p>
        </Button>
    );
};
