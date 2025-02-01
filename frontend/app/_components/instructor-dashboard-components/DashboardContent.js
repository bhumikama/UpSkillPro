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
          <Button className="p-5 hover:bg-[#374151]" onClick={handleNavigation}>
            Create New Course
          </Button>
        </CardHeader>
        <CardContent>
          <div className="container my-10 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
              {allCourses.length > 0 ? (
                allCourses.map((course, index) => (
                  <div
                    key={`course-${index}`}
                    className=" relative border  border-gray-300 rounded-md shadow-md  leading-loose 	"
                  >
                    <Image
                      src={course.imageUrl}
                      alt={`Image of ${course.title}`}
                      width={500}
                      height={500}
                      className="object-contain "
                    />
                    <span className="bg-green-700 text-white absolute font-medium top-7 px-2">
                      BEST SELLER
                    </span>
                    <div className="p-3">
                      <h2 className="text-lg font-semibold ">{course.title}</h2>
                      <p className="text-gray-400">{course.description}</p>
                      <button
                        className="px-2 py-1.5 min-w-20 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                        onClick={() => handleOnClick(course.id)}
                      >
                        Add new lecture
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>Courses not found</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardContent;
