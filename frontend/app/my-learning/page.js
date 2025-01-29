"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CourseCard from "../_components/HomePageComponents/CourseCard";
const MyLearningPage = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        setLoading(true);
        const apiResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/enroll/all`,
          {
            method: "GET",
            credentials: "include", // This ensures cookies are sent with the request
          }
        );
        if (apiResponse.status === 404) {
          setEnrolledCourses([]);
          return;
        }
        if (apiResponse.ok) {
          const courses = await apiResponse.json();
          console.log("API Response Body:", courses.coursesWithUrls);
          setEnrolledCourses(courses.coursesWithUrls);
        } else {
          const errorText = await apiResponse.json();
          console.error("Error details :", errorText);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 md:px-0">
      <h1 className="font-bold text-2xl">MY LEARNING</h1>
      <div className="my-5">
        {enrolledCourses.length === 0 ? (
          <p>You are not enrolled in any course.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {enrolledCourses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearningPage;
