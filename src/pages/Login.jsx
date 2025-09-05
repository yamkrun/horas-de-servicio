import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData.entries());

    try {
      const response = await logIn(body);

      if (response.error) {
        if (response.error.includes("invalid email or password")) {
          throw new Error("Email o contraseña incorrectos");
        } else {
          throw new Error(response.error);
        }
      }

      const profileRes = await api.get("/auth/profile");

      const profile = profileRes.data;
      if (!profile || !profile.role || !profile.role.name) {
        throw new Error("No se pudo obtener el perfil correctamente.");
      }

      switch (profile.role.name) {
        case "Admin":
          navigate("/Admin");
          break;
        case "Student":
          navigate("/Student");
          break;
        default:
          throw new Error("Rol no reconocido.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Email o contraseña incorrectos");
      } else {
        setError(error.message || "Error en el login");
      }
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
          Inicia sesión en tu cuenta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Password */}
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

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Botón */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:bg-indigo-300"
            >
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
