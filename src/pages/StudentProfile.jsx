import React, { useEffect, useState } from "react";
import { api } from "../libs/axios";
import { ServiceTable } from "../components/ServiceTable";
import { useParams } from "react-router-dom";
export default function StudentProfile() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get(`/students/${id}`);
        setStudent(res.data);
      } catch (err) {
        console.error("Error cargando estudiante:", err);
      }
    };
    fetchStudent();
  }, [id]);

  if (!student) return <div>Cargando...</div>;

  // Calcular horas aprobadas
  const totalApproved = student.services?.reduce(
    (acc, s) => acc + (s.amount_approved || 0),
    0
  );
  const percentage = Math.min(100, (totalApproved / 20) * 100);

  return (
    <div className="min-h-screen bg-[#f2f3f7] flex flex-col items-center justify-start p-4">
      <div className="bg-[#ffffff] rounded-md  max-w-6xl w-full p-6 md:p-12 flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-1 p-6 rounded-md border-gray-200 border-2">
          <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center md:text-left">
            Datos del Estudiante
          </h1>
          <div className="space-y-4">
            <div>
              <h2 className="font-semibold">Nombre completo</h2>
              <p className="text-gray-700">{student.full_name}</p>
            </div>
            <div>
              <h2 className=" font-semibold">Nacionalidad</h2>
              <p className="text-gray-700">{student.student?.country?.name}</p>
            </div>
            <div>
              <h2 className=" font-semibold">Escuela</h2>
              <p className="text-gray-700">
                {student.schools?.[0]?.name || "Sin escuela"}
              </p>
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

            <div className="mt-6">
              <h2 className=" font-semibold mb-2">
                Horas de Servicio: {totalApproved} / 20
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

        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-blue-800 mb-4 text-center md:text-left">
            Responsables
          </h1>

          <div className="p-6 rounded-md border-2 border-gray-200">
            <h2 className="text-blue-700 font-semibold mb-2">Controller</h2>
            <p className="text-gray-700">
              <span className="font-semibold">Nombre:</span>{" "}
              {student.student?.controller?.full_name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Teléfono:</span>{" "}
              {student.student?.controller?.phone}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span>{" "}
              {student.student?.controller?.email}
            </p>
          </div>

          <div className="p-6 rounded-md border-2 border-gray-200">
            <h2 className="text-blue-700 font-semibold mb-2">Recruiter</h2>
            <p className="text-gray-700">
              <span className="font-semibold">Nombre:</span>{" "}
              {student.student?.recruiter?.full_name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Teléfono:</span>{" "}
              {student.student?.recruiter?.phone}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span>{" "}
              {student.student?.recruiter?.email}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg max-w-6xl w-full p-6 md:p-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">
          Horas de Servicio
        </h2>
        <div className="overflow-x-auto">
          <ServiceTable servicios={student.services} mode={"admin"} />
        </div>
      </div>
    </div>
  );
}
