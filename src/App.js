import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginSignupPage from "./Pages/LoginSignup";
import ChatPage from "./Pages/ChatPage";
import Home from "./Pages/Home";
import VerifyEmail from "./Pages/VerifyEmail";
import PrivateRoute from "./Components/PrivateRoute";
import Notification from "./Pages/Notification";
import PostCreate from "./Pages/PostCreate";
import OpenRoute from "./Components/OpenRoute";
import SideBarLayout from "./Components/common/SideBarLayout";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-300 flex  font-inter">
      <SideBarLayout />
      <Routes>
        <Route
          path="/"
          element={
            <OpenRoute>
              <LoginSignupPage />
            </OpenRoute>
          }
        />

        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        >
          {/* <Route path="" element={<MyProfile />} /> */}
          {/* <Route path="" element={<Settings />} /> */}
        </Route>

        <Route
          path="/notification"
          element={
            <PrivateRoute>
              <Notification />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/create"
          element={
            <PrivateRoute>
              <PostCreate />
            </PrivateRoute>
          }
        ></Route>
        <Route path="*" element={<Navigate to="/404" />}></Route>
        <Route path="/404" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
