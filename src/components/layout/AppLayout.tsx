
import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
