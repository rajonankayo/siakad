import { FaGithub, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20 transition-colors duration-500">

      <div className="max-w-6xl mx-auto px-6 py-12 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Asriadi Kreatif
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
            Web developer yang fokus membangun website modern, cepat, dan
            responsif dengan teknologi React & Tailwind CSS.
          </p>
        </div>

        <div>

        </div>

        {/* QUICK LINKS */}
        {/* <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Navigasi
          </h3>

          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li className="hover:text-blue-500 transition cursor-pointer">Home</li>
            <li className="hover:text-blue-500 transition cursor-pointer">About</li>
            <li className="hover:text-blue-500 transition cursor-pointer">Service</li>
            <li className="hover:text-blue-500 transition cursor-pointer">Blog</li>
            <li className="hover:text-blue-500 transition cursor-pointer">Contact</li>
          </ul>
        </div> */}

        {/* SOCIAL */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Connect
          </h3>

          <div className="flex gap-4 text-xl text-gray-600 dark:text-gray-400">
            <a href="#" className="hover:text-blue-500 transition">
              <FaGithub />
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-sky-500 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-red-500 transition">
              <FaEnvelope />
            </a>
          </div>

          <p className="text-gray-500 dark:text-gray-500 mt-4 text-sm">
            Open for freelance project & collaboration
          </p>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">

          <p>
            © {new Date().getFullYear()} Asriadi Kreatif. All rights reserved.
          </p>

          <p className="mt-2 md:mt-0">
            Built with ❤️ using React & Tailwind
          </p>

        </div>
      </div>

    </footer>
  );
}