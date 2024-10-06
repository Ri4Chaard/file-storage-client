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
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Api } from "@/services/api-client";

interface Props {
    userId: number;
    open: boolean;
    onClose: () => void;
    className?: string;
}

export const CreateFolderModal: React.FC<Props> = ({
    userId,
    open,
    onClose,
    className,
}) => {
    const [input, setInput] = React.useState("");

    const handleClose = () => {
        onClose();
    };

    const createFolder = async () => {
        try {
            const resp = await Api.folders.createFolder({
                name: input,
                userId,
            });
            onClose();
            console.log(resp);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create folder</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <DialogFooter>
                    <Button onClick={createFolder}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
