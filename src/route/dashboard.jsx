import { useState } from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";

import reactLogo from "./../assets/react.svg";
import viteLogo from "./../assets/vite.svg";
import heroImg from "./../assets/hero.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

// animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Dashboard() {
  const [session, setSession] = useState(() => {
    const stored = localStorage.getItem("session");
    return stored ? JSON.parse(stored) : null;
  });

  const role = localStorage.getItem("activeRole") || session?.role;

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

  return (
    <>
      {session && (
        <div className="min-h-[100dvh] transition-colors duration-500  bg-white dark:bg-gray-700">
          {/* HERO SECTION */}
          <section className="max-w-6xl mx-auto px-6 py-5 grid md:grid-cols-2 gap-10 items-center">
            {/* TEXT */}
            <motion.div variants={container} initial="hidden" animate="show">
              <motion.h1
                variants={item}
                className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight"
              >
                Dashboard Administrator
              </motion.h1>

              <motion.p
                variants={item}
                className="text-gray-600 dark:text-gray-300 mt-4 text-lg"
              >
                Nanti disini diisi detail halaman dasboard
              </motion.p>
            </motion.div>
          </section>

          {/* FEATURES */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6"
          >
            <motion.div
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                ⚡ Fast Development
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Menggunakan React & Vite untuk performa maksimal.
              </p>
            </motion.div>

            <motion.div
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                🎨 Modern UI
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Desain clean, responsive, dan mengikuti tren UI modern.
              </p>
            </motion.div>

            <motion.div
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                🚀 Scalable
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Mudah dikembangkan menjadi aplikasi besar.
              </p>
            </motion.div>
          </motion.section>

          {/* BRANDING */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-10"
          >
            <h2 className="text-2xl font-bold italic text-red-500 dark:text-yellow-400">
              "Berkarya dengan sepenuh hati, tanpa henti untuk memberi yang
              terbaik"
            </h2>
          </motion.section>
        </div>
      )}
    </>
  );
}
