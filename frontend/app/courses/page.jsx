"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import CourseGrid from "../_components/HomePageComponents/CoursesGrid";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import {
  fetchCoursesStart,
  fetchCoursesSuccess,
  fetchCoursesFailure,
} from "@/features/course/courseSlice";
import { useDispatch } from "react-redux";
import CourseCard from "../_components/HomePageComponents/CourseCard";

const CoursesPage = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let updated = false;

    // Add default values if missing
    if (!params.has("sortKey")) {
      params.set("sortKey", "price");
      updated = true;
    }
    if (!params.has("sortDir")) {
      params.set("sortDir", "asc");
      updated = true;
    }
    if (!params.has("availableReservations")) {
      params.set("availableReservations", "false");
      updated = true;
    }

    // Update URL if parameters were added or changed
    if (updated) {
      router.replace(`${pathName}?${params.toString()}`);
    }
  }, [searchParams, pathName, router]);

  const queryString = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    return params.toString();
  }, [searchParams]);

  useEffect(() => {
    const fetchCourses = async () => {
      dispatch(fetchCoursesStart());

      try {
        const params = new URLSearchParams(searchParams);
        const queryString = params.toString();

        const response = await fetch(`${API_URL}/api/courses?${queryString}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("No courses found");
          }
          const errorText = await response.json();
          throw new Error(errorText.message);
        }

        const data = await response.json();
        console.log("filtered result:", data);
        setAllCourses(data);
        dispatch(fetchCoursesSuccess(data));
      } catch (error) {
        if (error.message.includes("No courses found")) {
          setAllCourses([]); 
          dispatch(fetchCoursesFailure("No courses found"));
        } else if (error.message.includes("Forbidden")) {
          dispatch(
            fetchCoursesFailure("You don't have permission to view courses")
          );
        } else {
          dispatch(fetchCoursesFailure(error.message));
        }
      }
    };

    fetchCourses();
  }, [dispatch, searchParams, API_URL]); // Ensure stable dependencies (no dynamic queryString)

  const handleChange = (name, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    router.replace(`${pathName}?${params.toString()}`);
  };

  const handleCheckBox = (event) => {
    handleChange("availableReservations", event.target.checked.toString());
  };

  if (error) {
    <p>{error}</p>;
  }

  return (
    <div className="flex flex-col items-center my-[85px] px-[160px] gap-[40px]">
      <h2 className="uppercase font-medium text-[35px] text-[#29ade5]">
        Our <span className="font-bold">Courses</span>
      </h2>
      <div className="flex justify-center gap-5">
        <TextField
          size="small"
          label="Search courses"
          variant="outlined"
          value={searchParams.get("title") || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          sx={{ mr: 2, width: "250px" }}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={searchParams.get("sortKey") || ""}
              label="Sort By"
              onChange={(e) => handleChange("sortKey", e.target.value)}
            >
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="createdAt">Created At</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Direction</InputLabel>
            <Select
              value={searchParams.get("sortDir") || ""}
              label="Direction"
              onChange={(e) => handleChange("sortDir", e.target.value)}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {allCourses.length === 0 ? (
          <p>No Courses found</p>
        ) : (
          allCourses &&
          allCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
