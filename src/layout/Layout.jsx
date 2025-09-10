import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TableUsers from "../components/TableUsers";
import StudentsTable from "../components/StudentsTable";
import { ServiceTable } from "../components/ServiceTable";
import { api } from "../libs/axios";
import Dashboard from "../components/Dashboard";
import Services from "../pages/Services";
import { useAuth } from "../Hooks/useAuth";

export default function Layout({ data }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Opción 1");
  const [recruiter, setRecruiter] = useState([]);
  const [controllers, setControllers] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [students, setStudents] = useState([]);
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

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
            <Services/>
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-2">Home</h2>
            <Dashboard
              admin={admin}
              students={students}
              servicios={servicios}
            ></Dashboard>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <aside className="fixed top-0 left-0 h-full bg-blue-800 w-64 p-4 border-r text-white overflow-y-auto z-50">
        <div className="sticky top-0 flex flex-col items-center mb-4 bg-gray-200 rounded-lg p-2">
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
                className={`w-full text-left px-3 py-2 rounded hover:bg-blue-700 ${
                  selectedOption === option ? "bg-blue-600" : ""
                }`}
                onClick={() => setSelectedOption(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="ml-64">
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main className="p-6">
          {renderContent()}
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
