"use client";

import { useUploadStore } from "@/store/upload-store";

export const UploadProgress = () => {
    const { uploads } = useUploadStore();
    // const uploads = [{ id: 1, progress: 50, message: "Завантаження файлу" }];
    if (uploads.length > 0) {
        return (
            <div className="absolute bottom-0 right-0 w-[400px] p-3 m-3 border border-input rounded-md">
                {uploads.map((upload) => (
                    <div key={upload.id} className="mb-2">
                        <div className="text-sm">{upload.message}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${upload.progress}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
    }
};
