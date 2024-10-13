import { Api } from "@/services/api-client";
import { IFile } from "@/services/files";
import { Folder } from "@/services/folders";
import { AxiosProgressEvent } from "axios";
import { create } from "zustand";
import { useUploadStore } from "./upload-store";

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

    addFile: (formData: FormData, uploadId: string) => Promise<void>;
}

export const useUserDiskStore = create<UserDiskState>((set, get) => ({
    folders: [],
    files: [],
    error: false,
    loading: true,

    // Функция для загрузки содержимого диска пользователя
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

    // Функция для создания папки
    createFolder: async (name, userId, parentId) => {
        try {
            set({ loading: true, error: false });
            await Api.folders.createFolder({ name, userId, parentId });
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

    // Функция для загрузки файлов с отслеживанием прогресса
    addFile: async (formData, uploadId) => {
        const { updateUpload } = useUploadStore.getState();

        try {
            await Api.files.uploadFile(formData, {
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    if (progressEvent.total !== undefined) {
                        const progress = Math.round(
                            (progressEvent.loaded / progressEvent.total) * 100
                        );
                        updateUpload(uploadId, progress);
                    }
                },
            });

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
