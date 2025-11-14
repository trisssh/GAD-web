import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../conn";
import { Toaster, toast } from "sonner";
import Swal from "sweetalert2";
import PublicTable from "../components/journal/PublicTable";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_BASE_URL;

export default function PublicBrgyJournal() {
  const [filteredData, setFilteredData] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [selectedBarangay, setSelectedBarangay] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [barangay, setBarangay] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [journalData, setJournalData] = useState([]);

  // Fetch barangay data from API
  const getBarangayData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}showbarangays`, {
        withCredentials: true,
        validateStatus: () => true,
      });

      if (response.data?.status && Array.isArray(response.data.data)) {
        const data = response.data.data;
        setBarangay(data);
      } else {
        toast.error("Failed to load barangays.");
      }
    } catch (error) {
      toast.error("Error fetching barangay data.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Fetch public brgy journals
  const getJournalData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}showpublicbrgyjournal`, {
        withCredentials: true,
        validateStatus: () => true,
      });

      if (response.data?.status && Array.isArray(response.data.data)) {
        const flattened = [];
        response.data.data.forEach((yearGroup) => {
          yearGroup.barangays.forEach((barangayGroup) => {
            barangayGroup.entries.forEach((entry) => {
              flattened.push({
                ...entry,
                year: yearGroup.year,
                barangay: barangayGroup.barangay,
              });
            });
          });
        });
        setJournalData(flattened);
      } else {
        toast.error("Failed to load public brgy journal data.");
      }
    } catch (error) {
      toast.error("Error fetching public brgy journal data.");
      console.error(error);
    }
  };

  useEffect(() => {
    getBarangayData();
    getJournalData();
  }, []);

  // NEW: Add this useEffect to automatically apply filters when data or filter states change
  useEffect(() => {
    applyFilters();
  }, [journalData, selectedBarangay, selectedYear, keyword]);

  const applyFilters = () => {
    let filtered = [...journalData];

    if (selectedBarangay) {
      filtered = filtered.filter(
        (item) => item.barangay.toLowerCase() === selectedBarangay.toLowerCase()
      );
    }

    if (selectedYear) {
      filtered = filtered.filter((item) => item.year == selectedYear);
    }

    if (keyword.trim()) {
      filtered = filtered.filter((item) =>
        item.data_requirement?.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    console.log("Applying filters:", {
      filtered,
    });
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
        className="max-h-screen p-5"
        style={{ maxHeight: "80vh" }} // Adjust to fit your layout (e.g., 80vh for 80% of viewport height)
      >
        <div className="font-extrabold text-2xl text-gray-800 mb-3">
          Barangay Journal
        </div>
        <hr className="border-t border-gray-400 w-full mb-4" />

        <div className="grid grid-cols-1 gap-4 w-full sm:p-4 rounded-lg ">
          <InputSection
            selectedBarangay={selectedBarangay}
            setSelectedBarangay={setSelectedBarangay}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            barangay={barangay}
            keyword={keyword}
            setKeyword={setKeyword}
            applyFilters={applyFilters}
          />

          <PublicTable journalData={filteredData} isBarangay={true} />
        </div>
      </div>
    </>
  );
}

function InputSection({
  selectedBarangay,
  setSelectedBarangay,
  selectedYear,
  setSelectedYear,
  barangay,
  keyword,
  setKeyword,
  applyFilters,
}) {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear + 1 - 1900 + 1 },
    (_, i) => 1900 + i
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0">
        <label
          htmlFor="barangay"
          className="text-gray-700 font-semibold w-full sm:w-20"
        >
          Barangay
        </label>
        <select
          id="barangay"
          value={selectedBarangay}
          onChange={(e) => setSelectedBarangay(e.target.value)}
          className="flex-grow w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
