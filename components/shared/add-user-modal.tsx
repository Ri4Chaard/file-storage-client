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
} from "../ui/dialog";
import { Button } from "../ui/button";
import { RegisterForm } from "./form/auth/register-form";

interface Props {
    open: boolean;
    onUserAdded: () => void;
    onClose: () => void;
    className?: string;
}

export const AddUserModal: React.FC<Props> = ({
    open,
    onUserAdded,
    onClose,
    className,
}) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add user</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>

                <RegisterForm onUserAdded={onUserAdded} onClose={handleClose} />
            </DialogContent>
        </Dialog>
    );
};
