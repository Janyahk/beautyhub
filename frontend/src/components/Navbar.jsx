

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const getDashboardPath = () => {
    if (!user) return "/login";

    switch (user.role.toUpperCase()) {
      case "ADMIN":
        return "/admin";

      case "STUDENT":
        return "/dashboard";

      default:
        return "/";
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-pink-500"
          >
            BeautyHub 💄
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
            <Link to="/" className="hover:text-pink-500 transition">
              Home
            </Link>

            <Link
              to="/services"
              className="hover:text-pink-500 transition"
            >
              Services
            </Link>

            <Link
              to="/courses"
              className="hover:text-pink-500 transition"
            >
              Courses
            </Link>

            <Link
              to="/gallery"
              className="hover:text-pink-500 transition"
            >
              Gallery
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user?.role ? (
              <>
                <Link
                  to={getDashboardPath()}
                  className="border border-pink-500 text-pink-500 px-4 py-2 rounded-full hover:bg-pink-500 hover:text-white transition"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border border-pink-500 text-pink-500 px-4 py-2 rounded-full hover:bg-pink-500 hover:text-white transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t py-4">

            <div className="flex flex-col space-y-4 text-gray-700">

              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="hover:text-pink-500"
              >
                Home
              </Link>

              <Link
                to="/services"
                onClick={() => setMenuOpen(false)}
                className="hover:text-pink-500"
              >
                Services
              </Link>

              <Link
                to="/courses"
                onClick={() => setMenuOpen(false)}
                className="hover:text-pink-500"
              >
                Courses
              </Link>

              <Link
                to="/gallery"
                onClick={() => setMenuOpen(false)}
                className="hover:text-pink-500"
              >
                Gallery
              </Link>

              <hr />

              {user?.role ? (
                <>
                  <Link
                    to={getDashboardPath()}
                    onClick={() => setMenuOpen(false)}
                    className="border border-pink-500 text-center text-pink-500 py-2 rounded-full"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="bg-pink-500 text-white py-2 rounded-full"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="border border-pink-500 text-center text-pink-500 py-2 rounded-full"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="bg-pink-500 text-white text-center py-2 rounded-full"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;