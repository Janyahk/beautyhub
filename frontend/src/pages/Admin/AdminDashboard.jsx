

import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    services: 0,
    courses: 0,
    bookings: 0,
    enrollments: 0,
  });

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const responses = await Promise.allSettled([
          axios.get(`${import.meta.env.VITE_API_URL}/users`, {
            headers: { Authorization: token },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/services`, {
            headers: { Authorization: token },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/courses`, {
            headers: { Authorization: token },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/bookings`, {
            headers: { Authorization: token },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/enrollments`, {
            headers: { Authorization: token },
          }),
        ]);

        setStats({
          users:
            responses[0].status === "fulfilled"
              ? responses[0].value.data.length
              : 0,

          services:
            responses[1].status === "fulfilled"
              ? responses[1].value.data.length
              : 0,

          courses:
            responses[2].status === "fulfilled"
              ? responses[2].value.data.length
              : 0,

          bookings:
            responses[3].status === "fulfilled"
              ? responses[3].value.data.length
              : 0,

          enrollments:
            responses[4].status === "fulfilled"
              ? responses[4].value.data.length
              : 0,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-pink-200">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto">

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pink-600 mb-8">
          Admin Dashboard
        </h1>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-10">

          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center">
            <h2 className="font-semibold text-gray-700">
              Users
            </h2>

            <p className="text-3xl font-bold text-pink-500 mt-3">
              {stats.users}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center">
            <Link to="/services">
              <h2 className="font-semibold hover:text-pink-500">
                Services
              </h2>
            </Link>

            <p className="text-3xl font-bold text-pink-500 mt-3">
              {stats.services}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center">
            <Link to="/courses">
              <h2 className="font-semibold hover:text-pink-500">
                Courses
              </h2>
            </Link>

            <p className="text-3xl font-bold text-pink-500 mt-3">
              {stats.courses}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center">
            <Link to="/admin/bookings">
              <h2 className="font-semibold hover:text-pink-500">
                Bookings
              </h2>
            </Link>

            <p className="text-3xl font-bold text-pink-500 mt-3">
              {stats.bookings}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center">
            <Link to="/admin/enrollments">
              <h2 className="font-semibold hover:text-pink-500">
                Enrollments
              </h2>
            </Link>

            <p className="text-3xl font-bold text-pink-500 mt-3">
              {stats.enrollments}
            </p>
          </div>

        </div>

        {/* Quick Actions */}
        <h2 className="text-xl sm:text-2xl font-bold mb-5">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          <div
            onClick={() => navigate("/admin/users")}
            className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition cursor-pointer p-8 text-center"
          >
            <div className="text-5xl mb-4">
              👥
            </div>

            <h3 className="text-lg font-semibold">
              Manage Users
            </h3>
          </div>

          <div
            onClick={() => navigate("/admin/services")}
            className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition cursor-pointer p-8 text-center"
          >
            <div className="text-5xl mb-4">
              💄
            </div>

            <h3 className="text-lg font-semibold">
              Manage Services
            </h3>
          </div>

          <div
            onClick={() => navigate("/admin/courses")}
            className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition cursor-pointer p-8 text-center"
          >
            <div className="text-5xl mb-4">
              🎓
            </div>

            <h3 className="text-lg font-semibold">
              Manage Courses
            </h3>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;