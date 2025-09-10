import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import StudentSidebar from "../components/StudentSidebar";

export default function StudentLayout() {
  return (
    <div className="min-h-screen bg-[#f2f3f7] flex">
      <StudentSidebar />
      <div className="flex-1">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
