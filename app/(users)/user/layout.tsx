import { AdminHeader } from "@/components/shared/admin/admin-header";
import { SideBar } from "@/components/shared/side-bar";
import { authOptions } from "@/constants/auth-options";
import { getServerSession } from "next-auth";

export const metadata = {
    title: "Users",
    description: "Generated by Next.js",
};

export default async function UsersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getServerSession(authOptions);
    console.log(user);
    return (
        <div className="min-h-screen h-screen overflow-hidden">
            {user?.user.role === "ADMIN" && <AdminHeader />}
            {/* <AdminHeader /> */}
            <div className="flex h-full">
                <SideBar className="basis-1/5 h-full" />
                <main className="flex-1 h-full bg-primary">{children}</main>
            </div>
        </div>
    );
}
