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
    setRefresh: (value: boolean) => void;
    onClose: () => void;
    className?: string;
}

export const AddUserModal: React.FC<Props> = ({
    open,
    setRefresh,
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

                <RegisterForm setRefresh={setRefresh} onClose={handleClose} />
            </DialogContent>
        </Dialog>
    );
};
