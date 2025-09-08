
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../libs/axios";

export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    f_name: "",
    s_name: "",
    f_lastname: "",
    s_lastname: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/auth/profile")
      .then((res) => {
        const { f_name, s_name, f_lastname, s_lastname, id } = res.data;
        setFormData({ f_name, s_name, f_lastname, s_lastname, id });
        setLoading(false);
      })
      .catch((err) => {
        setError("Error al cargar el perfil");
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await api.put(`/users/${formData.id}`, {
        f_name: formData.f_name,
        s_name: formData.s_name,
        f_lastname: formData.f_lastname,
        s_lastname: formData.s_lastname,
      });
      setSuccess("Perfil actualizado correctamente");
      setTimeout(() => navigate("/student"), 1500);
    } catch (err) {
      setError("Error al actualizar el perfil");
    }
  };

  if (loading) return <p className="m-6">Cargando perfil...</p>;

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Modificar Perfil</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium">Primer Nombre</label>
          <input
            type="text"
            name="f_name"
            value={formData.f_name}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Segundo Nombre</label>
          <input
            type="text"
            name="s_name"
            value={formData.s_name}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Primer Apellido</label>
          <input
            type="text"
            name="f_lastname"
            value={formData.f_lastname}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium">Segundo Apellido</label>
          <input
            type="text"
            name="s_lastname"
            value={formData.s_lastname}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
