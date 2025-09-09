import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
export function ServiceTable({ servicios = [], mode = "student" }) {
  const navigate = useNavigate();
  const handleAddService = () => {
    navigate("/student/create-service");
  };

  return (
    <div className="p-6 ">
      {mode === "student" ? (
        <div className="mb-4 text-right">
          <button
            onClick={handleAddService}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Agregar Servicio
          </button>
        </div>
      ) : (
        <div></div>
      )}
      <div className="overflow-x-auto ">
        <table className="w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-400">
              <th className="border border-gray-300 px-4 py-3  text-black font-medium">
                Categoría
              </th>
              <th className="border border-gray-300 px-4 py-3  text-black font-medium">
                Horas reportadas
              </th>
              <th className="border border-gray-300 px-4 py-3  text-black font-medium">
                Horas aprobadas
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
                {mode === "student" ? "Modificar" : "Aprobar"}
              </th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((servicio) => (
              <tr key={servicio.id} className="hover:bg-gray-200">
                <td className="border border-gray-300 px-4 py-3 text-black">
                  {servicio.category?.name || "Sin categoría"}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-black">
                  {servicio.amount_reported || 0}
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
                <td className="border border-gray-300 px-4 py-3 text-black">
                  <button
                    onClick={() => {
                      navigate(`/student/evidence/${servicio.id}`);
                    }}
                    className="bg-gray-200 hover:bg-gray-300 text-black flex m-auto px-3 py-1 rounded border border-gray-400 text-sm"
                  >
                    Ver PDF
                  </button>
                </td>
                {mode === "student" ? (
                  <td className="border border-gray-300 px-4 py-3 text-black">
                    <button

                      className={`p-1 rounded ${servicio.status === 'Approved' ? 'bg-gray-300 cursor-not-allowed' : 'hover:bg-gray-200'}`}

                      className={`p-1 rounded ${
                        servicio.status === "Approved"
                          ? "bg-gray-300 cursor-not-allowed"
                          : "hover:bg-gray-200"
                      }`}

                      onClick={() => {
                        if (servicio.status !== "Approved") {
                          navigate(`/student/edit-service/${servicio.id}`);
                        }
                      }}

                      disabled={servicio.status === 'Approved'}
                      title={servicio.status === 'Approved' ? 'No puedes modificar un servicio aprobado' : 'Modificar'}

                      disabled={servicio.status === "Approved"}
                      title={
                        servicio.status === "Approved"
                          ? "No puedes modificar un servicio aprobado"
                          : "Modificar"
                      }

                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={
                          servicio.status === "Approved"
                            ? "#A0A0A0"
                            : "currentColor"
                        }
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={
                          servicio.status === "Approved"
                            ? "text-gray-400"
                            : "text-black"
                        }
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="m18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                  </td>
                ) : (
                  <td className="border border-gray-300 px-4 py-3 text-2xl text-green-700">
                    <button>
                      <FaCheckCircle />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
