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
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudo cargar el servicio");
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
    try {
      const formData = new FormData();
      formData.append("amount_reported", service.amount_reported);
      formData.append("description", service.description);
      formData.append("category_id", service.category_id);
      if (service.evidence) {
        formData.append("evidence", service.evidence, service.evidence.name);
      }
      await api.put(`/services/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setSuccess("Servicio actualizado correctamente");
      setTimeout(() => navigate(-1), 1500);
    } catch {
      setError("Error al actualizar el servicio");
    }
  };

  if (loading) return <div className="p-6">Cargando...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Editar Servicio</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Categoría</label>
          <select
            name="category_id"
            value={service.category_id}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
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
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar Cambios
        </button>
        {success && <div className="text-green-600 mt-2">{success}</div>}
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default EditService;
