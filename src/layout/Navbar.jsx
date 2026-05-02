import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";
import TahunAjaran from "../layout/TahunAjaran";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSchool,
  faBook,
  faChalkboardTeacher,
  faUserGraduate,
  faUsers,
  faMosque,
  faList,
  faStar,
  faCheck,
  faBookOpen,
  faUserShield,
  faCircleInfo,
  faCode,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";

function Navbar({ dark, setDark }) {
  const [openSettings, setOpenSettings] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [session, setSession] = useState(() => {
    const stored = localStorage.getItem("session");
    return stored ? JSON.parse(stored) : null;
  });

  const role = localStorage.getItem("activeRole") || session?.role;

  const navigate = useNavigate();

  useEffect(() => {
    const loadSession = () => {
      const stored = localStorage.getItem("session");
      setSession(stored ? JSON.parse(stored) : null);
    };

    loadSession();

    window.addEventListener("storage", loadSession);
    window.addEventListener("user-login", loadSession);
    window.addEventListener("user-logout", loadSession);

    const interval = setInterval(loadSession, 500);

    return () => {
      window.removeEventListener("storage", loadSession);
      window.removeEventListener("user-login", loadSession);
      window.removeEventListener("user-logout", loadSession);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("session");
    localStorage.removeItem("activeRole");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("user-logout"));
    navigate("/login", { replace: true });
  };

  const linkClass = ({ isActive }) =>
    `block px-2 py-1 rounded-md ${
      isActive
        ? "text-white bg-blue-500 dark:text-white dark:bg-blue-500 font-semibold"
        : "text-gray-700 hover:text-white hover:bg-blue-500 dark:text-gray-300  dark:hover:text-white dark:hover:bg-blue-500"
    }`;

  return (
    <>
      {session && (
        <nav className="bg-blue-700 text-white dark:bg-gray-900 px-6 py-4 shadow-md">
          <div className="flex justify-between items-center max-w-10xl mx-auto">
            {/* BRAND */}
            <h1 className="flex items-center gap-2 text-xl font-bold text-white dark:text-blue-400">
              <img
                src={logo}
                alt="Logo SIAKAD"
                className="w-8 h-8 object-contain"
              />
              <div className="hidden lg:flex items-center gap-2">
                Sistem Informasi Akademik(SIAKAD) Adzkia
              </div>
              <div className="lg:hidden flex items-center gap-2">
                SIAKAD ADZKIA
              </div>
            </h1>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3">
              {/* Tahun Ajaran (Desktop only) */}
              <div className="hidden md:flex items-center gap-2">
                <TahunAjaran /> {/* ⬅️ untuk menggunakan tahun ajaran */}
              </div>

              {/* DARK MODE */}
              <button
                onClick={() => setDark(!dark)}
                className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-sm"
              >
                {dark ? "☀️" : "🌙"}
              </button>

              {/* USER (Desktop only) */}
              <div className="hidden md:flex items-center gap-3">
                {session ? (
                  <>
                    <span className="text-sm font-medium text-white dark:text-gray-200">
                      {session?.nama}
                    </span>

                    <button
                      onClick={handleLogout}
                      className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    className="text-sm text-white hover:underline"
                  >
                    Login
                  </NavLink>
                )}
              </div>

              {/* HAMBURGER */}
              <button
                className="md:hidden flex flex-col justify-between w-7 h-6 group"
                onClick={() => setOpenMobile(!openMobile)}
              >
                {/* Line 1 */}
                <span
                  className={`h-1 w-full bg-white dark:bg-white rounded transition-all duration-300 origin-left
              ${openMobile ? "rotate-45 translate-y" : ""}`}
                ></span>

                {/* Line 2 */}
                <span
                  className={`h-1 w-full bg-white dark:bg-white rounded transition-all duration-300
              ${openMobile ? "opacity-0" : "opacity-100"}`}
                ></span>

                {/* Line 3 */}
                <span
                  className={`h-1 w-full bg-white dark:bg-white rounded transition-all duration-300 origin-left
              ${openMobile ? "-rotate-45 -translate-y" : ""}`}
                ></span>
              </button>
            </div>
          </div>

          {/* MOBILE MENU */}
          <AnimatePresence>
            {openMobile && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden mt-4 space-y-2"
              >
                {/* Tahun Ajaran (Mobile) */}
                <div className="border-b pb-2 mb-2">
                  <TahunAjaran /> {/* ⬅️ menggunakan tahun ajaran */}
                </div>

                {/* MOBILE PENGATURAN */}
                <div className="border-b pb-2 mb-2">
                  {session ? (
                    <>
                      <div className="flex items-start text-xs font-bold mb-0">
                        Level Login:
                      </div>

                      <div className="flex flex-col items-center gap-2 mb-6">
                        <span className="text-2xl font-bold bg-blue-900 w-full p-1 rounded-md text-center">
                          {role || "Tidak ada role"}
                        </span>
                        <button className="text-xs text-black bg-yellow-300 p-1 rounded-md hover:bg-yellow-400">
                          Ganti Level
                        </button>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-2 py-1 hover:bg-red-700 hover:text-white rounded-md"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <NavLink to="/login" className={linkClass}>
                      Login
                    </NavLink>
                  )}
                </div>

                <NavLink to="/" className={linkClass}>
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faHome} />
                    Dashboard
                  </span>
                </NavLink>

                <NavLink to="/service" className={linkClass}>
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faSchool} />
                    Data Sekolah
                  </span>
                </NavLink>

                <NavLink to="/blog" className={linkClass}>
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faBook} />
                    Data Kurikulum
                  </span>
                </NavLink>

                <NavLink to="/contact" className={linkClass}>
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faChalkboardTeacher} />
                    Data Guru
                  </span>
                </NavLink>

                <NavLink to="/about" className={linkClass}>
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faUserGraduate} />
                    Data Siswa
                  </span>
                </NavLink>

                <NavLink to="/about" className={linkClass}>
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faUsers} />
                    Data Kelas
                  </span>
                </NavLink>

                <NavLink to="/about" className={linkClass}>
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faMosque} />
                    Kelompok Al-Quran
                  </span>
                </NavLink>

                <NavLink to="/about" className={linkClass}>
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faList} />
                    Kelompok BPI
                  </span>
                </NavLink>

                <NavLink to="/about" className={linkClass}>
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faStar} />
                    Ekstrakurikuler
                  </span>
                </NavLink>

                <NavLink to="/about" className={linkClass}>
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCheck} />
                    Kegiatan Kompre
                  </span>
                </NavLink>

                <NavLink to="/about" className={linkClass}>
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCheck} />
                    Kegiatan Khatam
                  </span>
                </NavLink>

                <NavLink to="/about" className={linkClass}>
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faBookOpen} />
                    Perpustakaan Digital
                  </span>
                </NavLink>

                <NavLink to="/about" className={linkClass}>
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faUserShield} />
                    Tim Pemeriksa Soal
                  </span>
                </NavLink>
                <NavLink to="/about" className={linkClass}>
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCircleInfo} />
                    Informasi Sekolah
                  </span>
                </NavLink>

                <NavLink to="/about" className={linkClass}>
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCode} />
                    Informasi Pengembangan Siakad
                  </span>
                </NavLink>

                <NavLink to="/about" className={linkClass}>
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faUserGear} />
                    Pengaturan User
                  </span>
                </NavLink>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      )}
    </>
  );
}

export default Navbar;
