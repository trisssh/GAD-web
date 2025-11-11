import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../conn";
import { Toaster, toast } from "sonner";
import PublicDocumentTable from "../components/documents/PublicDocumentTable";

export default function PublicDocuments() {
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedSubsector, setSelectedSubsector] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sector, setSector] = useState([]);
  const [subsector, setSubsector] = useState([]);
  const [sectorData, setSectorData] = useState([]);

  useEffect(() => {
    getSectorData();
  }, []);

  const getSectorData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}sectorWithSubsector`, {
        withCredentials: true,
        validateStatus: () => true,
      });

      if (response.data?.status && Array.isArray(response.data.data)) {
        const data = response.data.data;
        setSectorData(data);
        setSector(data.map((item) => item.sector));
        const subs = data.flatMap((item) =>
          item.subsector.map((sub) => [item.sector, sub])
        );
        setSubsector(subs);
      } else {
        toast.error("Failed to load sectors.");
      }
    } catch (error) {
      toast.error("Error fetching sector data.");
      console.error(error);
    }
  };

  return (
    <>
      <div className="font-extrabold text-2xl text-gray-800 mb-3">
        Public Documents
      </div>
      <hr className="border-t border-gray-400 w-full mb-4" />

      <div className="grid grid-cols-1 gap-4 w-full sm:p-4 bg-white rounded-lg shadow-sm">
        <InputSection
          selectedSector={selectedSector}
          setSelectedSector={setSelectedSector}
          selectedSubsector={selectedSubsector}
          setSelectedSubsector={setSelectedSubsector}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          keyword={keyword}
          setKeyword={setKeyword}
          sector={sector}
          subsector={subsector}
        />
        <PublicDocumentTable
          sectorData={sectorData}
          selectedSector={selectedSector}
          selectedSubsector={selectedSubsector}
          selectedGender={selectedGender}
          keyword={keyword}
        />
      </div>
    </>
  );
}

function InputSection({
  selectedSector,
  setSelectedSector,
  selectedSubsector,
  setSelectedSubsector,
  selectedGender,
  setSelectedGender,
  keyword,
  setKeyword,
  sector,
  subsector,
}) {
  const filteredSubsectors = subsector
    .filter(([sec]) => sec === selectedSector)
    .map(([, sub]) => sub);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
      {/* Sector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
        <label className="text-gray-700 font-semibold w-full sm:w-20">
          Sector
        </label>
        <select
          value={selectedSector}
          onChange={(e) => {
            setSelectedSector(e.target.value);
            setSelectedSubsector("");
          }}
          className="flex-grow px-4 py-2 text-sm border rounded-md"
        >
          <option value="">All</option>
          {sector.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Sub Sector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
        <label className="text-gray-700 font-semibold w-full sm:w-20">
          Sub Sector
        </label>
        <select
          value={selectedSubsector}
          onChange={(e) => setSelectedSubsector(e.target.value)}
          disabled={!selectedSector}
          className="flex-grow px-4 py-2 text-sm border rounded-md disabled:bg-gray-200"
        >
          <option value="">All</option>
          {filteredSubsectors.map((sub, index) => (
            <option key={index} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </div>

      {/* Gender */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
        <label className="text-gray-700 font-semibold w-full sm:w-20">
          Gender
        </label>
        <select
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
          className="flex-grow px-4 py-2 text-sm border rounded-md"
        >
          <option value="">Select Gender</option>
          <option value="All">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* Keyword */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col sm:flex-row sm:items-center sm:space-x-2">
        <label className="text-gray-700 font-semibold w-full sm:w-20">
          Keyword
        </label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-grow px-4 py-2 text-sm border rounded-md"
          placeholder="Search title..."
        />
      </div>
    </div>
  );
}
