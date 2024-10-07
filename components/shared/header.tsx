import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { CreateFolderButton } from "./create-folder-button";
import { AddFileButton } from "./add-file-button";

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    return (
        <header className={cn("mb-10", className)}>
            <Container>
                <CreateFolderButton />
                <AddFileButton />
            </Container>
        </header>
    );
};
