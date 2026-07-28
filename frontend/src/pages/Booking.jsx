

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

const Booking = () => {
  const { id } = useParams();
  const location = useLocation();

  const [service, setService] = useState(location.state || null);
  const [date, setDate] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!service) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/services/${id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => setService(res.data))
        .catch((err) => console.log(err));
    }
  }, [id, service]);

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings`,
        {
          serviceId: id,
          date,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Booked Successfully!");
    } catch (error) {
      console.error(error);
      alert("Booking failed");
    }
  };

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">

      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Image */}
        <img
          src={
            service.image?.url ||
            "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
          }
          alt={service.name}
          className="w-full h-56 sm:h-72 lg:h-80 object-cover"
        />

        {/* Content */}
        <div className="p-6 sm:p-8">

          <h1 className="text-2xl sm:text-3xl font-bold text-center text-pink-600 mb-6">
            Book Service
          </h1>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            {service.name}
          </h2>

          <p className="text-gray-500 mt-3 text-sm sm:text-base leading-6">
            {service.description}
          </p>

          <p className="text-pink-600 text-2xl font-bold mt-4">
            ₹{service.price}
          </p>

          {/* Date */}
          <div className="mt-6">
            <label className="block text-gray-700 font-medium mb-2">
              Select Booking Date
            </label>

            <input
              type="date"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleBooking}
            className="w-full mt-8 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-full transition duration-300 shadow-lg"
          >
            Confirm Booking
          </button>

        </div>

      </div>

    </div>
  );
};

export default Booking;