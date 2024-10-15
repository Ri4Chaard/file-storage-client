import { Api } from "@/services/api-client";
import { User } from "@/services/auth";
import { create } from "zustand";

interface UserStoreState {
    users: User[];
    loading: boolean;
    error: boolean;
    fetchUsers: (userId?: number) => Promise<void>;
}

export const useUserStore = create<UserStoreState>((set, get) => ({
    users: [],
    loading: false,
    error: false,

    fetchUsers: async (userId) => {
        try {
            set({ loading: true, error: false });
            const users = await Api.users.getAll(userId);
            set({ users });
        } catch (e) {
            console.log(e);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
}));
