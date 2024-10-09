import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { CreateFolderButton } from "./create-folder-button";
import { AddFileButton } from "./add-file-button";
import { BackButton } from "./back-button";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { ProfilePanel } from "./profile-panel";
import { ControlPanel } from "./control-panel";

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    return (
        <header className={cn("py-5 mb-5 bg-primary", className)}>
            <Container className="flex items-center justify-between ">
                <ControlPanel />
                <ProfilePanel className="self-end" />
            </Container>
        </header>
    );
};
