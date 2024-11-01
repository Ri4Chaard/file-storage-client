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
import { useUserDiskStore } from "@/store/user-disk";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

interface Props {
    id: number;
    name: string;
    createdAt: Date;
    className?: string;
}

export const FolderCard: React.FC<Props> = ({
    id,
    name,
    createdAt,
    className,
}) => {
    const pathname = usePathname();

    const { deleteFolder } = useUserDiskStore();

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
                <DropdownMenuLabel className="text-center font-normal">
                    {format(createdAt, "yyyy-MM-dd HH:mm")}
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

                {useSession().data?.user.role === "ADMIN" && (
                    <DropdownMenuItem
                        className="focus:bg-destructive focus:text-destructive-foreground"
                        asChild
                    >
                        <Button
                            className="w-full flex"
                            variant="ghost"
                            onClick={() => deleteFolder(id)}
                        >
                            <OctagonX className="w-4 h-4 mr-2" />
                            <p className="flex-1">Видалити папку</p>
                        </Button>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
