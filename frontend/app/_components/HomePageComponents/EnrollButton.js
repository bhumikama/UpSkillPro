"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { enrollCourse } from "@/features/course/courseSlice";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

const EnrollButton = ({ courseId, setLoading, isEnrolled }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [buttonText, setButtonText] = useState("Enroll");

  useEffect(() => {
    if (!isAuthenticated) {
      setButtonText("Enroll");
    } else {
      setButtonText(isEnrolled ? "Go To Progress" : "Enroll");
    }
  }, [isAuthenticated, isEnrolled]);

  const handleEnrollClick = async () => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (isEnrolled) {
      router.push(`/courses/${courseId}/progress`);
    } else {
      try {
        setLoading(true);
        const apiResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/enroll/${courseId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (apiResponse.ok) {
          const result = await apiResponse.json();
          dispatch(enrollCourse(courseId));
          router.push(`/courses/${courseId}/progress`);
        } else {
          const error = await apiResponse.json();
          console.error("Error creating the enrollment", error);
        }
      } catch (error) {
        console.error("error while submitting data", error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <button
        onClick={handleEnrollClick}
        // disabled={isEnrolled} 
        className={`rounded-md text-xl shadow-lg font-semibold bg-black text-white w-full py-5 ${
          isEnrolled
            ? "bg-gray-500 text-gray-200"
            : "bg-blue-700 text-white hover:bg-blue-400 transition-all ease-in-out duration-300"
        }`}
      >
        {buttonText}
      </button>
    </>
  );
};

export default EnrollButton;
