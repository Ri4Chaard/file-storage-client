import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { CreateFolderButton } from "./create-folder-button";
import { AddFileButton } from "./add-file-button";
import { BackButton } from "./back-button";

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    return (
        <header className={cn("py-5 mb-5 bg-primary", className)}>
            <Container className="flex items-center gap-5">
                <BackButton />
                <CreateFolderButton />
                <AddFileButton />
            </Container>
        </header>
    );
};
