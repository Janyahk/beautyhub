

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-enrollments`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setCourses(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading My Courses...
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
          My Courses
        </h1>

        {courses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

            <div className="text-6xl mb-4">
              🎓
            </div>

            <h2 className="text-xl font-semibold text-gray-700">
              No Courses Found
            </h2>

            <p className="text-gray-500 mt-3">
              You haven't enrolled in any courses yet.
            </p>

          </div>
        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

            {courses.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden"
              >

                {/* Course Image */}
                <img
                  src={
                    item.course_id?.image?.url ||
                    item.course_id?.image ||
                    "https://via.placeholder.com/400x300"
                  }
                  alt={item.course_id?.name}
                  className="w-full h-52 sm:h-56 lg:h-64 object-cover"
                />

                {/* Course Details */}
                <div className="p-5">

                  <h2 className="text-xl font-bold text-gray-800">
                    {item.course_id?.name}
                  </h2>

                  <p className="mt-3 text-gray-600">
                    <span className="font-semibold">
                      Duration:
                    </span>{" "}
                    {item.course_id?.duration}
                  </p>

                  <p className="mt-2 text-pink-500 text-xl font-bold">
                    ₹{item.course_id?.fees}
                  </p>

                  {item.course_id?.description && (
                    <p className="mt-3 text-gray-500 text-sm leading-6">
                      {item.course_id.description}
                    </p>
                  )}

                  <div className="mt-5">

                    <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                      ✅ Enrolled
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default MyCourses;