import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Student from "./pages/Student";
import Layout from "./layout/Layout";

export default function App() {
  return (
    <div className="bg-[#f2f3f7]">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Student" element={<Student />} />
         </Route>
      </Routes>
    </div>
  );
}
