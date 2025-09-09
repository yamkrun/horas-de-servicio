import React from "react";
import Cards from "./Cards";
import { PiStudentFill } from "react-icons/pi";
import { BiSolidSchool } from "react-icons/bi";
import { BiWorld } from "react-icons/bi";
import { CiBookmarkCheck } from "react-icons/ci";
import { TbFileReport } from "react-icons/tb";

export default function Dashboard() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <Cards
          text={"Cantidad de estudiantes"}
          number={80}
          className={"text-blue-500"}
          icon={<PiStudentFill />}
        ></Cards>
        <Cards
          text={"Cantidad de Escuelas"}
          number={8}
          className={"text-purple-500"}
          icon={<BiSolidSchool />}
        ></Cards>
        <Cards
          text={"Cantidad de paises"}
          number={30}
          className={"text-green-500"}
          icon={<BiWorld />}
        ></Cards>
        <Cards
          text={"Horas de servicio aprobadas"}
          number={80}
          className={"text-yellow-500"}
          icon={<CiBookmarkCheck />}
        ></Cards>
        <Cards
          text={"Horas de servicio reportadas"}
          number={80}
          className={"text-orange-500"}
          icon={<TbFileReport />}
        ></Cards>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-3 gap-2">
        <div className="bg-white shadow rounded-2xl p-2">
          <h3 className="font-semibold mb-4">Categorías de servicio</h3>
          <ul className="space-y-2">
            <li className="p-2 bg-gray-100 rounded-lg">Voluntariado</li>
            <li className="p-2 bg-gray-100 rounded-lg">Capacitación</li>
            <li className="p-2 bg-gray-100 rounded-lg">Eventos</li>
            <li className="p-2 bg-gray-100 rounded-lg">Eventos</li>
            <li className="p-2 bg-gray-100 rounded-lg">Eventos</li>
            <li className="p-2 bg-gray-100 rounded-lg">Eventos</li>
          </ul>
        </div>
        <div className="bg-white shadow rounded-2xl p-4">
          <h3 className="font-semibold mb-4">Lista de escuelas</h3>
          <ul className="space-y-2">
            <li className="p-2 bg-gray-100 rounded-lg">Escuela A</li>
            <li className="p-2 bg-gray-100 rounded-lg">Escuela B</li>
            <li className="p-2 bg-gray-100 rounded-lg">Escuela C</li>
          </ul>
        </div>

        <div className="bg-white shadow rounded-2xl p-4">
          <h3 className="font-semibold mb-4">Estudiantes por escuela</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm">Escuela A</p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full w-[30%]"></div>
              </div>
            </div>
            <div>
              <p className="text-sm">Escuela B</p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full w-[60%]"></div>
              </div>
            </div>
            <div>
              <p className="text-sm">Escuela C</p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-purple-500 h-3 rounded-full w-[15%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
