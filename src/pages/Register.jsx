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
  const [countries, setCountries] = useState([]);

  // Cargar escuelas, controllers y recruiters al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          schoolsResponse,
          controllersResponse,
          recruitersResponse,
          countriesResponse,
        ] = await Promise.all([
          api.get("/schools/"),
          api.get("/users/?r=2"),
          api.get("/users/?r=3"),
          api.get("/countries/"),
        ]);

        setSchools(schoolsResponse.data);
        setControllers(controllersResponse.data);
        setRecruiters(recruitersResponse.data);
        setCountries(countriesResponse.data);
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
    body.country_id = parseInt(body.country_id, 10);

    try {
      const response = await api.post("/users/", body);

      if (response.data) {
        navigate("/admin");
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
    <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-8 bg-gray-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
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
            {/* Nombres */}
            <div className="flex flex-row gap-4">
              <div className="flex-1">
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

              <div className="flex-1">
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
            </div>

            {/* Apellidos */}
            <div className="flex flex-row gap-4">
              <div className="flex-1">
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

              <div className="flex-1">
                <label
                  htmlFor="s_lastname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Segundo apellido
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
            </div>

            {/* Email + Contraseña */}
            <div className="flex flex-row gap-4">
              <div className="flex-1">
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

              <div className="flex-1">
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
            </div>

            {/* Escuela + Controller */}
            <div className="flex flex-row gap-4">
              <div className="flex-1">
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

              <div className="flex-1">
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
            </div>

            {/* Recruiter + País */}
            <div className="flex flex-row gap-4">
              <div className="flex-1">
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

              <div className="flex-1">
                <label
                  htmlFor="country_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  País
                </label>
                <div className="mt-2">
                  <select
                    id="country_id"
                    name="country_id"
                    required
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">Selecciona un país</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
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
    </div>
  );
}
