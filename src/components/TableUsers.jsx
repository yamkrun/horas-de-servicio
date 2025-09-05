import React from "react";

export default function TableUsers({ data }) {
  return (
    <div class="overflow-x-auto p-6">
      <table class=" w-full border-collapse border border-gray-300 text-center">
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
          {data.map((user, index) => {
            <tr key={index} class="hover:bg-gray-200">
              <td class="px-4 py-2 border border-gray-300">
                {user.f_name}+{user.m_name}
              </td>
              <td class="px-4 py-2 border border-gray-300">
                {user.f_lastname}
                {user.m_lastname}
              </td>
              <td class="px-4 py-2 border border-gray-300">{user.email}</td>
              <td class="px-4 py-2 border border-gray-300">{user.phone}</td>
              <td class="px-4 py-2 border border-gray-300">{user.role.name}</td>
              <td class="px-4 py-2 border border-gray-300">{user.status}</td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}
