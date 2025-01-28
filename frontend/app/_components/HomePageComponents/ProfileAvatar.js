"use client";
import Image from "next/image";
import React from "react";
import { MenuItems, MenuItem, Menu, MenuButton } from "@headlessui/react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const ProfileDropdownMenu = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogOut = () => {
    Cookies.remove("userName", { path: "/" });
    Cookies.remove("userRole", { path: "/" });
    Cookies.remove("userEmail", { path: "/" });
    dispatch(logout());
    router.push("/");
    toast.success("You are logged out");
  };
  return (
    <Menu as="div" className="relative ml-3 flex justify-end">
      <div>
        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-sm text-white">
            <Avatar>{user.name.charAt(0).toUpperCase()}</Avatar>
          </div>

          <MenuItems
            transition
            className="absolute right-2 z-10 top-14 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <MenuItem>
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none font-normal"
              >
                Dashboard
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
              >
                Settings
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href="/"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                onClick={handleLogOut}
              >
                Sign out
              </Link>
            </MenuItem>
          </MenuItems>
        </MenuButton>
      </div>
    </Menu>
  );
};

export default ProfileDropdownMenu;
