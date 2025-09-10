
import React from "react";
import { FiClock, FiCheckCircle, FiAlertCircle, FiCalendar } from "react-icons/fi";

export default function StudentDashboard({ servicios }) {
  // Calcular el total de horas acumuladas
  const totalHoras = servicios.reduce((sum, servicio) => {
    return sum + (servicio.hours || 0);
  }, 0);

  // Calcular servicios por estado
  const serviciosAprobados = servicios.filter(s => s.status === "aprobado").length;
  const serviciosPendientes = servicios.filter(s => s.status === "pendiente").length;
  const serviciosRechazados = servicios.filter(s => s.status === "rechazado").length;

  // Calcular el servicio más reciente
  const servicioReciente = servicios.length > 0 
    ? new Date(Math.max(...servicios.map(s => new Date(s.created_at || 0)))).toLocaleDateString()
    : "N/A";

  const cards = [
    {
      title: "Total de Horas",
      value: totalHoras,
      icon: <FiClock size={24} />,
      color: "bg-blue-100 text-blue-800",
      iconBg: "bg-blue-200"
    },
    {
      title: "Servicios Aprobados",
      value: serviciosAprobados,
      icon: <FiCheckCircle size={24} />,
      color: "bg-green-100 text-green-800",
      iconBg: "bg-green-200"
    },
    {
      title: "Servicios Pendientes",
      value: serviciosPendientes,
      icon: <FiAlertCircle size={24} />,
      color: "bg-yellow-100 text-yellow-800",
      iconBg: "bg-yellow-200"
    },
    {
      title: "Último Servicio",
      value: servicioReciente,
      icon: <FiCalendar size={24} />,
      color: "bg-purple-100 text-purple-800",
      iconBg: "bg-purple-200"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => (
        <div key={index} className={`rounded-lg shadow-md p-4 ${card.color}`}>
          <div className="flex items-center mb-2">
            <div className={`p-2 rounded-full mr-3 ${card.iconBg}`}>{card.icon}</div>
            <h3 className="font-semibold">{card.title}</h3>
          </div>
          <p className="text-2xl font-bold">{card.value}</p>
        </div>
      ))}

import React, { useEffect, useState } from "react";
import { api } from "../libs/axios/index";
import Cards from "./Cards";
import { CiBookmarkCheck } from "react-icons/ci";
import { TbFileReport } from "react-icons/tb";
import { MdOutlineEventNote } from "react-icons/md";
import { FaUser, FaEnvelope, FaGraduationCap, FaTag } from "react-icons/fa";

export default function StudentDashboard() {
  const [metrics, setMetrics] = useState({
    reportadas: 0,
    aprobadas: 0,
    rechazadas: 0,
  });
  const [reportes, setReportes] = useState([]);
  const [perfil, setPerfil] = useState(null);
  const [notificaciones, setNotificaciones] = useState([]);

  const getEstado = (s) => {
    if (s.status === 1 || s.status === "Approved") return "Aprobado";
    if (s.status === 2 || s.status === "Rejected") return "Rechazado";
    return "En revisión";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Perfil del estudiante
        const { data: profile } = await api.get("auth/profile");
        setPerfil({
          nombre:
            [profile.f_name, profile.f_lastname].filter(Boolean).join(" ") ||
            "Sin nombre",
          email: profile.email,
          escuela: profile.schools?.[0]?.name || "No asignada",
          rol: profile.role?.name || "Estudiante",
        });

        // 2. Reportes de servicio
        const { data: services } = await api.get("services");
        setReportes(
          services.map((s) => ({
            id: s.id,
            categoria: s.category?.name || "N/A",
            descripcion: s.description || "Sin descripción",
            horas: s.amount_reported ?? 0,
            estado: getEstado(s),
            comentarios: s.comments || "Sin comentarios",
          }))
        );

        // 3. Calcular métricas
        const horasReportadas = services.reduce(
          (acc, s) => acc + (s.amount_reported ?? 0),
          0
        );
        const horasAprobadas = services.reduce(
          (acc, s) => acc + (s.amount_approved ?? 0),
          0
        );
        const horasRechazadas = services.reduce(
          (acc, s) =>
            acc + (getEstado(s) === "Rechazado" ? (s.amount_reported ?? 0) : 0),
          0
        );

        setMetrics({
          reportadas: horasReportadas,
          aprobadas: horasAprobadas,
          rechazadas: horasRechazadas,
        });

        // 4. Notificaciones
        const notif = [];
        if (services.some((s) => getEstado(s) === "En revisión"))
          notif.push("Tienes un reporte pendiente de revisión.");
        if (services.some((s) => getEstado(s) === "Rechazado"))
          notif.push(
            "Uno de tus reportes fue rechazado, revisa los comentarios."
          );
        if (horasAprobadas >= 20)
          notif.push("¡Felicitaciones! Ya superaste 20 horas aprobadas.");
        setNotificaciones(notif);
      } catch (error) {
        console.error("Error cargando datos del dashboard:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* 1. RESUMEN DE HORAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Cards
          text="Horas reportadas"
          number={metrics.reportadas}
          className="text-blue-500"
          icon={<TbFileReport />}
        />
        <Cards
          text="Horas aprobadas"
          number={metrics.aprobadas}
          className="text-green-500"
          icon={<CiBookmarkCheck />}
        />
        <Cards
          text="Horas rechazadas"
          number={metrics.rechazadas}
          className="text-red-500"
          icon={<MdOutlineEventNote />}
        />
      </div>

      {/* 4. NOTIFICACIONES */}
      <div className="bg-white shadow rounded-2xl p-4">
        <h3 className="font-semibold mb-4">Avisos y Notificaciones</h3>
        {notificaciones.length === 0 ? (
          <p className="text-gray-600">No tienes notificaciones.</p>
        ) : (
          <ul className="list-disc list-inside space-y-2">
            {notificaciones.map((n, i) => (
              <li key={i} className="text-gray-700">
                {n}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 3. PERFIL */}
      {perfil && (
        <div className="bg-white shadow rounded-2xl p-4">
          <h3 className="font-semibold mb-4">Mi Perfil</h3>
          <p>
            <strong>
              <FaUser className="inline text-blue-500" /> Nombre:
            </strong>{" "}
            {perfil.nombre}
          </p>
          <p>
            <strong>
              <FaEnvelope className="inline text-green-500" /> Email:
            </strong>{" "}
            {perfil.email}
          </p>
          <p>
            <strong>
              <FaGraduationCap className="inline text-yellow-500" /> Escuela:
            </strong>{" "}
            {perfil.escuela}
          </p>
          <p>
            <strong>
              <FaTag className="inline text-red-500" /> Rol:
            </strong>{" "}
            {perfil.rol}
          </p>
        </div>
      )}

      {/* 2. REPORTES */}
      <div className="bg-white shadow rounded-2xl p-4">
        <h3 className="font-semibold mb-4">
          Reportes en Revisión o Rechazados
        </h3>

        {reportes.filter(
          (r) => r.estado === "En revisión" || r.estado === "Rechazado"
        ).length === 0 ? (
          <p className="text-gray-600">
            No tienes reportes pendientes o rechazados.
          </p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2">Categoría</th>
                <th className="p-2">Descripción</th>
                <th className="p-2">Comentarios</th>
                <th className="p-2">Horas</th>
                <th className="p-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {reportes
                .filter(
                  (r) => r.estado === "En revisión" || r.estado === "Rechazado"
                )
                .map((r) => (
                  <tr key={r.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{r.categoria}</td>
                    <td className="p-2">{r.descripcion}</td>
                    <td className="p-2 text-gray-700">{r.comentarios}</td>
                    <td className="p-2">{r.horas}</td>
                    <td
                      className={`p-2 font-semibold ${
                        r.estado === "Rechazado"
                          ? "text-red-500"
                          : "text-orange-500"
                      }`}
                    >
                      {r.estado}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
