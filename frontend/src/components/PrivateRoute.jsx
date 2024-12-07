
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// PrivateRoute Component for React Router v6
const PrivateRoute = ({ element }) => {
  const { user } = useContext(AuthContext);

  // If the user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the passed element
  return element;
};

export default PrivateRoute;
