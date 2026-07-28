


import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: token,
        },
      });

      setUsers(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete User
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      fetchUsers();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // Change Role
  const changeRole = async (id, role) => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/${id}`,
        { role },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchUsers();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-pink-200">

      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto">

        <h1 className="text-2xl md:text-3xl font-bold text-pink-500 mb-8">
          Manage Users
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

          {users.map((u) => (
            <div
              key={u._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-5"
            >
              <h3 className="text-lg font-bold text-gray-800 break-words">
                {u.name}
              </h3>

              <p className="text-gray-500 break-all mt-1">
                {u.email}
              </p>

              <p className="mt-3">
                <span className="font-semibold">
                  Role:
                </span>{" "}
                <span className="text-pink-500 font-bold uppercase">
                  {u.role}
                </span>
              </p>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">

                <button
                  onClick={() =>
                    changeRole(
                      u._id,
                      u.role === "admin"
                        ? "student"
                        : "admin"
                    )
                  }
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                >
                  {u.role === "admin"
                    ? "Make Student"
                    : "Make Admin"}
                </button>

                <button
                  onClick={() => deleteUser(u._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default ManageUsers;