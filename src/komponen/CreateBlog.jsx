import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "./../utility/swal";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

export default function CreateBlog({ onSuccess }) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const getToday = () => new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tanggal: getToday(),
      kategori_blog: "",
      judul_blog: "",
      konten_blog: "",
    },
  });

  const onSubmit = async (data) => {
    if (!data.judul_blog || !data.kategori_blog || !data.tanggal || !data.konten_blog) {
      Swal.fire({
        icon: "warning",
        title: "Validasi",
        text: "Judul, Kategori, Tanggal dan Konten wajib diisi!",
        timer: 1000,
        showConfirmButton: false,
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://siakad.adzkiasumbar.or.id/api/blog/create.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json().catch(() => ({}));

      if (!res.ok || result?.message?.toLowerCase().includes("gagal")) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: result?.message || "Gagal menambah blog",
          timer: 1000,
          showConfirmButton: false,
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Blog berhasil ditambahkan",
        timer: 1000,
        showConfirmButton: false,
      });

      reset({ ...data, judul_blog: "", konten_blog: "" });

      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      onSuccess?.();

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <h2 className="text-center font-bold text-2xl mb-4">
        Tambah Blog Baru
      </h2>

      <input
        {...register("judul_blog", { required: true })}
        placeholder="Judul"
        className="border p-2 w-full"
      />

      <input
        {...register("kategori_blog")}
        placeholder="Kategori"
        className="border p-2 w-full"
      />

      <input
        type="date"
        {...register("tanggal")}
        className="border p-2 w-full"
      />

      <textarea
        {...register("konten_blog", { required: true })}
        placeholder="Konten"
        className="border p-2 w-full"
      />

      <button
        disabled={loading}
        className={`px-4 py-2 text-white rounded flex items-center justify-center gap-2 ${
          loading ? "bg-gray-400" : "bg-green-500"
        }`}
      >
        <FontAwesomeIcon icon={faFloppyDisk} />
        {loading ? "Menyimpan..." : "Simpan"}
      </button>
    </form>
  );
}