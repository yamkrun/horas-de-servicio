import { FiSearch } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import useData from "../Hooks/useData";
import TableUsers from "../components/TableUsers";

export default function Admin() {
  const { data, loading, error } = useData();

  if (loading) return <p className="p-6">Cargando usuarios...</p>;
  if (error)
    return <p className="p-6 text-red-500">Error al cargar: {error.message}</p>;

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
          <TableUsers data={data} />
          <h2 className="text-2xl font-bold p-10 flex items-center gap-2">
            <FiChevronDown />
            Controllers List
          </h2>
          <TableUsers data={data} />
          <h2 className="text-2xl font-bold p-10 flex items-center gap-2">
            <FiChevronDown />
            Recruiter
          </h2>
          <TableUsers data={data} />
          <div className="flex flex-col md:flex-row md:items-center  md:justify-between px-10">
            <h2 className="text-2xl font-bold my-10 flex items-center gap-2">
              <FiChevronDown /> Students List
            </h2>
            <button className="px-6 py-2 bg-blue-800 w-50 text-white rounded-lg hover:bg-blue-600 cursor-pointer focus:bg-blue-600 transition">
              Add Student
            </button>
          </div>
          <TableUsers data={data} />
        </div>
      </main>
    </>
  );
}
