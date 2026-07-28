

import axios from "axios";

const CourseCard = ({ course }) => {
  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/enrollments",
        {
          courseId: course._id,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      alert("Enrolled successfully!");
    } catch (error) {
      console.error(error);
      alert("Enrollment failed");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">

      {/* Course Image */}
      <img
        src={
          course.image?.url ||
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
        }
        alt={course.name}
        className="w-full h-52 sm:h-56 lg:h-64 object-cover"
      />

      {/* Content */}
      <div className="flex flex-col flex-grow p-5">

        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
          {course.name}
        </h2>

        <p className="text-gray-500 text-sm mt-2 line-clamp-3">
          {course.description}
        </p>

        <div className="mt-4 space-y-2 text-sm sm:text-base">
          <p className="text-gray-600">
            <span className="font-semibold">Duration:</span>{" "}
            {course.duration}
          </p>

          <p className="text-pink-600 font-bold text-lg">
            ₹{course.fees}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleEnroll}
          className="mt-auto w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl transition duration-300"
        >
          Enroll Now
        </button>

      </div>
    </div>
  );
};

export default CourseCard;