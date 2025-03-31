import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import DashboardStudent from "./DashboardStudent";
import DashboardInstitution from "./DashboardInstitution";
import UserDashboard from "./UserDashboard";
const DashboardSelector = () => {
  const userRole = useSelector((state) => state.user.userRole);

  if (!userRole) return <Navigate to="/signin" />; // Redirect if not logged in

  return userRole === "student" ? <UserDashboard /> : <DashboardInstitution />;
};

export default DashboardSelector;
