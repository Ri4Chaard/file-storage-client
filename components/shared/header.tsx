import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Button } from "../ui/button";
import { CreateFolderButton } from "./create-folder-button";

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    return (
        <header className={cn("", className)}>
            <Container>
                <CreateFolderButton />
            </Container>
        </header>
    );
};
