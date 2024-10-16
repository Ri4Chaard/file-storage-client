"use client";

import React from "react";
import { useUserDiskStore } from "@/store/user-disk";
import { findFolderById } from "@/lib/find-folder-by-id";
import { DiskGridView } from "./disk-grid-view";
import { useDiskView } from "@/store/disk-view";
import { DiskListView } from "./disk-list-view";

interface Props {
    userId: number;
    folderId?: number;
    className?: string;
}

export const UserDisk: React.FC<Props> = ({ userId, folderId, className }) => {
    const { fetchUserDisk, folders, files, loading } = useUserDiskStore();
    const { activeDiskView } = useDiskView();

    React.useEffect(() => {
        fetchUserDisk(userId, folderId);
    }, []);

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
