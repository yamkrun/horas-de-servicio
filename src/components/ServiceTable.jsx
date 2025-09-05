
import React from "react";
export function ServiceTable({ servicios = [] }) {

  
  return (
    <div className="p-6 ">
      <div className="overflow-x-auto ">
        <table className="w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-400">
              <th className="border border-gray-300 px-2 py-3  text-black font-medium">
                ID
              </th>
              <th className="border border-gray-300 px-4 py-3  text-black font-medium">
                Categoría
              </th>
              <th className="border border-gray-300 px-4 py-3  text-black font-medium">
                Horas
              </th>
              <th className="border border-gray-300 px-4 py-3  text-black font-medium">
                Fecha
              </th>
              <th className="border border-gray-300 px-4 py-3  text-black font-medium">
                Status
              </th>
              <th className="border border-gray-300 px-4 py-3  text-black font-medium">
                Ver Evidencia
              </th>
              <th className="border border-gray-300 px-4 py-3  text-black font-medium">
                Modificar
              </th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((servicio) => (
              <tr key={servicio.id} className="hover:bg-gray-200">
                <td className="border border-gray-300 px-4 py-3 text-black">
                  {servicio.id}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-black">
                  {servicio.category?.name || 'Sin categoría'}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-black">
                  {servicio.amount_approved || 0}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-black">
                  {new Date(servicio.created_at).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-black">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      servicio.status === "Approved"
                        ? "bg-green-300 text-black"
                        : servicio.status === "Pending"
                        ? "bg-yellow-300 text-black"
                        : servicio.status === "Rejected"
                        ? "bg-red-400 text-black"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    {servicio.status}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 flex justify-center py-3 text-black">
                  <button className="bg-gray-200 hover:bg-gray-300 text-black flex px-3 py-1 rounded border border-gray-400 text-sm">
                    Ver PDF
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-black">
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-black"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="m18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
