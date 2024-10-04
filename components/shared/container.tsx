import React, { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface Props {
    className?: string;
}

export const Container: React.FC<PropsWithChildren<Props>> = ({
    children,
    className,
}) => {
    return (
        <div className={cn("container mx-auto px-3 md:px-1", className)}>
            {children}
        </div>
    );
};
