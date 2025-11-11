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

  const handleSort = () => {
    const sorted = [...data].sort((a, b) =>
      sortOrder === "asc" ? a.age - b.age : b.age - a.age
    );
    setData(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <table className="border border-gray-300">
        <thead className="bg-black-100">
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
          {data.map(({ sno, name, age, email }) => (
            <tr key={sno} className="">
              <td className="px-4 py-2 border border-gray-300 text-center">{sno}</td>
              <td className="px-4 py-2 border border-gray-300">{name}</td>
              <td className="px-4 py-2 border border-gray-300 text-center">{age}</td>
              <td className="px-4 py-2 border border-gray-300">{email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
