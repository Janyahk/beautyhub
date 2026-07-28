

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState(null);
  const [newDate, setNewDate] = useState("");

  const token = localStorage.getItem("token");

  // Fetch Bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/bookings`,
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

    fetchBookings();
  }, [token]);

  // Update Booking
  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/bookings/${id}`,
        {
          date: newDate,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setBookings(
        bookings.map((booking) =>
          booking._id === id ? res.data : booking
        )
      );

      setEditId(null);
      setNewDate("");

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // Delete Booking
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/bookings/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setBookings(
        bookings.filter((booking) => booking._id !== id)
      );

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading Bookings...
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
          Manage Bookings
        </h1>

        {bookings.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No bookings found.
          </div>
        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

            {bookings.map((booking) => (

              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden"
              >

                {/* Image */}
                <img
                  src={
                    booking.service_id?.image?.url ||
                    "https://via.placeholder.com/400x300"
                  }
                  alt="Service"
                  className="w-full h-52 sm:h-60 lg:h-64 object-cover"
                />

                {/* Content */}
                <div className="p-5">

                  <h2 className="text-xl font-bold">
                    {booking.user_id?.name || "User"}
                  </h2>

                  <p className="mt-2">
                    <span className="font-semibold">
                      Service:
                    </span>{" "}
                    <span className="text-pink-500">
                      {booking.service_id?.name || "Service"}
                    </span>
                  </p>

                  {editId === booking._id ? (
                    <>
                      <input
                        type="date"
                        value={newDate}
                        onChange={(e) =>
                          setNewDate(e.target.value)
                        }
                        className="border rounded-lg p-2 w-full mt-4"
                      />

                      <div className="flex flex-col sm:flex-row gap-3 mt-4">

                        <button
                          onClick={() =>
                            handleUpdate(booking._id)
                          }
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
                        >
                          Save
                        </button>

                        <button
                          onClick={() => setEditId(null)}
                          className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg"
                        >
                          Cancel
                        </button>

                      </div>
                    </>
                  ) : (
                    <>
                      <p className="mt-3 text-gray-600">
                        <span className="font-semibold">
                          Date:
                        </span>{" "}
                        {booking.date
                          ? new Date(
                              booking.date
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>

                      <button
                        onClick={() => {
                          setEditId(booking._id);
                          setNewDate(
                            booking.date?.split("T")[0]
                          );
                        }}
                        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
                      >
                        Update Date
                      </button>
                    </>
                  )}

                  <button
                    onClick={() =>
                      handleDelete(booking._id)
                    }
                    className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                  >
                    Delete Booking
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

export default ManageBookings;