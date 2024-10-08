import { Api } from "@/services/api-client";
import { IFile } from "@/services/files";
import { Folder } from "@/services/folders";
import { create } from "zustand";

export interface UserDiskState {
    folders: Folder[];
    files: IFile[];
    error: boolean;
    loading: boolean;

    fetchUserDisk: (userId: number, parentId?: number) => Promise<void>;

    createFolder: (
        name: string,
        userId: number,
        parentId?: number
    ) => Promise<void>;

    addFile: (formData: FormData) => Promise<void>;
}

export const useUserDiskStore = create<UserDiskState>((set, get) => ({
    folders: [],
    files: [],
    error: false,
    loading: true,

    fetchUserDisk: async (userId, parentId) => {
        try {
            set({ loading: true, error: false });
            const { folders, files } = await Api.users.getUserDisk(
                userId,
                parentId
            );

            set({ folders, files });
        } catch (e) {
            console.log(e);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    createFolder: async (name, userId, parentId) => {
        try {
            set({ loading: true, error: false });

            await Api.folders.createFolder({
                name,
                userId,
                parentId,
            });
            const { folders, files } = await Api.users.getUserDisk(
                userId,
                parentId
            );

            set({ folders, files });
        } catch (e) {
            console.log(e);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    addFile: async (formData) => {
        try {
            await Api.files.uploadFile(formData);
            const userId = Number(formData.get("userId"));
            const parentId = formData.get("folderId");
            const { folders, files } = await Api.users.getUserDisk(
                userId,
                parentId ? Number(parentId) : undefined
            );
            set({ folders, files });
        } catch (e) {
            console.log(e);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
}));
