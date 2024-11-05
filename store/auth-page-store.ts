import { create } from "zustand";

export interface AuthPage {
    authType: "login" | "register";
    phone: string;
    expiresAt: Date | null;
    registrationState: "send" | "verify" | "register";

    setPhone: (phone: string) => void;
    setExpiresAt: (expiresAt: Date) => void;
    onSwitchType: () => void;
    onChangeState: (registrationState: "send" | "verify" | "register") => void;
}

export const useAuthPageStore = create<AuthPage>((set) => ({
    authType: "login",
    phone: "",
    expiresAt: null,
    registrationState: "send",

    setPhone: (phone) => {
        set({ phone });
    },
    setExpiresAt: (expiresAt) => {
        set({ expiresAt });
    },
    onSwitchType: () => {
        useAuthPageStore.getState().authType === "login"
            ? set({
                  authType: "register",
              })
            : set({ authType: "login" });
        useAuthPageStore.getState().onChangeState("send");
    },
    onChangeState: (registrationState) => {
        set({ registrationState });
    },
}));
