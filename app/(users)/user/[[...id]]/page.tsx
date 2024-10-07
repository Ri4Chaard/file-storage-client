import { Container } from "@/components/shared/container";
import { UserDisk } from "@/components/shared/user-disk";

export default function UserPage({ params }: { params: { id: String[] } }) {
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
