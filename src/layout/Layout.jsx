import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

import SidebarAdministrator from "../sidebar/SidebarAdministrator";
import SidebarAdminUnit from "../sidebar/SidebarAdminUnit";

function Layout({ dark, setDark }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  // 🔥 load session
  useEffect(() => {
    const sessionRaw = localStorage.getItem("session");

    if (!sessionRaw) {
      setLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(sessionRaw);
      setSession(parsed);
      setRole(localStorage.getItem("activeRole") || parsed.role);
    } catch (err) {
      localStorage.removeItem("session");
      setSession(null);
    }

    setLoading(false);
  }, []);

  // 🔥 listen role change
  useEffect(() => {
    const syncRole = () => {
      setRole(localStorage.getItem("activeRole"));
    };

    window.addEventListener("role-change", syncRole);
    window.addEventListener("storage", syncRole);

    return () => {
      window.removeEventListener("role-change", syncRole);
      window.removeEventListener("storage", syncRole);
    };
  }, []);

  if (loading) return <div className="text-white p-4">Loading...</div>;

  if (!session) return <Navigate to="/login" replace />;

  // 🔥 mapping sidebar
  const sidebarMap = {
    Administrator: SidebarAdministrator,
    "Admin Unit": SidebarAdminUnit,
  };

  const Sidebar = sidebarMap[role] || SidebarAdministrator;

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex min-h-full">
        <Sidebar dark={dark} setDark={setDark} />
      </div>

      <div className="flex-1 p-0 min-h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
