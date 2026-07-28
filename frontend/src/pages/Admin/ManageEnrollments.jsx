

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const ManageEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/enrollments",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setEnrollments(res.data);
      } catch (err) {
        console.log(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [token]);

  const handleTogglePayment = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/enrollments/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setEnrollments(
        enrollments.map((e) =>
          e._id === id ? res.data : e
        )
      );
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading Enrollments...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-pink-200">

      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">

        <h1 className="text-2xl sm:text-3xl font-bold text-pink-500 mb-8">
          Manage Enrollments
        </h1>

        {/* ================= MOBILE VIEW ================= */}

        <div className="block md:hidden space-y-4">

          {enrollments.length > 0 ? (
            enrollments.map((enroll) => (
              <div
                key={enroll._id}
                className="bg-white rounded-2xl shadow-lg p-5"
              >
                <p>
                  <span className="font-semibold">
                    Student:
                  </span>{" "}
                  {enroll.user_id?.name || "N/A"}
                </p>

                <p className="mt-2">
                  <span className="font-semibold">
                    Course:
                  </span>{" "}
                  {enroll.course_id?.name || "N/A"}
                </p>

                <p className="mt-2">
                  <span className="font-semibold">
                    Fees:
                  </span>{" "}
                  ₹{enroll.course_id?.fees || 0}
                </p>

                <p className="mt-2">
                  <span className="font-semibold">
                    Status:
                  </span>{" "}
                  {enroll.paid ? (
                    <span className="text-green-600 font-semibold">
                      Paid ✅
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold">
                      Not Paid ❌
                    </span>
                  )}
                </p>

                <button
                  onClick={() =>
                    handleTogglePayment(enroll._id)
                  }
                  className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl"
                >
                  {enroll.paid
                    ? "Mark Unpaid"
                    : "Mark Paid"}
                </button>
              </div>
            ))
          ) : (
            <div className="text-center bg-white rounded-xl p-5">
              No enrollments found.
            </div>
          )}
        </div>

        {/* ================= TABLET & DESKTOP ================= */}

        <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-pink-500 text-white">

              <tr>
                <th className="p-4 text-left">
                  Student
                </th>

                <th className="p-4 text-left">
                  Course
                </th>

                <th className="p-4 text-left">
                  Fees
                </th>

                <th className="p-4 text-left">
                  Payment
                </th>
              </tr>

            </thead>

            <tbody>

              {enrollments.length > 0 ? (
                enrollments.map((enroll) => (
                  <tr
                    key={enroll._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-4">
                      {enroll.user_id?.name || "N/A"}
                    </td>

                    <td className="p-4">
                      {enroll.course_id?.name || "N/A"}
                    </td>

                    <td className="p-4">
                      ₹{enroll.course_id?.fees || 0}
                    </td>

                    <td className="p-4">

                      <div className="mb-3">

                        {enroll.paid ? (
                          <span className="text-green-600 font-semibold">
                            Paid ✅
                          </span>
                        ) : (
                          <span className="text-red-500 font-semibold">
                            Not Paid ❌
                          </span>
                        )}

                      </div>

                      <button
                        onClick={() =>
                          handleTogglePayment(
                            enroll._id
                          )
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        {enroll.paid
                          ? "Mark Unpaid"
                          : "Mark Paid"}
                      </button>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center p-8"
                  >
                    No enrollments found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
};

export default ManageEnrollments;