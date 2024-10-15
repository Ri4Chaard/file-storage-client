"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useUserDiskStore } from "@/store/user-disk";

interface Props {
    userId: number;
    parentId: number | undefined;
    open: boolean;
    onClose: () => void;
    className?: string;
}

export const CreateFolderModal: React.FC<Props> = ({
    userId,
    parentId,
    open,
    onClose,
    className,
}) => {
    const [input, setInput] = React.useState("");
    const { createFolder } = useUserDiskStore();

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Створення папки</DialogTitle>
                    <DialogDescription>
                        Введіть назву папки, яку бажаєте створити
                    </DialogDescription>
                </DialogHeader>
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <DialogFooter>
                    <Button
                        disabled={input.length === 0}
                        onClick={() => {
                            handleClose();
                            createFolder(input, userId, parentId);
                            setInput("");
                        }}
                    >
                        Створити
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
