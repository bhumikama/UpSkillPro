"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import CourseGrid from "@/app/_components/HomePageComponents/CoursesGrid";
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
import { Search, X } from "lucide-react";
import CourseCard from "@/app/_components/HomePageComponents/CourseCard";
import Skeleton from "@mui/material/Skeleton";

const CoursesPage = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);
  const [search, setSearch] = useState("");
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
  }, [dispatch, searchParams, API_URL]);

  const handleChange = (name, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    router.replace(`${pathName}?${params.toString()}`);
  };

  if (error) {
    <p>{error}</p>;
  }

  return (
    <div className="mb-10">
      <div className="w-full bg-gradient-to-r from-gray-500 to-gray-300 py-16">
        <div className="container mx-auto max-w-3xl	">
          <form className="relative">
            <input
              type="text"
              placeholder="Search for courses"
              value={searchParams.get("title") || ""}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full flex-1 rounded-md py-5 border border-darkColor/20 px-5 shadow-lg"
            />
            {search && (
              <X
                onClick={() => setSearch("")}
                className="w-5 h-5 absolute right-11 top-6 hover:text-red-600 hoverEffect"
              />
            )}
            <button
              type="submit"
              className="absolute right-0 top-0 h-full w-10 bg-black flex items-center justify-center 
            rounded-tr-md rounded-br-md text-white hover:bg-gray-500 hover:text-white transition-all ease-in-out duration-300"
            >
              <Search className="w-5 h-5 " />
            </button>
          </form>
        </div>
      </div>
      <div className="container mx-auto items-center px-5 ">
        <h2 className=" font-medium text-[30px] text-[#00000] text-center my-3">
          Explore Courses
        </h2>
        <div className="flex  gap-5 mb-5">
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel className="text-lg">Sort By</InputLabel>
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
              <InputLabel className="text-lg">Direction</InputLabel>
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
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={`skeleton-${index}`} />
              ))
            : allCourses &&
              allCourses.map((course, index) => (
                <CourseCard key={course.id} course={course} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;

const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
