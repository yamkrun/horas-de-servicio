import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import StudentSidebar from "../components/StudentSidebar";
import Footer from "../components/Footer";
import { useState } from "react";
export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <div className="min-h-screen bg-[#f2f3f7] flex">
      <div
        className={`
                fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen
              `}
      >
        <StudentSidebar />
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/10 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 py-6 px-2 md:px-6 overflow-x-auto overflow-y-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
