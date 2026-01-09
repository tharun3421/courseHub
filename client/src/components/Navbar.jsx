import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-primary">
        CourseHub 🎓
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:text-primary">Home</Link>

        {token && (
          <Link to="/my-courses" className="hover:text-primary">
            My Courses
          </Link>
        )}

        {!token ? (
          <Link
            to="/login"
            className="bg-blue-400 text-black px-4 py-2 rounded-lg"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

