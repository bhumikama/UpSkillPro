"use client";
import React, { useState, useEffect } from "react";
import { Check, X, ArrowLeft } from "lucide-react";
import VideoPlayer from "@/app/student-dashboard/components/VideoPlayer";
import { Button } from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

const CourseProgress = () => {
  const { id } = useParams();
  const [lectures, setLectures] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [completedLectures, setCompletedLectures] = useState({});
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const [selectedCourse, setSelectedCourse] = useState([])
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch the lectures and progress data
    const fetchLectures = async () => {
      if (isAuthenticated) {
        if (!id) {
          setError("Invalid ID accessed");
        }
        try {
          // Fetching lectures
          const lecturesResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${id}/lectures`,
            {
              method: "GET",
              credentials: "include", // This ensures cookies are sent with the request
            }
          );

          if (lecturesResponse.status === 404) {
            setError("No lectures found.");
            return;
          }

          if (!lecturesResponse.ok) {
            const errorText = await lecturesResponse.json();
            setError("Error details :", errorText.message);
          }

          const lecturesData = await lecturesResponse.json();
          if (!lecturesData || lecturesData.length === 0) {
            setError("No lectures available at the moment.");
            return;
          }

          // Fetching progress for the lectures (completed lecture IDs)
          const progressResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/enroll/${id}/progress`,
            {
              method: "GET",
              credentials: "include", // This ensures cookies are sent with the request
            }
          );

          if (progressResponse.status !== 200) {
            setError("Error fetching progress.");
            return;
          }

          const progressData = await progressResponse.json();

          const completedLecturesSet = new Set(progressData);

          // Merging lectures with their progress status
          const lecturesWithProgress = lecturesData.map((lecture) => {
            return {
              ...lecture,
              completed: completedLecturesSet.has(lecture.id), // Check if the lecture id is in the completed set
            };
          });

          setLectures(lecturesWithProgress);

          // Initialize completed lectures state
          const initialCompletedLectures = {};
          lecturesWithProgress.forEach((lecture) => {
            initialCompletedLectures[lecture.id] = lecture.completed || false;
          });
          setCompletedLectures(initialCompletedLectures);
        } catch (error) {
          setError("Error fetching lectures and progress: " + error.message);
        }
      }
    };

    fetchLectures();
  }, [id, isAuthenticated]);

  useEffect(() => {
    if (lectures.length) {
      setSelectedLecture(lectures[0]);
    }
  }, [lectures]);

  const handleLectureClick = (lecture) => {
    setSelectedLecture(lecture);
  };

  const toggleCompleteAllLectures = async () => {
    try {
      const allCompleted = Object.values(completedLectures).every((val) => val);

      if (allCompleted) {
        // Mark all lectures as incomplete
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/enroll/${id}/remove-all`,
          {
            method: "POST",
            credentials: "include",
          }
        );
      } else {
        // Mark all lectures as complete
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/enroll/${id}/mark-all-completed`,
          {
            method: "POST",
            credentials: "include",
          }
        );
      }

      // Update state with new completion status
      const updatedCompletedLectures = {};
      lectures.forEach((lecture) => {
        updatedCompletedLectures[lecture.id] = !allCompleted;
      });
      setCompletedLectures(updatedCompletedLectures);
    } catch (error) {
      console.error("Error toggling all lectures completion:", error);
    }
  };

  const handleVideoEnd = async () => {
    const lectureId = selectedLecture.id;
    if (selectedLecture) {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/enroll/${id}/progress`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ lectureId }),
          }
        );
        setCompletedLectures((prev) => ({
          ...prev,
          [selectedLecture.id]: true,
        }));
      } catch (error) {
        console.error("Error marking lecture as completed:", error);
      }
    }
  };
useEffect(() => {
 const fetchCourseData = async ()=>{
  try{
    const courseResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/${id}`,
     { method: "GET",
      credentials: "include",
    }
       );
       if(courseResponse.ok){
        const courseData = await courseResponse.json();
        setSelectedCourse(courseData);
       }else{
        setError("Erro fetching course data")
       }
  }catch(error){
    setError("Error fecthing course data: ", error.message);
  }
 }
 fetchCourseData();
}, [id])

const handleGenerateCertificate= async ()=>{
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
    if (!user || !selectedCourse?.title){
      throw new Error("Invalid user or course data");
    }

    const certificateData = {
      name:user.name,
      course:selectedCourse.title,
      date:new Date().toLocaleDateString()
    };

    const response = await fetch(`${API_URL}/api/certificate/generate-certificate`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(certificateData)
    });
    if(response.ok){
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${certificateData.name}-${certificateData.course}-certificate.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    }else{
      const errorResponse = await response.json();
      console.error("Server response:", errorResponse);
      setError("Failed to generate certificate. Please try again.");
    }
    
  } catch (error) {
        console.error("Error generating certificate:", error);
        setError("Error generating certificate: " + error.message);
  }
}
  return (
    <div className="bg-white w-full h-full">
      <div className="container mx-auto bg-white p-5">
        <div className="w-full bg-green-100 py-2 px-5 rounded-lg ">
          <Link href="/" className="flex gap-2 text-green-600 font-semibold">
            <ArrowLeft /> Back To Dashboard
          </Link>
        </div>

        <div className="p-5 my-5">
          <div className="flex justify-between items-center mb-5 px-3">
            <h2 className="font-bold text-3xl text-gray-800 flex items-center gap-2">
              Lectures
            </h2>
            <Button
              onClick={toggleCompleteAllLectures}
              className={`${
                Object.values(completedLectures).every((val) => val)
                  ? "bg-black text-white  px-10 py-3 shadow-lg rounded-xl"
                  : "bg-green-600 text-white  px-10 py-3 shadow-lg rounded-xl"
              } `}
            >
              {Object.values(completedLectures).every((val) => val)
                ? "Reset Progress"
                : "Mark All As Complete"}
            </Button>
          </div>

          {/* Error handling UI */}
          {error ? (
            <div className="text-red-500 text-center font-bold">{error}</div>
          ) : (
            <div className="flex flex-col gap-5 lg:flex-row md:flex-col aspect-video:16/9">
              <div className="relative max-w-[1200px] mx-auto">
                <VideoPlayer
                  url={selectedLecture?.videoURL}
                  width={800}
                  height={500}
                  showControls={true}
                  autoPlay={true}
                  onVideoEnd={handleVideoEnd}
                />
                <p className="absolute top-5 font-semibold text-white ml-4">
                  {selectedLecture?.title || "Select a Lecture"}
                </p>
                <h2 className="text-3xl font-semibold my-3">
                  {selectedLecture?.title}
                </h2>
                <Button
                  disabled={
                    !Object.values(completedLectures).every(
                      (val) => val === true
                    )
                  }
                  variant="contained"
                  onClick={handleGenerateCertificate}
                >
                  Download Certificate
                </Button>
              </div>
              <div className="w-full px-3">
                <span className="text-sm font-semibold mt-4 bg-green-100 text-green-600 w-fit px-3 mb-3">
                  {lectures.length} Lectures
                </span>
                {lectures.map((lecture) => (
                  <div
                    key={lecture.id}
                    onClick={() => handleLectureClick(lecture)}
                    className={`${
                      selectedLecture && selectedLecture?.id === lecture.id
                        ? "mb-2 p-3 border bg-green-200 rounded-lg shadow-md border-gray-300 hover:border-gray-600 border-r-4 flex gap-3 cursor-pointer"
                        : "mb-2 p-3 border bg-white rounded-lg shadow-md border-gray-300 hover:border-gray-600 border-r-4 flex gap-3 cursor-pointer"
                    }`}
                  >
                    <div className="w-[30px] mt-1">
                      {completedLectures[lecture.id] ? (
                        <Check className="text-green-100 bg-green-700 rounded-full " />
                      ) : (
                        <X className="text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h5 className="text-xl font-medium">{lecture.title}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
