import React, { useState } from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import ModalServices from "./ModalServices";
import { api } from "../libs/axios";

export function ServiceTable({ servicios = [], mode = "student" }) {
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [servicesList, setServicesList] = useState(servicios || []);
  const [error, setError] = useState(null);

  const handleOpenModal = (servicio) => {
    setSelectedService(servicio);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  const handleUpdateService = async (updatedService) => {
    try {
      await api.put(`/services/${updatedService.id}`, updatedService);
      setServicesList((prev) =>
        prev.map((s) => (s.id === updatedService.id ? updatedService : s))
      );
    } catch (err) {
      console.error("Error al actualizar servicio:", err);
      setError("No se pudo actualizar el servicio.");
    }
  };

  return (
    <div className="overflow-x-auto p-6">
      {error && <p className="m-4 text-red-500">{error}</p>}

      <table className="w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-400">
            <th className="border border-gray-300 px-4 py-3 text-black font-medium">
              Categoría
            </th>
            <th className="border border-gray-300 px-4 py-3 text-black font-medium">
              Horas reportadas
            </th>
            <th className="border border-gray-300 px-4 py-3 text-black font-medium">
              Horas aprobadas
            </th>
            <th className="border border-gray-300 px-4 py-3 text-black font-medium">
              Fecha
            </th>
            <th className="border border-gray-300 px-4 py-3 text-black font-medium">
              Status
            </th>
            <th className="border border-gray-300 px-4 py-3 text-black font-medium">
              Evidencia
            </th>
            <th className="border border-gray-300 px-4 py-3 text-black font-medium">
              {mode === "student" ? "Modificar" : "Aprobar"}
            </th>
          </tr>
        </thead>
        <tbody>
          {servicesList.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="border border-gray-300 px-4 py-3 text-black"
              >
                No hay servicios registrados
              </td>
            </tr>
          ) : (
            servicesList.map((servicio) => (
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
                  {servicio.created_at
                    ? new Date(servicio.created_at).toLocaleDateString()
                    : "-"}
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
                    onClick={() =>
                      window.open(
                        `${import.meta.env.VITE_API_URL}/evidence/${servicio.id}`,
                        "_blank"
                      )
                    }
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    title="Ver PDF"
                  >
                    <AiOutlineFilePdf size={22} />
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-black">
                  <button
                    className={`text-2xl ${
                      servicio.status === "Approved"
                        ? "text-green-700 cursor-not-allowed"
                        : "text-blue-600 hover:text-blue-800"
                    }`}
                    onClick={() =>
                      servicio.status !== "Approved" &&
                      handleOpenModal(servicio)
                    }
                    disabled={servicio.status === "Approved"}
                    title={
                      servicio.status === "Approved"
                        ? "Servicio ya aprobado"
                        : mode === "student"
                          ? "Modificar servicio"
                          : "Aprobar servicio"
                    }
                  >
                    <FaCheckCircle />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showModal && selectedService && (
        <ModalServices
          servicio={selectedService}
          onClose={handleCloseModal}
          onUpdate={handleUpdateService}
        />
      )}
    </div>
  );
}
