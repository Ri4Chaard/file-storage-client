import React from "react";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { RegisterForm } from "../form/auth/register-form";

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

                <RegisterForm onClose={handleClose} />
            </DialogContent>
        </Dialog>
    );
};
