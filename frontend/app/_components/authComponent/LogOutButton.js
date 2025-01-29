"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";

const LogOutButton = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogOut = () => {
    Cookies.remove("userName", { path: "/" });
    Cookies.remove("userRole", { path: "/" });
    Cookies.remove("userEmail", { path: "/" });
    dispatch(logout());
    router.push("/");
    toast.success("You're logged out");
  };

  return (
    <div>
      <button
        className="px-2 bg-black border-white mx-1 text-white text-center font-bold"
        onClick={handleLogOut}
      >
        Logout
      </button>
    </div>
  );
};

export default LogOutButton;
