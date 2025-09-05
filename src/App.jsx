import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Student from "./pages/Student";
<<<<<<< Updated upstream
=======
import Register from "./pages/Register";
import Layout from "./layout/Layout";
>>>>>>> Stashed changes

export default function App() {
  return (
    <div>
      <Routes>
<<<<<<< Updated upstream
        <Route path="/" element={<Login />}></Route>
        <Route path="/Admin" element={<Admin />}></Route>
        <Route path="/Student" element={<Student />}></Route>
=======
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Student" element={<Student />} />
          <Route path="/register" element={<Register />} />{" "}
        </Route>
>>>>>>> Stashed changes
      </Routes>
    </div>
  );
}
