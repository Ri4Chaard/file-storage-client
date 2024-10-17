import React from "react";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { UsersTable } from "./users-table";

interface Props {
    open: boolean;
    onClose: () => void;
    className?: string;
}

export const ShowUsersModal: React.FC<Props> = ({
    open,
    onClose,
    className,
}) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="w-full max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Зареєстровані користувачі</DialogTitle>
                </DialogHeader>

                <UsersTable />
            </DialogContent>
        </Dialog>
    );
};
