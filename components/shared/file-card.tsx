import React from "react";
import { cn } from "@/lib/utils";
import { File } from "lucide-react";

interface Props {
    name: string;
    className?: string;
}

export const FileCard: React.FC<Props> = ({ name, className }) => {
    return (
        <div
            className={cn(
                "w-[100px] h-[100px] border rounded-md flex flex-col items-center justify-center",
                className
            )}
        >
            <File />
            <p>{name}</p>
        </div>
    );
};
