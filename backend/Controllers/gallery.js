import Gallery from "../models/Gallery.js";

// Add Image
export const addImage = async (req, res) => {
  try {
    const { image_url } = req.body;

    if (!image_url) {
      return res.status(400).json({ message: "Image URL required" });
    }

    const image = new Gallery({ image_url });

    await image.save();
    res.status(201).json(image);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get Gallery
export const getGallery = async (req, res) => {
  const images = await Gallery.find();
  res.json(images);
};

// Delete Image
export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedImage = await Gallery.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};