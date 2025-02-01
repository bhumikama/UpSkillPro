import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import dateFormat from "@/utils/DateFormat";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    whiteSpace: "nowrap", 
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function InstructorContent() {
  const [courses, setCourses] = useState([]);
  const router = useRouter();
  const [enrollments, setEnrollments] = useState({});
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchProjectsByInstructor = async () => {
      try {
        const apiResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/courses/all`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (apiResponse.status === 404) {
          setCourses([]);
          return;
        }
        if (apiResponse.ok) {
          const courses = await apiResponse.json();
          setCourses(courses);

          courses.forEach(async (course) => {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${course.id}/enrolled-count`,
              {
                method: "GET",
                credentials: "include",
              }
            );
            if (response.ok) {
              const result = await response.json();
              setEnrollments((prev) => ({
                ...prev,
                [course.id]: result.enrolledStudents,
              }));
            } else {
              setEnrollments((prev) => ({
                ...prev,
                [course.id]: 0,
              }));
            }
          });
        } else {
          console.error("Error fetching projects");
        }
      } catch (error) {
        console.error("Error fetching projects", error.message);
      }
    };
    fetchProjectsByInstructor();
  }, []);

  const handleEdit = (id) => {
    router.push(`/instructor-dashboard/courses/${id}/edit-course`);
  };

  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Course Title</StyledTableCell>
            {!isSmallScreen && (
              <StyledTableCell align="right">Published Date</StyledTableCell>
            )}
            <StyledTableCell align="right">Enrolled</StyledTableCell>
            <StyledTableCell align="right">Settings</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {course.title}
                </StyledTableCell>
                {!isSmallScreen && (
                  <StyledTableCell align="right">
                    {dateFormat(course.createdAt)}
                  </StyledTableCell>
                )}
                <StyledTableCell align="right">
                  {enrollments[course.id] !== undefined
                    ? enrollments[course.id]
                    : 0}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(course.id)}
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={4} align="center">
                There are no courses found
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
