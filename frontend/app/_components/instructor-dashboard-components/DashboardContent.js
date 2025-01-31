// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";

// const DashboardContent = () => {
//   const router = useRouter();
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     const fetchProjectsByInstructor = async () => {
//       try {
//         const apiResponse = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/courses/all`,
//           {
//             method: "GET",
//             credentials: "include", // This ensures cookies are sent with the request
//           }
//         );
//         if (apiResponse.status === 404) {
//           setCourses([]);
//           return;
//         }
//         if (apiResponse.ok) {
//           const courses = await apiResponse.json();
//           console.log("API Response Body:", courses);
//           setCourses(courses);
//         } else {
//           const errorText = await apiResponse.json();
//           console.error("Error details :", errorText.message);
//         }
//       } catch (error) {
//         console.error("Error fetching projects", error.message);
//       }
//     };
//     fetchProjectsByInstructor();
//   }, []);
//   const handleNavigation = () => {
//     router.push("instructor-dashboard/add-course");
//   };

//   const handleOnClick = (id) => {
//     router.push(`instructor-dashboard/courses/${id}/add-lecture`);
//   };

//   return (
//     <div>
//       <Card>
//         <CardHeader className="flex justify-between flex-row items-center">
//           <CardTitle className="font-extrabold text-3xl">All Courses</CardTitle>
//           <Button className="p-5 hover:bg-[#374151]" onClick={handleNavigation}>
//             Create New Course
//           </Button>
//         </CardHeader>
//         <CardContent>
//           <div className="container my-10 mx-auto">
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
//               {courses.length > 0 ? (
//                 courses.map((course, index) => (
//                   <div
//                     key={`course-${index}`}
//                     className=" relative border  border-gray-300 rounded-md shadow-md  leading-loose 	"
//                   >
//                     <Image
//                       src={course.imageUrl}
//                       alt={`Image of ${course.title}`}
//                       width={500}
//                       height={500}
//                       className="object-contain "
//                     />
//                     <span className="bg-green-700 text-white absolute font-medium top-7 px-2">
//                       BEST SELLER
//                     </span>
//                     <div className="p-3">
//                       <h2 className="text-lg font-semibold ">{course.title}</h2>
//                       <p className="text-gray-400">{course.description}</p>
//                       <button
//                         className="px-2 py-1.5 min-w-20 bg-red-500 text-white text-sm rounded hover:bg-red-600"
//                         onClick={() => handleOnClick(course.id)}
//                       >
//                         Add new lecture
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p>Courses not found</p>
//               )}
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default DashboardContent;
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button"; 
import { Message, Bookmark } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SchoolIcon from "@mui/icons-material/School";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const notifications = [
  {
    message: "The course JavaScript was bought 52 times.",
    time: "1 hour ago",
    color: "bg-yellow-50",
  },
  {
    message: "The certificate has been downloaded.",
    time: "2 hours ago",
    color: "bg-green-50",
  },
  {
    message: "A review has been added.",
    time: "30 minutes ago",
    color: "bg-yellow-50",
  },
  {
    message: "153 students finished the course.",
    time: "1 day ago",
    color: "bg-green-50",
  },
  {
    message: "The student left a comment.",
    time: "15 minutes ago",
    color: "bg-yellow-50",
  },
  {
    message: "New course 'React for Beginners' launched.",
    time: "1 hour ago",
    color: "bg-purple-50",
  },
];

const DashboardContent = () => {
  return (
    <div className="bg-white text-black min-h-screen p-5">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:space-x-6 p-3">
        <div className="w-full flex justify-center sm:justify-center sm:w-auto mb-4 sm:mb-0">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full p-3 pl-12 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 text-2xl"
            />
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-3xl" />
          </div>
        </div>

        <div className="flex sm:flex-row justify-center sm:justify-end items-center space-x-6 mb-4 sm:mb-0 w-full sm:w-auto">
          <div className="flex items-center space-x-6">
            <Message className="text-7xl cursor-pointer" />
            <Bookmark className="text-7xl cursor-pointer" />
            <div className="bg-red-600 text-white flex items-center justify-center w-20 h-20 rounded-full text-4xl font-bold">
              KI
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap mt-8 space-y-8 lg:space-y-0 lg:space-x-10">
        <div className="flex-1 w-full max-w-9xl">
          <Card className="bg-white text-black shadow-lg">
            <CardHeader className="flex justify-between items-center w-full">
              <CardTitle className="font-extrabold text-3xl">
                Active Courses
              </CardTitle>
              <Button className="p-6 bg-gray-500 text-white rounded-lg hover:bg-gray-800 text-2xl ml-auto">
                Create New Course
              </Button>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <Card className="bg-white text-black shadow-lg rounded-xlg p-4">
                  <div className="flex items-center">
                    <CardTitle className="font-extrabold text-3xl">
                      Courses
                    </CardTitle>
                    <AutoStoriesIcon className="ml-8 text-6xl" />
                  </div>
                </Card>
                <Card className="bg-white text-black shadow-lg rounded-xlg p-4">
                  <div className="flex items-center">
                    <CardTitle className="font-extrabold text-3xl">
                      Students
                    </CardTitle>
                    <SchoolIcon className="ml-8 text-6xl" />
                  </div>
                </Card>
                <Card className="bg-white text-black shadow-lg rounded-xlg p-4">
                  <div className="flex items-center">
                    <CardTitle className="font-extrabold text-3xl">
                      Amount
                    </CardTitle>
                    <LocalAtmIcon className="ml-8 text-6xl" />
                  </div>
                </Card>
                <Card className="bg-white text-black shadow-lg rounded-xlg p-4">
                  <div className="flex items-center">
                    <CardTitle className="font-extrabold text-3xl">
                      Actions
                    </CardTitle>
                    <TrendingUpIcon className="ml-8 text-6xl" />
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full sm:w-96">
          <Card className="bg-gray-100 shadow-md p-5">
            <CardTitle className="font-bold text-2xl text-black mb-4">
              Notifications
            </CardTitle>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification, index) => (
                  <div
                    key={index}
                    className={`${notification.color} p-4 rounded-md flex flex-col space-y-2`}
                  >
                    <div className="font-medium text-lg">
                      {notification.message}
                    </div>
                    <div className="text-sm text-gray-600">
                      {notification.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;


