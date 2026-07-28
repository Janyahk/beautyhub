

// pages/Services.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../components/ServiceCard.jsx";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/services",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setServices(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 sm:px-6 lg:px-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;