import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signup = async () => {
    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      await API.post("/auth/signup", form);
      toast.success("signup successful 🎉");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
      toast.error("Signup failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-170 bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        {/* {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )} */}

        <input
          name="name"
          placeholder="Name (optional)"
          className="w-full border p-3 mb-3 rounded"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="w-full border p-3 mb-3 rounded"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <button
          onClick={signup}
          disabled={loading}
          className="w-full bg-blue-400 text-white py-3 rounded-lg disabled:bg-gray-400 cursor-pointer"
        >
          {loading ? "Creating..." : "Signup"}
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
