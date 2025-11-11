import React, { useState, useEffect } from "react";
import sampleData from "../../sample/journals";
// import EditDocumentModal from "../components/Modal";
import { API_BASE_URL } from "../../config/conn";
import { Toaster, toast } from "sonner";
import Swal from "sweetalert2";

import axios from "axios";

export default function EditDocumentModal({
    isEditModalOpen,
    onEditModalClose,
    sectorData,
    selectedDocument,
    onDocumentUpdated,
}) {
    const [formData, setFormData] = useState({
        date: "",
        sector: "",
        subSector: "",
        title: "",
        author: "",
        gender: "all",
        isPrivate: false,
        file: null,
    });
    useEffect(() => {
        if (!isEditModalOpen) {
            setFormData({
                date: "",
                sector: "",
                subSector: "",
                title: "",
                author: "",
                gender: "all",
                isPrivate: false,
                file: null,
            });
        }
    }, [isEditModalOpen]);

    useEffect(() => {
        if (selectedDocument) {
            setFormData({
                date: selectedDocument.date || "",
                sector: selectedDocument.sector_name || "",
                subSector: selectedDocument.sub_sector_name || "",
                title: selectedDocument.document_title || "",
                author: selectedDocument.document_author || "",
                gender: selectedDocument.gender || "all",
                isPrivate: selectedDocument.private_status === 1,
                file: null, // file can’t be prefilled for security reasons
            });
        }
    }, [selectedDocument]);

    const handleSectorChange = (event) => {
        const selectedSector = event.target.value;
        setFormData({
            ...formData,
            sector: selectedSector,
            subSector: "", // Reset subsector when sector changes
        });
    };

    const filteredSubsectors = sectorData
        .filter((item) => item.sector === formData.sector)
        .flatMap((item) => item.subsector);

    if (!isEditModalOpen) return null; // hide modal if not open

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedDocument?.id) {
            toast.error("No document selected for editing.");
            return;
        }

        // ✅ SweetAlert confirmation before saving
        const result = await Swal.fire({
            title: "Save changes?",
            text: "This will update the document permanently.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#16a34a", // Tailwind green-600
            cancelButtonColor: "#6b7280", // gray-500
            confirmButtonText: "Yes, save it",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {
            const form = new FormData();
            form.append("id", selectedDocument.id);
            form.append("date", formData.date);
            form.append("sector_name", formData.sector);
            form.append("sub_sector_name", formData.subSector);
            form.append("document_title", formData.title);
            form.append("document_author", formData.author);
            form.append("gender", formData.gender);
            form.append("private_status", formData.isPrivate ? 1 : 0);

            if (formData.file) {
                form.append("document_path", formData.file);
            }

            const response = await axios.post(
                `${API_BASE_URL}updatedocuments`,
                form,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );

            if (response.data.status === true) {
                toast.success("Document updated successfully!");
                if (onDocumentUpdated) onDocumentUpdated();
                onEditModalClose();
            } else {
                toast.error(
                    response.data.message || "Failed to update document."
                );
            }
        } catch (error) {
            console.error("Error updating document:", error);
            toast.error("Server error while updating document.");
        }
    };

    const handleReset = () => {
        setFormData({
            date: "",
            sector: "",
            subSector: "",
            title: "",
            author: "",
            gender: "all",
            isPrivate: false,
            file: null,
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <Toaster richColors position="top-right" />

            <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Edit Document
                    </h2>
                    <button
                        onClick={onEditModalClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Sector
                            </label>
                            <select
                                name="sector"
                                value={formData.sector}
                                onChange={handleSectorChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            >
                                <option value="">Select Sector</option>
                                {sectorData.map((item, index) => (
                                    <option key={index} value={item.sector}>
                                        {item.sector}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Subsector
                            </label>
                            <select
                                name="subSector"
                                value={formData.subSector}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            >
                                <option value="">Select Subsector</option>
                                {filteredSubsectors.map((sub, index) => (
                                    <option key={index} value={sub}>
                                        {sub}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Author
                            </label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Gender
                        </label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        >
                            <option value="all">All</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Document (accepted file formats: *.pdf, *.jpg,
                            *.jpeg, *.png)
                        </label>
                        <input
                            type="file"
                            name="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="isPrivate"
                            checked={formData.isPrivate}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label className="text-sm text-gray-700">
                            Is Private
                        </label>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        >
                            Reset
                        </button>
                        <button
                            type="button"
                            onClick={onEditModalClose}
                            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Save Document
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export function AddDocumentModal({
    isAddModalOpen,
    onAddModalClose,
    sectorData,
    onDocumentAdded, // ✅ optional callback for refreshing table
}) {
    const [formData, setFormData] = useState({
        date: "",
        sector: "",
        subSector: "",
        title: "",
        author: "",
        gender: "all",
        isPrivate: false,
        file: null,
    });

    const handleSectorChange = (event) => {
        const selectedSector = event.target.value;
        setFormData({
            ...formData,
            sector: selectedSector,
            subSector: "",
        });
    };

    const filteredSubsectors = sectorData
        .filter((item) => item.sector === formData.sector)
        .flatMap((item) => item.subsector);

    if (!isAddModalOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : files ? files[0] : value,
        });
    };

    // ✅ MAIN FUNCTION: Create new document
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // prepare form data for backend
            const form = new FormData();
            form.append("date", formData.date);
            form.append("sector_name", formData.sector);
            form.append("sub_sector_name", formData.subSector);
            form.append("document_title", formData.title);
            form.append("document_author", formData.author);
            form.append("gender", formData.gender);
            form.append("private_status", formData.isPrivate ? 1 : 0);
            if (formData.file) {
                form.append("document_path", formData.file);
            }

            // ✅ send request to backend API
            const response = await axios.post(
                `${API_BASE_URL}createdocuments`,
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            if (response.data.status === true) {
                toast.success("Document added successfully!");
                if (onDocumentAdded) onDocumentAdded(); // refresh table
                handleReset();
                onAddModalClose();
            } else {
                toast.error(
                    response.data.message || "Failed to save document."
                );
            }
        } catch (error) {
            console.error("Error creating document:", error);
            toast.error("Server error while saving document.");
        }
    };

    const handleReset = () => {
        setFormData({
            date: "",
            sector: "",
            subSector: "",
            title: "",
            author: "",
            gender: "all",
            isPrivate: false,
            file: null,
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Add Document
                    </h2>
                    <button
                        onClick={onAddModalClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Sector
                            </label>
                            <select
                                name="sector"
                                value={formData.sector}
                                onChange={handleSectorChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            >
                                <option value="">Select Sector</option>
                                {sectorData.map((item, index) => (
                                    <option key={index} value={item.sector}>
                                        {item.sector}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Subsector
                            </label>
                            <select
                                name="subSector"
                                value={formData.subSector}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            >
                                <option value="">Select Subsector</option>
                                {filteredSubsectors.map((sub, index) => (
                                    <option key={index} value={sub}>
                                        {sub}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Author
                            </label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Gender
                        </label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        >
                            <option value="all">All</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Document (accepted file formats: *.pdf, *.jpg,
                            *.jpeg, *.png)
                        </label>
                        <input
                            type="file"
                            name="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="isPrivate"
                            checked={formData.isPrivate}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label className="text-sm text-gray-700">
                            Is Private
                        </label>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        >
                            Reset
                        </button>
                        <button
                            type="button"
                            onClick={onAddModalClose}
                            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Save Document
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
