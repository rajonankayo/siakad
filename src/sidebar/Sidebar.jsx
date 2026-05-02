import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSchool,
  faBook,
  faChalkboardTeacher,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar({ dark, setDark, className = "" }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };

    window.addEventListener("storage", loadUser);
    window.addEventListener("user-login", loadUser);
    window.addEventListener("user-logout", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("user-login", loadUser);
      window.removeEventListener("user-logout", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("user-logout"));
    navigate("/login", { replace: true });
  };

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-sm transition ${
      isActive
        ? "bg-white text-blue-700 font-semibold"
        : "text-gray-200 hover:bg-blue-600"
    }`;

  if (!user) return null;

  return (
    <nav
      className={`min-h-screen w-64 bg-blue-600 text-white dark:bg-gray-800 dark:text-gray-200 flex flex-col p-4 ${className}`}
    >
      <div className="flex items-start text-xs font-bold mb-0">
        Level Login:
      </div>

      <div className="flex flex-col items-center gap-2 mb-6">
        <span className="text-2xl font-bold bg-blue-900 w-full p-1 rounded-md text-center">
          Tes
        </span>
        <button className="text-xs text-black bg-yellow-300 p-1 rounded-md hover:bg-yellow-400">
          Ganti Level
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <NavLink to="/" className={linkClass}>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faHome} />
            Dashboard
          </span>
        </NavLink>

        <NavLink to="/data_sekolah" className={linkClass}>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faSchool} />
            Data Sekolah
          </span>
        </NavLink>

        <NavLink to="/data_kurikulum" className={linkClass}>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faBook} />
            Data Kurikulum
          </span>
        </NavLink>

        <NavLink to="/data_guru" className={linkClass}>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faChalkboardTeacher} />
            Data Guru
          </span>
        </NavLink>

        <NavLink to="/data_siswa" className={linkClass}>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUserGraduate} />
            Data Siswa
          </span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Sidebar;
