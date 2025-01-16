// import React from "react";

// const Dashboard = () => {
//   return (
//     <div className="bg-white rounded-lg pb-4 shadow h-[200vh]">Dashboard</div>
//   );
// };

// export default Dashboard;

// "use client";
// import React, { useState } from "react";
// import { Menu as MenuIcon } from "@mui/icons-material";
// import { IconButton } from "@mui/material";
// import Sidebar from "../Sidebar/Sidebar";
// import DashboardContent from "./DashboardContent";
// import EnrolledCourses from "./EnrolledCourses";

// const StudentDashboard = () => {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const renderContent = () => {
//     switch (activeTab) {
//       case "dashboard":
//         return <DashboardContent />;
//       case "courses":
//         return <EnrolledCourses />;
//       default:
//         return <DashboardContent />;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar Component */}
//       <Sidebar
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         isSidebarOpen={isSidebarOpen}
//         setIsSidebarOpen={setIsSidebarOpen}
//       />

//       {/* Main Content Area */}
//       <div className="flex-grow md:ml-64">
//         {/* Mobile Menu Button */}
//         <div className="md:hidden p-4">
//           <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//             <MenuIcon fontSize="large" />
//           </IconButton>
//         </div>

//         {/* Content Area */}
//         <div className="p-2">{renderContent()}</div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;
"use client";
import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import DashboardContent from "./DashboardContent";
import EnrolledCourses from "./EnrolledCourses";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const theme = useTheme(); // To get the theme for spacing
  const appBarHeight = theme.spacing(8); // AppBar height (adjust this based on your app)

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "courses":
        return <EnrolledCourses />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#121212", zIndex: 1300 }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Student Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <main
        style={{
          marginLeft: 240, // Sidebar width
          padding: "16px",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
          paddingTop: appBarHeight, // Adds space for the AppBar
        }}
      >
        {renderContent()}
      </main>
    </div>
  );
};

export default StudentDashboard;
