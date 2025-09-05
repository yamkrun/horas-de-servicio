import React from "react";

export default function TableUsers({ data, filterRole }) {
  const filteredData = filterRole
    ? data.filter((user) => user.role.name === filterRole)
    : data;
  return (
    <div className="overflow-x-auto p-6">
      <table className=" w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-400">
            <th className="border border-gray-300 px-2 py-3  text-black font-medium">
              ID
            </th>
            <th className="border border-gray-300 px-4 py-3  text-black font-medium">
              Nombre completo
            </th>
            <th className="border border-gray-300 px-4 py-3  text-black font-medium">
              Email
            </th>
            <th className="border border-gray-300 px-4 py-3  text-black font-medium">
              Phone
            </th>
            <th className="border border-gray-300 px-4 py-3  text-black font-medium">
              Role
            </th>
            <th className="border border-gray-300 px-4 py-3  text-black font-medium">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user, index) => (
            <tr key={index} className="hover:bg-gray-200">
              <td className="px-4 py-2 border border-gray-300">{user.id}</td>
              <td className="px-4 py-2 border border-gray-300">
                {user.full_name}
              </td>
              <td className="px-4 py-2 border border-gray-300">{user.email}</td>
              <td className="px-4 py-2 border border-gray-300">{user.phone}</td>
              <td className="px-4 py-2 border border-gray-300">
                {user.role.name}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {user.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
