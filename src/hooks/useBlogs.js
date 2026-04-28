import { useEffect, useState } from "react";

export const useBlogs = (refreshKey) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);

    try {
      const res = await fetch("https://siakad.adzkiasumbar.or.id/api/blog/read.php");
      const data = await res.json();

      setBlogs(data.data || data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [refreshKey]); // 🔥 INI WAJIB

  return { blogs, loading, refetch: fetchBlogs };
};