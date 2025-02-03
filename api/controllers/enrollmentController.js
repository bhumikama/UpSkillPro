import Enrollment from "../models/enrolment-model.js";
import Course from "../models/course-model.js";
import User from "../models/user-model.js";
import { Sequelize } from "sequelize";

const generateS3Url = (fileKey) => {
  const baseUrl = process.env.AWS_S3_BASE_URL;
  return `${baseUrl}/${fileKey}`;
};

const createEnrollment = async (req, res) => {
  const userId = req.user.sub;
  const courseId = req.params.id;
  const createdAt = new Date();

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the course exists
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if the user is already enrolled in the course
    const existingEnrollment = await Enrollment.findOne({
      where: { userId, courseId },
    });
    if (existingEnrollment) {
      return res
        .status(400)
        .json({ error: "User is already enrolled in this course" });
    }

    // Ensure progress is an array of integers
    // let progress = req.body.progress || [0];
    let progress = req.body.progress ?? [];
    if (!Array.isArray(progress) || !progress.every(Number.isInteger)) {
      return res
        .status(400)
        .json({ error: "Progress must be an array of integers" });
    }

    // Create the new enrollment
    const enrollment = await Enrollment.create({
      userId,
      courseId,
      progress,
      createdAt,
    });

    return res.status(201).json(enrollment);
  } catch (error) {
    console.error(error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "Duplicate enrollment detected" });
    }
    res.status(500).json({ error: "Error creating course enrollment" });
  }
};

const getNumberOfEnrolledStudents = async (req, res) => {
  const courseId = req.params.id;

  if (!courseId || isNaN(courseId)) {
    return res.status(400).json({ message: "Invalid or missing courseId." });
  }

  try {
    // Fetch enrolled courses by userId
    const count = await Enrollment.count({
      where: { courseId },
    });

    if (!count || count === 0) {
      return res
        .status(404)
        .json({ error: "No students are enrolled for this course" });
    }

    res.status(200).json({
      courseId,
      enrolledStudents: count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching enrolled students" });
  }
};

const getEnrolledCourses = async (req, res) => {
  const userId = req.user.sub;

  try {
    // Fetch enrolled courses by userId
    const enrollments = await Enrollment.findAll({
      where: { userId },
      include: {
        model: Course,
        as: "course",
        attributes: ["id", "title", "description", "price", "imageKey"],
      },
    });

    if (!enrollments || enrollments.length === 0) {
      return res.status(404).json({ error: "No courses found for this user" });
    }

    // Return the courses associated with the enrollments
    const courses = enrollments.map((enrollment) => enrollment.course);

    // Generate the course data with image URL
    const coursesWithUrls = courses.map((course) => ({
      ...course.dataValues,
      imageUrl: generateS3Url(course.imageKey),
    }));

    // Extract just the courseIds
    const courseIds = courses.map((course) => course.id);

    res.status(200).json({
      coursesWithUrls,
      courseIds,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching enrolled courses" });
  }
};

const getInstructorRevenue = async (req, res) => {
  const instructorId = req.user.sub;
  if (!instructorId || isNaN(instructorId)) {
    return res.status(400).json({ message: "Invalid or missing userId." });
  }

  try {
    const revenueData = await Enrollment.findAll({
      attributes: [
        "courseId",
        [Sequelize.fn("COUNT", Sequelize.col("user.id")), "enrollmentCount"],
        [
          Sequelize.literal('"course"."price" * COUNT("user"."id")'),
          "totalRevenue",
        ],
      ],
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["id", "title", "price"],
          where: { instructorId },
        },
        {
          model: User,
          as: "user",
          attributes: [],
        },
      ],
      group: ["Enrollment.courseId", "course.id", "course.price"],
    });

    res.status(200).json({
      revenueData,
    });
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    res.status(500).json({ error: "Error fetching revenue data" });
  }
};

export {
  createEnrollment,
  getEnrolledCourses,
  getNumberOfEnrolledStudents,
  getInstructorRevenue,
};
