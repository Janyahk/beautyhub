import Course from "../models/Course.js";

// ✅ Create Course
export const createCourse = async (req, res) => {
  try {
    const { name, duration, description,fees, image, trainer } = req.body;

    const course = new Course({
      name,
      duration,
      fees,
      description,
      trainer,
      image: {
        url: image?.url || "",
        filename: image?.filename || "course-image"
      }
    });

    await course.save();
    res.status(201).json(course);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("trainer", "name email");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Course
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      {
        ...req.body,
        description: req.body.description, 

        image: {
          url: req.body.image?.url || "",
          filename: req.body.image?.filename || "course-image"
        }
      },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(updatedCourse);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Course
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 

// export const getMyCourses = async (req, res) => {
//   const data = await Enrollment.find({ user_id: req.user._id })
//     .populate("service_id");

//   res.json(data);
// };