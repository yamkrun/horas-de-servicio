import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Student from "./pages/Student";
import Register from "./pages/Register";
import UpdateProfile from "./pages/UpdateProfile";
import Layout from "./layout/Layout";
import CreateService from "./pages/CreateService";
import EvidenceViewer from "./pages/EvidenceViewer";
import { AuthProvider } from "./context/auth/AuthProvider.jsx";
import StudentProfile from "./pages/StudentProfile.jsx";
import EditService from "./pages/EditService.jsx";

export default function App() {
  return (
    <AuthProvider>
      <div className="bg-[#f2f3f7]">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/student" element={<Student />} />
            <Route path="/student/create-service" element={<CreateService />} />
            <Route path="/student/evidence/:id" element={<EvidenceViewer />} />
            <Route path="/register" element={<Register />} />
            <Route path="/updateprofile" element={<UpdateProfile />} />
            <Route path="/studentprofile/:id" element={<StudentProfile />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}
