import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import Swal from "./../utility/swal";
import Modal from "./../komponen/Modal";
import DetailBlog from "./../komponen/DetailBlog";

// 🔥 FETCH (pagination + search)
const fetchBlogs = async (page, search, sort) => {
  const res = await fetch(
    `https://siakad.adzkiasumbar.or.id/api/blog/read.php?page=${page}&limit=3&search=${encodeURIComponent(search)}&sort=${sort}`
  );

  if (!res.ok) throw new Error("Failed fetch blogs");

  return res.json();
};

// 🔥 SKELETON
function BlogSkeleton({ index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="
        p-5 rounded-2xl
        bg-white dark:bg-gray-800
        border border-gray-100 dark:border-gray-700
        shadow-sm
        space-y-4
      "
    >
      {/* TITLE */}
      <div className="
        h-5 w-3/4 rounded
        bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200
        dark:from-gray-700 dark:via-gray-600 dark:to-gray-700
        bg-[length:200%_100%] animate-shimmer
      " />

      {/* META */}
      <div className="
        h-3 w-1/2 rounded
        bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200
        dark:from-gray-700 dark:via-gray-600 dark:to-gray-700
        bg-[length:200%_100%] animate-shimmer
      " />

      {/* CONTENT */}
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer" />
        <div className="h-3 w-full rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer" />
        <div className="h-3 w-2/3 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer" />
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center pt-2">
        <div className="h-3 w-16 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer" />

        <div className="flex gap-2">
          <div className="h-6 w-12 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer" />
          <div className="h-6 w-12 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer" />
        </div>
      </div>
    </motion.div>
  );
}

export default function BlogList({ onEdit }) {
  const queryClient = useQueryClient();

  const [selectedDetail, setSelectedDetail] = useState(null);

  // 🔥 PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  // 🔥 SEARCH
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const searchRef = useRef(null);

  const [sort, setSort] = useState("desc"); // Fitur sort

  const [user, setUser] = useState(null);
  
  // 🔥 FETCH USER
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  // ✅ DEBOUNCE 500ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  // 🔥 QUERY
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["blogs", currentPage, debouncedSearch, sort],
    queryFn: () => fetchBlogs(currentPage, debouncedSearch, sort),
    keepPreviousData: true,
  });

  const blogs = data?.data || [];
  const totalPages = data?.pagination?.total_pages || 1;
  const totalData = data?.pagination?.total_data || 0;

  // 🔥 FIX PAGE OVERFLOW
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  // 🔥 PREFETCH NEXT PAGE
  useEffect(() => {
    if (currentPage < totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["blogs", currentPage + 1, debouncedSearch, sort],
        queryFn: () => fetchBlogs(currentPage + 1, debouncedSearch, sort),
      });
    }
  }, [currentPage, debouncedSearch, totalPages, sort]);

  // ✅ AUTO SCROLL KE ATAS
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // ✅ AUTO FOCUS INPUT
  useEffect(() => {
    searchRef.current?.focus();
  }, [data]);

  // 🔥 SORT
  useEffect(() => {
    setCurrentPage(1);
  }, [sort]);

  // 🔥 DELETE
  const handleDelete = async (id_blog) => {
  const result = await Swal.fire({
    title: "Hapus Blog?",
    text: "Data yang dihapus tidak bisa dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
  });

  if (!result.isConfirmed) return;

  try {
    const res = await fetch(
      `https://siakad.adzkiasumbar.or.id/api/blog/delete.php?id_blog=${id_blog}`,
      {
        method: "DELETE",
      }
    );

    const text = await res.text();
    let resultData;

    try {
      resultData = JSON.parse(text);
    } catch {
      resultData = {};
    }

    if (!res.ok || resultData?.message?.toLowerCase().includes("gagal")) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: resultData?.message || "Gagal menghapus blog",
        timer: 1200,
        showConfirmButton: false,
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Blog berhasil dihapus",
      timer: 1000,
      showConfirmButton: false,
    });

    queryClient.invalidateQueries({ queryKey: ["blogs"] });

    } catch (err) {
      console.error("Delete error:", err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan saat menghapus blog",
        timer: 1200,
        showConfirmButton: false,
      });
    }
  };

  // 🔥 PAGINATION CONTROL
  const goToPage = (page) => setCurrentPage(page);
  const goFirst = () => setCurrentPage(1);
  const goLast = () => setCurrentPage(totalPages);
  const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));

  // 🔥 PAGINATION DINAMIS
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  // 🔥 HIGHLIGHT
  const highlightText = (text, keyword) => {
    if (!keyword) return text;

    const regex = new RegExp(`(${keyword})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span
          key={i}
          className="bg-yellow-300 dark:bg-yellow-600 text-black dark:text-white px-1 rounded"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="space-y-4">

      {/* 🔍 SEARCH */}
      <input
        ref={searchRef}
        type="text"
        placeholder="Cari judul blog..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full px-3 py-2 rounded border
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          border-gray-300 dark:border-gray-600
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      />

      {/* SORT */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="
          px-3 py-2 rounded border
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          border-gray-300 dark:border-gray-600
        "
      >
        <option value="desc">Terbaru</option>
        <option value="asc">Terlama</option>
      </select>

      {/* 🔢 JUMLAH HASIL */}
      {!isLoading && (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {debouncedSearch
            ? `Ditemukan ${totalData} hasil untuk "${debouncedSearch}"`
            : `Total ${totalData} blog`}
        </p>
      )}

      {/* 🔄 LOADING KECIL */}
      {isFetching && !isLoading && (
        <div className="flex justify-center items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          Memuat data...
        </div>
      )}

      {/* 📄 Grid */}
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <BlogSkeleton key={i} index={i} />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          {debouncedSearch
            ? `Tidak ada blog ditemukan untuk "${debouncedSearch}"`
            : "Belum ada data blog"}
        </p>
      ) : (
        <div className={`grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-4 $isFetching ? "opacity-70 blur-[1px]" : ""}`}>
          {blogs.map((blog, i) => (
            <motion.div
              key={blog.id_blog}
              className="
                p-5 rounded-2xl
                bg-white dark:bg-gray-800
                text-gray-900 dark:text-gray-100
                border border-gray-100 dark:border-gray-700
                shadow-sm hover:shadow-xl
                transition-all duration-300
                flex flex-col justify-between
              "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <h2 className="font-bold text-lg line-clamp-2">
                {highlightText(blog.judul_blog, debouncedSearch)}
              </h2>

              <div className="flex items-center justify-between mt-1">
                <span
                  className="
                    text-xs font-medium
                    px-3 py-1 rounded-full
                    bg-blue-100 text-blue-700
                    dark:bg-blue-900/40 dark:text-blue-300
                  "
                >
                  {blog.kategori_blog}
                </span>

                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {blog.tanggal}
                </span>
              </div>

              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                {highlightText(
                  (blog.konten_blog || "").slice(0, 150),
                  debouncedSearch
                )}
                ...
              </p>

              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => setSelectedDetail(blog)}
                  className="text-blue-500 text-sm hover:underline"
                >
                  Baca →
                </button>

                {user && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit?.(blog)}
                      className="text-xs px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center gap-1"
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(blog.id_blog)}
                      className="text-xs px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded flex items-center gap-1"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      Hapus
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* 🔢 PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-6 flex-wrap">

          <button
            onClick={goFirst}
            disabled={currentPage === 1 || isFetching}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-blue-500  dark:bg-gray-700 disabled:opacity-40"
          >
            ⏮
          </button>

          <button
            onClick={goPrev}
            disabled={currentPage === 1 || isFetching}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-blue-500 dark:bg-gray-700 disabled:opacity-40"
          >
            Prev
          </button>

          {getPageNumbers().map((page, i) =>
            page === "..." ? (
              <span key={i} className="px-2 text-gray-500">...</span>
            ) : (
              <button
                key={page}
                onClick={() => goToPage(page)}
                disabled={isFetching}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-blue-500 text-white hover:bg-blue-500 hover:text-gray-800"
                    : "bg-gray-200 hover:bg-blue-500 hover:text-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={goNext}
            disabled={currentPage === totalPages || isFetching}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-blue-500 dark:bg-gray-700 disabled:opacity-40"
          >
            Next
          </button>

          <button
            onClick={goLast}
            disabled={currentPage === totalPages || isFetching}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-blue-500  dark:bg-gray-700 disabled:opacity-40"
          >
            ⏭
          </button>

        </div>
      )}

      {/* 📦 MODAL */}
      {selectedDetail && (
        <Modal onClose={() => setSelectedDetail(null)}>
          <DetailBlog blog={selectedDetail} />
        </Modal>
      )}

    </div>
  );
}