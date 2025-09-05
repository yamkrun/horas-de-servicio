import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Student from "./pages/Student";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Student" element={<Student />} />
      </Routes>
    </div>
  );
}
