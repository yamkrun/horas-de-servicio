import React, { useState, useEffect } from "react";
import { api } from "../libs/axios";

export default function CreateService() {
  const [form, setForm] = useState({
    amount_reported: "",
    description: "",
    category_id: "",
    evidence: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "evidence") {
      if (files && files.length > 1) {
        setError("Solo se permite subir un archivo PDF.");
        setForm((prev) => ({ ...prev, evidence: null }));
        return;
      }
      const file = files && files[0];
      if (!file) {
        setForm((prev) => ({ ...prev, evidence: null }));
        return;
      }
      if (file.type !== "application/pdf") {
        setError("Solo se permite subir archivos PDF.");
        setForm((prev) => ({ ...prev, evidence: null }));
        return;
      }
      setError("");
      setForm((prev) => ({ ...prev, evidence: file }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      if (form.evidence) {
        const formData = new FormData();
        formData.append("amount_reported", form.amount_reported);
        formData.append("description", form.description);
        formData.append("category_id", form.category_id);
        formData.append("evidence", form.evidence, form.evidence.name);
        await api.post("/services", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        const data = {
          amount_reported: form.amount_reported,
          description: form.description,
          category_id: form.category_id,
        };
        await api.post("/services", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      setSuccess("Servicio creado exitosamente.");
      setForm({
        amount_reported: "",
        description: "",
        category_id: "",
        evidence: null,
      });
    } catch (error) {
      console.error("Error creating service:", error);
      setError("Error al crear el servicio.");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50 overflow-y-auto">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Horas de Servicio"
          src="https://cloningles.estudiantefunval.org/moodle30/pluginfile.php/1/core_admin/logocompact/300x300/1733094194/LOGO%20FUNVAL%20MOODLE.png"
          className="mx-auto h-16 w-auto"
        />
        <h2 className="mt-8 text-center text-3xl font-extrabold tracking-tight text-gray-900">
          Crear Servicio
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Horas reportadas
            </label>
            <input
              type="number"
              name="amount_reported"
              value={form.amount_reported}
              onChange={handleChange}
              placeholder="Ej: 3"
              min={1}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Ingrese una descripción del servicio"
              rows={3}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm resize-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Evidencia (PDF)
            </label>
            <input
              type="file"
              name="evidence"
              accept="application/pdf"
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            {form.evidence && (
              <p className="text-xs text-gray-500 mt-1">
                Archivo seleccionado: {form.evidence.name}
              </p>
            )}
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:bg-blue-300 transition-colors"
            >
              {loading ? (
                <span>
                  <svg className="animate-spin h-5 w-5 inline-block mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Enviando...
                </span>
              ) : (
                "Agregar Servicio"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
