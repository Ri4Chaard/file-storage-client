"use client";

import React, { useEffect } from "react";
import { useUserDiskStore } from "@/store/user-disk";
import { findFolderById } from "@/lib/find-folder-by-id";
import { DiskGridView } from "./disk-grid-view";
import { useDiskView } from "@/store/disk-view";
import { DiskListView } from "./disk-list-view";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
    userId: number;
    folderId?: number;
    className?: string;
}

export const UserDisk: React.FC<Props> = ({ userId, folderId, className }) => {
    const { fetchUserDisk, folders, files, loading } = useUserDiskStore();
    const { activeDiskView } = useDiskView();
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated" && session) {
            if (session.user.id !== String(userId) && session.user.id !== "1") {
                router.push(`/user/${session.user.id}`);
            }
        }
    }, [status, session, userId, router]);

    useEffect(() => {
        fetchUserDisk(userId, folderId);
    }, [userId, folderId, fetchUserDisk]);

    const currentFolders = folderId
        ? (() => {
              const folder = findFolderById(folders, Number(folderId));
              return folder ? folder.children : [];
          })()
        : folders;

    return activeDiskView === "list" ? (
        <DiskListView
            currentFolders={currentFolders}
            files={files}
            loading={loading}
            className={className}
        />
    ) : (
        <DiskGridView
            currentFolders={currentFolders}
            files={files}
            loading={loading}
            className={className}
        />
    );
};
