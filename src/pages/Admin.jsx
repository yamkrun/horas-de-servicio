import { FiSearch, FiChevronDown, FiPlus } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import TableUsers from "../components/TableUsers";
import StudentsTable from "../components/StudentsTable";
import Dashboard from "../components/Dashboard";
import { api } from "../libs/axios";
import { useEffect, useState } from "react";

export default function Admin() {
  console.log("Rendering Admin Component");
  const navigate = useNavigate();
  const location = useLocation();
  const [recruiter, setRecruiter] = useState([]);
  const [controllers, setControllers] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [students, setStudents] = useState([]);
  const [services, setServices] = useState([]);
  const [schools, setSchools] = useState([]);
  const [country, setCountry] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");

  // Obtener la sección de los parámetros de la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section");

    if (section) {
      setActiveSection(section);
    } else {
      setActiveSection("dashboard");
    }
  }, [location.search]);

  const handleAddStudent = () => {
    navigate("/register");
  };

  useEffect(() => {
    console.log("Admin component mounted, fetching data...");
    const fetchData = async () => {
      try {
        console.log("Making API requests...");

        // Create an array of promises with error handling for each request
        const requests = [
          api.get("/users?r=1").catch((e) => {
            console.error("Error fetching admins:", e);
            return { data: [] };
          }),
          api.get("/users?r=2").catch((e) => {
            console.error("Error fetching controllers:", e);
            return { data: [] };
          }),
          api.get("/users?r=3").catch((e) => {
            console.error("Error fetching recruiters:", e);
            return { data: [] };
          }),
          api.get("/students").catch((e) => {
            console.error("Error fetching students:", e);
            return { data: [] };
          }),
          api.get("/services").catch((e) => {
            console.error("Error fetching services:", e);
            return { data: [] };
          }),
          api.get("/schools").catch((e) => {
            console.error("Error fetching schools:", e);
            return { data: [] };
          }),
          api.get("/countries").catch((e) => {
            console.error("Error fetching countries:", e);
            return { data: [] };
          }),
          api.get("/categories").catch((e) => {
            console.error("Error fetching categories:", e);
            return { data: [] };
          }),
        ];

        // Wait for all requests to complete
        const [
          adminRes,
          controllersRes,
          recruiterRes,
          studentsRes,
          servicesRes,
          schoolsRes,
          countriesRes,
          categoriesRes,
        ] = await Promise.all(requests);

        console.log("Data received:", {
          admins: adminRes.data?.length || 0,
          controllers: controllersRes.data?.length || 0,
          recruiters: recruiterRes.data?.length || 0,
          students: studentsRes.data?.length || 0,
          services: servicesRes.data?.length || 0,
          schools: schoolsRes.data?.length || 0,
          countries: countriesRes.data?.length || 0,
          categories: categoriesRes.data?.length || 0,
        });

        // Safely set state values with fallbacks to empty arrays
        setAdmin(Array.isArray(adminRes.data) ? adminRes.data : []);
        setControllers(
          Array.isArray(controllersRes.data) ? controllersRes.data : []
        );
        setRecruiter(Array.isArray(recruiterRes.data) ? recruiterRes.data : []);
        setStudents(Array.isArray(studentsRes.data) ? studentsRes.data : []);
        setServices(Array.isArray(servicesRes.data) ? servicesRes.data : []);
        setSchools(Array.isArray(schoolsRes.data) ? schoolsRes.data : []);
        setCountry(Array.isArray(countriesRes.data) ? countriesRes.data : []);
        setCategories(
          Array.isArray(categoriesRes.data) ? categoriesRes.data : []
        );
      } catch (error) {
        console.error("Error cargando datos:", error);
        // Initialize with empty arrays on error
        setAdmin([]);
        setControllers([]);
        setRecruiter([]);
        setStudents([]);
        setServices([]);
        setSchools([]);
        setCountry([]);
        setCategories([]);
      }
    };

    fetchData();
  }, []);

  // Función para filtrar datos según el término de búsqueda
  const filterData = (data, term) => {
    if (!term) return data;
    return data.filter(
      (item) =>
        item.f_name?.toLowerCase().includes(term.toLowerCase()) ||
        item.f_lastname?.toLowerCase().includes(term.toLowerCase()) ||
        item.email?.toLowerCase().includes(term.toLowerCase())
    );
  };

  return (
    <div className="bg-[#f2f3f7] min-h-screen">
      {/* Título de la sección */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {activeSection === "dashboard" && "Dashboard"}
          {activeSection === "admin" && "Administradores"}
          {activeSection === "controllers" && "Controladores"}
          {activeSection === "recruiters" && "Reclutadores"}
          {activeSection === "students" && "Estudiantes"}
          {activeSection === "categories" && "Categorías de Servicio"}
        </h1>
      </div>

      {/* Barra de búsqueda - visible en todas las secciones excepto dashboard y categories */}
      {activeSection !== "dashboard" && activeSection !== "categories" && (
        <div className="mb-6">
          <div className="flex border bg-white border-gray-300 rounded-lg items-center gap-4 w-full max-w-2xl">
            <input
              type="text"
              placeholder={`Buscar ${
                activeSection === "admin"
                  ? "administrador"
                  : activeSection === "controllers"
                  ? "controlador"
                  : activeSection === "recruiters"
                  ? "reclutador"
                  : activeSection === "students"
                  ? "estudiante"
                  : "usuario"
              }...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 pl-4 py-2 rounded-lg outline-none"
            />
            <button className="p-2 bg-blue-800 text-white rounded-r-lg text-2xl hover:bg-blue-600 cursor-pointer">
              <FiSearch />
            </button>
          </div>
        </div>
      )}

      {/* Contenido según la sección activa */}
      {activeSection === "dashboard" && (
        <div className="p-4">
          {/* Wait for all data to be loaded before rendering Dashboard */}
          {students && services && schools && country && categories ? (
            <Dashboard
              services={services || []}
              students={students || []}
              schools={schools || []}
              country={country || []}
              categories={categories || []}
            />
          ) : (
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto"></div>
              <p className="mt-4 text-gray-600">
                Cargando datos del dashboard...
              </p>
            </div>
          )}
        </div>
      )}

      {/* Sección de Administradores */}
      {activeSection === "admin" && (
        <div className=" p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2 ml-8">
               Administradores
            </h2>
          </div>
          <TableUsers
            data={filterData(admin, searchTerm)}
            filterRole={"Admin"}
          />
        </div>
      )}

      {/* Sección de Controladores */}
      {activeSection === "controllers" && (
        <div className=" p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center ml-8 gap-2">
              Controladores
            </h2>
          </div>
          <TableUsers
            data={filterData(controllers, searchTerm)}
            filterRole={"Controller"}
          />
        </div>
      )}

      {/* Sección de Reclutadores */}
      {activeSection === "recruiters" && (
        <div className="  p-6">
          <div className="flex justify-between items-center mb-4">
            
          </div>
          <TableUsers
            data={filterData(recruiter, searchTerm)}
            filterRole={"Recruiter"}
          />
        </div>
      )}

      {/* Sección de Estudiantes */}
      {activeSection === "students" && (
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold ml-8 flex items-center gap-2">
             Estudiantes
            </h2>
            <button
              onClick={handleAddStudent}
              className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <FiPlus /> Agregar Estudiante
            </button>
          </div>
          <StudentsTable data={filterData(students, searchTerm)} />
        </div>
      )}

      {/* Sección de Categorías */}
      {activeSection === "categories" && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FiChevronDown /> Categorías de Servicio
            </h2>
            <button className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <FiPlus /> Nueva Categoría
            </button>
          </div>

          {categories && categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  <h3 className="font-semibold text-lg mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {category.description || "Sin descripción"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">
              No hay categorías disponibles
            </p>
          )}
        </div>
      )}
    </div>
  );
}
