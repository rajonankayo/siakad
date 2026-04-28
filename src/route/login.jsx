import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username dan password wajib diisi");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://siakad.adzkiasumbar.or.id/api/blog/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const text = await res.text();
      console.log("RAW RESPONSE:", text);

      const data = JSON.parse(text);

      if (!res.ok) {
        throw new Error("HTTP error " + res.status);
      }

      if (data.success) {
        // simpan user ke localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        // trigger update global
        window.dispatchEvent(new Event("user-login"));

        // redirect ke blog
        navigate("/blog", { replace: true });
      } else {
        setError(data.message || "Login gagal");
      }

    } catch (err) {
      console.error(err);
      setError("Tidak bisa terhubung ke server");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">

        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* USERNAME */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-sm text-gray-500 dark:text-gray-300"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;