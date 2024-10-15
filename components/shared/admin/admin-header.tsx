import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "../container";
import { AdminProfilePanel } from "./admin-profile-panel";
import { ControlPanel } from "../control-panel";

interface Props {
    className?: string;
}

export const AdminHeader: React.FC<Props> = ({ className }) => {
    return (
        <header
            className={cn(
                "py-5 bg-primary border-b border-secondary/30",
                className
            )}
        >
            <div className="px-3 flex items-center justify-between ">
                <ControlPanel />
                <AdminProfilePanel className="self-end" />
            </div>
        </header>
    );
};
