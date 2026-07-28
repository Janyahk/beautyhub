


import { useEffect, useState } from "react";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/gallery")
      .then((res) => setImages(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-10">

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-pink-600">
          Our Gallery
        </h2>

        <p className="text-gray-500 mt-2">
          Explore our latest beauty services and student transformations.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {images.map((img) => (
          <div
            key={img._id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >
            <img
              src={img.image_url}
              alt="Gallery"
              className="w-full h-64 sm:h-72 lg:h-80 object-cover hover:scale-105 transition duration-300"
            />
          </div>
        ))}

      </div>

      {/* Empty State */}
      {images.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No gallery images available.
        </div>
      )}
    </div>
  );
};

export default Gallery;