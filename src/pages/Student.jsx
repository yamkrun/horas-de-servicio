import { useState } from "react";
import { useEffect } from "react";
import { ServiceTable } from "../components/ServiceTable";
import StudentDashboard from "../components/StudentDashboard";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { api } from "../libs/axios";

export default function StudentPortal() {
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
    `${studentData?.f_name || ""} `.trim() ||
    "Estudiante";

  return (
    <div className="bg-[#f2f3f7] p-6">
      {/* Contenido principal */}
      {loadingStudent ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : errorStudent ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
          <p>Error al cargar datos del estudiante</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Bienvenido, {studentName}
            </h2>
            
          </div>
          
          {loadingServicios ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : errorServicios ? (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
              <p>Error al cargar horas de servicio</p>
            </div>
          ) : (
            <>
              <StudentDashboard servicios={userServicios} />
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-blue-50 border-b border-blue-100">
                  <h3 className="text-xl font-semibold text-blue-800">Mis Horas de Servicio</h3>
                </div>
                <div className="p-4">
              
                  <ServiceTable servicios={userServicios} mode={"student"} />
                </div>
              </div>
              
              {userServicios.length === 0 && (
                <div className="text-center py-6 mt-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-600">No tienes horas de servicio registradas</p>
                  <Link to="/student/create-service" className="text-blue-600 hover:underline mt-2 inline-block">
                    Registra tu primera hora de servicio
                  </Link>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
