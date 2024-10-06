import { Container } from "@/components/shared/container";
import { UserFolders } from "@/components/shared/user-folders";

export default function UserPage({ params }: { params: { id: String[] } }) {
    return (
        <Container>
            {params.id.map((id, index) => (
                <h2 key={index}>{id}</h2>
            ))}
            <UserFolders userId={Number(params.id[0])} />
        </Container>
    );
}
