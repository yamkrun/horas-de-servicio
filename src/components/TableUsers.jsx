
import React from "react";

export default function TableUsers({ data = [] }) {
  return (
    <div className="overflow-x-auto p-6">
      <table className="min-w-full border border-gray-300 text-left border-collapse">
        <thead className="bg-gray-300 text-black">
          <tr>
            <th className="px-4 py-2 border border-gray-300">Nombre completo</th>
            <th className="px-4 py-2 border border-gray-300">Apellido</th>
            <th className="px-4 py-2 border border-gray-300">Email</th>
            <th className="px-4 py-2 border border-gray-300">Phone</th>
            <th className="px-4 py-2 border border-gray-300">Role</th>
            <th className="px-4 py-2 border border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index} className="hover:bg-blue-100">
              <td className="px-4 py-2 border border-gray-300">
                {user.f_name} {user.m_name}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {user.f_lastname} {user.m_lastname}
              </td>
              <td className="px-4 py-2 border border-gray-300">{user.email}</td>
              <td className="px-4 py-2 border border-gray-300">{user.phone}</td>
              <td className="px-4 py-2 border border-gray-300">{user.role?.name}</td>
              <td className="px-4 py-2 border border-gray-300">{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
