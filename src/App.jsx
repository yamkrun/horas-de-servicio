import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Admin from "./pages/Admin";
import Student from "./pages/Student";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Admin" element={<Admin />}></Route>
        <Route path="/Student" element={<Student />}></Route>
      </Routes>
    </div>
  );
}
