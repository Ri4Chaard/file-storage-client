import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { LayoutGrid, List } from "lucide-react";
import { useDiskView } from "@/store/disk-view";

interface Props {
    className?: string;
}

export const DiskViewControl: React.FC<Props> = ({ className }) => {
    const { activeDiskView, handleChangeActiveDiskView } = useDiskView();

    return (
        <div className={cn("flex items-center gap-3", className)}>
            <Button
                onClick={() => handleChangeActiveDiskView("list")}
                variant={activeDiskView === "list" ? "default" : "outline"}
                className="border border-secondary"
            >
                <List />
            </Button>
            <Button
                onClick={() => handleChangeActiveDiskView("grid")}
                variant={activeDiskView === "grid" ? "default" : "outline"}
                className="border border-secondary"
            >
                <LayoutGrid />
            </Button>
        </div>
    );
};
