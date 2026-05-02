import { useEffect, useState } from "react";

import SidebarAdministrator from "../sidebar/SidebarAdministrator";
import SidebarAdminUnit from "../sidebar/SidebarAdminUnit";

function ChangeSidebar({ dark, setDark }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionRaw = localStorage.getItem("session");

    console.log("🔥 SESSION RAW:", sessionRaw);

    if (!sessionRaw) {
      console.warn("❌ SESSION KOSONG");
      setSession(null);
      setLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(sessionRaw);
      console.log("🔥 SESSION PARSED:", parsed);

      setSession(parsed);
    } catch (err) {
      console.error("❌ SESSION RUSAK:", err);
      localStorage.removeItem("session");
      setSession(null);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="text-white p-2">Loading sidebar...</div>;
  }

  if (!session) {
    return null;
  }

  const role = localStorage.getItem("activeRole") || session?.role;

  console.log("🔥 ROLE:", role);

  const sidebarMap = {
    Administrator: SidebarAdministrator,
    "Admin Unit": SidebarAdminUnit,
  };

  const Sidebar = sidebarMap[role] || SidebarAdministrator;

  return <Sidebar dark={dark} setDark={setDark} />;
}

export default ChangeSidebar;
