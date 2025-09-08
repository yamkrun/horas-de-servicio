import React, { useState } from "react";
import { api as axios } from "../libs/axios";

export default function CreateService() {
  const [form, setForm] = useState({
    amount_reported: "",
    description: "",
    category_id: "",
    evidence: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      // Validar que los enteros sean positivos
      if (name === "amount_reported" || name === "category_id") {
        const intValue = parseInt(value);
        if (isNaN(intValue) || intValue <= 0) {
          setError("El valor debe ser un número entero positivo.");
          setForm((prev) => ({ ...prev, [name]: "" }));
          return;
        }
        setError("");
        setForm((prev) => ({ ...prev, [name]: intValue }));
      } else {
        setForm((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    
   
    try {
      const formData = new FormData();
      formData.append("amount_reported", form.amount_reported);
      formData.append("description", form.description);
      formData.append("category_id", form.category_id);
      if (form.evidence) {
        formData.append("evidence", form.evidence, form.evidence.name);
      }
      await axios.post("/services", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setSuccess("Servicio creado exitosamente.");
      setForm({ amount_reported: "", description: "", category_id: "", evidence: null });
    } catch (err) {
      setError("Error al crear el servicio.");
    }
    setLoading(false);
  };

  return (
  <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50 overflow-y-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Horas de Servicio"
          src="https://cloningles.estudiantefunval.org/moodle30/pluginfile.php/1/core_admin/logocompact/300x300/1733094194/LOGO%20FUNVAL%20MOODLE.png"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Crear Servicio
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Monto reportado
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="amount_reported"
                value={form.amount_reported}
                onChange={handleChange}
                placeholder="Ej: 3"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Test reporte Horas de servicio"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Categoría ID
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                placeholder="Ej: 1"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Evidencia (PDF)
            </label>
            <div className="mt-2">
              <input
                type="file"
                name="evidence"
                accept="application/pdf"
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:bg-blue-300"
            >
              {loading ? "Enviando..." : "Agregar Servicio"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

