


// pages/Home.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [courses, setCourses] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/gallery")
      .then((res) => setImages(res.data))
      .catch(console.log);

    axios
      .get("http://localhost:5000/api/services")
      .then((res) => setServices(res.data))
      .catch(console.log);

    axios
      .get("http://localhost:5000/api/courses")
      .then((res) => setCourses(res.data))
      .catch(console.log);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">

      {/* HERO */}
      <section className="bg-gradient-to-br from-pink-100 via-orange-50 to-pink-200">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-16 py-14">

          <div className="max-w-xl text-center lg:text-left mt-10 lg:mt-0">

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Beauty & Skills
              <br />
              <span className="text-pink-500">
                For a Better Future
              </span>
            </h1>

            <p className="text-gray-600 mt-5 text-base sm:text-lg">
              Professional beauty services and industry courses to
              enhance your career and confidence.
            </p>

            <button
              onClick={() => navigate("/services")}
              className="mt-8 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full shadow-lg transition"
            >
              Explore Services
            </button>

          </div>

          <img
            src="https://th.bing.com/th/id/OIP.kVDuuKmlYW8EgfbfVib4RwHaLH?w=202&h=303&c=7&r=0&o=5&dpr=1.5&pid=1.7"
            alt="Beauty"
            className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] rounded-full object-cover shadow-2xl"
          />
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-12 px-4 sm:px-8 lg:px-16">

        <h2 className="text-center text-3xl font-bold text-pink-600 mb-10">
          Our Services
        </h2>

        <div className="overflow-hidden">

          <div className="flex gap-6 animate-scroll-x w-max">

            {[...services, ...services].map((service, index) => (

              <div
                key={index}
                className="min-w-[230px] sm:min-w-[260px] lg:min-w-[300px] bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden"
              >

                <img
                  src={
                    service.image?.url ||
                    "https://via.placeholder.com/300x200"
                  }
                  alt={service.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-4">

                  <h3 className="font-bold text-lg">
                    {service.name}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2">
                    {service.description?.slice(0, 60)}...
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        <div className="text-center mt-8">

          <button
            onClick={() => navigate("/services")}
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full"
          >
            Explore Services
          </button>

        </div>

      </section>

      {/* COURSES */}
      <section className="py-12 px-4 sm:px-8 lg:px-16 bg-white">

        <h2 className="text-center text-3xl font-bold text-pink-600 mb-10">
          Our Courses
        </h2>

        <div className="overflow-hidden">

          <div className="flex gap-6 animate-scroll-x w-max">

            {[...courses, ...courses].map((course, index) => (

              <div
                key={index}
                className="min-w-[230px] sm:min-w-[260px] lg:min-w-[300px] bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden"
              >

                <img
                  src={
                    course.image?.url ||
                    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
                  }
                  alt={course.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-4">

                  <h3 className="font-bold text-lg">
                    {course.name}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2">
                    {course.description?.slice(0, 60)}...
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        <div className="text-center mt-8">

          <button
            onClick={() => navigate("/courses")}
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full"
          >
            Explore Courses
          </button>

        </div>

      </section>

      {/* GALLERY */}
      <section className="py-12 px-4 sm:px-8 lg:px-16">

        <h2 className="text-center text-3xl font-bold text-pink-600 mb-10">
          Gallery
        </h2>

        <div className="overflow-hidden">

          <div className="flex gap-6 animate-scroll-x w-max">

            {[...images, ...images].map((img, index) => (

              <div
                key={index}
                className="min-w-[230px] sm:min-w-[260px] lg:min-w-[300px] bg-white rounded-2xl shadow-lg overflow-hidden"
              >

                <img
                  src={img.image_url}
                  alt="Gallery"
                  className="w-full h-60 object-cover"
                />

              </div>

            ))}

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;