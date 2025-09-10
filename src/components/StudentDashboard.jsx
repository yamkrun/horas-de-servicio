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
    </div>
  );
}
