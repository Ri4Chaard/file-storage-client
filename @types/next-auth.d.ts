// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: "ADMIN" | "USER";
            email: string;
        };
        accessToken: string;
    }

    interface User extends DefaultUser {
        id: number;
        role: UserRole;
        token: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string;
        role: "ADMIN" | "USER";
        accessToken: string;
    }
}
