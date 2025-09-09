import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../libs/axios";

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState({
    amount_reported: "",
    description: "",
    category_id: "",
    evidence: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState([]);

  const [serviceApproved, setServiceApproved] = useState(false);
  useEffect(() => {
    // Obtener datos del servicio
    api.get(`/services/${id}`)
      .then(res => {
        const s = res.data;
        setService({
          amount_reported: s.amount_reported || "",
          description: s.description || "",
          category_id: s.category?.id || "",
          evidence: null
        });
 
  setServiceApproved(Boolean(s.approved_by_admin));
        setLoading(false);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setError("El servicio no existe o fue eliminado.");
        } else {
          setError("No se pudo cargar el servicio");
        }
        setLoading(false);
      });
    // Obtener categorías
    api.get("/categories")
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "evidence") {
      if (files && files.length > 1) {
        setError("Solo se permite subir un archivo PDF.");
        setService((prev) => ({ ...prev, evidence: null }));
        return;
      }
      const file = files && files[0];
      if (!file) {
        setService((prev) => ({ ...prev, evidence: null }));
        return;
      }
      if (file.type !== "application/pdf") {
        setError("Solo se permite subir archivos PDF.");
        setService((prev) => ({ ...prev, evidence: null }));
        return;
      }
      setError("");
      setService((prev) => ({ ...prev, evidence: file }));
    } else {
      setService((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (serviceApproved) {
      setError("No puedes modificar el servicio porque las horas ya fueron aprobadas por el administrador.");
      return;
    }
    try {
      const data = {
        amount_reported: service.amount_reported,
        description: service.description,
        category_id: service.category_id
      };
      await api.patch(`/services/${id}`, data, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      setSuccess("Servicio actualizado correctamente");
      setTimeout(() => navigate(-1), 1500);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("No se pudo actualizar: el servicio no existe o fue eliminado.");
      } else {
        setError("Error al actualizar el servicio");
      }
    }
  };

  if (loading) return <div className="p-6">Cargando...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-8">
      <div className="max-w-xl w-full mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Editar Servicio</h2>
        {serviceApproved && (
          <div className="text-red-600 mb-4">No puedes modificar el servicio porque las horas ya fueron aprobadas por el administrador.</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Categoría</label>
            <select
              name="category_id"
              value={service.category_id}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
              disabled={serviceApproved}
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Monto reportado</label>
            <input
              type="number"
              name="amount_reported"
              value={service.amount_reported}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
              disabled={serviceApproved}
            />
          </div>
          <div>
            <label className="block mb-1">Descripción</label>
            <input
              type="text"
              name="description"
              value={service.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
              disabled={serviceApproved}
            />
          </div>
          <div>
            <label className="block mb-1">Evidencia (PDF)</label>
            <input
              type="file"
              name="evidence"
              accept="application/pdf"
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              disabled={serviceApproved}
            />
          </div>
          <button
            type="submit"
            className={`bg-blue-600 text-white px-4 py-2 rounded ${serviceApproved ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            disabled={serviceApproved}
          >
            {serviceApproved ? "No puedes modificar" : "Guardar Cambios"}
          </button>
          {success && <div className="text-green-600 mt-2">{success}</div>}
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default EditService;
