import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/conn";
import { Toaster, toast } from "sonner";
import Swal from "sweetalert2";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_BASE_URL;

export default function ModalFunctions() {
    return true;
}

function AddJournalModal({
    setIsModalOpen,
    sector,
    subsector,
    setSector,
    setSubsector,
    getJournalData,
    user,
}) {
    const [selectedSector, setSelectedSector] = useState(user?.user_privilage === 'user' ? user.sector_barangay : "");
    const [selectedSubsector, setSelectedSubsector] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [dataRequirement, setDataRequirement] = useState("");
    const [population, setPopulation] = useState("");
    const [totalMale, setTotalMale] = useState("");
    const [totalFemale, setTotalFemale] = useState("");
    const [sourceOfData, setSourceOfData] = useState("");
    const [remarks, setRemarks] = useState("");
    const [privateStatus, setPrivateStatus] = useState(false);
    const [disableStatus, setDisableStatus] = useState(false);
    const [showRemarks, setShowRemarks] = useState(false);

    const filteredSubsectors = subsector
        .filter(([sec]) => sec === selectedSector)
        .map(([, sub]) => sub);

    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: currentYear + 1 - 1900 + 1 },
        (_, i) => 1900 + i
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedSector || !selectedYear || !dataRequirement) {
            alert("Please fill in required fields.");
            return;
        }

        try {
            const response = await axios.post(
                `${API_BASE_URL}createjournal`,
                {
                    sector: selectedSector,
                    sub_sector: selectedSubsector,
                    year: selectedYear,
                    data_requirement: dataRequirement,
                    population,
                    total_male: totalMale,
                    total_female: totalFemale,
                    source_of_data: sourceOfData,
                    remarks,
                    private_status: privateStatus,
                    disable_status: disableStatus,
                    show_remarks: showRemarks,
                },
                { withCredentials: true, validateStatus: () => true }
            );

            if (response.data?.status) {
                setIsModalOpen(false);
                getJournalData();
                setDataRequirement("");
                setPopulation("");
                setTotalMale("");
                setTotalFemale("");
                setSourceOfData("");
                setRemarks("");
                setPrivateStatus(false);
                setDisableStatus(false);
                setShowRemarks(false);
            } else {
                alert("Failed to create journal");
            }
        } catch (error) {
            console.error("Error creating journal:", error);
            alert("Error creating journal");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-bold mb-4 text-gray-800">
                    Add New Journal
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Sector *
                        </label>
                        <select
                            value={selectedSector}
                            onChange={(e) => {
                                setSelectedSector(e.target.value);
                                setSelectedSubsector("");
                            }}
                            disabled={user?.user_privilage === 'user'}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
                        >
                            <option value="">Select Sector</option>
                            {sector.map((item, index) => (
                                <option key={index} value={item}>
                                    {item.charAt(0).toUpperCase() +
                                        item.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Sub Sector
                        </label>
                        <select
                            value={selectedSubsector}
                            onChange={(e) =>
                                setSelectedSubsector(e.target.value)
                            }
                            disabled={!selectedSector}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
                        >
                            <option value="">Select Sub Sector</option>
                            {filteredSubsectors.map((sub, index) => (
                                <option key={index} value={sub}>
                                    {sub.charAt(0).toUpperCase() + sub.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0">
                        <label
                            htmlFor="year"
                            className="text-gray-700 font-semibold w-full sm:w-20"
                        >
                            Year *
                        </label>
                        <select
                            id="year"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="flex-grow w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Year</option>
                            {years.reverse().map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Data Requirement *
                        </label>
                        <textarea
                            value={dataRequirement}
                            onChange={(e) => setDataRequirement(e.target.value)}
                            placeholder="Enter data requirement"
                            className="w-full border h-24 border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Population
                        </label>
                        <input
                            type="number"
                            value={population}
                            onChange={(e) => setPopulation(e.target.value)}
                            placeholder="Enter population"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Total Male
                        </label>
                        <input
                            type="number"
                            value={totalMale}
                            onChange={(e) => setTotalMale(e.target.value)}
                            placeholder="Enter total male"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Total Female
                        </label>
                        <input
                            type="number"
                            value={totalFemale}
                            onChange={(e) => setTotalFemale(e.target.value)}
                            placeholder="Enter total female"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Source of Data
                        </label>
                        <input
                            type="text"
                            value={sourceOfData}
                            onChange={(e) => setSourceOfData(e.target.value)}
                            placeholder="Enter source of data"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Remarks
                        </label>
                        <textarea
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            placeholder="Enter remarks"
                            className="w-full border h-24 border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="privateStatus"
                            checked={privateStatus}
                            onChange={(e) => setPrivateStatus(e.target.checked)}
                            className="mr-2"
                        />
                        <label
                            htmlFor="privateStatus"
                            className="text-gray-700 font-semibold"
                        >
                            Private Status
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="disableStatus"
                            checked={disableStatus}
                            onChange={(e) => setDisableStatus(e.target.checked)}
                            className="mr-2"
                        />
                        <label
                            htmlFor="disableStatus"
                            className="text-gray-700 font-semibold"
                        >
                            Disable Status
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="showRemarks"
                            checked={showRemarks}
                            onChange={(e) => setShowRemarks(e.target.checked)}
                            className="mr-2"
                        />
                        <label
                            htmlFor="showRemarks"
                            className="text-gray-700 font-semibold"
                        >
                            Show Remarks
                        </label>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// NEW: Clone Modal Component
function CloneJournalModal({
    setIsCloneModalOpen,
    sector,
    selectedSector: preSelectedSector, // Renamed to avoid conflict
    getJournalData,
}) {
    const [selectedSector, setSelectedSector] = useState(
        preSelectedSector || ""
    ); // Pre-select current sector
    const [fromYear, setFromYear] = useState("");
    const [toYear, setToYear] = useState("");

    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: currentYear + 1 - 1900 + 1 },
        (_, i) => 1900 + i
    ).reverse(); // Reverse for recent-first

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedSector || !fromYear || !toYear || fromYear === toYear) {
            toast.error(
                "Please fill all fields and ensure 'to year' differs from 'from year'."
            );
            return;
        }

        try {
            const response = await axios.post(
                `${API_BASE_URL}clonesectorjournal`,
                {
                    sector: selectedSector,
                    from_year: fromYear,
                    to_year: toYear,
                },
                { withCredentials: true, validateStatus: () => true }
            );

            if (response.data?.status) {
                toast.success(
                    `${response.data.count} records cloned successfully.`
                );
                setIsCloneModalOpen(false);
                getJournalData(); // Refresh table
                setSelectedSector(preSelectedSector || ""); // Reset to pre-selected
                setFromYear("");
                setToYear("");
            } else {
                toast.error(
                    response.data?.message || "Failed to clone records."
                );
            }
        } catch (error) {
            console.error("Error cloning records:", error);
            toast.error("Error cloning records.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-lg font-bold mb-4 text-gray-800">
                    Clone Journal Data
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Sector *
                        </label>
                        <select
                            value={selectedSector}
                            onChange={(e) => setSelectedSector(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Select Sector</option>
                            {sector.map((item, index) => (
                                <option key={index} value={item}>
                                    {item.charAt(0).toUpperCase() +
                                        item.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            From Year *
                        </label>
                        <select
                            value={fromYear}
                            onChange={(e) => setFromYear(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Select From Year</option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            To Year *
                        </label>
                        <select
                            value={toYear}
                            onChange={(e) => setToYear(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Select To Year</option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsCloneModalOpen(false)}
                            className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                        >
                            Clone
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
function AddBrgyJournalModal({
    setIsModalOpen,
    barangay,
    getJournalData,
    user,
}) {
    const [selectedBarangay, setSelectedBarangay] = useState(user?.user_privilage === 'user' ? user.sector_barangay : "");
    const [selectedYear, setSelectedYear] = useState("");
    const [dataRequirement, setDataRequirement] = useState("");
    const [population, setPopulation] = useState("");
    const [totalMale, setTotalMale] = useState("");
    const [totalFemale, setTotalFemale] = useState("");
    const [sourceOfData, setSourceOfData] = useState("");
    const [remarks, setRemarks] = useState("");
    const [privateStatus, setPrivateStatus] = useState(false);
    const [disableStatus, setDisableStatus] = useState(false);
    const [showRemarks, setShowRemarks] = useState(false);

    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: currentYear + 1 - 1900 + 1 },
        (_, i) => 1900 + i
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedBarangay || !selectedYear || !dataRequirement) {
            alert("Please fill in required fields.");
            return;
        }

        try {
            const response = await axios.post(
                `${API_BASE_URL}createbrgyjournal`,
                {
                    barangay: selectedBarangay,
                    year: selectedYear,
                    data_requirement: dataRequirement,
                    population,
                    total_male: totalMale,
                    total_female: totalFemale,
                    source_of_data: sourceOfData,
                    remarks,
                    private_status: privateStatus,
                    disable_status: disableStatus,
                    show_remarks: showRemarks,
                },
                { withCredentials: true, validateStatus: () => true }
            );

            if (response.data?.status) {
                setIsModalOpen(false);
                getJournalData();
                setDataRequirement("");
                setPopulation("");
                setTotalMale("");
                setTotalFemale("");
                setSourceOfData("");
                setRemarks("");
                setPrivateStatus(false);
                setDisableStatus(false);
                setShowRemarks(false);
            } else {
                alert("Failed to create brgy journal");
            }
        } catch (error) {
            console.error("Error creating brgy journal:", error);
            alert("Error creating brgy journal");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-bold mb-4 text-gray-800">
                    Add New Brgy Journal
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Barangay *
                        </label>
                        <select
                            value={selectedBarangay}
                            onChange={(e) => setSelectedBarangay(e.target.value)}
                            disabled={user?.user_privilage === 'user'}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
                        >
                            <option value="">Select Barangay</option>
                            {barangay.map((item, index) => (
                                <option key={index} value={item.brgy}>
                                    {item.brgy}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0">
                        <label
                            htmlFor="year"
                            className="text-gray-700 font-semibold w-full sm:w-20"
                        >
                            Year *
                        </label>
                        <select
                            id="year"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="flex-grow w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Year</option>
                            {years.reverse().map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Data Requirement *
                        </label>
                        <textarea
                            value={dataRequirement}
                            onChange={(e) => setDataRequirement(e.target.value)}
                            placeholder="Enter data requirement"
                            className="w-full border h-24 border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Population
                        </label>
                        <input
                            type="number"
                            value={population}
                            onChange={(e) => setPopulation(e.target.value)}
                            placeholder="Enter population"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Total Male
                        </label>
                        <input
                            type="number"
                            value={totalMale}
                            onChange={(e) => setTotalMale(e.target.value)}
                            placeholder="Enter total male"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Total Female
                        </label>
                        <input
                            type="number"
                            value={totalFemale}
                            onChange={(e) => setTotalFemale(e.target.value)}
                            placeholder="Enter total female"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Source of Data
                        </label>
                        <input
                            type="text"
                            value={sourceOfData}
                            onChange={(e) => setSourceOfData(e.target.value)}
                            placeholder="Enter source of data"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Remarks
                        </label>
                        <textarea
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            placeholder="Enter remarks"
                            className="w-full border h-24 border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="privateStatus"
                            checked={privateStatus}
                            onChange={(e) => setPrivateStatus(e.target.checked)}
                            className="mr-2"
                        />
                        <label
                            htmlFor="privateStatus"
                            className="text-gray-700 font-semibold"
                        >
                            Private Status
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="disableStatus"
                            checked={disableStatus}
                            onChange={(e) => setDisableStatus(e.target.checked)}
                            className="mr-2"
                        />
                        <label
                            htmlFor="disableStatus"
                            className="text-gray-700 font-semibold"
                        >
                            Disable Status
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="showRemarks"
                            checked={showRemarks}
                            onChange={(e) => setShowRemarks(e.target.checked)}
                            className="mr-2"
                        />
                        <label
                            htmlFor="showRemarks"
                            className="text-gray-700 font-semibold"
                        >
                            Show Remarks
                        </label>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// NEW: Clone Modal Component for Brgy Journal
function CloneBrgyJournalModal({
    setIsCloneModalOpen,
    barangay,
    selectedBarangay: preSelectedBarangay, // Renamed to avoid conflict
    getJournalData,
    user,
}) {
    const [selectedBarangay, setSelectedBarangay] = useState(
        user?.user_privilage === 'user' ? user.sector_barangay : (preSelectedBarangay || "")
    ); // Pre-select current barangay or user's barangay
    const [fromYear, setFromYear] = useState("");
    const [toYear, setToYear] = useState("");

    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: currentYear + 1 - 1900 + 1 },
        (_, i) => 1900 + i
    ).reverse(); // Reverse for recent-first

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedBarangay || !fromYear || !toYear || fromYear === toYear) {
            toast.error(
                "Please fill all fields and ensure 'to year' differs from 'from year'."
            );
            return;
        }

        try {
            const response = await axios.post(
                `${API_BASE_URL}clonebarangaybrgyjournal`,
                {
                    barangay: selectedBarangay,
                    from_year: fromYear,
                    to_year: toYear,
                },
                { withCredentials: true, validateStatus: () => true }
            );

            if (response.data?.status) {
                toast.success(
                    `${response.data.count} records cloned successfully.`
                );
                setIsCloneModalOpen(false);
                getJournalData(); // Refresh table
                setSelectedBarangay(preSelectedBarangay || ""); // Reset to pre-selected
                setFromYear("");
                setToYear("");
            } else {
                toast.error(
                    response.data?.message || "Failed to clone records."
                );
            }
        } catch (error) {
            console.error("Error cloning records:", error);
            toast.error("Error cloning records.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-lg font-bold mb-4 text-gray-800">
                    Clone Brgy Journal Data
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Barangay *
                        </label>
                        <select
                            value={selectedBarangay}
                            onChange={(e) => setSelectedBarangay(e.target.value)}
                            disabled={user?.user_privilage === 'user'}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
                        >
                            <option value="">Select Barangay</option>
                            {barangay.map((item, index) => (
                                <option key={index} value={item.brgy}>
                                    {item.brgy}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            From Year *
                        </label>
                        <select
                            value={fromYear}
                            onChange={(e) => setFromYear(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Select From Year</option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            To Year *
                        </label>
                        <select
                            value={toYear}
                            onChange={(e) => setToYear(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Select To Year</option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsCloneModalOpen(false)}
                            className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                        >
                            Clone
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export { AddJournalModal, CloneJournalModal, AddBrgyJournalModal, CloneBrgyJournalModal };
