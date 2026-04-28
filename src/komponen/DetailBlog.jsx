export default function DetailBlog({ blog }) {
  if (!blog) return null;

  return (
    <div className="flex flex-col max-h-[80vh] text-gray-900 dark:text-gray-100">

      {/* HEADER */}
      <div className="space-y-3 px-6 pt-6">
        <h2 className="text-2xl font-bold leading-snug text-gray-900 dark:text-white">
          {blog.judul_blog}
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          {blog.kategori_blog} • {blog.tanggal}
        </p>
      </div>

      {/* CONTENT SCROLL AREA */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 mt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-gray-800 dark:text-gray-200 leading-7 whitespace-pre-line pt-4">
          {blog.konten_blog}
        </p>
      </div>

    </div>
  );
}