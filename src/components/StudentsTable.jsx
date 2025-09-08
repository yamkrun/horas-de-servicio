import React from "react";
import { useNavigate } from "react-router-dom";

export default function StudentsTable({ data = [] }) {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto p-6">
      <table className=" w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-400">
            <th className="border border-gray-300 px-2 py-3  text-black font-medium">
              Nombre completo
            </th>
            <th className="border border-gray-300 px-4 py-3  text-black font-medium">
              Email
            </th>
            <th className="border border-gray-300 px-4 py-3  text-black font-medium">
              Phone
            </th>
            <th className="border border-gray-300 px-4 py-3  text-black font-medium">
              Escuela
            </th>
            <th className="border border-gray-300 px-4 py-3  text-black font-medium">
              Controller
            </th>
            <th className="border border-gray-300 px-4 py-3  text-black font-medium">
              Recruiter
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((student) => (
              <tr key={student.id}>
                <td
                  onClick={() => navigate("/studentprofile")}
                  className="px-6 py-4  border border-gray-300"
                >
                  {student.full_name || "N/A"}
                </td>
                <td className="px-6 py-4  border border-gray-300">
                  {student.email || "N/A"}
                </td>
                <td className="px-6 py-4  border border-gray-300">
                  {student.phone || "N/A"}
                </td>
                <td className="px-6 py-4  border border-gray-300">
                  {student.schools?.length > 0
                    ? student.schools.map((s) => s.name).join(", ")
                    : "N/A"}
                </td>
                <td className="px-6 py-4  border border-gray-300">
                  {student.student?.controller?.full_name || "N/A"}
                </td>
                <td className="px-6 py-4  border border-gray-300">
                  {student.student?.recruiter?.full_name || "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="px-6 py-4 text-center">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
