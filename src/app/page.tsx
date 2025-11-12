"use client";

import { useState } from "react";
import { initialData } from "./data";

export default function Home() {
  const [data, setData] = useState(initialData);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter data based on search input
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const numberOfPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= numberOfPages) {
      setCurrentPage(page);
    }
  };

  // Reset to page 1 when search term changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handle sorting by age
  const handleSort = () => {
    const sorted = [...data].sort((a, b) =>
      sortOrder === "asc" ? a.age - b.age : b.age - a.age
    );
    setData(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="border border-gray-300 rounded-md px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <table className="border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border border-black-300">S.No</th>
            <th className="px-4 py-2 border border-black-300">Name</th>
            <th
              onClick={handleSort}
              className="px-4 py-2 border border-black-300 cursor-pointer"
            >
              Age {sortOrder === "asc" ? "↑" : "↓"}
            </th>
            <th className="px-4 py-2 border border-gray-300">Email</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map(({ sno, name, age, email }) => (
              <tr key={sno} className="hover:bg-black-50">
                <td className="px-4 py-2 border border-gray-300 text-center">
                  {sno}
                </td>
                <td className="px-4 py-2 border border-gray-300">{name}</td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  {age}
                </td>
                <td className="px-4 py-2 border border-gray-300">{email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="text-center py-4 text-gray-500 border border-gray-300"
              >
                No matching records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {filteredData.length > 0 && (
        <div className="flex gap-2 items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {[...Array(numberOfPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`border rounded-md px-4 py-2 ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white border-blue-500"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === numberOfPages}
            className="border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      <p className="text-sm text-gray-600">
        Showing {paginatedData.length > 0 ? startIndex + 1 : 0} to{" "}
        {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
        {filteredData.length} results
      </p>
    </div>
  );
}
