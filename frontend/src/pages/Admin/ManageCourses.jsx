

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);

  const [form, setForm] = useState({
    name: "",
    duration: "",
    fees: "",
    description: "",
    imageUrl: "",
  });

  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch Courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses`);
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Add / Update Course
  const handleSubmit = async () => {
    try {
      const payload = {
        name: form.name,
        duration: form.duration,
        description: form.description,
        fees: Number(form.fees),
        image: {
          url: form.imageUrl,
          filename: "course-image",
        },
      };

      if (editId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/courses/${editId}`,
          payload,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setEditId(null);
      } else {
        await axios.post(
          "${import.meta.env.VITE_API_URL}/courses",
          payload,
          {
            headers: {
              Authorization: token,
            },
          }
        );
      }

      fetchCourses();

      setForm({
        name: "",
        duration: "",
        fees: "",
        description: "",
        imageUrl: "",
      });

    } catch (err) {
      console.log(err);
    }
  };

  // Delete
  const deleteCourse = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/courses/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchCourses();
    } catch (err) {
      console.log(err);
    }
  };

  // Edit
  const handleEdit = (course) => {
    setForm({
      name: course.name,
      duration: course.duration,
      fees: course.fees,
      description: course.description || "",
      imageUrl: course.image?.url || "",
    });

    setEditId(course._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-pink-200">

      <Sidebar />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">

        {/* Form */}

        <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6 w-full lg:max-w-2xl mb-8">

          <h2 className="text-xl md:text-2xl font-bold text-pink-500 mb-6">
            {editId ? "Update Course" : "Add Course"}
          </h2>

          <div className="space-y-4">

            <div>
              <label className="font-medium">
                Course Name
              </label>

              <input
                className="border rounded-xl w-full p-3 mt-1"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="font-medium">
                Image URL
              </label>

              <input
                className="border rounded-xl w-full p-3 mt-1"
                value={form.imageUrl}
                onChange={(e) =>
                  setForm({
                    ...form,
                    imageUrl: e.target.value,
                  })
                }
              />
            </div>

            {form.imageUrl && (
              <img
                src={form.imageUrl}
                alt="Preview"
                className="w-full h-48 sm:h-56 object-cover rounded-xl"
              />
            )}

            <div>
              <label className="font-medium">
                Duration
              </label>

              <input
                className="border rounded-xl w-full p-3 mt-1"
                value={form.duration}
                onChange={(e) =>
                  setForm({
                    ...form,
                    duration: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="font-medium">
                Description
              </label>

              <textarea
                rows={4}
                className="border rounded-xl w-full p-3 mt-1"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="font-medium">
                Fees
              </label>

              <input
                type="number"
                className="border rounded-xl w-full p-3 mt-1"
                value={form.fees}
                onChange={(e) =>
                  setForm({
                    ...form,
                    fees: e.target.value,
                  })
                }
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl transition"
            >
              {editId ? "Update Course" : "Add Course"}
            </button>

          </div>

        </div>

        {/* Course List */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >

              {course.image?.url && (
                <img
                  src={course.image.url}
                  alt={course.name}
                  className="w-full h-52 sm:h-60 lg:h-64 object-cover"
                />
              )}

              <div className="p-5">

                <h3 className="text-xl font-bold">
                  {course.name}
                </h3>

                <p className="text-gray-600 mt-2">
                  {course.description}
                </p>

                <p className="mt-3">
                  <span className="font-semibold">
                    Duration:
                  </span>{" "}
                  {course.duration}
                </p>

                <p className="text-pink-500 font-bold text-lg mt-2">
                  ₹{course.fees}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-5">

                  <button
                    onClick={() => handleEdit(course)}
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCourse(course._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default ManageCourses;