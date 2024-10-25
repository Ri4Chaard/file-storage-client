import { Api } from "@/services/api-client";
import { IFile } from "@/services/files";
import { Folder } from "@/services/folders";
import { AxiosProgressEvent } from "axios";
import { create } from "zustand";
import { useUploadStore } from "./upload-store";

export interface UserDiskState {
    folders: Folder[];
    files: IFile[];
    userId: number | undefined;
    parentId: number | undefined;
    error: boolean;
    loading: boolean;
    selectedFiles: number[];

    fetchUserDisk: (userId: number, parentId?: number) => Promise<void>;

    createFolder: (
        name: string,
        userId: number,
        parentId?: number
    ) => Promise<void>;

    addFile: (formData: FormData, uploadId: string) => Promise<void>;

    deleteFile: (fileId: number) => Promise<void>;

    deleteFolder: (folderId: number) => Promise<void>;

    selectFile: (fileId: number) => void; // Добавим функцию для выбора файла

    unselectFile: (fileId: number) => void; // Для снятия выбора с файла
}

export const useUserDiskStore = create<UserDiskState>((set, get) => ({
    folders: [],
    files: [],
    userId: undefined,
    parentId: undefined,
    error: false,
    loading: true,
    selectedFiles: [],

    // Функция для загрузки содержимого диска пользователя
    fetchUserDisk: async (userId, parentId) => {
        try {
            set({ loading: true, error: false });
            const { folders, files } = await Api.users.getUserDisk(
                userId,
                parentId
            );
            set({ folders, files, userId, parentId });
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

            const { folders, files } = await Api.users.getUserDisk(
                useUserDiskStore.getState().userId!,
                useUserDiskStore.getState().parentId
            );

            set({ folders, files });
        } catch (e) {
            console.log(e);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    deleteFile: async (fileId) => {
        try {
            set({ loading: true, error: false });
            await Api.files.deleteFile(fileId);

            const { folders, files } = await Api.users.getUserDisk(
                useUserDiskStore.getState().userId!,
                useUserDiskStore.getState().parentId
            );
            set({ folders, files });
        } catch (e) {
            console.log(e);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    deleteFolder: async (folderId) => {
        try {
            set({ loading: true, error: false });
            await Api.folders.deleteFolder(folderId);

            const { folders, files } = await Api.users.getUserDisk(
                useUserDiskStore.getState().userId!,
                useUserDiskStore.getState().parentId
            );
            set({ folders, files });
        } catch (e) {
            console.log(e);

            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    // Функция для выбора файла
    selectFile: (fileId) => {
        const { selectedFiles } = get();
        set({ selectedFiles: [...selectedFiles, fileId] });
    },

    // Функция для снятия выбора с файла
    unselectFile: (fileId) => {
        const { selectedFiles } = get();
        set({
            selectedFiles: selectedFiles.filter(
                (selectedFileId) => selectedFileId !== fileId
            ),
        });
    },
}));
