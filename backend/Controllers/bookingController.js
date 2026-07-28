import Booking from "../models/Booking.js";

// Create Booking
export const createBooking = async (req, res) => {
  try {
    const { serviceId, date } = req.body;
  if (!serviceId || !date) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const booking = new Booking({
      service_id: serviceId,     // ✅ map correctly
      user_id: req.user._id,     // ✅ from token
      date
    });

    await booking.save();

    res.status(201).json(booking);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get Bookings with user + service
export const getBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate("user_id","name")
    .populate("service_id","name image");

  res.json(bookings);
};

// Update Booking
export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate("user_id")
      .populate("service_id");

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Booking
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  const data = await Booking.find({  user_id: req.user._id })
    .populate("service_id");

  res.json(data);
};