import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginSignupPage from "./Pages/LoginSignup";
import ChatPage from "./Pages/ChatPage";
import Home from "./Pages/Home";
import VerifyEmail from "./Pages/VerifyEmail";
import PrivateRoute from "./Components/PrivateRoute";
import PostCreate from "./Pages/PostCreate";
import OpenRoute from "./Components/OpenRoute";
import SideBarLayout from "./Components/common/SideBarLayout";
import NotFound from "./Pages/NotFound";
import ForgetPassword from "./Pages/ForgetPassword";
import UpdatedPassword from "./Pages/UpdatedPassword";
import MessageBox from "./Components/Chat/MessageBox";
import SearchPage from "./Pages/SearchPage";
import UserProfile from "./Components/Profile/UserProfile";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import PartnerHome from "./Components/GossipPartner/Home";
import PartnerLandingPage from "./Components/GossipPartner/About";
import PartnerFind from "./Components/GossipPartner/Find";
import PartnerCredits from "./Components/GossipPartner/Credits";
import PartnerProfile from "./Components/GossipPartner/Profile";
import UsersProfile from "./Pages/UsersProfile";
import ExplorePage from "./Pages/ExplorePage";
import HashtagPosts from "./Components/Explore/HashtagPosts";
import Partner from "./Pages/Partner";

function App() {
  return (
    <div className="w-full min-h-screen custom-scrollbar bg-richblack-800 flex font-inter">
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
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgetPassword />
            </OpenRoute>
          }
        />

        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatedPassword />
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
        >
          <Route path="/chat/:chatId" element={<MessageBox />}></Route>
          {/* <Route path="/chat/:chatId/info" element={<InfoChatUser />}></Route> */}
        </Route>

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/user/:id"
          element={
            <PrivateRoute>
              <UsersProfile />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/search"
          element={
            <PrivateRoute>
              <SearchPage />
            </PrivateRoute>
          }
        >
          <Route path="/search/:username" element={<UserProfile />}></Route>
        </Route>

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/edit"
          element={
            <PrivateRoute>
              <EditProfile className />
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

        <Route
          path="/explore"
          element={
            <PrivateRoute>
              <ExplorePage />
            </PrivateRoute>
          }
        >
          <Route
            path="/explore/tag/:hashtag"
            element={<HashtagPosts />}
          ></Route>
        </Route>

        <Route path="*" element={<Navigate to="/404" />}></Route>
        <Route path="/404" element={<NotFound />}></Route>

        <Route
          path="/gossip-partner"
          element={
            <PrivateRoute>
              <Partner />
            </PrivateRoute>
          }
        >
          <Route path="/gossip-partner/home" element={<PartnerHome />}></Route>
          <Route
            path="/gossip-partner/about"
            element={<PartnerLandingPage />}
          ></Route>
          <Route path="/gossip-partner/find" element={<PartnerFind />}></Route>
          <Route
            path="/gossip-partner/credits"
            element={<PartnerCredits />}
          ></Route>
          <Route
            path="/gossip-partner/profile"
            element={<PartnerProfile />}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
