

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-bookings`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setBookings(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/bookings/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setBookings((prev) => prev.filter((booking) => booking._id !== id));
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading My Bookings...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-pink-200">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">

        <h1 className="text-2xl sm:text-3xl font-bold text-pink-500 mb-8">
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

            <div className="text-6xl mb-4">📅</div>

            <h2 className="text-xl font-semibold text-gray-700">
              No Bookings Found
            </h2>

            <p className="text-gray-500 mt-3">
              You haven't booked any services yet.
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
              >

                {/* Service Image */}
                <img
                  src={
                    booking.service_id?.image?.url ||
                    "https://via.placeholder.com/400x300"
                  }
                  alt={booking.service_id?.name}
                  className="w-full h-52 sm:h-56 lg:h-64 object-cover"
                />

                {/* Details */}
                <div className="p-5">

                  <h2 className="text-xl font-bold text-gray-800">
                    {booking.service_id?.name}
                  </h2>

                  <p className="mt-3 text-gray-600">
                    <span className="font-semibold">Date:</span>{" "}
                    {booking.date
                      ? new Date(booking.date).toLocaleDateString()
                      : "N/A"}
                  </p>

                  <p className="mt-2 text-pink-500 text-xl font-bold">
                    ₹{booking.service_id?.price ?? 0}
                  </p>

                  {booking.service_id?.description && (
                    <p className="mt-3 text-gray-500 text-sm leading-6">
                      {booking.service_id.description}
                    </p>
                  )}

                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
                  >
                    Cancel Booking
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;