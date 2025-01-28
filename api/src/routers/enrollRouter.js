import "dotenv/config";
import express from "express";
import authenticateToken from "../../middlewares/authenticateToken.js";
import authorizeRole from "../../middlewares/authorizeRole.js";
import { createEnrollment } from "../../controllers/enrollmentController.js";
import { getEnrolledCourses } from "../../controllers/enrollmentController.js";
import { getProgress } from "../../controllers/progressController.js";
import { updateProgress } from "../../controllers/progressController.js";
import { markAllCompleted } from "../../controllers/progressController.js";
import { removeAllLectureId } from "../../controllers/progressController.js";
const enrollRouter = express.Router();

enrollRouter.post(
  "/:id",
  authenticateToken,
  authorizeRole("student"),
  createEnrollment
);

enrollRouter.get(
  "/all",
  authenticateToken,
  authorizeRole("student"),
  getEnrolledCourses
);

enrollRouter.get(
  "/:id/progress",
  authenticateToken,
  authorizeRole("student"),
  getProgress
);
enrollRouter.put(
  "/:id/progress",
  authenticateToken,
  authorizeRole("student"),
  updateProgress
);

enrollRouter.post(
  "/:id/mark-all-completed",
  authenticateToken,
  authorizeRole("student"),
  markAllCompleted
);

enrollRouter.post(
  "/:id/remove-all",
  authenticateToken,
  authorizeRole("student"),
  removeAllLectureId
);

export default enrollRouter;
