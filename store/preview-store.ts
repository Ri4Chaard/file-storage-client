import { create } from "zustand";

interface PreviewStoreState {
    previewId: string | null;
    setPreviewId: (id: string | null) => void;
}

export const usePreviewStore = create<PreviewStoreState>((set) => ({
    previewId: null,
    setPreviewId: (id) => set({ previewId: id }),
}));
