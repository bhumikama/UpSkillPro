"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProgressCard from "@/app/student-dashboard/components/ProgressCard";

const MyLearningPage = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
    const fetchEnrolledCourses = async () => {
      try {
        setLoading(true);
        const apiResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/enroll/my-learning`,
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
          console.log("API Response Body:", courses);
          setEnrolledCourses(courses);
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
  }, [isAuthenticated]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto my-10 px-4 md:px-0">
      <h3 className="text-2xl font-bold mb-3">
        Welcome back! <span className="text-green-600">{user.name} 🎉</span>
      </h3>
      <h1 className="font-bold text-2xl">MY LEARNING</h1>
      <div className="my-5">
        {enrolledCourses.length === 0 ? (
          <p>You are not enrolled in any course.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {enrolledCourses.map((course, index) => (
              <ProgressCard key={index} course={course} />
            ))}
          </div>
          
        )}
        
      </div>
    </div>
  );
};

export default MyLearningPage;
