import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Data_Guru() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-6 transition-colors duration-500">
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl transition"
      >
        <motion.h1
          variants={item}
          className="text-3xl font-bold text-gray-800 dark:text-white mb-4"
        >
          Tentang Saya
        </motion.h1>

        <motion.p
          variants={item}
          className="text-gray-600 dark:text-gray-300 leading-relaxed"
        >
          Saya adalah seseorang yang memiliki minat besar dalam dunia coding, khususnya dalam pengembangan web menggunakan React. 
          Saya senang belajar hal-hal baru, mencoba teknologi terbaru, dan membangun aplikasi yang bermanfaat.
        </motion.p>

        <motion.p
          variants={item}
          className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4"
        >
          Bagi saya, coding bukan hanya sekadar menulis baris kode, tetapi juga tentang memecahkan masalah dan menciptakan sesuatu dari nol. 
          Setiap error adalah pelajaran, dan setiap solusi adalah pencapaian.
        </motion.p>

        <motion.p
          variants={item}
          className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4"
        >
          Saya terus berusaha meningkatkan kemampuan saya agar bisa menjadi developer yang lebih baik dan profesional di masa depan.
        </motion.p>
      </motion.div>
    </div>
  );
}