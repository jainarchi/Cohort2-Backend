import { createBrowserRouter } from "react-router-dom";

import Layout from "./features/shared/components/Layout";

import Home from "./features/home/pages/Home";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Profile from "./features/profile/pages/Profile";

import LatestSongs from "./features/songs/pages/LatestSongs";
import FavoriteSongs from "./features/songs/pages/FavoriteSongs";
import RecentPlay from "./features/songs/pages/RecentPlay";
import MoodDetect from "./features/songs/pages/MoodDetect";
import AllSongs from "./features/songs/pages/AllSongs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,          // Shared layout with sidebar
    children: [
      { 
        path:'/',
        element: <Home />,
        children : [
           { index:true, element: <AllSongs/> },
           { path: "recent", element: <RecentPlay /> },
        ]
      
      },

      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },

      { path: "profile", element: <Profile /> },
      
      { path: "latest-songs", element: <LatestSongs /> },
      { path: "favorites", element: <FavoriteSongs /> },
     
      { path: "mood", element: <MoodDetect /> },
    ],
  },
]);

export default router;
