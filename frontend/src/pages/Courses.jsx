

import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/courses`)
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-10">

      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-pink-600">
          Our Courses
        </h1>
        <p className="text-gray-500 mt-2">
          Explore our professional beauty training courses.
        </p>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>

      {/* No Courses */}
      {courses.length === 0 && (
        <div className="text-center text-gray-500 py-20">
          No courses available.
        </div>
      )}
    </div>
  );
};

export default Courses;