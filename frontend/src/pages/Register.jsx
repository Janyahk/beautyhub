

// pages/Register.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate(); // ✅ Add this

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneno:"",
    password: "",
    role: "student",
  });
const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmit = async () => {
    try{
      console.log(form);
    await axios.post(`${import.meta.env.VITE_API_URL}/register`, form);
   setIsSuccess(true);
      setMessage("✅ Registration successful! Redirecting to Login...");
       setForm({
        name: "",
        email: "",
        phoneno: "",
        password: "",
        role: "student",
      });
      alert("registered sucessfully");
   setTimeout(() => {
        navigate("/login");
      }, 1000);
    }catch (error) {
      setIsSuccess(false);
      setMessage(
        error.response?.data?.message || "❌ Registration failed!"
      );
    }
  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-orange-50 to-pink-200 px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-pink-200 flex items-center justify-center text-2xl">
            👤
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          Create Account
        </h2>

        <p className="text-gray-500 text-center text-sm mt-2 mb-6">
          Join us and start your journey
        </p>

        {/* Success / Error Message */}
        {message && (
          <div
            className={`mb-4 rounded-lg px-4 py-3 text-sm text-center ${
              isSuccess
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition"
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={form.phoneno}
            onChange={(e) =>
              setForm({ ...form, phoneno: e.target.value })
            }
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition"
          />

          <select
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <button
            onClick={handleSubmit}
            className="w-full bg-pink-500 hover:bg-pink-600 transition text-white font-semibold py-3 rounded-lg"
          >
            Register
          </button>

        </div>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-pink-600 hover:text-pink-700 font-semibold"
          >
            Login
          </button>
        </p>

      </div>
    </div>
  );
};

export default Register;