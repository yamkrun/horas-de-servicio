import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Student from "./pages/Student";
import Register from "./pages/Register";
import UpdateProfile from "./pages/UpdateProfile";
import CreateService from "./pages/CreateService";
import EvidenceViewer from "./pages/EvidenceViewer";
import { AuthProvider } from "./context/auth/AuthProvider.jsx";
import StudentProfile from "./pages/StudentProfile.jsx";
import EditService from "./pages/EditService.jsx";
import Services from "./pages/Services.jsx";
import AdminProtectedRoute from "./auth/AdminProtectedRoute";
import StudentProtectedRoute from "./auth/StudentProtectedRoute";
import AdminLayout from "./layout/AdminLayout";
import StudentLayout from "./layout/StudentLayout";

export default function App() {
  console.log("Rendering App Component");
  return (
    <AuthProvider>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas para Admin */}
        <Route element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/studentprofile/:id" element={<StudentProfile />} />
            <Route path="/services" element={<Services />} />
          </Route>
        </Route>

        {/* Rutas protegidas para Student */}
        <Route element={<StudentProtectedRoute />}>
          <Route element={<StudentLayout />}>
            <Route path="/student" element={<Student />} />
            <Route path="/student/create-service" element={<CreateService />} />
            <Route path="/student/evidence/:id" element={<EvidenceViewer />} />
            <Route path="/student/edit-service/:id" element={<EditService />} />
            <Route path="/updateprofile" element={<UpdateProfile />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}
