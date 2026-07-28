import Service from "../models/Service.js";

// Add Service
export const createService = async (req, res) => {
 try {
      // console.log("BODY:", req.body); // 🔥 debug
    const { name, description, price,image } = req.body;

    const service = new Service({
      name,
      description,
      price,
      image: {
        url: image?.url || "",
        filename: image?.filename || "service-image"
      }
    });

    await service.save();
    res.status(201).json(service);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Services
export const getServices = async (req, res) => {
 try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Service
export const updateService = async (req, res) => {
   try {
    const { id } = req.params;

    const updatedData = {
      ...req.body
    };

    // If new image uploaded
    if (req.body.image) {
      updatedData.image = {
        url: req.body.image.url|| " ",
        filename: req.body.image.filename || "service-image"
      };
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(updatedService);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Service
export const deleteService = async (req, res) => {
   try {
    const { id } = req.params;

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ message: "Service deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};