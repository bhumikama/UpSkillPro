// import React from "react";

// const Sidebar = () => {
//   return (
//     <div>
//       <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)] "></div>
//     </div>
//   );
// };

// export default Sidebar;

// "use client";
// import React from "react";

// const Sidebar = ({
//   activeTab,
//   setActiveTab,
//   isSidebarOpen,
//   setIsSidebarOpen,
// }) => {
//   return (
//     <div
//       className={`fixed md:static md:flex flex-col bg-black text-white w-64 h-full transition-transform ${
//         isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//       } md:translate-x-0 z-20`}
//     >
//       {/* Sidebar Header */}
//       <div className="p-4 text-xl font-bold text-center border-b border-gray-700">
//         Student Dashboard
//       </div>

//       {/* Navigation Items */}
//       <nav className="flex-grow">
//         <button
//           onClick={() => {
//             setActiveTab("dashboard");
//             setIsSidebarOpen(false); // Close sidebar on mobile after selection
//           }}
//           className={`block w-full text-left px-4 py-3 hover:bg-gray-700 ${
//             activeTab === "dashboard" ? "bg-gray-800" : ""
//           }`}
//         >
//           Dashboard
//         </button>
//         <button
//           onClick={() => {
//             setActiveTab("courses");
//             setIsSidebarOpen(false); // Close sidebar on mobile after selection
//           }}
//           className={`block w-full text-left px-4 py-3 hover:bg-gray-700 ${
//             activeTab === "courses" ? "bg-gray-800" : ""
//           }`}
//         >
//           Enrolled Courses
//         </button>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

// import React from "react";
// import {
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemText,
//   Typography,
//   Box,
// } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import SchoolIcon from "@mui/icons-material/School";

// const Sidebar = ({
//   activeTab,
//   setActiveTab,
//   isSidebarOpen,
//   setIsSidebarOpen,
// }) => {
//   const menuItems = [
//     { label: "Dashboard", icon: <DashboardIcon />, key: "dashboard" },
//     { label: "Enrolled Courses", icon: <SchoolIcon />, key: "courses" },
//   ];

//   return (
//     <Drawer
//       variant="persistent"
//       open={isSidebarOpen}
//       onClose={() => setIsSidebarOpen(false)}
//       sx={{
//         "& .MuiDrawer-paper": {
//           width: 240,
//           backgroundColor: "#212121", // Dark background
//           color: "#fff",
//           boxSizing: "border-box",
//         },
//       }}
//     >
//       {/* Sidebar Header */}
//       <Box p={2} textAlign="center" bgcolor="#121212" boxShadow={2}>
//         <Typography variant="h6" fontWeight="bold">
//           Student Dashboard
//         </Typography>
//       </Box>

//       {/* Navigation Items */}
//       <List>
//         {menuItems.map((item) => (
//           <ListItemButton
//             key={item.key}
//             onClick={() => {
//               setActiveTab(item.key);
//               setIsSidebarOpen(false); // Close sidebar on mobile
//             }}
//             sx={{
//               color: activeTab === item.key ? "#00E676" : "#fff", // Highlight active item
//               "&:hover": {
//                 backgroundColor: "#333333",
//               },
//             }}
//           >
//             <Box display="flex" alignItems="center">
//               {item.icon}
//               <ListItemText primary={item.label} sx={{ marginLeft: 2 }} />
//             </Box>
//           </ListItemButton>
//         ))}
//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;

// import React from "react";
// import {
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemText,
//   Typography,
//   Box,
// } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import SchoolIcon from "@mui/icons-material/School";

// const Sidebar = ({
//   activeTab,
//   setActiveTab,
//   isSidebarOpen,
//   setIsSidebarOpen,
// }) => {
//   const menuItems = [
//     { label: "Dashboard", icon: <DashboardIcon />, key: "dashboard" },
//     { label: "Enrolled Courses", icon: <SchoolIcon />, key: "courses" },
//   ];

//   return (
//     <Drawer
//       variant="persistent" // Use 'persistent' on larger screens
//       open={isSidebarOpen}
//       onClose={() => setIsSidebarOpen(false)}
//       sx={{
//         "& .MuiDrawer-paper": {
//           width: 240,
//           backgroundColor: "#212121",
//           color: "#fff",
//           boxSizing: "border-box",
//         },
//         display: { xs: "none", md: "block" }, // Show sidebar only on larger screens
//       }}
//       // Adjust for mobile to show a temporary drawer (for mobile screens)
//       variant={{ xs: "temporary", md: "persistent" }}
//       anchor="left"
//     >
//       {/* Sidebar Header */}
//       <Box p={2} textAlign="center" bgcolor="#121212" boxShadow={2}>
//         <Typography variant="h6" fontWeight="bold">
//           Student Dashboard
//         </Typography>
//       </Box>

//       {/* Navigation Items */}
//       <List>
//         {menuItems.map((item) => (
//           <ListItemButton
//             key={item.key}
//             onClick={() => {
//               setActiveTab(item.key);
//               setIsSidebarOpen(false); // Close sidebar on mobile
//             }}
//             sx={{
//               color: activeTab === item.key ? "#00E676" : "#fff",
//               "&:hover": {
//                 backgroundColor: "#333333",
//               },
//             }}
//           >
//             <Box display="flex" alignItems="center">
//               {item.icon}
//               <ListItemText primary={item.label} sx={{ marginLeft: 2 }} />
//             </Box>
//           </ListItemButton>
//         ))}
//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;
"use client";
import DashboardContent from "../Dashboard/DashboardContent";
import EnrolledCourses from "../Dashboard/EnrolledCourses";
import React, { useState } from "react";
import { FaBars, FaHome, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { MdOutlineCastForEducation } from "react-icons/md";
import { IoCloseCircleSharp } from "react-icons/io5";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <DashboardContent />;
      case "profile":
        return <EnrolledCourses />;
      case "enrolled":
        return <EnrolledCourses />;
      default:
        return <DashboardContent />;
    }
  };
  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 h-full md:w-64 bg-black  transition-width-duration-300 text-white ${
          isOpen ? "w-64" : "wd-20"
        }`}
      >
        
        <div className="flex items-center justify-center p-4">
          <h2
            className={`text-xl font-bold md:block ${
              isOpen ? "block" : "hidden"
            }`}
          >
            UpSkillPro
          </h2>
          <button
            className="block md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IoCloseCircleSharp size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            <li
              className={`flex items-center p-4 hover:bg-gray-700 cursor-pointer ${
                activeTab === "home" ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveTab("home")}
            >
              <FaHome size={24} />
              <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>
                Home
              </span>
            </li>
            <li
              className={`flex items-center p-4 hover:bg-gray-700 cursor-pointer ${
                activeTab === "enrolled" ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveTab("enrolled")}
            >
              <MdOutlineCastForEducation size={24} />
              <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>
                Enrolled Courses
              </span>
            </li>
            <li
              className="flex items-center p-4 hover:bg-gray-700 cursor-pointer"
              onClick={() => setActiveTab("profile")}
            >
              <FaUserAlt size={24} />
              <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>
                Profile
              </span>
            </li>
            <li
              className="flex items-center p-4 hover:bg-gray-700 cursor-pointer"
              onClick={() => setActiveTab("logout")}
            >
              <FaSignOutAlt size={24} />
              <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>
                Logout
              </span>
            </li>
          </ul>
        </nav>
      </div>

      <div className="ml-20 md:ml-64 p-8 bg-gray-100 min-h-screen flex-1">
        <div className="p-4 bg-white shadow rounded">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Sidebar;
