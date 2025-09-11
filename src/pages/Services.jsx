import { useState, useEffect } from "react";
import { api } from "../libs/axios";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import ModalServices from "../components/ModalServices";

export default function Services() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    api
      .get("/services")
      .then((res) => {
        setServicios(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar los servicios");
        setLoading(false);
      });
  }, []);

  const handleOpenDetails = (servicio) => {
    setSelectedService(servicio);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const handleServiceUpdate = (updatedService) => {
    setServicios((prevServicios) =>
      prevServicios.map((serv) =>
        String(serv.id) === String(updatedService.id) ? updatedService : serv
      )
    );
  };

  const filteredServicios = servicios.filter((servicio) => {
    const term = searchTerm.toLowerCase();
    return (
      servicio.id.toString().includes(term) ||
      servicio.user?.full_name?.toLowerCase().includes(term) ||
      servicio.category?.name?.toLowerCase().includes(term) ||
      servicio.status?.toLowerCase().includes(term)
    );
  });

  if (loading) return <p className="m-6">Cargando servicios...</p>;
  if (error) return <p className="m-6 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen max-w-screen">
      <h1 className="text-2xl font-semibold my-6">Listado de Servicios</h1>
      <div className="flex border bg-white border-gray-300 rounded-lg items-center gap-4 w-full max-w-2xl mb-6">
        <input
          type="text"
          placeholder="Buscar por ID, estudiante, categoría o estado..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 pl-4 py-2 rounded-lg outline-none"
        />
        <button className="p-2 bg-blue-800 text-white rounded-r-lg text-2xl hover:bg-blue-600 cursor-pointer">
          <FiSearch />
        </button>
      </div>
      <div className="overflow-x-auto p-6 max-w-screen">
        <table className="min-w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-400">
              <th className="border border-gray-300 px-4 py-3 text-black font-medium">
                ID
              </th>
              <th className="border border-gray-300 px-4 py-3 text-black font-medium">
                Estudiante
              </th>
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
                Ver Evidencia
              </th>
              <th className="border border-gray-300 px-4 py-3 text-black font-medium">
                Detalles
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredServicios.length > 0 ? (
              filteredServicios.map((servicio) => (
                <tr key={servicio.id} className="hover:bg-gray-200">
                  <td className="border border-gray-300 px-4 py-3 text-black">
                    {servicio.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-black">
                    {servicio.user?.full_name || "Sin asignar"}
                  </td>
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
                      {servicio.status === "Approved"
                        ? "Aprobado"
                        : servicio.status === "Pending"
                          ? "Pendiente"
                          : servicio.status === "Rejected"
                            ? "Rechazado"
                            : "Desconocido"}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-black">
                    <button
                      onClick={() =>
                        window.open(
                          `${import.meta.env.VITE_API_URL}/evidence/${
                            servicio.id
                          }`,
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
                      className="p-2 hover:bg-gray-200 rounded cursor-pointer"
                      onClick={() => handleOpenDetails(servicio)}
                    >
                      <AiOutlineEye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-6 text-gray-500">
                  No se encontraron servicios que coincidan con la búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedService && (
        <ModalServices
          servicio={selectedService}
          onClose={handleCloseModal}
          onUpdate={handleServiceUpdate}
        />
      )}
    </div>
  );
}
