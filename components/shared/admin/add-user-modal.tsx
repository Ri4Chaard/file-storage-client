import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../../ui/dialog";
import { AddUserForm } from "../form/auth/add-user-form";

interface Props {
    open: boolean;
    onClose: () => void;
    className?: string;
}

export const AddUserModal: React.FC<Props> = ({ open, onClose, className }) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Додати користувача</DialogTitle>
                    <DialogDescription>
                        Заповніть форму, щоб додати нового користувача
                    </DialogDescription>
                </DialogHeader>

                <AddUserForm onClose={handleClose} />
            </DialogContent>
        </Dialog>
    );
};
