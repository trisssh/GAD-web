import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function PublicTable({ journalData, isBarangay = false }) {
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
        <h2 className="text-xl font-semibold text-gray-800">Journal Data</h2>
        <div className="flex space-x-2">
          <button
            onClick={handlePrint}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm"
          >
            Print / Save as PDF
          </button>
        </div>
      </div>

      {/* 👇 Attach ref here */}
      <div ref={tableRef}>
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-[#13B27F] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Year</th>
              <th className="px-4 py-2 text-left">
                {isBarangay ? "Barangay" : "Sector"}
              </th>
              {!isBarangay && (
                <th className="px-4 py-2 text-left">Sub Sector</th>
              )}
              <th className="px-4 py-2 text-left">Data Requirement</th>
              <th className="px-4 py-2 text-center">Population</th>
              <th className="px-4 py-2 text-center">Male</th>
              <th className="px-4 py-2 text-center">Female</th>
              <th className="px-4 py-2 text-left">Source</th>
              <th className="px-4 py-2 text-left">Remarks</th>
              {/* <th className="px-4 py-2 text-left hide-on-print">
                                Created By
                            </th> */}
            </tr>
          </thead>
          <tbody>
            {groupedData.map((entry) => (
              <JournalTableRow
                key={entry.id}
                entry={entry}
                isBarangay={isBarangay}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ✅ Updated to optionally hide “Action” column during print
function JournalTableRow({ entry, isBarangay = false }) {
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
        {entry.population}
      </td>
      <td className="border border-gray-200 px-4 py-2 text-center">
        {entry.total_male}
      </td>
      <td className="border border-gray-200 px-4 py-2 text-center">
        {entry.total_female}
      </td>
      <td className="border border-gray-200 px-4 py-2">
        {entry.source_of_data}
      </td>
      <td className="border border-gray-200 px-4 py-2">{entry.remarks}</td>
      {/* <td className="border border-gray-200 px-4 py-2  hide-on-print">
                {entry.created_by}
            </td> */}
    </tr>
  );
}

function groupRows(data, isBarangay = false) {
  const sortedData = [...data].sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    if (isBarangay) {
      if (a.barangay !== b.barangay)
        return a.barangay.localeCompare(b.barangay);
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

    const yearSectorKey = `${entry.year}-${
      isBarangay ? entry.barangay : entry.sector
    }`;
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
    const sectorData = sectorMap.get(
      `${entry.year}-${isBarangay ? entry.barangay : entry.sector}`
    );
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
      sectorRowSpan: index === sectorData.firstIndex ? sectorData.count : 0,
      subSectorRowSpan: isBarangay
        ? 0
        : index === subSectorData.firstIndex
        ? subSectorData.count
        : 0,
    };
  });
}
