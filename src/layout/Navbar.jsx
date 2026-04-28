import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Navbar({ dark, setDark }) {
  const [openSettings, setOpenSettings] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // ambil user
  useEffect(() => {
    const loadUser = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };

    loadUser();

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
    setUser(null);
    window.dispatchEvent(new Event("user-logout"));
    navigate("/login", { replace: true });
  };

  const linkClass = ({ isActive }) =>
    `block px-2 py-1 rounded-md ${
      isActive
        ? "text-blue-600 dark:text-blue-400 font-semibold"
        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
    }`;

  return (
    <nav className="bg-white dark:bg-gray-900 px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-10xl mx-auto">

        {/* BRAND */}
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          SIAKAD Adzkia
        </h1>

      

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

         {/* Tahun Ajaran (Desktop only) */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-sm font-medium">Tahun Ajaran:</span>
          <select className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>2023/2024</option>
            <option>2024/2025</option>
            <option>2025/2026</option>
          </select>
        </div>
          

          {/* DARK MODE */}
          <button
            onClick={() => setDark(!dark)}
            className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-sm"
          >
            {dark ? "☀️" : "🌙"}
          </button>

          {/* HAMBURGER */}
          <button
            className="md:hidden flex flex-col justify-between w-7 h-6 group"
            onClick={() => setOpenMobile(!openMobile)}
          >
            {/* Line 1 */}
            <span
              className={`h-1 w-full bg-black dark:bg-white rounded transition-all duration-300 origin-left
              ${openMobile ? "rotate-45 translate-y" : ""}`}
            ></span>

            {/* Line 2 */}
            <span
              className={`h-1 w-full bg-black dark:bg-white rounded transition-all duration-300
              ${openMobile ? "opacity-0" : "opacity-100"}`}
            ></span>

            {/* Line 3 */}
            <span
              className={`h-1 w-full bg-black dark:bg-white rounded transition-all duration-300 origin-left
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
              <span className="block text-sm mb-1">Tahun Ajaran</span>
              <select className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>2023/2024</option>
                <option>2024/2025</option>
                <option>2025/2026</option>
              </select>
            </div>

            <NavLink to="/" className={linkClass}>Dashboard</NavLink>
            <NavLink to="/service" className={linkClass}>Data Sekolah</NavLink>
            <NavLink to="/blog" className={linkClass}>Data Kurikulum</NavLink>
            <NavLink to="/contact" className={linkClass}>Data Guru</NavLink>
            <NavLink to="/about" className={linkClass}>Data Siswa</NavLink>
            <NavLink to="/about" className={linkClass}>Data Kelas</NavLink>
            <NavLink to="/about" className={linkClass}>Data Kelompok Al-Quran</NavLink>
            <NavLink to="/about" className={linkClass}>Data Kelompok BPI</NavLink>
            <NavLink to="/about" className={linkClass}>Data Ektrakurikuler</NavLink>
            <NavLink to="/about" className={linkClass}>Kegiatan Kompre</NavLink>
            <NavLink to="/about" className={linkClass}>Kegiatan Khatam</NavLink>
            <NavLink to="/about" className={linkClass}>Perpustakaan Digital</NavLink>
            <NavLink to="/about" className={linkClass}>Tim Pemeriksa Soal</NavLink>
            <NavLink to="/about" className={linkClass}>Informasi Sekolah</NavLink>
            <NavLink to="/about" className={linkClass}>Informasi Pengembangan Siakad</NavLink>
            <NavLink to="/about" className={linkClass}>Pengaturan User</NavLink>

            {/* MOBILE PENGATURAN */}
            <div className="border-t pt-2">
              {user ? (
                <>
                  <NavLink to="/profile" className={linkClass}>Profile</NavLink>
                  <NavLink to="/account" className={linkClass}>Account</NavLink>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-red-500 px-2 py-1"
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;