import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    nav("/");
    toast.success("Login successful 🎉");
    } catch (error) {
      toast.error("Invalid credentials ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-170 bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          className="w-full border p-3 mb-3 rounded"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-3 mb-4 rounded"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-blue-400 text-white py-3 rounded-lg"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          No account?{" "}
          <Link to="/signup" className="text-primary">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
