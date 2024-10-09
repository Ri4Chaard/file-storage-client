import { Container } from "@/components/shared/container";
import { UserDisk } from "@/components/shared/user-disk";
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
        <Container>
            <UserDisk
                userId={Number(params.id[0])}
                folderId={Number(parentId)}
            />
        </Container>
    );
}
