import { Container } from "@/components/shared/container";
import { Dashboard } from "@/components/shared/dashboard";
import { getUserSession } from "@/lib/get-user-session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const user = await getUserSession();

    if (user?.role !== "ADMIN") {
        redirect("/");
    }

    return (
        <Container className="mt-10">
            <Dashboard />
        </Container>
    );
}
