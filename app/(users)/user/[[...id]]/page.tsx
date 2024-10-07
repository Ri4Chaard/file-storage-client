import { Container } from "@/components/shared/container";
import { UserFiles } from "@/components/shared/user-files";
import { UserFolders } from "@/components/shared/user-folders";

export default function UserPage({ params }: { params: { id: String[] } }) {
    const parentId =
        params.id.length > 1
            ? Number(params.id[params.id.length - 1])
            : undefined;
    return (
        <Container>
            <UserFolders userId={Number(params.id[0])} parentId={parentId} />
            <UserFiles userId={Number(params.id[0])} parentId={parentId} />
        </Container>
    );
}
