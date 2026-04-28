import Swal from "sweetalert2";

// deteksi dark mode (OS + Tailwind fallback)
const isDarkMode = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ||
  document.documentElement.classList.contains("dark");

const swal = {
  fire: (options) => {
    const dark = isDarkMode();

    return Swal.fire({
      ...options,

      background: dark ? "#1e1e1e" : "#ffffff",
      color: dark ? "#ffffff" : "#111111",

      confirmButtonColor: dark ? "#22c55e" : "#16a34a",
    });
  },
};

export default swal;