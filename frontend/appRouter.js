import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./src/pages/loginPage";
import SignupPage from "./src/pages/signupPage";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const AppRouter = () => {
  const { isAuthorized } = useSelector((e) => e.auth);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: isAuthorized ? <Navigate to="/" /> : <LoginPage />,
    },
    {
      path: "/signup",
      element: isAuthorized ? <Navigate to="/" /> : <SignupPage />,
    },
    {
      path: "/",
      element: isAuthorized ? <h1>Homepage</h1> : <Navigate to="/login" />,
    },
  ]);

  return (
      <RouterProvider router={router} />
  );
};

export default AppRouter;
