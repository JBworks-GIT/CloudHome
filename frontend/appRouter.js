import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./src/pages/loginPage";
import SignupPage from "./src/pages/signupPage";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Homepage from "./src/pages/homePage";
import OtpPage from "./src/pages/otpPage";
const AppRouter = () => {
  const { isAuthorized, isEmailVerified } = useSelector((e) => e.auth);

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
      path: "/otp",
      element:
        isAuthorized && !isEmailVerified ? <OtpPage /> : <Navigate to="/" />,
    },
    {
      path: "/",
      element: isAuthorized ? (
        <>{isEmailVerified ? <Homepage /> : <Navigate to="/otp" />}</>
      ) : (
        <Navigate to="/login" />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
