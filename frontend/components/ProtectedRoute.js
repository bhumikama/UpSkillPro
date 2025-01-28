"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const router = useRouter();

  if (!isAuthenticated) {
    // Redirect user to login page if not authenticated
    router.push("/login");
    return null;
  }

  return children;
};

export default ProtectedRoute;
