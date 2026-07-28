

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const token = localStorage.getItem("token");

  // Fetch Images
  const fetchImages = async () => {
    try {
      const res = await axios.get("${import.meta.env.VITE_API_URL}/gallery");
      setImages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Add Image
  const handleAdd = async () => {
    try {
      if (!imageUrl) {
        alert("Please enter an image URL");
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/gallery`,
        {
          image_url: imageUrl,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setImageUrl("");
      fetchImages();

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // Delete Image
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/gallery/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchImages();

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-pink-200">

      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">

        {/* Add Image Form */}

        <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6 w-full lg:max-w-2xl mb-8">

          <h2 className="text-xl md:text-2xl font-bold text-pink-500 mb-6">
            Add Gallery Image
          </h2>

          <input
            type="text"
            placeholder="Paste Image URL"
            className="border rounded-xl w-full p-3"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full h-48 sm:h-56 object-cover rounded-xl mt-4"
            />
          )}

          <button
            onClick={handleAdd}
            className="w-full mt-5 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl transition"
          >
            Add Image
          </button>

        </div>

        {/* Gallery */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

          {images.map((img) => (
            <div
              key={img._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >

              <img
                src={img.image_url}
                alt="Gallery"
                className="w-full h-52 sm:h-60 lg:h-72 object-cover"
              />

              <div className="p-4">

                <button
                  onClick={() => handleDelete(img._id)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
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

export default ManageGallery;