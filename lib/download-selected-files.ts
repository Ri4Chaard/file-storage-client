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
            ? `Завантаження архіву ${folderName}`
            : `Завантаження архіву ${folderName} з (${selectedIds.length}) файлами`;

    const archiveName =
        folders.find((folder) => folder.id === parentId)?.name || "main-page";

    useUploadStore.getState().addUpload(uploadId, description);

    const selectedFiles =
        selectedIds.length === 0 ? files.map((file) => file.id) : selectedIds;
    selectedIds.forEach((id) => unselectFile(id));

    try {
        const data = await Api.files.downloadSelected(selectedFiles, {
            responseType: "blob",
            withCredentials: true,
        });

        const url = window.URL.createObjectURL(new Blob([data]));
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
    } catch (e) {
        console.error("Помилка при завантажені архіва:", e);
        useUploadStore.getState().removeUpload(uploadId);
    }
};
