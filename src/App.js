import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginSignupPage from "./Pages/LoginSignup";
import ChatPage from "./Pages/ChatPage";
import Home from "./Pages/Home";
import VerifyEmail from "./Pages/VerifyEmail";
import PrivateRoute from "./Components/PrivateRoute";
import Notification from "./Pages/Notification";
import PostCreate from "./Pages/PostCreate";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-300 flex flex-col font-inter">
      <Routes>
        <Route path="/" element={<LoginSignupPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/chat" element={<ChatPage />} />
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

        <Route path="/notification" element={<Notification />}></Route>
        <Route path="/create" element={<PostCreate />}></Route>
      </Routes>
    </div>
  );
}

export default App;
