"use client";

import React, { PropsWithChildren } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { FormFieldTextArea } from "../form/form-field-text-area";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Pencil, PencilLine } from "lucide-react";
import axiosInstance from "@/services/instance";
import { useUserStore } from "@/store/user-store";

interface Props {
    className?: string;
    comment?: string;
    userId: number;
}

export const CommentDialog: React.FC<PropsWithChildren<Props>> = ({
    className,
    comment,
    userId,
    children,
}) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const { fetchUsers } = useUserStore();

    const switchEditing = () => {
        setIsEditing(!isEditing);
    };

    const form = useForm<{ comment: string }>({
        resolver: zodResolver(
            z.object({
                comment: z.string().optional(),
            })
        ),
        defaultValues: {
            comment,
        },
    });

    const onSubmit = async (data: { comment: string }) => {
        try {
            await axiosInstance.patch("/users/add-comment", {
                userId,
                ...data,
            });
            fetchUsers();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className={className}>
                <DialogHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-5"
                        >
                            <DialogTitle>Коментар користувача</DialogTitle>
                            {isEditing ? (
                                <FormFieldTextArea
                                    form={form}
                                    name="comment"
                                    disabled={!isEditing}
                                />
                            ) : (
                                <p>{comment}</p>
                            )}

                            <div className="flex items-center gap-2">
                                <Button
                                    type="submit"
                                    className="flex-1"
                                    loading={form.formState.isSubmitting}
                                    disabled={!isEditing}
                                >
                                    Підтвердити
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={switchEditing}
                                >
                                    {isEditing ? <PencilLine /> : <Pencil />}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
