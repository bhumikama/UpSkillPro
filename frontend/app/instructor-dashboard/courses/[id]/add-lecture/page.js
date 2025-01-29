"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Button from '@mui/material/Button'; 
import { Upload } from "@mui/icons-material";
import { Save } from "@mui/icons-material";
import { handleFileUpload } from "@/utils/handleFileUpload"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../_components/ui/tabs";
import {
    Alert,
    AlertTitle,
    Box,
    Container,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

const CreateLecture = ({ params }) => {
  const { id } = params;
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [videoPreview, setVideoPreview] = useState(null);
  const router = useRouter();

  const MAX_FILE_SIZE_MB = 100;

  const handleVideoChange = (event) => {
    try {
      const selectedVideo = event.target.files[0];

      if (!selectedVideo) {
        setErrors((prevState) => ({
          ...prevState,
          video: "No file selected",
        }));
        return;
      }

      const fileSizeMB = selectedVideo.size / (1024 * 1024); 
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        setErrors((prevState) => ({
          ...prevState,
          video: `File size exceeds ${MAX_FILE_SIZE_MB}MB limit`,
        }));
        setVideoPreview(null);
        setVideo(null);
        event.target.value = ""; 
        return;
      }

      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }

      setVideo(selectedVideo);
      setVideoPreview(URL.createObjectURL(selectedVideo));
      setErrors((prevState) => ({
        ...prevState,
        video: null,
      }));
    } catch (error) {
      console.error("Error handling video upload:", error);
      setErrors((prevState) => ({
        ...prevState,
        video: "An unexpected error occurred. Please try again.",
      }));
    }
  };

  const checkForErrors = () => {
    const errors = {};
    if (!title || title.trim() === "") {
      errors.title = "Please provide a valid title";
    }

    if (!video || video.size === 0) {
      errors.video = "Please upload a video";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const errorFields = checkForErrors();
    if (Object.keys(errorFields).length > 0) {
      setErrors(errorFields);
      setIsLoading(false);
      return;
    }

    try {
      const videoKey = await handleFileUpload(video);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${id}/lectures`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, videoKey }),
          credentials: "include",
        }
      );

      if (response.ok) {
        const result = await response.json();
        toast.success("Created new lecture! 🎉");
        setTitle("");
        setVideo(null);
        setVideoPreview(null);
        router.push("/instructor-dashboard");
      } else {
        const { message } = await response.json();
        console.error(`Error details: ${message}`);
      }
    } catch (error) {
      console.error("Error creating lecture:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-16 mb-12 px-4 sm:px-6 md:px-8">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-wide leading-tight mb-8">
          Create a New Lecture
        </h2>
        <p className="text-2xl font-bold text-gray-700 mb-8">
          <span className="font-bold">
            Add a title and video to create a new lecture for your course.
          </span>
        </p>
      </div>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-2xl font-bold text-gray-800">
              Lecture Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-2">{errors.title}</p>
            )}
          </div>

          {videoPreview && (
            <div className="mb-8 text-center">
              <video
                src={videoPreview}
                controls
                className="mx-auto rounded-lg max-w-full max-h-48 mb-4"
              />
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="video-upload"
              className="w-full px-4 py-2 bg-gray-500 text-white text-xl font-bold rounded-md cursor-pointer hover:bg-gray-600 focus:ring-2 focus:ring-gray-300"
            >
              <Upload className="mr-2" />
              Upload a Video
            </label>
            <input
              type="file"
              id="video-upload"
              name="video"
              accept="video/*"
              hidden
              onChange={handleVideoChange}
            />
            {errors.video && (
              <p className="text-red-500 text-sm mt-2">{errors.video}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              mt: 3,
              backgroundColor: "#333",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#555",
              },
            }}
            disabled={isLoading}
            startIcon={<Save />}
            className={`w-full py-3 mt-6 text-white text-xl font-bold rounded-md ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-900"
            } focus:ring-2 focus:ring-blue-500 focus:outline-none`}
          >
            {isLoading ? "Submitting..." : "Create Lecture"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateLecture;
