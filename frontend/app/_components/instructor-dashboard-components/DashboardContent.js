"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  fetchCoursesStart,
  fetchCoursesSuccess,
  fetchCoursesFailure,
} from "@/features/course/courseSlice";
import InstructorCard from "./InstructorCard";
import { Skeleton } from "@mui/material";

const DashboardContent = () => {
  const router = useRouter();
  const [allCourses, setAllCourses] = useState([]);
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    const fetchProjectsByInstructor = async () => {
      dispatch(fetchCoursesStart());
      try {
        const apiResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/courses/all`,
          {
            method: "GET",
            credentials: "include", // This ensures cookies are sent with the request
          }
        );

        if (!apiResponse.ok) {
          if (apiResponse.status === 404) {
            throw new Error("No courses found");
          }
          const errorText = await apiResponse.json();
          throw new Error(errorText.message);
        }

        const coursesData = await apiResponse.json();
        setAllCourses(coursesData);
        dispatch(fetchCoursesSuccess(coursesData));
      } catch (error) {
        if (error.message.includes("No courses found")) {
          setAllCourses([]);
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
    fetchProjectsByInstructor();
  }, []);

  const handleNavigation = () => {
    router.push("instructor-dashboard/add-course");
  };

  const handleOnClick = (id) => {
    router.push(`instructor-dashboard/courses/${id}/add-lecture`);
  };

  return (
    <div>
      <Card>
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle className="font-extrabold text-3xl">All Courses</CardTitle>
          <Button
            className="p-5 hover:bg-[#374151] hover:text-white border border-gray-900"
            onClick={handleNavigation}
          >
            Create New Course
          </Button>
        </CardHeader>
        <CardContent>
          <div className="container my-10 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => {
                  <CourseSkeleton key={index} />;
                })
              ) : allCourses.length > 0 ? (
                allCourses.map((course, index) => (
                  <InstructorCard key={course.id} course={course} />
                ))
              ) : (
                <p className="text-lg text-gray-600 mt-4">
                  No courses available at the moment.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardContent;

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
};
