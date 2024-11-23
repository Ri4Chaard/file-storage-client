import axiosInstance from "@/services/instance";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: { label: "Phone", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { data } = await axiosInstance.post(
                    "/auth/login",
                    credentials
                );

                const { user, token } = data;

                if (user && token) {
                    return { ...user, token };
                }

                return null;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 60 * 60,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = String(user.id);
                token.orderId = user.orderId;
                token.role = user.role;
                token.phone = user.phone;
                token.accessToken = user.token;
            }
            return token;
        },

        async session({ session, token }) {
            session.user.id = token.id;
            session.user.orderId = token.orderId;
            session.user.role = token.role;
            session.user.phone = token.phone;
            session.accessToken = token.accessToken;
            return session;
        },
    },
};
