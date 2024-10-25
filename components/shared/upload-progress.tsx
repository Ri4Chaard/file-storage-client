"use client";

import { useUploadStore } from "@/store/upload-store";
import { Loader } from "lucide-react";

export const UploadProgress = () => {
    const { uploads } = useUploadStore();
    // const uploads = [{ id: 1, message: "test", progress: 20 }];

    if (uploads.filter((upload) => upload.message !== "preview").length > 0) {
        return (
            <div className="fixed bottom-0 right-0 w-[400px] p-3 m-3 border border-input rounded-md bg-white shadow-lg">
                {uploads
                    .filter((upload) => upload.message !== "preview")
                    .map((upload) => (
                        <div key={upload.id} className="mb-2">
                            <div className="text-sm truncate">
                                {upload.message}
                            </div>
                            {upload.message.includes("Завантаження архіву") ? (
                                <div className="w-full flex items-center justify-center">
                                    <Loader className="animate-spin" />
                                </div>
                            ) : (
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                                    <div
                                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                                        style={{ width: `${upload.progress}%` }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        );
    }
};
