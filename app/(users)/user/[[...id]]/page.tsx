import { BackButton } from "@/components/shared/back-button";
import { Container } from "@/components/shared/container";
import { Header } from "@/components/shared/header";
import { UserDisk } from "@/components/shared/user-disk";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function UserPage({
    params,
}: {
    params: { id: String[] };
}) {
    const session = await getServerSession();
    if (!session || !params.id) redirect("/");

    const parentId =
        params.id.length > 1
            ? Number(params.id[params.id.length - 1])
            : undefined;

    return (
        // <Container>
        <>
            <Header folderId={parentId} />

            <div className="flex overflow-hidden flex-1">
                <UserDisk
                    className="flex-1 rounded-lg p-5 mr-2 bg-secondary"
                    userId={Number(params.id[0])}
                    folderId={Number(parentId)}
                />
            </div>
        </>
        // </Container>
    );
}
