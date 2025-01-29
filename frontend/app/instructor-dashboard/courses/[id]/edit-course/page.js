"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { Box, Container, Paper, TextField, Typography } from "@mui/material";
import EditCourseForm from "../../../_components/instructor-dashboard-components/EditCourseForm";
import {
  Alert,
  AlertTitle,
  Box,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
const EditPage = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const fetchCourse = async () => {
    if (!id) {
      setError("Invalid Course ID");
      setLoading(false);
      return;
    }

    try {
      const apiResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (apiResponse.ok) {
        const result = await apiResponse.json();
        setCourse(result);
        setFormData({
          title: result.title || "",
          description: result.description || "",
        });
      } else {
        const error = await apiResponse.json();
        console.error("Error fetching the course", error);
      }
    } catch (error) {
      console.error("Error while fetching data", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      if (apiResponse.ok) {
        const result = await apiResponse.json();
        toast.success("Successfully edited the course");
        router.push("/instructor-dashboard");
      } else {
        const error = await apiResponse.json();
        console.error("Error modifying the course", error);
      }
    } catch (error) {
      console.error("Error while submitting data", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Container className="max-w-2xl mx-auto py-10">
      <Typography
        variant="h4"
        className="text-center font-extrabold text-3xl mb-6 text-gray-900"
      >
        Edit the Course
      </Typography>
      <Typography
        variant="h6"
        className="text-center text-2xl font-bold text-gray-800 mb-6 tracking-wide"
      >
        Edit title, description of a course
      </Typography>
      <Paper className="p-6 shadow-lg rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Course Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            size="medium"
            className="rounded-md"
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            size="medium"
            multiline
            rows={4}
            className="rounded-md"
          />
          <div className="text-center">
            <Button
              type="submit"
              variant="contained"
              color="default"
              className="w-full py-3 text-white bg-black rounded-md transition duration-200 ease-in-out transform hover:bg-gray-900 hover:scale-105 disabled:opacity-50"
              disabled={loading}
            >
              <span className="text-lg font-bold">
                {loading ? "Updating..." : "Save Changes"}
              </span>
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
};

export default EditPage;
