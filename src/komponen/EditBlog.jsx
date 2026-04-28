import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "./../utility/swal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

export default function EditBlog({ selected, onSuccess }) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      id_blog: "",
      tanggal: "",
      kategori_blog: "",
      judul_blog: "",
      konten_blog: "",
    },
  });

  // inject data saat modal dibuka
  useEffect(() => {
    if (selected) {
      setValue("id_blog", selected.id_blog || "");
      setValue("tanggal", selected.tanggal || "");
      setValue("kategori_blog", selected.kategori_blog || "");
      setValue("judul_blog", selected.judul_blog || "");
      setValue("konten_blog", selected.konten_blog || "");
    }
  }, [selected, setValue]);

  const onSubmit = async (data) => {
    if (!data.id_blog) {
      Swal.fire({
        icon: "warning",
        title: "Validasi",
        text: "ID blog tidak ditemukan!",
        timer: 1000,
        showConfirmButton: false,
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://siakad.adzkiasumbar.or.id/api/blog/update.php",
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
          text: result?.message || "Update gagal",
          timer: 1000,
          showConfirmButton: false,
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Blog berhasil diupdate",
        timer: 1000,
        showConfirmButton: false,
      });

      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      onSuccess?.();

    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan saat update blog",
        timer: 1000,
        showConfirmButton: false,
      });

    } finally {
      setLoading(false);
    }
  };

  if (!selected) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-4">

      <h2 className="text-center font-bold text-2xl mb-4">
        Edit Blog
      </h2>

      {/* hidden id */}
      <input type="hidden" {...register("id_blog")} />

      <input
        {...register("judul_blog", { required: true })}
        className="border p-2 w-full"
        placeholder="Judul"
      />

      <input
        {...register("kategori_blog")}
        className="border p-2 w-full"
        placeholder="Kategori"
      />

      <input
        type="date"
        {...register("tanggal")}
        className="border p-2 w-full"
      />

      <textarea
        {...register("konten_blog", { required: true })}
        className="border p-2 w-full"
        placeholder="Konten"
      />

      <button
        disabled={loading}
        className={`px-4 py-2 text-white rounded flex items-center justify-center gap-2 ${
          loading ? "bg-gray-400" : "bg-blue-500"
        }`}
      >
        <FontAwesomeIcon icon={faFloppyDisk} />
        {loading ? "Updating..." : "Update"}
      </button>

    </form>
  );
}