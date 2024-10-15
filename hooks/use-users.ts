import { Api } from "@/services/api-client";
import { User } from "@/services/auth";
import React from "react";

export const useUsers = (id?: number) => {
    const [users, setUsers] = React.useState<User[]>([]);
    const [loading, setLoading] = React.useState(false);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await Api.users.getAll(id);
            setUsers(data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchUsers();
    }, []);

    const handleUserAdded = () => {
        fetchUsers();
    };

    return { users, loading, handleUserAdded };
};
