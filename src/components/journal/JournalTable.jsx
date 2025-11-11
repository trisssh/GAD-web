import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function JournalTable({
    journalData,
    editedData,
    handleInputChange,
    handleCheckboxChange,
    handleDelete,
    handleSave,
    isModalOpen,
    setIsModalOpen,
    isCloneModalOpen,
    setIsCloneModalOpen,
    selectedSector,
    isBarangay = false, // New prop to indicate if it's barangay journal
}) {
    const groupedData = groupRows(journalData, isBarangay);

    // 👇 create a reference to the table for printing
    const tableRef = useRef();

    // 👇 define the print handler
    const handlePrint = useReactToPrint({
        contentRef: tableRef, // ✅ important
        documentTitle: "Journal Data",
        removeAfterPrint: true,
    });

    return (
        <div className="bg-white rounded-xl shadow-md p-4 mt-6 relative overflow-y-auto max-h-[60vh]">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    Journal Data
                </h2>
                <div className="flex space-x-2">
                    <button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm"
                    >
                        Save Changes
                    </button>

                    <button
                        onClick={handlePrint}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm"
                    >
                        Print / Save as PDF
                    </button>

                    <button
                        onClick={() => setIsCloneModalOpen(true)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm"
                    >
                        + Clone Journal
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm"
                    >
                        + Add Journal
                    </button>
                </div>
            </div>

            {/* 👇 Attach ref here */}
            <div ref={tableRef}>
                <table className="min-w-full border border-gray-300 rounded-lg">
                    <thead className="bg-[#13B27F] text-white">
                        <tr>
                            <th className="px-4 py-2 text-left">Year</th>
                            <th className="px-4 py-2 text-left">{isBarangay ? "Barangay" : "Sector"}</th>
                            {!isBarangay && <th className="px-4 py-2 text-left">Sub Sector</th>}
                            <th className="px-4 py-2 text-left">
                                Data Requirement
                            </th>
                            <th className="px-4 py-2 text-center">
                                Population
                            </th>
                            <th className="px-4 py-2 text-center">Male</th>
                            <th className="px-4 py-2 text-center">Female</th>
                            <th className="px-4 py-2 text-left">Source</th>
                            <th className="px-4 py-2 text-left">Remarks</th>
                            <th className="px-4 py-2 text-left">Created By</th>
                            <th className="px-4 py-2 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupedData.map((entry) => (
                            <JournalTableRow
                                key={entry.id}
                                entry={entry}
                                handleInputChange={handleInputChange}
                                handleCheckboxChange={handleCheckboxChange}
                                handleDelete={handleDelete}
                                editedData={editedData}
                                isBarangay={isBarangay}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ✅ Updated to make Population, Male, Female, Source, Remarks editable
function JournalTableRow({
    entry,
    handleInputChange,
    handleCheckboxChange,
    handleDelete,
    editedData,
    forPrint,
    isBarangay = false,
}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <tr className="hover:bg-gray-50 transition text-sm">
            {entry.yearShow && (
                <td
                    rowSpan={entry.yearRowSpan}
                    className="border border-gray-200 px-4 py-2"
                >
                    {entry.year}
                </td>
            )}
            {entry.sectorShow && (
                <td
                    rowSpan={entry.sectorRowSpan}
                    className="border border-gray-200 px-4 py-2"
                >
                    {isBarangay ? entry.barangay : entry.sector}
                </td>
            )}
            {!isBarangay && entry.subSectorShow && (
                <td
                    rowSpan={entry.subSectorRowSpan}
                    className="border border-gray-200 px-4 py-2"
                >
                    {entry.sub_sector || "—"}
                </td>
            )}
            <td className="border border-gray-200 px-4 py-2">
                {entry.data_requirement}
            </td>
            <td className="border border-gray-200 px-4 py-2 text-center">
                <input
                    type="number"
                    value={editedData[entry.id]?.population ?? entry.population}
                    onChange={(e) =>
                        handleInputChange(
                            entry.id,
                            "population",
                            e.target.value
                        )
                    }
                    className="w-full text-center border-none bg-transparent focus:outline-none"
                />
            </td>
            <td className="border border-gray-200 px-4 py-2 text-center">
                <input
                    type="number"
                    value={editedData[entry.id]?.total_male ?? entry.total_male}
                    onChange={(e) =>
                        handleInputChange(
                            entry.id,
                            "total_male",
                            e.target.value
                        )
                    }
                    className="w-full text-center border-none bg-transparent focus:outline-none"
                />
            </td>
            <td className="border border-gray-200 px-4 py-2 text-center">
                <input
                    type="number"
                    value={
                        editedData[entry.id]?.total_female ?? entry.total_female
                    }
                    onChange={(e) =>
                        handleInputChange(
                            entry.id,
                            "total_female",
                            e.target.value
                        )
                    }
                    className="w-full text-center border-none bg-transparent focus:outline-none"
                />
            </td>
            <td className="border border-gray-200 px-4 py-2">
                <input
                    type="text"
                    value={
                        editedData[entry.id]?.source_of_data ??
                        entry.source_of_data
                    }
                    onChange={(e) =>
                        handleInputChange(
                            entry.id,
                            "source_of_data",
                            e.target.value
                        )
                    }
                    className="w-full border-none bg-transparent focus:outline-none"
                />
            </td>
            <td className="border border-gray-200 px-4 py-2">
                <textarea
                    value={editedData[entry.id]?.remarks ?? entry.remarks}
                    onChange={(e) =>
                        handleInputChange(entry.id, "remarks", e.target.value)
                    }
                    className="w-full border-none bg-transparent focus:outline-none resize-none"
                    rows="2"
                />
            </td>
            <td className="border border-gray-200 px-4 py-2">
                {entry.created_by}
            </td>

            {/* Hide actions when printing */}
            {!forPrint && (
                <td className="border border-gray-200 px-4 py-2 text-center relative">
                    <button
                        onClick={toggleDropdown}
                        className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md text-sm font-medium"
                    >
                        Action ▾
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <div className="py-1">
                                <label className="flex items-center px-4 py-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={entry.private_status}
                                        onChange={(e) =>
                                            handleCheckboxChange(
                                                entry.id,
                                                "private_status",
                                                e.target.checked
                                            )
                                        }
                                        className="mr-2"
                                    />
                                    Private
                                </label>
                                <button
                                    onClick={() => {
                                        setIsDropdownOpen(false);
                                        handleDelete(entry.id);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </td>
            )}
        </tr>
    );
}

function groupRows(data, isBarangay = false) {
    const sortedData = [...data].sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        if (isBarangay) {
            if (a.barangay !== b.barangay) return a.barangay.localeCompare(b.barangay);
        } else {
            if (a.sector !== b.sector) return a.sector.localeCompare(b.sector);
            if (a.sub_sector !== b.sub_sector)
                return (a.sub_sector || "").localeCompare(b.sub_sector || "");
        }
        return a.data_requirement.localeCompare(b.data_requirement);
    });

    const yearMap = new Map();
    const sectorMap = new Map();
    const subSectorMap = new Map();

    sortedData.forEach((entry, index) => {
        if (!yearMap.has(entry.year))
            yearMap.set(entry.year, { count: 0, firstIndex: index });
        yearMap.get(entry.year).count++;

        const yearSectorKey = `${entry.year}-${isBarangay ? entry.barangay : entry.sector}`;
        if (!sectorMap.has(yearSectorKey))
            sectorMap.set(yearSectorKey, { count: 0, firstIndex: index });
        sectorMap.get(yearSectorKey).count++;

        if (!isBarangay) {
            const subSectorKey = `${entry.year}-${entry.sector}-${
                entry.sub_sector || ""
            }`;
            if (!subSectorMap.has(subSectorKey))
                subSectorMap.set(subSectorKey, { count: 0, firstIndex: index });
            subSectorMap.get(subSectorKey).count++;
        }
    });

    return sortedData.map((entry, index) => {
        const yearData = yearMap.get(entry.year);
        const sectorData = sectorMap.get(`${entry.year}-${isBarangay ? entry.barangay : entry.sector}`);
        let subSectorData = null;
        if (!isBarangay) {
            subSectorData = subSectorMap.get(
                `${entry.year}-${entry.sector}-${entry.sub_sector || ""}`
            );
        }

        return {
            ...entry,
            yearShow: index === yearData.firstIndex,
            sectorShow: index === sectorData.firstIndex,
            subSectorShow: isBarangay ? false : index === subSectorData.firstIndex,
            yearRowSpan: index === yearData.firstIndex ? yearData.count : 0,
            sectorRowSpan:
                index === sectorData.firstIndex ? sectorData.count : 0,
            subSectorRowSpan:
                isBarangay ? 0 : (index === subSectorData.firstIndex ? subSectorData.count : 0),
        };
    });
}
