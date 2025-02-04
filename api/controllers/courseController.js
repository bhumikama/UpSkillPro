import Course from "../models/course-model.js";
import User from "../models/user-model.js";
import Lecture from "../models/lecture-model.js";
import { Op } from "sequelize";

const generateS3Url = (fileKey) => {
  const baseUrl = process.env.AWS_S3_BASE_URL;
  return `${baseUrl}/${fileKey}`;
};

const createCourse = async (req, res) => {
  const instructorId = req.user.sub;
  const { title, description, price, imageKey } = req.body;
  const createdAt = new Date();
  try {
    const instructor = await User.findOne({
      where: { id: instructorId, role: "instructor" },
    });
    if (!instructor) {
      return res
        .status(403)
        .json({ message: "Instructor not found or invalid." });
    }

    // Create the course
    const course = await Course.create({
      title,
      description,
      instructorId,
      imageKey,
      price,
      createdAt,
    });

    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating course." });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const { title, sortKey = "price", sortDir = "asc" } = req.query;
    const where = {};

    if (title) {
      where.title = { [Op.iLike]: `%${title}%` };
    }

    const validSortKeys = ["price", "createdAt", "title"];
    const validSortDir = ["asc", "desc"];
    const sortKeySafe = validSortKeys.includes(sortKey) ? sortKey : "price";
    const sortDirSafe = validSortDir.includes(sortDir.toLowerCase())
      ? sortDir.toUpperCase()
      : "ASC";

    // Fetch all courses along with their instructor details
    const courses = await Course.findAll({
      where,
      order: [[sortKeySafe, sortDirSafe]],
      include: {
        model: User,
        as: "instructor",
        attributes: ["id", "name", "email"],
      },
      attributes: [
        "id",
        "title",
        "description",
        "imageKey",
        "createdAt",
        "price",
      ],
    });

    if (!courses.length) {
      return res.status(404).json({ message: "No courses found" });
    }

    // Add full S3 URL for each course
    const coursesWithUrls = courses.map((course) => ({
      ...course.dataValues,
      imageUrl: generateS3Url(course.imageKey),
    }));
    res.status(200).json(coursesWithUrls);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

const getCoursesByInstructor = async (req, res) => {
  try {
    const instructorId = req.user.sub;
    if (!instructorId) {
      return res
        .status(404)
        .json({ message: "Instructor ID not found in token" });
    }

    // Fetch all courses for this instructor
    const courses = await Course.findAll({
      where: { instructorId },
      attributes: ["id", "title", "description", "imageKey", "createdAt"],
    });

    if (!courses.length) {
      return res
        .status(404)
        .json({ message: "No courses found for this instructor" });
    }

    // Add full S3 URL for each course
    const coursesWithUrls = courses.map((course) => ({
      ...course.dataValues,
      imageUrl: generateS3Url(course.imageKey),
    }));

    res.status(200).json(coursesWithUrls);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id, {
      include: [
        {
          model: User,
          as: "instructor",
          attributes: ["id", "name", "email"],
        },
        {
          model: Lecture,
          as: "lectures",
          attributes: ["id", "title", "videoUrl", "createdAt"],
        },
      ],
      attributes: [
        "id",
        "title",
        "description",
        "imageKey",
        "createdAt",
        "price",
      ],
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Add full S3 URL for each course
    const courseWithUrl = {
      ...course.toJSON(),
      imageUrl: generateS3Url(course.imageKey),
    };
    res.status(200).json(courseWithUrl);
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the course" });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.instructorId !== req.user.sub) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this course" });
    }

    // Update the course with the new data
    await course.update({ title, description });

    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the course" });
  }
};

export {
  createCourse,
  getCoursesByInstructor,
  getAllCourses,
  getCourseById,
  updateCourse,
};
