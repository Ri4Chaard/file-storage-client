import { Api } from "@/services/api-client";
import { IFile } from "@/services/files";
import { Folder } from "@/services/folders";
import React from "react";

export const useUserDisk = (userId: number, folderId: number | undefined) => {
    const [folders, setFolders] = React.useState<Folder[]>([]);
    const [files, setFiles] = React.useState<IFile[]>([]);
    const [loading, setLoading] = React.useState(false);

    const fetchUserDisk = async () => {
        try {
            setLoading(true);
            const folders = await Api.folders.getFolders(userId, folderId);
            setFolders(folders);
            const files = await Api.files.getFiles(userId, folderId);
            setFiles(files);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchUserDisk();
    }, []);

    const handleUserDiskUpdate = () => {
        fetchUserDisk();
    };

    return {
        folders,
        files,
        loading,
        handleUserDiskUpdate,
    };
};
