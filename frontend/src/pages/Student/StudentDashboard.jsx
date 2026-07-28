

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const StudentDashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: token,
        };

        const [enrollRes, bookingRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/my-enrollments`, {
            headers,
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/my-bookings`, {
            headers,
          }),
        ]);

        setEnrollments(enrollRes.data);
        setBookings(bookingRes.data);
      } catch (err) {
        console.log(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-pink-500 mb-8">
          Student Dashboard
        </h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* My Courses */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 text-center">

            <div className="text-5xl mb-3">🎓</div>

            <h2 className="text-lg font-semibold text-gray-700">
              My Courses
            </h2>

            <p className="text-4xl font-bold text-pink-500 mt-3">
              {enrollments.length}
            </p>

          </div>

          {/* My Bookings */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 text-center">

            <div className="text-5xl mb-3">📅</div>

            <h2 className="text-lg font-semibold text-gray-700">
              My Bookings
            </h2>

            <p className="text-4xl font-bold text-pink-500 mt-3">
              {bookings.length}
            </p>

          </div>

          {/* Profile */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 text-center">

            <div className="text-5xl mb-3">👤</div>

            <h2 className="text-lg font-semibold text-gray-700">
              Welcome
            </h2>

            <p className="text-xl font-bold text-pink-500 mt-3 break-words">
              {user?.name}
            </p>

            <p className="text-gray-500 mt-2 text-sm break-all">
              {user?.email}
            </p>

          </div>

        </div>

        {/* Quick Overview */}
        <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-xl font-bold text-pink-500 mb-4">
            Quick Overview
          </h2>

          <div className="space-y-3 text-gray-700">

            <p>
              📘 Enrolled Courses:
              <span className="font-semibold text-pink-500 ml-2">
                {enrollments.length}
              </span>
            </p>

            <p>
              💄 Service Bookings:
              <span className="font-semibold text-pink-500 ml-2">
                {bookings.length}
              </span>
            </p>

            <p>
              👤 Student:
              <span className="font-semibold text-pink-500 ml-2">
                {user?.name}
              </span>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;