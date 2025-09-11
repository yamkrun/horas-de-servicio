import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import { PiStudentFill } from "react-icons/pi";
import { BiSolidSchool } from "react-icons/bi";
import { BiWorld } from "react-icons/bi";
import { CiBookmarkCheck } from "react-icons/ci";
import { TbFileReport } from "react-icons/tb";

export default function Dashboard({
  schools = [],
  country = [],
  students = [],
  services = [],
  categories = [],
}) {
  const [servicesA, setServicesA] = useState(0);
  const [servicesR, setServicesR] = useState(0);

  useEffect(() => {
    if (!services || services.length === 0) {
      console.log("No services data available");
      return;
    }

    const approved = services.filter(
      (service) => service.status === "Approved"
    );
    const total = approved.reduce((t, ser) => t + ser.amount_approved, 0);
    const totalR = services.reduce((to, res) => to + res.amount_reported, 0);

    setServicesR(totalR);
    setServicesA(total);
  }, [services]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <Cards
          text={"Cantidad de estudiantes"}
          number={students?.length || 0}
          className={"text-blue-500"}
          icon={<PiStudentFill />}
        ></Cards>
        <Cards
          text={"Cantidad de Escuelas"}
          number={schools?.length || 0}
          className={"text-purple-500"}
          icon={<BiSolidSchool />}
        ></Cards>
        <Cards
          text={"Cantidad de paises"}
          number={country?.length || 0}
          className={"text-green-500"}
          icon={<BiWorld />}
        ></Cards>
        <Cards
          text={"Horas de servicio aprobadas"}
          number={servicesA}
          className={"text-yellow-500"}
          icon={<CiBookmarkCheck />}
        ></Cards>
        <Cards
          text={"Horas de servicio reportadas"}
          number={servicesR}
          className={"text-orange-500"}
          icon={<TbFileReport />}
        ></Cards>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-3 gap-2">
        <div className="bg-white shadow rounded-2xl p-2">
          <h3 className="font-semibold mb-4">Categorías de servicio</h3>
          {categories && categories.length > 0 ? (
            <ul className="space-y-2">
              {categories.map((n) => (
                <li key={n.id} className="p-2 bg-gray-100 rounded-lg">
                  {n.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hay categorías disponibles</p>
          )}
        </div>
        <div className="bg-white shadow rounded-2xl p-4">
          <h3 className="font-semibold mb-4">Lista de escuelas</h3>
          {schools && schools.length > 0 ? (
            <ul className="space-y-2">
              {schools.map((s) => (
                <li key={s.id} className="p-2 bg-gray-100 rounded-lg">
                  {s.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hay escuelas disponibles</p>
          )}
        </div>

        <div className="bg-white shadow rounded-2xl p-4">
          <h3 className="font-semibold mb-4">Estudiantes por escuela</h3>
          {schools && schools.length > 0 && students && students.length > 0 ? (
            <div className="space-y-3">
              {schools.map((s) => {
                const count = students.filter(
                  (st) =>
                    st.schools &&
                    st.schools.some &&
                    st.schools.some((sc) => sc && sc.id === s.id)
                ).length;
                const percent =
                  students.length > 0 ? (count / students.length) * 100 : 0;

                return (
                  <div key={s.id}>
                    <p className="text-sm">
                      {s.name} — {count} estudiantes
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-500 h-3 rounded-full"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">
              No hay datos disponibles para mostrar
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
