import React from 'react';
import TableUsers from '../../components/TableUsers';
import { useLocation } from 'react-router-dom';

export default function AdminUsers({ data, role }) {
  const location = useLocation();
  const currentPath = location.pathname;

  let title = "Usuarios";
  if (currentPath.includes("administrators")) {
    title = "Administradores";
  } else if (currentPath.includes("controllers")) {
    title = "Controllers";
  } else if (currentPath.includes("recruiters")) {
    title = "Recruiters";
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <TableUsers data={data} filterRole={role} />
    </div>
  );
}
