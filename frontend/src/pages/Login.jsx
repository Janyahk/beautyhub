
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        form
      );

      console.log("LOGIN RESPONSE:", res.data); // 🔥 DEBUG

      // ✅ IMPORTANT
      if (!res.data.token || !res.data.user) {
        alert("Invalid response from server");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      console.log("Saved user:", res.data.user);

      navigate("/dashboard"); // ✅ NAVIGATE

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

   return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-orange-50 to-pink-200 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="bg-pink-200 w-14 h-14 flex items-center justify-center rounded-full text-2xl">
            🔒
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center text-sm mt-2 mb-6">
          Login to continue
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            autoComplete="email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            autoComplete="current-password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;