import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import ModalServices from "./ModalServices";
import { api } from "../libs/axios";

export function ServiceTable({ servicios = [], mode = "student" }) {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [servicesList, setServicesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Cargar servicios desde la API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        // Usamos el endpoint /services para ambos modos
        const endpoint = "/services";
        
        console.log(`Fetching services from: ${endpoint}`);
        const response = await api.get(endpoint);
        console.log('Services data:', response.data);
        
        // Filtramos los servicios según el modo si es necesario
        let filteredServices = response.data;
        
        // Si estamos en modo estudiante y tenemos un ID de usuario
        if (mode === "student") {
          // Intentamos obtener el perfil del usuario para filtrar por su ID
          try {
            const profileResponse = await api.get("/auth/profile");
            const userId = profileResponse.data.id;
            
            // Filtramos solo los servicios del usuario actual
            filteredServices = response.data.filter(
              (service) => service.user && service.user.id === userId
            );
          } catch (profileErr) {
            console.error("Error al obtener perfil:", profileErr);
          }
        }
        
        setServicesList(filteredServices || []);
        setError(null);
      } catch (err) {
        console.error("Error al cargar los servicios:", err);
        setError("No se pudieron cargar los servicios. Intente nuevamente.");
        // Usar servicios proporcionados como fallback si hay error
        setServicesList(servicios);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [mode, servicios]);
  
  const handleAddService = () => {
    navigate("/student/create-service");
  };

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
      // Usamos el mismo endpoint para actualizar servicios independientemente del modo
      await api.put(`/services/${updatedService.id}`, updatedService);
      
      // Actualizar la lista local después de actualizar en la API
      const updatedList = servicesList.map(serv => 
        serv.id === updatedService.id ? updatedService : serv
      );
      setServicesList(updatedList);
    } catch (err) {
      console.error("Error al actualizar el servicio:", err);
      // Mostrar un mensaje de error si es necesario
      setError("No se pudo actualizar el servicio. Intente nuevamente.");
    }
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
      
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      {!loading && !error && (
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
              {servicesList.length === 0 ? (
                <tr>
                  <td colSpan="7" className="border border-gray-300 px-4 py-3 text-black">
                    No hay servicios registrados
                  </td>
                </tr>
              ) : (
                servicesList.map((servicio) => (
              <tr 
                key={servicio.id} 
                className={`hover:bg-gray-200 ${servicio.status === "Approved" ? "bg-green-100" : ""}`}
              >
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
                  <td className="border border-gray-300 px-4 py-3 text-2xl">
                    <button 
                      className={`${servicio.status === "Approved" ? "text-green-700 cursor-not-allowed" : "text-blue-600 hover:text-blue-800"}`}
                      onClick={() => servicio.status !== "Approved" && handleOpenModal(servicio)}
                      disabled={servicio.status === "Approved"}
                      title={servicio.status === "Approved" ? "Servicio ya aprobado" : "Aprobar servicio"}
                    >
                      <FaCheckCircle />
                    </button>
                  </td>
                )}
              </tr>
            )))}
          </tbody>
        </table>
      </div>
      )}
      
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