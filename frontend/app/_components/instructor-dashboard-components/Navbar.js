"use client";
import {
  AppBar,
  IconButton,
  Typography,
  Button,
  Toolbar,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:740px)");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    Cookies.remove("userName", { path: "/" });
    Cookies.remove("userRole", { path: "/" });
    Cookies.remove("userEmail", { path: "/" });
    dispatch(logout());
    router.push("/");
    toast.success("You're logged out");
  };

  const drawer = (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={handleDrawerToggle}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#000", 
          color: "#fff", 
        },
      }}
    >
      <List>
        <ListItem button>
          <Link href="/instructor-dashboard" passHref color="white">
            Dashboard
          </Link>
        </ListItem>
        <ListItem
          button
          onClick={handleLogout}
          color="white"
          sx={{
            color: "white",
            cursor: "pointer",
            "&:hover": {
              color: "black",
              backgroundColor: "white",
              borderRadius: "4px",
              padding: "5px",
            },
          }}
        >
          Logout
        </ListItem>
      </List>
    </Drawer>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: "#000" }}>
      <Toolbar>
        {/* Logo or App Name */}
        <Typography
          variant="h6"
          sx={{
            "&:hover": { textDecoration: "underline" },
            flexGrow: 1,
            color: "white", 
          }}
        >
          <Link href={"/instructor-dashboard"}>UpSkill Pro</Link>
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>
            {drawer}
          </>
        ) : (
          <>
            <Link href="/instructor-dashboard" passHref>
              <Button
                sx={{
                  color: "white",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                  },
                }}
              >
                Dashboard
              </Button>
            </Link>
            <Button
              sx={{
                color: "white",
                border: "2px solid white", 
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                  border: "2px solid black", 
                },
                borderRadius: "2px", 
                padding: "4px 8px",
                marginLeft: "2px", 
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
