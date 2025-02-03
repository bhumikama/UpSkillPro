"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import VideoPlayer from "@/app/student-dashboard/components/VideoPlayer";
import Image from "next/image";
import EnrollButton from "@/app/_components/HomePageComponents/EnrollButton";
import { FaChalkboardTeacher } from "react-icons/fa";
import { DollarSign } from "lucide-react";
import SocialButtons from "@/app/_components/HomePageComponents/SocialButtons";

const CoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

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
        credentials: "include",
      });

      if (apiResponse.status === 404) {
        setCourse({});
        setLoading(false);
        return;
      }
      if (apiResponse.ok) {
        const course = await apiResponse.json();
        setCourse(course);
        setLoading(false);
      } else {
        const errorText = await apiResponse.json();
        console.error("Error details:", errorText.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching course:", error.message);
      setLoading(false);
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/enroll/all`;
      const apiResponse = await fetch(apiUrl, {
        method: "GET",
        credentials: "include",
      });

      if (apiResponse.ok) {
        const data = await apiResponse.json();
        setEnrolledCourses(data.courseIds);
      } else {
        console.error("Failed to fetch enrolled courses");
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCourseByID();
    fetchEnrolledCourses();
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
    <div className="bg-gray-100">
      <div className="width-full bg-gradient-to-r from-black to-gray-500 shadow-lg ">
        <div className="container mx-auto px-5 py-3 shadow-xl ">
          <h3 className="text-gray-100 text-xl font-bold mb-4 lg:text-4xl">
            {course.title}
          </h3>
          <p className=" flex items-center gap-2">
            <span className="text-gray-300 font-medium text-xl flex items-center gap-2">
              <FaChalkboardTeacher />
              Course by:
            </span>
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
              <p className="text-gray-600 mb-3">{course.description}</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h4 className="text-1xl font-semibold mt-4 bg-green-100 text-green-600 w-fit px-5">
                {course.lectures?.length} Lectures
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
                {course.price} Dkk
              </h3>
              <EnrollButton
                courseId={id}
                setLoading={setLoading}
                isEnrolled={isEnrolled}
              />
            </div>
            <div>
              <SocialButtons />
            </div>
          </div>
          <div className="border border-gray-300 rounded-md leading-loose lg:col-span-1">
            <div className="md:hidden fixed bottom-0 left-0 w-full bg-white p-2 shadow-md">
              <h3 className="text-4xl font-bold text-green-700 my-4 flex items-center">
                {course.price} Kr
              </h3>
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
