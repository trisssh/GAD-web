import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { API_BASE_URL, STORAGE_BASE_URL } from "../../conn";
import { Toaster, toast } from "sonner";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_BASE_URL;

export default function PublicDocumentTable({
  sectorData,
  selectedSector,
  selectedSubsector,
  selectedGender,
  keyword,
}) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await axios.get("showpublicdocuments");
      if (response.data.status) setDocuments(response.data.data);
      else toast.error("Failed to load documents.");
    } catch {
      toast.error("Server error while loading documents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // ✅ Live filter (client-side only)
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSector =
        !selectedSector ||
        doc.sector_name?.toLowerCase() === selectedSector.toLowerCase();
      const matchesSubsector =
        !selectedSubsector ||
        doc.sub_sector_name?.toLowerCase() === selectedSubsector.toLowerCase();
      const matchesGender =
        !selectedGender ||
        doc.gender?.toLowerCase() === selectedGender.toLowerCase();
      const matchesKeyword =
        !keyword ||
        doc.document_title?.toLowerCase().includes(keyword.toLowerCase());
      return (
        matchesSector && matchesSubsector && matchesGender && matchesKeyword
      );
    });
  }, [documents, selectedSector, selectedSubsector, selectedGender, keyword]);

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4 mt-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Public Document Data
        </h2>
      </div>

      {loading ? (
        <p className="text-center py-6 text-gray-500">Loading...</p>
      ) : filteredDocuments.length === 0 ? (
        <p className="text-center py-6 text-gray-500">No results.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-[#13B27F] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Sector</th>
              <th className="px-4 py-2 text-left">Sub Sector</th>
              <th className="px-4 py-2 text-left">Gender</th>
              <th className="px-4 py-2 text-center">Author</th>
              {/* <th className="px-4 py-2 text-center">Private</th>
              <th className="px-4 py-2 text-center">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((entry) => (
              <PublicDocumentTableRow key={entry.id} entry={entry} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function PublicDocumentTableRow({ entry }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <tr className="hover:bg-gray-50 transition text-sm">
      <td className="border border-gray-200 px-4 py-2">{entry.date}</td>
      <td className="border border-gray-200 px-4 py-2">
        {entry.document_title}
      </td>
      <td className="border border-gray-200 px-4 py-2">{entry.sector_name}</td>
      <td className="border border-gray-200 px-4 py-2">
        {entry.sub_sector_name || "—"}
      </td>
      <td className="border border-gray-200 px-4 py-2">{entry.gender}</td>
      <td className="border border-gray-200 px-4 py-2 text-center">
        {entry.document_author}
      </td>
      {/* <td className="border border-gray-200 px-4 py-2 text-center">
        {entry.private_status ? "✅" : "❌"}
      </td>
      <td className="border border-gray-200 px-4 py-2 text-center relative">
        <button
          onClick={toggleDropdown}
          className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md"
        >
          Action ▾
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <a
              href={STORAGE_BASE_URL + entry.document_path}
              target="_blank"
              className="block w-full text-left px-4 py-2 hover:bg-blue-100 text-blue-700"
              onClick={() => setIsDropdownOpen(false)}
            >
              View
            </a>
          </div>
        )}
      </td> */}
    </tr>
  );
}
