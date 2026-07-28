

import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const role = user?.role;

  const menuItem = (to, label, icon) => (
    <Link
      key={to}
      to={to}
      className={`flex items-center justify-center md:justify-start gap-3 px-3 py-3 rounded-lg transition-all duration-300
      ${
        location.pathname === to
          ? "bg-pink-500 text-white"
          : "text-gray-200 hover:bg-gray-700 hover:text-white"
      }`}
    >
      {/* Icon */}
      <span className="text-xl">{icon}</span>

      {/* Text hidden on mobile */}
      <span className="hidden md:block font-medium">{label}</span>
    </Link>
  );

  return (
    <aside
      className="
      sticky top-0
      h-screen
      w-20
      sm:w-24
      md:w-56
      lg:w-64
      bg-gradient-to-b
      from-gray-900
      via-gray-700
      to-gray-900
      shadow-xl
      flex
      flex-col
      transition-all
      duration-300
    "
    >
      {/* Logo */}
     

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-2">

        {/* ADMIN */}
        {role === "ADMIN" && (
          <>
            {menuItem("/admin", "Dashboard", "📊")}
            {menuItem("/admin/users", "Users", "👥")}
            {menuItem("/admin/services", "Services", "💄")}
            {menuItem("/admin/courses", "Courses", "🎓")}
            {menuItem("/admin/gallery", "Gallery", "🖼️")}
            {menuItem("/admin/bookings", "Bookings", "📅")}
            {menuItem("/admin/enrollments", "Enrollments", "📘")}
          </>
        )}

        {/* TRAINER */}
        {role === "TRAINER" && (
          <>
            {menuItem("/trainer", "Dashboard", "📊")}
            {menuItem("/trainer/courses", "My Courses", "🎓")}
            {menuItem("/trainer/students", "Students", "👨‍🎓")}
            {menuItem("/trainer/lessons", "Lessons", "📚")}
            {menuItem("/trainer/profile", "Profile", "👤")}
          </>
        )}

        {/* STUDENT */}
        {role === "STUDENT" && (
          <>
            {menuItem("/dashboard", "Dashboard", "📊")}
            {menuItem("/student/StudentProfile", "My Profile", "👤")}
            {menuItem("/student/my-courses", "My Courses", "📘")}
            {menuItem("/student/my-bookings", "My Bookings", "📅")}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-700 p-4 text-center text-gray-400">
        {/* Mobile */}
        <span className="block md:hidden text-xs">
          ©
        </span>

        {/* Tablet & Laptop */}
        <span className="hidden md:block text-sm">
          © 2026 BeautyHub
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;