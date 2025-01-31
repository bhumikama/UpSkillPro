"use client";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { handleFileUpload } from "@/utils/handleFileUpload";
import { toast } from "react-toastify";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addCourse } from "@/features/course/courseSlice";
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
import BreadCrumbs from "@/app/_components/instructor-dashboard-components/BreadCrumbs";

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];

    // Clean up any previously set preview URL
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    if (selectedImage && selectedImage.size / (1024 * 1024) > 5) {
      setErrors((prevState) => ({
        ...prevState,
        image: "File size exceeds 5MB limit",
      }));
      setImagePreview(null);
      event.target.value = "";
    } else {
      setImage(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage)); // Create new preview URL
      setErrors((prevState) => ({ ...prevState, image: null }));
    }
  };

  const checkForErrors = () => {
    const errors = {};
    if (!title || title.trim() === "") {
      errors.title = "Please provide valid title";
    }
    if (!description || description.trim() === "") {
      errors.description = "Please provide valid description";
    }
    if (isNaN(price) || price < 0) {
      errors.price = "Please provide valid price";
    }
    if (!image || image.size === 0) {
      errors.image = "Please upload an image";
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
      const imageKey = await handleFileUpload(image);

      // Send course details to the backend
      const apiResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title,
            description,
            imageKey,
            price,
          }),
        }
      );
      if (apiResponse.ok) {
        const result = await apiResponse.json();
        dispatch(addCourse(result));
        toast.success("Created new course");
        setTitle("");
        setDescription("");
        setPrice("");
        setImage(null);
        setImagePreview(null);
        router.push("/instructor-dashboard");
      } else {
        const error = await apiResponse.json();
        console.error("Error creating the course", error);
      }
    } catch (error) {
      console.error("error while submitting data", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Container maxWidth="md" sx={{ mt: 10, mb: 8 }}>
        <Box sx={{ my: 4, textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "800",
              fontSize: "1.5rem",
              color: "#1a202c",
              mb: 3,
            }}
          >
            Create a new course
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 900,
              color: "#4a5568",
              fontSize: "1.2rem",
              textShadow: "0px 1px 2px rgba(0, 0, 0, 0.2)",
              mb: 2,
            }}
          >
            Fill in the details below to create your course.
          </Typography>
        </Box>
        <Container maxWidth="sm">
          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                type="text"
                label="Course Title"
                name="title"
                value={title}
                margin="normal"
                size="medium"
                required
                onChange={(e) => setTitle(e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
                sx={{
                  borderRadius: "8px",
                  "& .MuiInputBase-root": { borderRadius: "8px" },
                  "& input": {
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 800,
                    fontSize: "1rem",
                    color: "#000000",
                  },
                }}
              />

              <TextField
                fullWidth
                label="Description"
                name="description"
                type="text"
                value={description}
                margin="normal"
                size="small"
                multiline
                error={!!errors.description}
                helperText={errors.description}
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
                required
                sx={{
                  borderRadius: "8px",
                  "& .MuiInputBase-root": { borderRadius: "8px" },
                  "& textarea": {
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "1rem",
                    color: "#2d3748",
                  },
                }}
              />
              {errors.description && <span>{errors.description}</span>}
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={price}
                margin="normal"
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">DKK</InputAdornment>
                    ),
                    inputProps: {
                      min: 0,
                    },
                  },
                }}
                onChange={(e) => setPrice(e.target.value)}
                required
                sx={{
                  borderRadius: "8px",
                  "& .MuiInputBase-root": { borderRadius: "8px" },
                  "& input": {
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "#2d3748",
                  },
                }}
                error={!!errors.price}
                helperText={errors.price}
              />
              {errors.price && <span>{errors.price}</span>}

              {imagePreview && (
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <img
                    src={imagePreview}
                    alt="Uploaded Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      borderRadius: "8px",
                      marginBottom: "8px",
                    }}
                  />
                </Box>
              )}
              {/* <ImagePicker */}
              <label
                htmlFor="image-upload"
                style={{
                  display: "block",
                  margin: "16px 0",
                  padding: "10px",
                  textAlign: "center",
                  backgroundColor: "#2d3748",
                  color: "white",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                <UploadIcon sx={{ mr: 1 }} />
                Upload an Image
              </label>
              <input
                type="file"
                id="image-upload"
                name="image"
                accept="image/png, image/jpeg"
                hidden
                onChange={handleImageChange}
              />

              {errors.image && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ display: "block", textAlign: "center", mb: 2 }}
                >
                  {errors.image}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  mt: 4,
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  fontFamily: "'Poppins', 'sans-serif'",
                  fontSize: "1rem",
                  backgroundColor: "#1a202c",
                  color: "#fff", // Text color
                  "&:hover": {
                    backgroundColor: "#374151",
                  },
                }}
                disabled={isLoading}
                startIcon={null}
              >
                {isLoading ? "Submitting..." : "Add your course"}
              </Button>
            </form>
          </Paper>
        </Container>
      </Container>
    </>
  );
};

export default CreateCourse;
