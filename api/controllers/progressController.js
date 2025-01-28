import Enrollment from "../models/enrolment-model.js";
import Lecture from "../models/lecture-model.js";

const getProgress = async (req, res) => {
  try {
    const userId = req.user.sub;
    const courseId = req.params.id;

    // Validate userId and courseId
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ message: "Invalid or missing userId." });
    }
    if (!courseId || isNaN(courseId)) {
      return res.status(400).json({ message: "Invalid or missing courseId." });
    }

    // Fetch enrollment
    const enrollment = await Enrollment.findOne({
      where: { userId, courseId },
    });
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found." });
    }

    // Validate progress field
    if (!Array.isArray(enrollment.progress)) {
      return res
        .status(500)
        .json({ message: "Enrollment progress is invalid." });
    }

    // Send response
    res.status(200).json(enrollment.progress);
  } catch (error) {
    console.error("Unexpected error:", error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

const updateProgress = async (req, res) => {
  const userId = req.user.sub;
  const courseId = req.params.id;
  const { lectureId } = req.body;

  console.log("info received in backend;", userId, courseId, lectureId);

  if (!lectureId || !courseId || !userId) {
    return res
      .status(400)
      .json({ message: "Lecture ID, Course ID, and User ID are required." });
  }

  try {
    const enrollment = await Enrollment.findOne({
      where: {
        courseId: courseId,
        userId: userId,
      },
    });

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found." });
    }

    // Check if the lectureId is already in progress
    if (!enrollment.progress.includes(lectureId)) {
      enrollment.progress.push(lectureId);

      await Enrollment.update(
        { progress: enrollment.progress },
        {
          where: {
            courseId: courseId,
            userId: userId,
          },
        }
      );
    }

    console.log("updated progress:", enrollment.progress);

    return res
      .status(200)
      .json({ message: "Progress updated.", progress: enrollment.progress });
  } catch (error) {
    console.error("Error updating progress:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

const markAllCompleted = async (req, res) => {
  const courseId = req.params.id; // Extract courseId from the URL
  const userId = req.user.sub; // Extract userId from the request body (or session)

  if (!courseId || !userId) {
    return res
      .status(400)
      .json({ message: "Course ID and User ID are required." });
  }

  try {
    // Fetch all lecture IDs for the given course
    const lectures = await Lecture.findAll({
      where: { courseId },
      attributes: ["id"],
    });

    const allLectureIds = lectures.map((lecture) => lecture.id);

    // Find the enrollment for the user and course
    const enrollment = await Enrollment.findOne({
      where: { courseId, userId },
    });

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found." });
    }

    // Update progress to include all lecture IDs
    enrollment.progress = [...allLectureIds];
    await enrollment.save();

    return res.status(200).json({
      message: "All lectures marked as completed.",
      progress: enrollment.progress,
    });
  } catch (error) {
    console.error("Error marking all lectures as completed:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

const removeAllLectureId = async (req, res) => {
  const courseId = req.params.id;
  const userId = req.user.sub;

  if (!courseId || !userId) {
    return res
      .status(400)
      .json({ message: "Course ID and User ID are required." });
  }

  try {
    const enrollment = await Enrollment.findOne({
      where: { courseId, userId },
    });

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found." });
    }

    // Update progress to include all lecture IDs
    enrollment.progress = [];
    await enrollment.save();

    return res.status(200).json({
      message: "All lectures are removed.",
      progress: enrollment.progress,
    });
  } catch (error) {
    console.error("Error marking all lectures as completed:", error);
    return res.status(500).json({ message: "Server error." });
  }
};
export { getProgress, updateProgress, markAllCompleted, removeAllLectureId };
