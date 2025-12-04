import toast from "react-hot-toast";
import api from "../lib/axios";

export const handleFileChange = (e, setFile, setPreview) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        setFile(selectedFile);
        if (setPreview) {
            setPreview(selectedFile);
        }
    }
};

export const handleFileUpload = async ({ type, file, userId, setUserData, setSelectedFile, setPreview}) => {
    if (!file) {
        toast.error(`Please select a ${type} first`);
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const res = await api.put(`/users/${userId}/${type}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        const fileUrl = res.data.filePath || res.data[type];

        setUserData((prev) => ({ ...prev, [type]: fileUrl }));

        if (setSelectedFile) setSelectedFile(null);
        if (setPreview) setPreview(null);

        toast.success(`${type.toUpperCase()} updated!`);
    } catch (error) {
        console.error("Upload error:", error);
        toast.error(`Error uploading ${type}`);
    }
};

export const handleFileDelete = async ({type, userId, setUserData, setSelectedFile, setPreview, defaultAvatar = ""}) => {
    if (!window.confirm(`Are you sure you want to delete your ${type}?`)) return;

    try {
        await api.delete(`/users/${userId}/${type}`);

        const defaultValue = type === "profile" ? defaultAvatar : "";

        setUserData((prev) => ({ ...prev, [type]: defaultValue }));

        if (setSelectedFile) setSelectedFile(null);
        if (setPreview) setPreview(null);

        toast.success(`${type.toUpperCase()} deleted!`);
    } catch (error) {
        console.error("Delete error:", error);
        toast.error(`Error deleting ${type}`);
    }
};
