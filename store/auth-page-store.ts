import { create } from "zustand";

type TRegistrationState = "send" | "verify" | "register" | "password_restore";
type TAuthType = "login" | "register";

export interface AuthPage {
    authType: TAuthType;
    phone: string;
    expiresAt: Date | null;
    registrationState: TRegistrationState;

    setPhone: (phone: string) => void;
    setExpiresAt: (expiresAt: Date) => void;
    onSwitchType: () => void;
    onChangeState: (registrationState: TRegistrationState) => void;
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
