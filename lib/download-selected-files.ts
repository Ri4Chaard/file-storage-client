import { Api } from "@/services/api-client";
import { useUploadStore } from "@/store/upload-store";
import { useUserDiskStore } from "@/store/user-disk";

export const downloadSelectedFiles = async () => {
    const {
        selectedFiles: selectedIds,
        unselectFile,
        parentId,
        files,
        folders,
    } = useUserDiskStore.getState();

    const uploadId = `${Date.now()}-${
        selectedIds.length > 0 ? selectedIds[0] : "all"
    }`;

    const folderName =
        folders.find((folder) => folder.id === parentId)?.name ||
        "головної папки";
    const description =
        selectedIds.length === 0
            ? ` ${folderName}`
            : ` ${folderName} з (${selectedIds.length}) файлами`;

    const archiveName = folderName || "main-page";

    useUploadStore.getState().addUpload(uploadId, description);

    const selectedFiles =
        selectedIds.length === 0 ? files.map((file) => file.id) : selectedIds;
    selectedIds.forEach((id) => unselectFile(id));

    try {
        const arrayBuffer = await Api.files.downloadSelected(selectedFiles, {
            withCredentials: true,
            onDownloadProgress: (progressEvent) => {
                const progress = Math.round(
                    (progressEvent.loaded / progressEvent.total!) * 100
                );
                useUploadStore.getState().updateUpload(uploadId, progress);
            },
        });

        const blob = new Blob([arrayBuffer], {
            type: "application/zip",
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
            "download",
            `${archiveName}-${selectedFiles.length}.zip`
        );
        document.body.appendChild(link);
        link.click();
        link.parentNode!.removeChild(link);

        useUploadStore.getState().removeUpload(uploadId);
        return () => {
            window.URL.revokeObjectURL(url);
        };
    } catch (error) {
        console.error("Помилка при завантаженні архіву:", error);
        useUploadStore.getState().removeUpload(uploadId);
    }
};
