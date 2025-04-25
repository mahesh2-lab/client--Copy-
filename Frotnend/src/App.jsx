import React from "react";
import Map from "./components/Map";
import { SignUp } from "./login/signUp";
import { Login } from "./login/Login";
import { useAuthContext } from "./context/authContext";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AboutUs from "./components/pages/aboutUs";
import ContactUs from "./components/pages/contactus";
import Welcome from "./welcome";

function App() {
  const { authUser } = useAuthContext();

  return (
    <>
      <div>
        <Routes>
          <Route
            path="/"
            element={authUser ? <Map /> : <Navigate to={"/welcome"} />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <SignUp />}
          />
          <Route
            path="/welcome"
            element={<Welcome />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/about"
            element={authUser ? <AboutUs /> : <Navigate to="/" />}
          />
          <Route
            path="/contact"
            element={authUser ? <ContactUs /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
