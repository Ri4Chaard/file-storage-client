import { create } from "zustand";

interface Upload {
    id: string;
    progress: number;
    message: string;
}

interface UploadStoreState {
    uploads: Upload[];
    addUpload: (id: string, message: string) => void;
    updateUpload: (id: string, progress: number) => void;
    removeUpload: (id: string) => void;
}

export const useUploadStore = create<UploadStoreState>((set) => ({
    uploads: [],
    addUpload: (id, message) => {
        set((state) => ({
            uploads: [...state.uploads, { id, progress: 0, message }],
        }));
    },
    updateUpload: (id, progress) => {
        set((state) => ({
            uploads: state.uploads.map((upload) =>
                upload.id === id ? { ...upload, progress } : upload
            ),
        }));
    },
    removeUpload: (id) => {
        set((state) => ({
            uploads: state.uploads.filter((upload) => upload.id !== id),
        }));
    },
}));
