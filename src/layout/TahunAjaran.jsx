import { useEffect, useState } from "react";

export default function TahunAjaran() {
  const [tahunAjaran, setTahunAjaran] = useState("");

  // Generate opsi tahun otomatis
  const generateOptions = () => {
    const tahunSekarang = new Date().getFullYear();
    let list = [];

    for (let i = tahunSekarang - 2; i <= tahunSekarang + 2; i++) {
      list.push(`${i}/${i + 1}`);
    }

    return list;
  };

  // Inisialisasi seperti session PHP
  useEffect(() => {
    const saved = localStorage.getItem("tahun_ajaran");

    if (saved) {
      setTahunAjaran(saved);
    } else {
      const now = new Date();
      const tahunSekarang = now.getFullYear();
      const bulanSekarang = now.getMonth() + 1;

      const tahunAwalAktif =
        bulanSekarang >= 7 ? tahunSekarang : tahunSekarang - 1;

      const aktif = `${tahunAwalAktif}/${tahunAwalAktif + 1}`;

      setTahunAjaran(aktif);
      localStorage.setItem("tahun_ajaran", aktif);
    }
  }, []);

  // Handle perubahan dropdown
  const handleChange = (e) => {
    const value = e.target.value;
    setTahunAjaran(value);
    localStorage.setItem("tahun_ajaran", value);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Tahun Ajaran:</span>

      <select
        value={tahunAjaran}
        onChange={handleChange}
        className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-700 text-white dark:bg-gray-700 dark:text-white"
      >
        {generateOptions().map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}
