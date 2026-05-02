import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import logo from "../assets/logo.png";
import Galaxy from "./../komponen/GalaxySection";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [namauser, setNamauser] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fullText = "(Sistem Informasi Akademik)";
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady] = useState(false);
  const [boot, setBoot] = useState(false); // 🔥 FIX WHITE FLASH

  // 🔥 TYPEWRITER
  useEffect(() => {
    const speed = 30;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(fullText.substring(0, index + 1));
        setIndex(index + 1);

        if (index + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), 500);
        }
      } else {
        setTypedText(fullText.substring(0, index - 1));
        setIndex(index - 1);

        if (index === 0) setIsDeleting(false);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [index, isDeleting]);

  // 🔥 MOBILE DETECTION
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 🔥 ANTI WHITE FLASH BOOT LOCK
  useEffect(() => {
    const t = requestAnimationFrame(() => {
      setReady(true);
      setBoot(true);
    });

    return () => cancelAnimationFrame(t);
  }, []);

  // 🔥 LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!namauser || !password) {
      setError("Username dan password wajib diisi");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://siakad.adzkiasumbar.or.id/api/login/login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ namauser, password }),
        },
      );

      const text = await res.text();
      const data = JSON.parse(text);

      if (!res.ok) throw new Error("HTTP error " + res.status);

      if (data.success) {
        const user = data.user;

        // 🔥 convert level jadi array (aman untuk string / array)
        const levels = Array.isArray(user.level)
          ? user.level
          : user.level.split(",").map((l) => l.trim());

        // 🔥 pilihan level dengan SweetAlert2
        const { value: selectedLevel } = await Swal.fire({
          title: "Login sebagai",
          input: "select",
          inputOptions: levels.reduce((acc, level) => {
            acc[level] = level;
            return acc;
          }, {}),
          inputPlaceholder: "Pilih level login",
          showCancelButton: false,
          confirmButtonText: "Masuk",
          allowOutsideClick: false,
        });

        if (!selectedLevel) return;

        // 🔥 simpan session
        const sessionUser = {
          idpengguna: user.idpengguna,
          idpegawai: user.idpegawai,
          nama: user.nama,
          namauser: user.username,
          level: user.level,
          idsekolah: user.idsekolah,
          unit: user.unit,
          status: user.status,
          role: selectedLevel,
        };

        localStorage.setItem("session", JSON.stringify(sessionUser));

        // 🔥 DEBUG LOGIN
        // console.group("🔥 LOGIN DEBUG");
        // console.log("RAW USER API:", user);
        // console.log("SELECTED ROLE:", selectedLevel);
        // console.log("SESSION SAVED:", sessionUser);
        // console.log("LOCALSTORAGE SESSION:", localStorage.getItem("session"));
        // console.groupEnd();

        window.dispatchEvent(new Event("user-login"));
        navigate("/", { replace: true });
      } else {
        setError(data.message || "Login gagal");
      }
    } catch (err) {
      setError("Tidak bisa terhubung ke server");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-gray-700">
      {/* 🔥 GLOBAL BLACK LOCK */}
      <div className="fixed inset-0  z-[-30]" />

      {/* 🔥 HARD BLACK SCREEN UNTIL READY */}
      {/* {!boot && <div className="fixed inset-0 bg-black z-[9999]" />} */}

      {/* 🌌 GALAXY BACKGROUND */}
      {/* <div
        className={`fixed inset-0 z-0 pointer-events-none bg-black transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <Galaxy
          key={isMobile ? "mobile" : "desktop"}
          mouseRepulsion={true}
          mouseInteraction={false}
          density={isMobile ? 0.25 : 0.9}
          glowIntensity={0.35}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.2}
          rotationSpeed={0.01}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.1}
          speed={0.2}
        />
      </div> */}

      {/* LOGIN WRAPPER */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-0 opacity-0 animate-[fadeIn_0.25s_ease-out_forwards]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4 }}
          className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl bg-black/60 backdrop-blur-sm border border-white/20"
        >
          {/* LOGO */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6 sm:mb-8"
          >
            <motion.img
              src={logo}
              className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* TITLE */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white mb-6"
          >
            <div className="text-3xl font-normal">SIAKAD</div>
            <div className="text-base sm:text-xl mt-2">{typedText}|</div>
            <div className="text-sm mt-2">Yayasan Adzkia Sumatera Barat</div>
          </motion.h2>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-3 top-4 text-gray-400"
              />
              <input
                type="text"
                value={namauser}
                onChange={(e) => setNamauser(e.target.value)}
                className="w-full pl-10 pr-4 pt-4 pb-2 rounded-lg bg-black/40 text-white border border-white/20 outline-none"
                placeholder="Username"
              />
            </div>

            <div className="relative">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-3 top-4 text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 pt-4 pb-2 rounded-lg bg-black/40 text-white border border-white/20 outline-none"
                placeholder="Password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 text-gray-300"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
