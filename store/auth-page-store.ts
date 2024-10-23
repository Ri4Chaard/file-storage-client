import { create } from "zustand";

export interface AuthPage {
    authType: "login" | "register";
    phone: string;
    registrationState: "send" | "verify" | "register";

    setPhone: (phone: string) => void;
    onSwitchType: () => void;
    onChangeState: (registrationState: "send" | "verify" | "register") => void;
}

export const useAuthPageStore = create<AuthPage>((set) => ({
    authType: "login",
    phone: "",
    registrationState: "send",

    setPhone: (phone) => {
        set({ phone });
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
