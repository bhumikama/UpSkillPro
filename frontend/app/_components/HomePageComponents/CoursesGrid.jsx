"use client";
import React from "react";
import Image from "next/image";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CourseCard from "./CourseCard";
import {
  fetchCoursesStart,
  fetchCoursesSuccess,
  fetchCoursesFailure,
} from "@/features/course/courseSlice";
const CourseGrid = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const { courses, loading, error } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!courses || courses.length === 0) {
      const fetchCourses = async () => {
        dispatch(fetchCoursesStart());
        try {
          const response = await fetch(`${API_URL}/api/courses`, {
            method: "GET",
            credentials: "include", // This ensures cookies are sent with the request
          });
          if (!response.ok) {
            const errorText = await response.json();
            throw new Error(errorText.message);
          }
          const data = await response.json();
          dispatch(fetchCoursesSuccess(data));
        } catch (error) {
          if (error.message.includes("No courses found")) {
            dispatch(fetchCoursesFailure("No courses found"));
          } else if (error.message.includes("Forbidden")) {
            dispatch(
              fetchCoursesFailure("You don't have permission to view courses")
            );
          } else {
            dispatch(fetchCoursesFailure(error.message)); 
          }
        }
      };

      fetchCourses();
    }
  }, [dispatch, courses]);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-gray-50 dark:bg-[#141414]">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <p>Loading courses...</p>
          ) : (
            courses &&
            courses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseGrid;
