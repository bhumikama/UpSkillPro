import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user-model.js";
import Course from "./course-model.js";

const Enrollment = sequelize.define(
  "Enrollment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Course,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    progress: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
      defaultValue: [],
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW,
    },
  },
  {
    tableName: "Enrollments",
    timestamps: false,
  }
);

User.belongsToMany(Course, {
  through: Enrollment,
  foreignKey: "userId",
  as: "enrolledCourses",
});
Course.belongsToMany(User, {
  through: Enrollment,
  foreignKey: "courseId",
  as: "enrolledUsers",
});

Enrollment.belongsTo(User, { foreignKey: "userId", as: "user" });
Enrollment.belongsTo(Course, { foreignKey: "courseId", as: "course" });

sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("Enrollment model is synchronized.");
  })
  .catch((err) => {
    console.error("Error syncing the Enrollment model:", err);
  });

export default Enrollment;
