

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch Services
  const fetchServices = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/services`);
      setServices(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Add / Update Service
  const handleSubmit = async () => {
    try {
      if (!form.name || !form.price) {
        alert("Name and Price are required.");
        return;
      }

      const payload = {
        name: form.name,
        price: Number(form.price),
        description: form.description,
        image: {
          url: form.imageUrl,
          filename: "service-image",
        },
      };

      if (editId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/services/${editId}`,
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
          "${import.meta.env.VITE_API_URL}/services",
          payload,
          {
            headers: {
              Authorization: token,
            },
          }
        );
      }

      fetchServices();

      setForm({
        name: "",
        price: "",
        description: "",
        imageUrl: "",
      });

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // Delete
  const deleteService = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/services/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchServices();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // Edit
  const handleEdit = (service) => {
    setForm({
      name: service.name,
      price: service.price,
      description: service.description,
      imageUrl: service.image?.url || "",
    });

    setEditId(service._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-pink-200">

      <Sidebar />

      <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">

        {/* Form */}

        <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6 w-full lg:max-w-2xl mb-8">

          <h2 className="text-xl md:text-2xl font-bold text-pink-500 mb-6">
            {editId ? "Update Service" : "Add Service"}
          </h2>

          <div className="space-y-4">

            <div>
              <label className="font-medium">
                Service Name
              </label>

              <input
                className="border rounded-xl p-3 w-full mt-1"
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
                className="border rounded-xl p-3 w-full mt-1"
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
                Description
              </label>

              <textarea
                rows={4}
                className="border rounded-xl p-3 w-full mt-1"
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
                Price
              </label>

              <input
                type="number"
                className="border rounded-xl p-3 w-full mt-1"
                value={form.price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price: e.target.value,
                  })
                }
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl transition"
            >
              {editId ? "Update Service" : "Add Service"}
            </button>

          </div>

        </div>

        {/* Services */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >

              {service.image?.url ? (
                <img
                  src={service.image.url}
                  alt={service.name}
                  className="w-full h-52 sm:h-60 lg:h-64 object-cover"
                />
              ) : (
                <div className="h-52 flex justify-center items-center text-gray-400">
                  No Image
                </div>
              )}

              <div className="p-5">

                <h3 className="text-xl font-bold">
                  {service.name}
                </h3>

                <p className="text-gray-600 mt-2">
                  {service.description}
                </p>

                <p className="text-pink-500 font-bold text-lg mt-3">
                  ₹{service.price}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-5">

                  <button
                    onClick={() => handleEdit(service)}
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteService(service._id)}
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

export default ManageServices;