import { motion } from "framer-motion";
import { useState } from "react";
import { MessageCircle } from "lucide-react";

/* =========================
   FLOATING WHATSAPP BUTTON
========================= */
export function WhatsAppFloatButton() {
  const getWhatsAppLink = (phone, message) => {
    const encodedMessage = encodeURIComponent(message);

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      return `https://wa.me/${phone}?text=${encodedMessage}`;
    }

    // desktop → paksa WhatsApp Web
    return `https://web.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;
  };

  const phone = "6282389289028";
  const message = "Halo, saya tertarik dengan layanan Anda. Bisa kita diskusikan?";

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center gap-2">
      <a
        href={getWhatsAppLink(
          "6282389289028",
          "Halo, saya tertarik dengan layanan Anda"
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
      >
        <MessageCircle size={26} />
      </a>

      <span className="text-sm bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow text-gray-700 dark:text-gray-200">
        Chat kami
      </span>
    </div>
    
  );
}

/* =========================
   MAIN CONTACT PAGE
========================= */
export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 🔥 optional safety: disable kalau kosong
  const isValid = form.name && form.email && form.message;

  const waMessage = `Halo, saya ${form.name}

📧 Email: ${form.email}

💬 Pesan:
${form.message}`;

  return (
    <>
    <WhatsAppFloatButton />
      <div className="min-h-screen py-16 px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
            Let’s Build Something Great 🚀
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">
            Kirim pesan dan mari kita diskusikan project kamu.
          </p>
        </motion.div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

          {/* CONTACT INFO */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
              Contact Info
            </h2>

            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>Email: rajonankayo30@gmail.com</p>
            
              <p>Location: Indonesia</p>
            </div>
          </motion.div>

          {/* FORM */}
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6"
          >

            {/* NAME */}
            <div className="relative">
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="peer w-full p-3 border rounded-lg bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="absolute left-3 top-3 text-gray-500 dark:text-gray-400 text-sm 
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 
                peer-valid:-top-2 peer-valid:text-xs bg-white dark:bg-gray-800 px-1 transition-all">
                Name
              </label>
            </div>

            {/* EMAIL */}
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="peer w-full p-3 border rounded-lg bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="absolute left-3 top-3 text-gray-500 dark:text-gray-400 text-sm 
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 
                peer-valid:-top-2 peer-valid:text-xs bg-white dark:bg-gray-800 px-1 transition-all">
                Email
              </label>
            </div>

            {/* MESSAGE */}
            <div className="relative">
              <textarea
                name="message"
                required
                rows="4"
                value={form.message}
                onChange={handleChange}
                className="peer w-full p-3 border rounded-lg bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="absolute left-3 top-3 text-gray-500 dark:text-gray-400 text-sm 
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 
                peer-valid:-top-2 peer-valid:text-xs bg-white dark:bg-gray-800 px-1 transition-all">
                Message
              </label>
            </div>

            {/* BUTTON (FIXED PROPER WAY) */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={isValid ? getWhatsAppLink("6282389289028", waMessage) : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`block text-center w-full py-3 rounded-lg font-semibold shadow-md transition
                ${isValid
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                  : "bg-gray-400 text-white pointer-events-none opacity-60"
                }`}
            >
              Send via WhatsApp
            </motion.a>

          </motion.form>
        </div>
      </div>

      {/* GLOBAL FLOAT BUTTON (BEST PRACTICE) */}
      <WhatsAppFloatButton />
    </>
  );
}