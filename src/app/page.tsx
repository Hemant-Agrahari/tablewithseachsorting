'use client';

import { useState } from "react";

type DataItem = {
  sno: number;
  name: string;
  age: number;
  email: string;
};

export default function Home() {
  const initialData: DataItem[] = [
    { sno: 1, name: "John Doe", age: 22, email: "john.doe@example.com" },
    { sno: 2, name: "Jane Doe", age: 26, email: "jane.doe@example.com" },
    { sno: 3, name: "Jim Doe", age: 26, email: "jim.doe@example.com" },
    { sno: 4, name: "Jill Doe", age: 22, email: "jill.doe@example.com" },
    { sno: 5, name: "Jack Doe", age: 30, email: "jack.doe@example.com" },
    { sno: 6, name: "Jake Doe", age: 28, email: "jake.doe@example.com" },
    { sno: 7, name: "Jess Doe", age: 24, email: "jess.doe@example.com" },
    { sno: 8, name: "Judy Doe", age: 29, email: "judy.doe@example.com" },
  ];

  const [data, setData] = useState(initialData);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");

  // Handle sorting by age
  const handleSort = () => {
    const sorted = [...data].sort((a, b) =>
      sortOrder === "asc" ? a.age - b.age : b.age - a.age
    );
    setData(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Filter data based on search input
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <table className="border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border border-gray-300">S.No</th>
            <th className="px-4 py-2 border border-gray-300">Name</th>
            <th
              onClick={handleSort}
              className="px-4 py-2 border border-gray-300 cursor-pointer"
            >
              Age {sortOrder === "asc" ? "↑" : "↓"}
            </th>
            <th className="px-4 py-2 border border-gray-300">Email</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map(({ sno, name, age, email }) => (
              <tr key={sno} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300 text-center">{sno}</td>
                <td className="px-4 py-2 border border-gray-300">{name}</td>
                <td className="px-4 py-2 border border-gray-300 text-center">{age}</td>
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
    </div>
  );
}
