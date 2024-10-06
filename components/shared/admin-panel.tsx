import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { AddUserModal } from "./add-user-modal";
import Link from "next/link";
import { Api } from "@/services/api-client";
import { User } from "@/services/auth";

interface Props {
    className?: string;
}

export const AdminPanel: React.FC<Props> = ({ className }) => {
    const [users, setUsers] = React.useState<User[]>([]);
    const [refresh, setRefresh] = React.useState(false);
    const [openAddUserModal, setOpenAddUserModal] = React.useState(false);

    React.useEffect(() => {
        async function fetchUsers() {
            try {
                const data = await Api.users.getAll();
                setUsers(data);
                setRefresh(false);
            } catch (e) {
                console.log(e);
            }
        }

        fetchUsers();
    }, [refresh]);
    return (
        <div className={cn("flex flex-col gap-5 w-full", className)}>
            <div>
                {users.map((user) => (
                    <Link
                        href={`/user/${user.id}`}
                        key={user.id}
                        className="block"
                    >
                        {user.email}
                    </Link>
                ))}
            </div>

            <AddUserModal
                setRefresh={setRefresh}
                open={openAddUserModal}
                onClose={() => setOpenAddUserModal(false)}
            />
            <Button onClick={() => setOpenAddUserModal(true)} variant="outline">
                Add User
            </Button>
        </div>
    );
};
