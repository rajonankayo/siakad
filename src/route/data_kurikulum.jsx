import { useState, useEffect } from "react";
import BlogList from "../komponen/BlogList";
import CreateBlog from "../komponen/CreateBlog";
import EditBlog from "../komponen/EditBlog";
import Modal from "../komponen/Modal";

export default function BlogPage() {
  const [selected, setSelected] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const [user, setUser] = useState(null);

  // 🔥 ambil session login
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  const closeCreate = () => setShowCreate(false);
  const closeEdit = () => setSelected(null);

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-700 min-h-screen text-gray-900 dark:text-gray-100">
      {/* TITLE */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Posting Blog Saya
      </h1>

      {/* 🔥 BUTTON TAMBAH (HANYA JIKA LOGIN) */}
      {user && (
        <button
          onClick={() => setShowCreate(true)}
          className="
            bg-green-500 hover:bg-green-600
            dark:bg-green-600 dark:hover:bg-green-700
            text-white px-4 py-2 rounded
            transition-colors
          "
        >
          + Tambah Blog
        </button>
      )}

      {/* LIST */}
      <BlogList onEdit={setSelected} />

      {/* CREATE MODAL */}
      {showCreate && user && (
        <Modal onClose={closeCreate}>
          <CreateBlog onSuccess={closeCreate} />
        </Modal>
      )}

      {/* EDIT MODAL */}
      {selected && user && (
        <Modal onClose={closeEdit}>
          <EditBlog selected={selected} onSuccess={closeEdit} />
        </Modal>
      )}
    </div>
  );
}
