import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function StudentProfile() {
  const [service, setService] = useState([
    { id: 1, category: "Voluntariado", hours: 3, status: "Approved" },
    { id: 2, category: "Capacitación", hours: 7, status: "Pending" },
    { id: 3, category: "Proyecto Social", hours: 9, status: "Approved" },
  ]);

  const student = {
    fullName: "Juan Pérez Amato",
    nationality: "Argentina",
    school: "Escuela Técnica N°1",
    phone: "+54 11 1234-5678",
    email: "juan.perez@email.com",
    status: "Active",
    serviceHours: {
      completed: 19,
      total: 20,
    },
    controller: {
      name: "Lucía Gómez",
      phone: "+54 11 8765-4321",
      email: "lucia.gomez@email.com",
    },
    recruiter: {
      name: "Carlos Martínez",
      phone: "+54 11 1122-3344",
      email: "carlos.martinez@email.com",
    },
  };

  const percentage = Math.min(
    100,
    (student.serviceHours.completed / student.serviceHours.total) * 100
  );

  return (
    <div className="min-h-screen bg-[#f2f3f7] flex flex-col items-center justify-start p-4">
      <div className="bg-[#ffffff] rounded-md  max-w-6xl w-full p-6 md:p-12 flex flex-col md:flex-row gap-8 mb-8">
        {/* Datos del estudiante */}
        <div className="flex-1 p-6 rounded-md border-gray-200 border-2">
          <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center md:text-left">
            Datos del Estudiante
          </h1>
          <div className="space-y-4">
            <div>
              <h2 className="font-semibold">Nombre completo</h2>
              <p className="text-gray-700">{student.fullName}</p>
            </div>
            <div>
              <h2 className=" font-semibold">Nacionalidad</h2>
              <p className="text-gray-700">{student.nationality}</p>
            </div>
            <div>
              <h2 className=" font-semibold">Escuela</h2>
              <p className="text-gray-700">{student.school}</p>
            </div>
            <div>
              <h2 className=" font-semibold">Teléfono</h2>
              <p className="text-gray-700">{student.phone}</p>
            </div>
            <div>
              <h2 className=" font-semibold">Email</h2>
              <p className="text-gray-700">{student.email}</p>
            </div>
            <div>
              <h2 className=" font-semibold">Estatus</h2>
              <p className="text-gray-700">{student.status}</p>
            </div>

            {/* Barra de horas de servicio */}
            <div className="mt-6">
              <h2 className=" font-semibold mb-2">
                Horas de Servicio: {student.serviceHours.completed} /{" "}
                {student.serviceHours.total}
              </h2>
              <div className="w-full h-4 bg-blue-200 rounded-full">
                <div
                  className="h-4 bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Datos de los responsables */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-blue-800 mb-4 text-center md:text-left">
            Responsables
          </h1>
          {/* Controller */}
          <div className="p-6 rounded-md border-2 border-gray-200">
            <h2 className="text-blue-700 font-semibold mb-2">Controller</h2>
            <p className="text-gray-700">
              <span className="font-semibold">Nombre:</span>{" "}
              {student.controller.name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Teléfono:</span>{" "}
              {student.controller.phone}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span>{" "}
              {student.controller.email}
            </p>
          </div>
          {/* Recruiter */}
          <div className="p-6 rounded-md border-2 border-gray-200">
            <h2 className="text-blue-700 font-semibold mb-2">Recruiter</h2>
            <p className="text-gray-700">
              <span className="font-semibold">Nombre:</span>{" "}
              {student.recruiter.name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Teléfono:</span>{" "}
              {student.recruiter.phone}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span>{" "}
              {student.recruiter.email}
            </p>
          </div>
        </div>
      </div>

      {/* Tabla de horas de servicio */}
      <div className="bg-white rounded-2xl shadow-lg max-w-6xl w-full p-6 md:p-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">
          Horas de Servicio
        </h2>
        <div className="overflow-x-auto">
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
                  Aprobar
                </th>
              </tr>
            </thead>
            <tbody>
              {service.map((servicio) => (
                <tr key={servicio.id} className="hover:bg-gray-200 ">
                  <td className="border border-gray-300 px-4 py-3 text-black">
                    {servicio.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-black">
                    {servicio.category?.name || "Sin categoría"}
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
                  <td className=" border border-gray-300  px-4 py-3 text-black">
                    <button className="bg-gray-200 hover:bg-gray-300 text-black m-auto flex px-3 py-1 rounded border border-gray-400 text-sm">
                      Ver PDF
                    </button>
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-black">
                    <button className="p-1 hover:bg-gray-200 rounded text-green-500 text-2xl">
                      <FaCheckCircle />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
