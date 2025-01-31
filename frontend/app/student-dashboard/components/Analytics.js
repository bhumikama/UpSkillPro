"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import AnalyticsCard from "./AnalyticsCard";
const BarChart = () => {
  const [coursesRevenue, setCoursesRevenue] = useState([]);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const fetchRevenue = async () => {
      try {
        setLoading(true);
        const apiResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/enroll/revenue`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (apiResponse.status === 404) {
          setCoursesRevenue([]); // ✅ Ensure an empty array is set
          return;
        }

        if (apiResponse.ok) {
          const responseData = await apiResponse.json();
          console.log("API Response:", responseData);

          if (responseData && Array.isArray(responseData.revenueData)) {
            setCoursesRevenue(responseData.revenueData);
          } else {
            setCoursesRevenue([]); // ✅ Fallback to empty array
          }
        } else {
          const errorText = await apiResponse.json();
          console.error("Error details:", errorText);
        }
      } catch (error) {
        console.error("Error fetching revenue data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenue();
  }, [isAuthenticated]);

  if (!Array.isArray(coursesRevenue) || coursesRevenue.length === 0) {
    return <p>No revenue data available</p>;
  }

  const chartData = {
    labels: coursesRevenue.map((course) => course.course?.title || "Unknown"),
    datasets: [
      {
        label: "Total Revenue",
        data: coursesRevenue.map((course) => Number(course.totalRevenue) || 0),
        backgroundColor: coursesRevenue.map(
          (_, index) =>
            [
              "rgba(0,0,0)",
              "rgba(97, 97, 97, 0.6)", // Soft White
              "rgba(161, 136, 127, 0.8)",
              "rgba(96, 125, 139)", // Medium Gray
              "rgba(100, 100, 100, 0.8)", // Dark Gray
            ][index % 6]
        ),
        borderColor: coursesRevenue.map(
          (_, index) =>
            [
              "rgba(0,0,0,1)",
              "rgba(97, 97, 97, 1)",
              "rgba(161, 136, 127, 1)",
              "rgba(96, 125, 139, 1)",
              "rgba(100, 100, 100, 1)",
            ][index % 6]
        ),
        borderWidth: 1,
        borderRadius: 3,
      },
    ],
  };

  //   const options = {
  //     responsive: true,
  //     plugins: {
  //       legend: {
  //         position: "top",
  //       },
  //       tooltip: {
  //         enabled: true,
  //       },
  //     },
  //     scales: {
  //       x: {
  //         grid: {
  //           display: false,
  //         },
  //       },
  //       y: {
  //         beginAtZero: true,
  //         grid: {
  //           borderDash: [5, 5],
  //         },
  //         ticks: {
  //           callback: (value) => `$${value}`,
  //         },
  //       },
  //     },
  //   };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        categoryPercentage: 0.5, // Makes bars narrower within their category
        barPercentage: 0.6, // Adjusts bar width
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const totalRevenue = coursesRevenue
    .map((course) => Number(course.totalRevenue))
    .reduce((acc, currentRevenue) => acc + currentRevenue, 0);

  const totalStudents = coursesRevenue
    .map((course) => Number(course.enrollmentCount))
    .reduce((acc, currentCount) => acc + currentCount, 0);

  return (
    <div className="container mx-auto flex flex-col">
      <div>
        <AnalyticsCard
          totalRevenue={totalRevenue}
          totalStudents={totalStudents}
        />
      </div>
      <div className="w-full  h-[600px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
