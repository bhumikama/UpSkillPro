"use client";
import React from "react";
import Image from "next/image";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import CourseCard from "./CourseCard";
import Skeleton from "@mui/material/Skeleton";
import {
  fetchCoursesStart,
  fetchCoursesSuccess,
  fetchCoursesFailure,
} from "@/features/course/courseSlice";
import Link from "next/link";

const CourseGrid = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { courses, loading, error } = useSelector((state) => state.courses);
  const pathname = usePathname(); 
  const isHome = pathname === "/";
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

 
  if (error)
    return (
      <p className="text-center text-red-700 bg-red-200 p-2 rounded-md my-8 mx-auto w-fit">
        Error: {error}
      </p>
    );

  return (
    <div className="bg-gray-50 dark:bg-[#141414]">
      <div className="max-w-7xl mx-auto p-2">
        <h2 className="font-bold text-3xl text-center mb-10">
          {isHome ? " " : "Our Courses"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={`skeleton-${index}`} />
              ))
            : courses &&
              courses.map((course, index) => (
                <CourseCard key={course.id} course={course} />
              ))}
        </div>
        {isHome && (
          <div className="flex justify-center my-10">
            <Link href="/courses">
              <button className="px-9 py-4  border border-black text-lg md:text-xl font-roboto font-bold shadow-lg hover:bg-gray-100 transition duration-300">
                Explore All Courses
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseGrid;

const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
}