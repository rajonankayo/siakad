import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSchool,
  faBook,
  faChalkboardTeacher,
  faUserGraduate,
  faUsers,
  faLayerGroup,
  faMosque,
  faHandsHelping,
  faFutbol,
  faCalendarCheck,
  faQuran,
  faBookOpen,
  faCalendarDay,
  faClipboardCheck,
  faBullhorn,
  faCogs,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";

function SidebarAdministrator({ dark, setDark, className = "" }) {
  const navigate = useNavigate();

  const [session, setSession] = useState(() => {
    const stored = localStorage.getItem("session");
    return stored ? JSON.parse(stored) : null;
  });

  const [role, setRole] = useState(
    localStorage.getItem("activeRole") ||
      JSON.parse(localStorage.getItem("session"))?.role,
  );

  // 🔥 SYNC realtime kalau role berubah
  useEffect(() => {
    const syncRole = () => {
      setRole(localStorage.getItem("activeRole"));
      setSession(JSON.parse(localStorage.getItem("session")));
    };

    window.addEventListener("user-login", syncRole);
    window.addEventListener("role-change", syncRole);
    window.addEventListener("storage", syncRole);

    return () => {
      window.removeEventListener("user-login", syncRole);
      window.removeEventListener("role-change", syncRole);
      window.removeEventListener("storage", syncRole);
    };
  }, []);

  if (!session) return null;

  // 🔥 GANTI LEVEL
  const handleChangeLevel = async () => {
    const levels = Array.isArray(session.level)
      ? session.level
      : session.level.split(",").map((l) => l.trim());

    const { value: selectedLevel } = await Swal.fire({
      title: "Pilih Level",
      input: "select",
      inputOptions: levels.reduce((acc, lvl) => {
        acc[lvl] = lvl;
        return acc;
      }, {}),
      confirmButtonText: "Pilih",
      allowOutsideClick: false,
    });

    if (!selectedLevel) return;

    // 🔥 simpan role baru
    localStorage.setItem("activeRole", selectedLevel);

    // 🔥 trigger semua sidebar & layout update
    window.dispatchEvent(new Event("role-change"));
    window.dispatchEvent(new Event("user-login"));
  };

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("user-logout"));
    navigate("/login", { replace: true });
  };

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-sm transition ${
      isActive
        ? "bg-white text-blue-700 font-semibold"
        : "hover:text-blue-700 hover:bg-white dark:hover:bg-white dark:hover:text-blue-700"
    }`;

  return (
    <nav
      className={`min-h-screen w-64 bg-blue-600 text-white dark:bg-gray-800 dark:text-gray-200 flex flex-col p-4 ${className}`}
    >
      {/* ROLE INFO */}
      <div className="text-xs font-bold mb-1">Level Login:</div>

      <div className="flex flex-col items-center gap-2 mb-6">
        <span className="text-xl font-bold bg-blue-900 w-full p-1 rounded-md text-center">
          {role || "Tidak ada role"}
        </span>

        <button
          onClick={handleChangeLevel}
          className="text-xs text-black bg-yellow-300 p-1 rounded-md hover:bg-yellow-400"
        >
          Ganti Level
        </button>
      </div>

      {/* MENU */}
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

        <NavLink to="/data_kelas" className={linkClass}>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUsers} />
            Data Kelas
          </span>
        </NavLink>

        <NavLink to="/data_kelompok_quran" className={linkClass}>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faQuran} />
            Data Kelompok Al-Quran
          </span>
        </NavLink>

        <NavLink to="/data_kelompok_bpi" className={linkClass}>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faHandsHelping} />
            Data Kelompok BPI
          </span>
        </NavLink>

        <NavLink to="/data_ekskul" className={linkClass}>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faFutbol} />
            Data Ekstrakurikuler
          </span>
        </NavLink>

        <NavLink to="/kegiatan_kompre" className={linkClass}>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faClipboardCheck} />
            Kegiatan Kompre
          </span>
        </NavLink>

        <NavLink to="/kegiatan_khatam" className={linkClass}>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faMosque} />
            Kegiatan Khatam
          </span>
        </NavLink>

        <NavLink to="/perpustakaan_digital" className={linkClass}>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faBookOpen} />
            Perpustakaan Digital
          </span>
        </NavLink>

        <NavLink to="/agenda_kegiatanku" className={linkClass}>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCalendarCheck} />
            Agenda Kegiatanku
          </span>
        </NavLink>

        <NavLink to="/agenda_kegiatan_pagi" className={linkClass}>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCalendarDay} />
            Agenda Kegiatan Pagi
          </span>
        </NavLink>

        <NavLink to="/tim_pemeriksa_soal" className={linkClass}>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faClipboardCheck} />
            Tim Pemeriksa Soal
          </span>
        </NavLink>

        <NavLink to="/informasi_sekolah" className={linkClass}>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faBullhorn} />
            Informasi Sekolah
          </span>
        </NavLink>

        <NavLink to="/informasi_pengembangan_siakad" className={linkClass}>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCogs} />
            Informasi Pengembangan SIAKAD
          </span>
        </NavLink>

        <NavLink to="/pengaturan_user" className={linkClass}>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUserCog} />
            Pengaturan User
          </span>
        </NavLink>
      </div>
    </nav>
  );
}

export default SidebarAdministrator;
