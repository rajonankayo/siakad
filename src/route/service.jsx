import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

const services = [
  {
    title: "Pembuatan Website Company Profile",
    desc: "Website profesional untuk bisnis, UMKM, atau perusahaan agar lebih terpercaya di dunia digital.",
    icon: "🌐",
  },
  {
    title: "Pengembangan Aplikasi Web",
    desc: "Membangun aplikasi web modern menggunakan React seperti dashboard, sistem admin, dan SaaS.",
    icon: "💻",
  },
  {
    title: "Landing Page Conversion",
    desc: "Desain landing page yang fokus pada penjualan dan konversi untuk produk atau jasa kamu.",
    icon: "🚀",
  },
  {
    title: "Maintenance & Improvement",
    desc: "Perbaikan, update fitur, dan optimasi website agar lebih cepat dan aman.",
    icon: "🛠️",
  },
];

// animation
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// TABLE CONFIG
const columns = [
  {
    header: "Layanan",
    accessorKey: "name",
  },
  {
    header: "Fitur",
    accessorKey: "features",
  },
  {
    header: "Harga",
    accessorKey: "price",
  },
];

// DATA AWAL (simulasi database)
const initialData = [
  {
    id: 1,
    name: "Company Profile",
    features: "5 Halaman, Responsive, SEO Basic",
    price: "Rp 1.500.000",
  },
  {
    id: 2,
    name: "Web App",
    features: "Dashboard, Auth, Database",
    price: "Rp 3.000.000",
  },
  {
    id: 3,
    name: "Landing Page",
    features: "1 Halaman, High Conversion",
    price: "Rp 800.000",
  },
];

export default function Service() {
  const [filterText, setFilterText] = useState("");
  const [sorting, setSorting] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // simulasi fetch data
  useEffect(() => {
    setTimeout(() => {
      setData(initialData);
      setLoading(false);
    }, 1000);
  }, []);

  // filter
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [data, filterText]);

  const memoColumns = useMemo(() => columns, []);

  const table = useReactTable({
    data: filteredData,
    columns: memoColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

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
          Layanan Saya
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-3">
          Solusi digital untuk kebutuhan website dan aplikasi modern
        </p>
      </motion.div>

      {/* SERVICE GRID */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <div className="text-3xl mb-3">{service.icon}</div>

            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              {service.title}
            </h2>

            <p className="text-gray-600 dark:text-gray-300">
              {service.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center mt-16 bg-blue-600 dark:bg-blue-700 text-white p-10 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-2">
          Punya Ide Project?
        </h2>
        <p className="mb-6">
          Saya siap membantu membangun website atau aplikasi web impian kamu.
        </p>

        <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:scale-105 transition">
          Hubungi Saya
        </button>
      </motion.div>

      {/* TABLE */}
      <div className="max-w-5xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Paket Layanan
        </h2>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Cari layanan..."
            className="mb-4 w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />

          {/* LOADING */}
          {loading ? (
            <p className="text-center text-gray-500 p-4">Loading data...</p>
          ) : (
            <>
              {/* TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">

                  <thead className="bg-gray-100 dark:bg-gray-800">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="p-4 cursor-pointer select-none"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}

                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted()] ?? null}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>

                  <tbody className="bg-white dark:bg-gray-900">
                    {table.getRowModel().rows.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="p-4 text-center text-gray-500">
                          Data tidak ditemukan
                        </td>
                      </tr>
                    ) : (
                      table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border-t dark:border-gray-700">
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="p-4">
                              {flexRender(
                                cell.column.columnDef.cell ??
                                  cell.column.columnDef.accessorKey,
                                cell.getContext()
                              )}
                            </td>
                          ))}
                        </tr>
                      ))
                    )}
                  </tbody>

                </table>
              </div>

              {/* PAGINATION */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
                >
                  Prev
                </button>

                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </span>

                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}