
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    navigate(`/booking/${service._id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-full">
      {/* Image */}
      <img
        src={
          service.image?.url ||
          "https://via.placeholder.com/300x200?text=No+Image"
        }
        alt={service.name}
        className="w-full h-48 sm:h-56 md:h-64 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
          {service.name}
        </h2>

        <p className="text-gray-600 text-sm sm:text-base mt-2 line-clamp-3">
          {service.description}
        </p>

        <p className="text-pink-500 font-semibold text-lg mt-3">
          ₹{service.price}
        </p>

        <button
          onClick={handleBooking}
          className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;