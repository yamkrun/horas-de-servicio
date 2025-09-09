import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { api } from "../libs/axios";

export default function ModalServices({ servicio, onClose, onUpdate }) {
  const [status, setStatus] = useState(servicio.status || "Pending");
  const [comment, setComment] = useState(servicio.comment || "");
  const [amountApproved, setAmountApproved] = useState(
    servicio.amount_approved ?? 0
  );
  if (!servicio) return null;

  const handleSave = async () => {
    try {
      const res = await api.patch(`/review/${servicio.id}`, {
        status,
        comment,
        amount_approved: amountApproved,
      });

      if (res.status >= 200 && res.status < 300) {
        const updatedService = {
          ...servicio,
          status,
          comment,
          amount_approved: amountApproved,
        };

        if (onUpdate) onUpdate(updatedService);

        onClose();
      } else {
        alert(
          "Error al actualizar el servicio: " + res.message ||
            "Error desconocido"
        );
      }
    } catch (err) {
      alert("No se pudo actualizar el estado. Intente nuevamente.");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-2/3 p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Detalles del Servicio - Estudiante {servicio.user.full_name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-200"
            aria-label="Cerrar"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>

        {/* Información del servicio */}
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Información del Servicio
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <p>
              <strong>Descripción:</strong> {servicio.description || "-"}
            </p>
            <p>
              <strong>Comentario:</strong>{" "}
              {servicio.comment || "Sin comentarios"}
            </p>
            <p>
              <strong>Horas reportadas:</strong> {servicio.amount_reported || 0}
            </p>
            <p>
              <strong>Horas aprobadas:</strong> {servicio.amount_approved || 0}
            </p>
            <p>
              <strong>Status:</strong> {servicio.status}
            </p>
            <p>
              <strong>Fecha creación:</strong>{" "}
              {servicio.created_at
                ? new Date(servicio.created_at).toLocaleString()
                : "-"}
            </p>
            <p>
              <strong>Última actualización:</strong>{" "}
              {servicio.updated_at
                ? new Date(servicio.updated_at).toLocaleString()
                : "-"}
            </p>
          </div>
        </div>

        {/* Categoría */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Categoría</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <p>
              <strong>Nombre:</strong>{" "}
              {servicio.category?.name || "Sin categoría"}
            </p>
            <p>
              <strong>Descripción:</strong>{" "}
              {servicio.category?.description || "-"}
            </p>
          </div>
        </div>

        {/* Estudiante */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Estudiante</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <p>
              <strong>Nombre:</strong>{" "}
              {servicio.user?.full_name || "Sin asignar"}
            </p>
            <p>
              <strong>Email:</strong> {servicio.user?.email || "-"}
            </p>
          </div>
        </div>

        {/* Revisor */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Revisor</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <p>
              <strong>Nombre:</strong>{" "}
              {servicio.reviewer?.full_name || "Sin asignar"}
            </p>
            <p>
              <strong>Email:</strong> {servicio.reviewer?.email || "-"}
            </p>
            <p>
              <strong>Teléfono:</strong> {servicio.reviewer?.phone || "-"}
            </p>
            <p>
              <strong>Status:</strong> {servicio.reviewer?.status || "-"}
            </p>
          </div>
        </div>

        {/* Acciones de revisión */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Revisión</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Columna combinada para Estado y Horas aprobadas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Estado</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="Pending">Pendiente</option>
                  <option value="Approved">Aprobado</option>
                  <option value="Rejected">Rechazado</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Horas aprobadas
                </label>
                <input
                  type="number"
                  min="0"
                  max={servicio.amount_reported}
                  value={amountApproved}
                  onChange={(e) => setAmountApproved(Number(e.target.value))}
                  className="w-full border rounded px-3 py-2"
                />
                <p className="text-sm text-gray-500">
                  Reportadas: {servicio.amount_reported || 0}
                </p>
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1">Comentario</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="mt-6 flex justify-between">
          <a
            href={`${import.meta.env.VITE_API_URL}/evidence/${servicio.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Ver Evidencia
          </a>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cerrar
            </button>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
