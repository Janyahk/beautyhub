


import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-pink-500 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">
              Beauty Academy 💄
            </h2>

            <p className="mt-3 text-pink-100 text-sm leading-6">
              Enhance your beauty skills with our professional
              beauty services and certified training courses.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-pink-200 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/services"
                  className="hover:text-pink-200 transition"
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  to="/courses"
                  className="hover:text-pink-200 transition"
                >
                  Courses
                </Link>
              </li>

              <li>
                <Link
                  to="/gallery"
                  className="hover:text-pink-200 transition"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">
              Contact Us
            </h3>

            <div className="space-y-3 text-sm">
              <p>📍 Bangalore, India</p>
              <p>📧 beautyacademy@gmail.com</p>
              <p>📞 +91 9876543210</p>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center sm:justify-start gap-4 mt-5 text-2xl">
              <a href="#" className="hover:scale-110 transition">
                📘
              </a>

              <a href="#" className="hover:scale-110 transition">
                📸
              </a>

              <a href="#" className="hover:scale-110 transition">
                ▶️
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-pink-400 py-4 px-4 text-center text-sm text-pink-100">
        © 2026 Beauty Academy. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;