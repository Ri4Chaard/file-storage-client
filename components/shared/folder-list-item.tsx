import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Folder, OctagonX } from "lucide-react";
import { useUserDiskStore } from "@/store/user-disk";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

interface Props {
    id: number;
    name: string;
    createdAt: Date;
    className?: string;
}

export const FolderListItem: React.FC<Props> = ({
    id,
    name,
    createdAt,
    className,
}) => {
    const pathname = usePathname();
    const { deleteFolder } = useUserDiskStore();

    return (
        <Link
            href={`${pathname}/${String(id)}`}
            className="flex items-center justify-between rounded-lg overflow-hidden"
        >
            <Button
                className={cn(
                    "flex-1 flex items-center justify-between border-none rounded-none",
                    className
                )}
            >
                <div className="flex items-center gap-5">
                    <Folder />
                    <p>{name}</p>
                </div>
                <p className="mr-10">{format(createdAt, "yyyy-MM-dd HH:mm")}</p>
            </Button>

            {useSession().data?.user.role === "ADMIN" && (
                <div className="flex items-center z-10">
                    <Button
                        variant="destructive"
                        className="border-none rounded-none"
                        size="icon"
                        onClick={() => deleteFolder(id)}
                    >
                        <OctagonX className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </Link>
    );
};
