import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account ✨</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-3">{success}</p>}
        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
