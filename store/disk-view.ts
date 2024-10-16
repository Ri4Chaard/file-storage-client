import { create } from "zustand";

export interface DiskView {
    activeDiskView: "list" | "grid";

    handleChangeActiveDiskView: (activeDiskView: "list" | "grid") => void;
}

export const useDiskView = create<DiskView>((set) => ({
    activeDiskView: "list",

    handleChangeActiveDiskView: (activeDiskView) => {
        set({
            activeDiskView:
                activeDiskView !== useDiskView.getState().activeDiskView
                    ? activeDiskView
                    : useDiskView.getState().activeDiskView,
        });
    },
}));
