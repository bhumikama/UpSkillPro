"use client";
import Button from "@mui/material/Button";
import { Card, CardContent } from "../../_components/ui/card";
import React, { useState } from "react";
import { handleFileUpload } from "@/utils/handleFileUpload";
import { toast } from "react-toastify";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../_components/ui/tabs";
import { useRouter } from "next/navigation";
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
import UploadIcon from "@mui/icons-material/Upload";

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (imagePreview) URL.revokeObjectURL(imagePreview);

    if (selectedImage && selectedImage.size / (1024 * 1024) > 5) {
      setErrors((prev) => ({ ...prev, image: "File size exceeds 5MB limit" }));
      setImagePreview(null);
      event.target.value = "";
    } else {
      setImage(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage));
      setErrors((prev) => ({ ...prev, image: null }));
    }
  };

  const checkForErrors = () => {
    const errors = {};
    if (!title.trim()) errors.title = "Please provide a valid title";
    if (!description.trim())
      errors.description = "Please provide a valid description";
    if (isNaN(price) || price < 0)
      errors.price = "Please provide a valid price";
    if (!image) errors.image = "Please upload an image";
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
      const apiResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ title, description, imageKey, price }),
        }
      );
      if (apiResponse.ok) {
        toast.success("Created new course");
        setTitle("");
        setDescription("");
        setPrice("");
        setImage(null);
        setImagePreview(null);
        router.push("/instructor-dashboard");
      } else {
        console.error("Error creating the course", await apiResponse.json());
      }
    } catch (error) {
      console.error("Error while submitting data", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
          Create a New Course
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
              label="Course Title"
              value={title}
              margin="normal"
              size="medium"
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
              value={description}
              margin="normal"
              size="medium"
              multiline
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
              error={!!errors.description}
              helperText={errors.description}
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
            <TextField
              fullWidth
              label="Price"
              value={price}
              margin="normal"
              size="medium"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">DKK</InputAdornment>
                ),
              }}
              error={!!errors.price}
              helperText={errors.price}
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
            />
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
              id="image-upload"
              type="file"
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
                backgroundColor: "#1a202c",
                color: "#fff",
                borderRadius: "8px",
                fontWeight: "bold",
                textTransform: "capitalize",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "1.2rem", 
                "&:hover": { backgroundColor: "#4a5568" },
              }}
              disabled={isLoading}
              startIcon={null}>
              {isLoading ? "Submitting..." : "Add Your Course"}
            </Button>
          </form>
        </Paper>
      </Container>
    </Container>
  );
};

export default CreateCourse;

