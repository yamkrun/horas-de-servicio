import { FiSearch } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import TableUsers from "../components/TableUsers";
import { api } from "../libs/axios";
import { useEffect, useState } from "react";
import StudentsTable from "../components/StudentsTable";

export default function Admin() {
  const navigate = useNavigate();
  const [recruiter, setRecruiter] = useState([]);
  const [controllers, setControllers] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [students, setStudents] = useState([]);
  const handleAddStudent = () => {
    navigate("/register");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [adminRes, controllersRes, recruiterRes, studentsRes] =
          await Promise.all([
            api.get("/users?r=1"),
            api.get("/users?r=2"),
            api.get("/users?r=3"),
            api.get("/students"),
          ]);

        setAdmin(adminRes.data);
        setControllers(controllersRes.data);
        setRecruiter(recruiterRes.data);
        setStudents(studentsRes.data);
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="bg-[#f2f3f7]">
        <div className="pt-10">
          <div className="flex border bg-[#ffffff] border-gray-300 rounded-lg items-center gap-4 w-100 mx-auto">
            <input
              type="text"
              placeholder="Search user..."
              className="flex-1 pl-4 py-2 rounded-lg  outline-none "
            />
            <button className="p-2 bg-blue-800 text-white rounded-r-lg text-2xl hover:bg-blue-600 cursor-pointer focus:bg-blue-600 transition">
              <FiSearch />
            </button>
          </div>
        </div>
        <div className="bg-[#ffffff] my-5 mx-2 rounded-md md:m-10">
          <h2 className="text-2xl font-bold p-10 flex items-center gap-2">
            <FiChevronDown />
            Admin
          </h2>
          <TableUsers data={admin} filterRole={"Admin"} />
          <h2 className="text-2xl font-bold p-10 flex items-center gap-2">
            <FiChevronDown />
            Controllers List
          </h2>
          <TableUsers data={controllers} />
          <h2 className="text-2xl font-bold p-10 flex items-center gap-2">
            <FiChevronDown />
            Recruiter
          </h2>
          <TableUsers data={recruiter} />
          <div className="flex flex-col md:flex-row md:items-center  md:justify-between px-10">
            <h2 className="text-2xl font-bold my-10 flex items-center gap-2">
              <FiChevronDown /> Students List
            </h2>
            <button
              onClick={handleAddStudent}
              className="px-6 py-2 bg-blue-800 w-50 text-white rounded-lg hover:bg-blue-600 cursor-pointer focus:bg-blue-600 transition"
            >
              Add Student
            </button>
          </div>
          <StudentsTable data={students}></StudentsTable>
        </div>
      </main>
    </>
  );
}
