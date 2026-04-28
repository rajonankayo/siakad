import { useState } from "react";
import { motion } from "framer-motion";

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

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">

        {/* TEXT */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            variants={item}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight"
          >
            Build Modern Web Apps with{" "}
            <span className="text-blue-600">React</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-gray-600 dark:text-gray-300 mt-4 text-lg"
          >
            Saya Asriadi, seorang web developer yang fokus membangun website modern,
            cepat, dan responsif menggunakan teknologi terbaru.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-6 flex gap-4"
          >
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:scale-105 transition">
              Get Started
            </button>

            <button className="border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-white px-6 py-3 rounded-lg hover:scale-105 transition">
              View Projects
            </button>
          </motion.div>

          {/* COUNTER */}
          <motion.div variants={item} className="mt-8">
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Mini demo counter:
            </p>

            <button
              onClick={() => setCount(count + 1)}
              className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white font-bold py-2 px-4 rounded"
            >
              Count is {count}
            </button>
          </motion.div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-center items-center"
        >
          <img
            src={heroImg}
            alt="Hero"
            className="w-72 md:w-96 drop-shadow-xl"
          />

          {/* floating logos */}
          <motion.img
            src={reactLogo}
            className="absolute top-0 left-10 w-12"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            alt="React"
          />

          {/* <motion.img
            src={viteLogo}
            className="absolute bottom-0 right-10 w-12"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            alt="Vite"
          /> */}
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
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md"
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
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md"
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
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md"
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
          "Berkarya dengan sepenuh hati, tanpa henti untuk memberi yang terbaik"
        </h2>
      </motion.section>

    </div>
  );
}