import Enrollment from "../models/Enrollment.js";

// ✅ Enroll Student
export const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID required" });
    }

    const enrollment = new Enrollment({
      course_id: courseId,
      user_id: req.user._id,
    });

    await enrollment.save();

    res.status(201).json(enrollment);
  } catch (error) {
    console.error("Enroll Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Enrollments (FIXED + SAFE)
export const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("user_id", "name")          // 👤 user name
      .populate("course_id", "name fees"); // 🎓 course

    res.json(enrollments);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const enrollment = await Enrollment.findById(id);

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    // 🔄 Toggle paid status
    enrollment.paid = !enrollment.paid;

    await enrollment.save();

    const updated = await Enrollment.findById(id)
      .populate("user_id", "name")
      .populate("course_id", "name fees");

    res.json(updated);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getMyEnrollments = async (req, res) => {
  const data = await Enrollment.find({ user_id: req.user._id })
    .populate("course_id");

  res.json(data);
};