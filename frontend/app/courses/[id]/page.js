"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import VideoPlayer from "@/app/student-dashboard/components/VideoPlayer";
import Image from "next/image";
import EnrollButton from "@/app/_components/HomePageComponents/EnrollButton";
import { useDispatch } from "react-redux";
import { setUserEnrolledCourses } from "@/features/course/courseSlice";
import { Avatar } from "@mui/material";
import { CastForEducation } from "@mui/icons-material";
import { FaChalkboardTeacher } from "react-icons/fa";
import { DollarSign } from "lucide-react";
const CoursePage = () => {
  const { id } = useParams(); 
  const [course, setCourse] = useState({}); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const dispatch = useDispatch();
  const fetchCourseByID = async () => {
    if (!id) {
      setError("Invalid Course ID");
      setLoading(false);
      return;
    }
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${id}`;
      const apiResponse = await fetch(apiUrl, {
        method: "GET",
        credentials: "include", // This ensures cookies are sent with the request
      });

      console.log("API Response Status:", apiResponse.status);
      if (apiResponse.status === 404) {
        setCourse({});
        return;
      }
      if (apiResponse.ok) {
        const course = await apiResponse.json();
        setCourse(course);
      } else {
        const errorText = await apiResponse.json();
        console.error("Error details :", errorText.message);
      }
    } catch (error) {
      console.error("Error fetching projects", error.message);
    }
  };

  // Fetch the enrolled courses
  const fetchEnrolledCourses = async () => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/enroll/all`;
      const apiResponse = await fetch(apiUrl, {
        method: "GET",
        credentials: "include", // Include session cookies
      });

      if (apiResponse.ok) {
        const data = await apiResponse.json();
        setEnrolledCourses(data.courseIds); // Set the enrolled courses from the backend
        dispatch(setUserEnrolledCourses(data.courseIds));
      } else {
        console.error("Failed to fetch enrolled courses");
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error.message);
    }
  };

  useEffect(() => {
    fetchCourseByID();
    if (enrolledCourses.length === 0) {
      fetchEnrolledCourses();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!course) {
    return <div>No course data found.</div>;
  }
  const isEnrolled = enrolledCourses.includes(Number(id));
  return (
    <div className="bg-gray-100 ">
      <div className="width-full bg-gradient-to-r from-black to-gray-500 shadow-lg ">
        <div className="container mx-auto px-5 py-3 ">
          <h3 className="text-gray-100 text-5xl font-medium mb-4 lg:text-4xl">
            {course.title}
          </h3>
          <p className=" flex items-center gap-2">
            <span className="text-gray-300 font-medium text-3xl flex items-center gap-2">
              {" "}
              <FaChalkboardTeacher />
              Instructor:
            </span>{" "}
            <span className="text-white text-2xl">
              {course.instructor?.name}
            </span>
          </p>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="leading-loose grid lg:grid-cols-3 md:gap-3">
          <div className="p-3 col-span-2 px-4 border">
            <div className="bg-white p-5 rounded-lg shadow-md mb-5 flex justify-center">
              <VideoPlayer
                url="/api.mp4"
                onProgressUpdate={() => {}}
                progressData={{}}
                width={900}
                height={600}
                showControls={true}
              />
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md mb-5">
              <p className="text-gray-400 mb-3">{course.description}</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h4 className="text-1xl font-semibold mt-4 bg-green-100 text-green-600 w-fit px-5">
                {course.lectures?.length} Lectures
                {/* Safely access the length */}
              </h4>
              {course.lectures?.map((lecture, lectureIndex) => (
                <div key={lectureIndex} className="my-5 p-4 border">
                  <h5 className="text-xl font-medium">{lecture.title}</h5>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
              <Image
                src={course.imageUrl || null}
                alt={`image of ${course.title}`}
                width={500}
                height={500}
                className="object-contain"
              />
              <h3 className="text-4xl font-bold text-green-700 my-4 flex items-center">
              <DollarSign size={30} className="text-gray-600"/>  {course.price} Dkk
              </h3>
              {/* <button className="rounded-md text-xl font-semibold bg-black text-white w-full py-5">
                Enroll
              </button> */}
              <EnrollButton
                courseId={id}
                setLoading={setLoading}
                isEnrolled={isEnrolled}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
