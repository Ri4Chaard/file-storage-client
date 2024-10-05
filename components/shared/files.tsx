import React from "react";
import { cn } from "@/lib/utils";
import axiosInstance from "@/services/instance";

interface Props {
    className?: string;
}

export const Files: React.FC<Props> = ({ className }) => {
    const [files, setFiles] = React.useState();

    return (
        <div>
            <img
                src={`http://localhost:8000/uploads/1728150747117.jpg`}
                width="100"
            />
            <a
                href={`http://localhost:8000/uploads/1728150747117.jpg`}
                download
            >
                Download
            </a>{" "}
        </div>
    );
};
