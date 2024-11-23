// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            orderId: string;
            role: "ADMIN" | "USER";
            phone: string;
        };
        accessToken: string;
    }

    interface User extends DefaultUser {
        id: number;
        orderId: string;
        role: "ADMIN" | "USER";
        phone: string;
        token: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string;
        orderId: string;
        role: "ADMIN" | "USER";
        phone: string;
        accessToken: string;
    }
}
