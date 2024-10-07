import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { AddUserModal } from "./add-user-modal";
import Link from "next/link";
import { useUsers } from "@/hooks/use-users";
import { Loader } from "lucide-react";

interface Props {
    className?: string;
}

export const AdminPanel: React.FC<Props> = ({ className }) => {
    const [openAddUserModal, setOpenAddUserModal] = React.useState(false);

    const { users, loading, handleUserAdded } = useUsers();

    return (
        <div className={cn("flex flex-col gap-5 w-full", className)}>
            <div className="flex flex-col justify-center">
                {loading ? (
                    <Loader className="animate-spin self-center" />
                ) : (
                    users.map((user) => (
                        <Link
                            href={`/user/${user.id}`}
                            key={user.id}
                            className="block"
                        >
                            {user.email}
                        </Link>
                    ))
                )}
            </div>

            <AddUserModal
                onUserAdded={handleUserAdded}
                open={openAddUserModal}
                onClose={() => setOpenAddUserModal(false)}
            />
            <Button onClick={() => setOpenAddUserModal(true)} variant="outline">
                Add User
            </Button>
        </div>
    );
};
