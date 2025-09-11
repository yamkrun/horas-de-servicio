import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import StudentSidebar from "../components/StudentSidebar";
import Footer from "../components/Footer";

export default function StudentLayout() {
  return (
    <div className="min-h-screen bg-[#f2f3f7] flex">
      <StudentSidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
