import { Folder } from "@/services/folders";

export const findFolderById = (
    folders: Folder[],
    folderId: number
): Folder | null => {
    for (const folder of folders) {
        if (folder.id === folderId) {
            return folder;
        }
        if (folder.children && folder.children.length > 0) {
            const found = findFolderById(folder.children, folderId);
            if (found) return found;
        }
    }
    return null;
};
