import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../libs/axios";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState([]);
  const [controllers, setControllers] = useState([]);
  const [recruiters, setRecruiters] = useState([]);

  // Cargar escuelas, controllers y recruiters al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schoolsResponse, controllersResponse, recruitersResponse] =
          await Promise.all([
            api.get("/schools/"),
            api.get("/users/?r=2"),
            api.get("/users/?r=3"),
          ]);

        setSchools(schoolsResponse.data);
        setControllers(controllersResponse.data);
        setRecruiters(recruitersResponse.data);
      } catch (error) {
        setError(error.message || "Error al cargar datos.");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData.entries());

    body.schools = body.schools ? [body.schools] : [];
    body.role_id = 4;
    body.country_id = 4;

    try {
      const response = await api.post("/users/", body);

      if (response.data) {
        navigate("/Admin");
      } else {
        throw new Error("No se pudo crear el usuario.");
      }
    } catch (error) {
      setError(error.message || "Error en el registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://cloningles.estudiantefunval.org/moodle30/pluginfile.php/1/core_admin/logocompact/300x300/1733094194/LOGO%20FUNVAL%20MOODLE.png"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Registra Estudiante
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div>
            <label
              htmlFor="f_name"
              className="block text-sm font-medium text-gray-700"
            >
              Primer nombre
            </label>
            <div className="mt-2">
              <input
                id="f_name"
                type="text"
                name="f_name"
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="s_name"
              className="block text-sm font-medium text-gray-700"
            >
              Segundo nombre
            </label>
            <div className="mt-2">
              <input
                id="s_name"
                type="text"
                name="s_name"
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Apellido */}
          <div>
            <label
              htmlFor="f_lastname"
              className="block text-sm font-medium text-gray-700"
            >
              Primer apellido
            </label>
            <div className="mt-2">
              <input
                id="f_lastname"
                type="text"
                name="f_lastname"
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="s_lastname"
              className="block text-sm font-medium text-gray-700"
            >
              Primer apellido
            </label>
            <div className="mt-2">
              <input
                id="s_lastname"
                type="text"
                name="s_lastname"
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                name="email"
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                name="password"
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* School (Escuela) */}
          <div>
            <label
              htmlFor="schools"
              className="block text-sm font-medium text-gray-700"
            >
              Escuela
            </label>
            <div className="mt-2">
              <select
                id="schools"
                name="schools"
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {schools.map((school) => (
                  <option key={school.id} value={school.id}>
                    {school.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Controller ID */}
          <div>
            <label
              htmlFor="controller_id"
              className="block text-sm font-medium text-gray-700"
            >
              Controller
            </label>
            <div className="mt-2">
              <select
                id="controller_id"
                name="controller_id"
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {controllers.map((controller) => (
                  <option key={controller.id} value={controller.id}>
                    {controller.f_name} {controller.f_lastname}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Recruiter ID */}
          <div>
            <label
              htmlFor="recruiter_id"
              className="block text-sm font-medium text-gray-700"
            >
              Recruiter
            </label>
            <div className="mt-2">
              <select
                id="recruiter_id"
                name="recruiter_id"
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {recruiters.map((recruiter) => (
                  <option key={recruiter.id} value={recruiter.id}>
                    {recruiter.f_name} {recruiter.f_lastname}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Botón */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:bg-indigo-300"
            >
              {loading ? "Registrando..." : "Registrar usuario"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
