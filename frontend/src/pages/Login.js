import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (err) {
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back 👋</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition">
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
