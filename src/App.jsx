import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Layout from "./Layout/Layout";

import Dashboard from "./route/dashboard";
import Data_Guru from "./route/data_guru";
import Data_Siswa from "./route/data_siswa";
import Data_Kurikulum from "./route/data_kurikulum";
import Data_Sekolah from "./route/data_sekolah";
import Login from "./route/login";

function App() {
  const [dark, setDark] = useState(true);

  // ✅ PINDAHKAN KE SINI
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // ✅ AGAR REACTIVE TANPA REFRESH
  useEffect(() => {
    const updateUser = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("user-login", updateUser);
    window.addEventListener("user-logout", updateUser);

    return () => {
      window.removeEventListener("user-login", updateUser);
      window.removeEventListener("user-logout", updateUser);
    };
  }, []);

  // DARK MODE
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    setDark(saved ? saved === "dark" : true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const [ready, setReady] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-gray-700">
      <Navbar dark={dark} setDark={setDark} />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={<Layout user={user} dark={dark} setDark={setDark} />}
        >
          <Route index element={<Dashboard />} />
          <Route path="data_kurikulum" element={<Data_Kurikulum />} />
          <Route path="data_guru" element={<div>Halaman Guru</div>} />
          <Route path="data_siswa" element={<div>Halaman Siswa</div>} />
          <Route
            path="data_sekolah"
            element={<div>Halaman Data Sekolah</div>}
          />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
