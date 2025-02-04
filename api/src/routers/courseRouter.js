import "dotenv/config";
import express from "express";
import { createCourse } from "../../controllers/courseController.js";
import { createLecture } from "../../controllers/lectureController.js";
import authenticateToken from "../../middlewares/authenticateToken.js";
import authorizeRole from "../../middlewares/authorizeRole.js";
import { getCoursesByInstructor } from "../../controllers/courseController.js";
import { getAllCourses } from "../../controllers/courseController.js";
import { getCourseById } from "../../controllers/courseController.js";
import { getLecturesByCourseId } from "../../controllers/lectureController.js";
import { updateCourse } from "../../controllers/courseController.js";
import { getNumberOfEnrolledStudents } from "../../controllers/enrollmentController.js";

const courseRouter = express.Router();

courseRouter.post(
  "/",
  authenticateToken,
  authorizeRole("instructor"),
  createCourse
);
courseRouter.get("/all", authenticateToken, getCoursesByInstructor);
courseRouter.get("/", getAllCourses);
courseRouter.get("/:id", getCourseById);
courseRouter.get(
  "/:id/enrolled-count",
  authenticateToken,
  authorizeRole("instructor"),
  getNumberOfEnrolledStudents
);
courseRouter.put(
  "/:id",
  authenticateToken,
  authorizeRole("instructor"),
  updateCourse
);
courseRouter.post(
  "/:id/lectures",
  authenticateToken,
  authorizeRole("instructor"),
  createLecture
);
courseRouter.get(
  "/:id/lectures",
  authenticateToken,
  authorizeRole("student"),
  getLecturesByCourseId
);

export default courseRouter;
