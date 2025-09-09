import { useState } from "react";
import { useEffect } from "react";
import { ServiceTable } from "../components/ServiceTable";

import { api } from "../libs/axios";

export default function StudentPortal() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [loadingStudent, setLoadingStudent] = useState(true);
  const [errorStudent, setErrorStudent] = useState(null);
  const [servicios, setServicios] = useState([]);
  const [userServicios, setUserServicios] = useState([]);
  const [loadingServicios, setLoadingServicios] = useState(true);
  const [errorServicios, setErrorServicios] = useState(null);

  useEffect(() => {
    api
      .get("/auth/profile")
      .then((response) => {
        setStudentData(response.data);
        setLoadingStudent(false);
      })
      .catch((err) => {
        setErrorStudent(err);
        setLoadingStudent(false);
      });
  }, []);

  useEffect(() => {
    api
      .get("/services")
      .then((response) => {
        setServicios(response.data);
        setLoadingServicios(false);
      })
      .catch((err) => {
        setErrorServicios(err);
        setLoadingServicios(false);
      });
  }, []);

  // Filtrar servicios del usuario cuando ambos datos estén listos
  useEffect(() => {
    if (!loadingStudent && studentData && Array.isArray(servicios)) {
      // Filtrar por el ID del usuario en el objeto user anidado
      const filtered = servicios.filter(
        (s) => s.user && s.user.id === studentData.id
      );
      setUserServicios(filtered);
    }
  }, [loadingStudent, studentData, servicios]);

  const studentName =
    `${studentData?.f_name || ""}  ${studentData?.f_lastname || ""} `.trim() ||
    "Estudiante";

  return (
    <div className=" bg-[#f2f3f7]">
      {/* Contenido principal */}
      {loadingStudent ? (
        <p className="m-6">Cargando datos del estudiante...</p>
      ) : errorStudent ? (
        <p className="m-6 text-red-500">Error al cargar datos del estudiante</p>
      ) : (
        <>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 m-6">
            Bienvenido, {studentName}
          </h2>
          <main className="max-w-7xl bg-[#ffffff] mx-auto lg:rounded-md px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-gray-600 text-2xl md:text-3xl lg:text-4xl">Horas de Servicio</p>
            {loadingServicios ? (
              <p className="text-gray-600">Cargando horas de servicio...</p>
            ) : errorServicios ? (
              <p className="text-red-500">Error al cargar horas de servicio</p>
            ) : (
              <ServiceTable servicios={userServicios} mode={"student"} />
            )}
          </main>
        </>
      )}
    </div>
  );
}
