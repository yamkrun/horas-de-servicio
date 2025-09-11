import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import AdminSidebar from "../components/AdminSidebar";
import Footer from "../components/Footer";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#f2f3f7] flex flex-row">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
