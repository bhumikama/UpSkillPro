/** @type {import('sequelize-cli').Migration} */

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 1: Create enum type if it doesn't already exist
    await queryInterface.sequelize.query(`
      DO
      $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_Users_role') THEN
          CREATE TYPE "public"."enum_Users_role" AS ENUM('student', 'instructor');
        END IF;
      END
      $$;
    `);

    // Step 2: Ensure foreign key constraints are created if needed
    // Check if the foreign key constraints are already there for 'instructorId' in 'Courses' and 'courseId' in 'Enrollments'
    await queryInterface.sequelize.query(`
      DO
      $$
      BEGIN
        -- Add foreign key for 'instructorId' in 'Courses' table if it does not exist
        IF NOT EXISTS (
          SELECT 1
          FROM information_schema.table_constraints
          WHERE constraint_name = 'Courses_instructorId_fkey'
        ) THEN
          ALTER TABLE "Courses"
          ADD CONSTRAINT "Courses_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Users" ("id") ON DELETE CASCADE;
        END IF;

        -- Add foreign key for 'courseId' in 'Enrollments' table if it does not exist
        IF NOT EXISTS (
          SELECT 1
          FROM information_schema.table_constraints
          WHERE constraint_name = 'Enrollments_courseId_fkey'
        ) THEN
          ALTER TABLE "Enrollments"
          ADD CONSTRAINT "Enrollments_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses" ("id") ON DELETE CASCADE;
        END IF;
      END
      $$;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Step 3: Remove foreign key constraints if they exist
    await queryInterface.sequelize.query(`
      DO
      $$
      BEGIN
        -- Drop the foreign key for 'instructorId' in 'Courses' table if it exists
        IF EXISTS (
          SELECT 1
          FROM information_schema.table_constraints
          WHERE constraint_name = 'Courses_instructorId_fkey'
        ) THEN
          ALTER TABLE "Courses" DROP CONSTRAINT "Courses_instructorId_fkey";
        END IF;

        -- Drop the foreign key for 'courseId' in 'Enrollments' table if it exists
        IF EXISTS (
          SELECT 1
          FROM information_schema.table_constraints
          WHERE constraint_name = 'Enrollments_courseId_fkey'
        ) THEN
          ALTER TABLE "Enrollments" DROP CONSTRAINT "Enrollments_courseId_fkey";
        END IF;
      END
      $$;
    `);

    // Step 4: Drop the enum type if it exists
    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "public"."enum_Users_role";
    `);
  },
};
