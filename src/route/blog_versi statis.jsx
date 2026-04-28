import { motion } from "framer-motion";

const posts = [
  {
    title: "Belajar React dari Nol sampai Bisa",
    category: "React",
    date: "20 April 2026",
    excerpt:
      "Panduan lengkap belajar React untuk pemula, mulai dari komponen hingga state management.",
  },
  {
    title: "Tips Menjadi Frontend Developer Profesional",
    category: "Career",
    date: "18 April 2026",
    excerpt:
      "Beberapa tips penting yang harus kamu kuasai agar bisa menjadi frontend developer yang siap kerja.",
  },
  {
    title: "Kenapa Tailwind CSS Sangat Populer?",
    category: "CSS",
    date: "15 April 2026",
    excerpt:
      "Membahas kenapa Tailwind CSS menjadi pilihan utama banyak developer modern.",
  },
];

// container animation (stagger list)
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// item animation (card)
const item = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Blog() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-6 transition-colors duration-500">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Blog Saya
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Artikel seputar coding, teknologi, dan pengalaman belajar saya
        </p>
      </motion.div>

      {/* LIST BLOG */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto space-y-6"
      >
        {posts.map((post, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer"
          >
            {/* CATEGORY + DATE */}
            <div className="flex justify-between items-center text-sm mb-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                {post.category}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {post.date}
              </span>
            </div>

            {/* TITLE */}
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              {post.title}
            </h2>

            {/* EXCERPT */}
            <p className="text-gray-600 dark:text-gray-300">
              {post.excerpt}
            </p>

            {/* READ MORE */}
            <p className="mt-4 text-blue-600 dark:text-blue-400 font-medium hover:underline">
              Read more →
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}