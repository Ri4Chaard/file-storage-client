import React from "react";
import { cn } from "@/lib/utils";
import { CornerDownLeft, Folder, OctagonX } from "lucide-react";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Api } from "@/services/api-client";

interface Props {
    id: number;
    name: string;
    className?: string;
}

export const FolderCard: React.FC<Props> = ({ id, name, className }) => {
    const pathname = usePathname();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className={cn(
                        "w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] flex flex-col items-center gap-3",
                        className
                    )}
                >
                    <Folder />
                    <h2 className="w-full z-10 text-xs sm:text-sm overflow-hidden text-center whitespace-pre-wrap break-words">
                        {name}
                    </h2>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="text-center">
                    {name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link
                        className="w-full flex text-center"
                        href={`${pathname}/${String(id)}`}
                    >
                        <CornerDownLeft className="w-4 h-4 mr-2" />
                        <p className="flex-1">Перейти</p>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="focus:bg-destructive focus:text-destructive-foreground"
                    asChild
                >
                    <Button
                        className="w-full flex"
                        variant="ghost"
                        onClick={async () => {
                            try {
                                await Api.folders.deleteFolder(id);
                            } catch (e) {
                                console.log(e);
                            }
                        }}
                    >
                        <OctagonX className="w-4 h-4 mr-2" />
                        <p className="flex-1">Видалити папку</p>
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
