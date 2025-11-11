import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../conn";
import { Toaster, toast } from "sonner";
import Swal from "sweetalert2";
import PublicTable from "../components/journal/PublicTable";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_BASE_URL;

export default function PublicJournal() {
  const [filteredData, setFilteredData] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [selectedSector, setSelectedSector] = useState("");
  const [selectedSubsector, setSelectedSubsector] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [sector, setSector] = useState([]);
  const [subsector, setSubsector] = useState([]);
  const [sectorData, setSectorData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [journalData, setJournalData] = useState([]);

  // Fetch sector and subsector data from API
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
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Fetch public journals
  const getJournalData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}showpublicjournal`);

      if (response.data?.status && Array.isArray(response.data.data)) {
        const flattened = [];
        response.data.data.forEach((yearGroup) => {
          yearGroup.sectors.forEach((sectorGroup) => {
            sectorGroup.sub_sectors.forEach((subSectorGroup) => {
              subSectorGroup.entries.forEach((entry) => {
                flattened.push({
                  ...entry,
                  year: yearGroup.year,
                  sector: sectorGroup.sector,
                  sub_sector: subSectorGroup.sub_sector,
                });
              });
            });
          });
        });
        setJournalData(flattened);
      } else {
        toast.error("Failed to load public journal data.");
      }
    } catch (error) {
      toast.error("Error fetching public journal data.");
      console.error(error);
    }
  };

  useEffect(() => {
    getSectorData();
    getJournalData();
  }, []);

  // NEW: Add this useEffect to automatically apply filters when data or filter states change
  useEffect(() => {
    applyFilters();
  }, [journalData, selectedSector, selectedSubsector, selectedYear, keyword]);

  const applyFilters = () => {
    let filtered = [...journalData];

    if (selectedSector) {
      filtered = filtered.filter(
        (item) => item.sector.toLowerCase() === selectedSector.toLowerCase()
      );
    }

    if (selectedSubsector) {
      filtered = filtered.filter(
        (item) =>
          item.sub_sector &&
          item.sub_sector.toLowerCase() === selectedSubsector.toLowerCase()
      );
    }

    if (selectedYear) {
      filtered = filtered.filter(
        (item) => String(item.year) === String(selectedYear)
      );
    }

    if (keyword.trim()) {
      filtered = filtered.filter((item) =>
        item.data_requirement?.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    setFilteredData(filtered);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      {/* NEW: Wrapper for scrollable content (title + filters + table). Adjust height as needed. */}
      <div
        className="max-h-screen"
        style={{ maxHeight: "80vh" }} // Adjust to fit your layout (e.g., 80vh for 80% of viewport height)
      >
        <div className="font-extrabold text-2xl text-gray-800 mb-3">
          Public Journal
        </div>
        <hr className="border-t border-gray-400 w-full mb-4" />

        <div className="grid grid-cols-1 gap-4 w-full sm:p-4 bg-white rounded-lg shadow-sm">
          <InputSection
            selectedSector={selectedSector}
            setSelectedSector={setSelectedSector}
            selectedSubsector={selectedSubsector}
            setSelectedSubsector={setSelectedSubsector}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            sector={sector}
            subsector={subsector}
            keyword={keyword}
            setKeyword={setKeyword}
            applyFilters={applyFilters}
          />

          <PublicTable journalData={filteredData} />
        </div>
      </div>
    </>
  );
}

function InputSection({
  selectedSector,
  setSelectedSector,
  selectedSubsector,
  setSelectedSubsector,
  selectedYear,
  setSelectedYear,
  sector,
  subsector,
  keyword,
  setKeyword,
  applyFilters,
}) {
  const filteredSubsectors = subsector
    .filter(([sec]) => sec === selectedSector)
    .map(([, sub]) => sub);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear + 1 - 1900 + 1 },
    (_, i) => 1900 + i
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0">
        <label
          htmlFor="sector"
          className="text-gray-700 font-semibold w-full sm:w-20"
        >
          Sector
        </label>
        <select
          id="sector"
          value={selectedSector}
          onChange={(e) => {
            setSelectedSector(e.target.value);
            setSelectedSubsector("");
          }}
          className="flex-grow w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Sector</option>
          {sector.map((item, index) => (
            <option key={index} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0">
        <label
          htmlFor="subsector"
          className="text-gray-700 font-semibold w-full sm:w-20"
        >
          Sub Sector
        </label>
        <select
          id="subsector"
          value={selectedSubsector}
          onChange={(e) => setSelectedSubsector(e.target.value)}
          disabled={!selectedSector}
          className="flex-grow w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
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
          Year
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
      <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
        <label
          htmlFor="keyword"
          className="text-gray-700 font-semibold w-full sm:w-20"
        >
          Keyword
        </label>
        <input
          type="text"
          id="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-grow w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter keyword"
        />
      </div>
    </div>
  );
}
