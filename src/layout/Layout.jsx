import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import TableUsers from "../components/TableUsers";
import StudentsTable from "../components/StudentsTable";
import { ServiceTable } from "../components/ServiceTable";
import { api } from "../libs/axios";

export default function Layout({ data }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Opción 1");
  const [recruiter, setRecruiter] = useState([]);
  const [controllers, setControllers] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [students, setStudents] = useState([]);
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          adminRes,
          controllersRes,
          recruiterRes,
          studentsRes,
          serviciosRes,
        ] = await Promise.all([
          api.get("/users?r=1"),
          api.get("/users?r=2"),
          api.get("/users?r=3"),
          api.get("/students"),
          api.get("/services"),
        ]);

        setAdmin(adminRes.data);
        setControllers(controllersRes.data);
        setRecruiter(recruiterRes.data);
        setStudents(studentsRes.data);
        setServicios(serviciosRes.data);
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    };
    fetchData();
  }, []);

  const menuOptions = [
    "Home",
    "Administradores",
    "Controllers",
    "Recruiters",
    "Estudiantes",
    "Servicios",
  ];

  // ...existing code...
  const renderContent = () => {
    switch (selectedOption) {
      case "Administradores":
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-2">Administradores</h2>
            <TableUsers data={admin} filterRole={"Admin"} />
          </div>
        );
      case "Controllers":
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-2">Controllers</h2>
            <TableUsers data={controllers} />
          </div>
        );
      case "Recruiters":
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-2">Recruiters</h2>
            <TableUsers data={recruiter} />
          </div>
        );
      case "Estudiantes":
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-2">Estudiantes</h2>
            <StudentsTable data={students} />
          </div>
        );
      case "Servicios":
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-2">Horas de Servicio</h2>
            <ServiceTable servicios={servicios} mode="admin" />
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-2">Home</h2>
            <TableUsers data={admin} filterRole={"Admin"} />
          </div>
        );
    }
  };

  return (
    <div className="overflow-y-hidden flex min-h-screen bg-gray-100">
      {/* Aside menú de opciones */}
      <aside className="bg-blue-800 w-64 p-4 border-r flex-shrink-0 text-white">
        <div className="flex flex-col items-center mb-4 bg-gray-200 rounded-lg p-2">
          <img
            src="https://cloningles.estudiantefunval.org/moodle30/pluginfile.php/1/core_admin/logocompact/300x300/1733094194/LOGO%20FUNVAL%20MOODLE.png"
            alt="Logo Funval"
            className="h-10 w-auto mb-2"
          />
        </div>
        <ul className="space-y-2 my-20">
          {menuOptions.map((option) => (
            <li key={option}>
              <button
                className={`w-full text-left px-3 py-2 rounded hover:bg-blue-200 ${
                  selectedOption === option ? "bg-blue-300 font-semibold" : ""
                }`}
                onClick={() => setSelectedOption(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main className="flex-1 p-6">
          {renderContent()}
          {/* Si quieres mantener el Outlet para rutas, puedes moverlo aquí o dejarlo fuera */}
          {/* <Outlet /> */}
        </main>
        <footer className="bg-gray-100 text-gray-800 py-6 mt-auto border-t border-gray-300">
          <div className="container mx-auto px-4 flex justify-end items-center">
            <div className="text-right">
              <div className="text-lg font-semibold">MiSitio</div>
              <div className="text-sm">
                © {new Date().getFullYear()} MiSitio. Todos los derechos
                reservados.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
