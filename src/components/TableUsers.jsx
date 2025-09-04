import React from "react";

export default function TableUsers() {
  return (
    <div class="overflow-x-auto p-6">
      <table class="min-w-full border border-gray-300 text-left border-collapse">
        <thead class="bg-gray-300 text-black">
          <tr>
            <th class="px-4 py-2 border border-gray-300">Nombre completo</th>
            <th class="px-4 py-2 border border-gray-300">Apellido</th>
            <th class="px-4 py-2 border border-gray-300">Email</th>
            <th class="px-4 py-2 border border-gray-300">Phone</th>
            <th class="px-4 py-2 border border-gray-300">Role</th>
            <th class="px-4 py-2 border border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => {
            <tr key={index} class="hover:bg-blue-100">
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
