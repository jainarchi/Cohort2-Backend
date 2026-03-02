import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import CreatePost from "./features/post/pages/CreatePost";
import MainPage from "./features/post/pages/MainPage";
import Feed from './features/post/components/mainPage/Feed'

import Connections from "./features/connection/components/mainPage/Connections";
import Pending from "./features/connection/components/mainPage/Pending";
import Sent from "./features/connection/components/pending/Sent";
import Invitation from "./features/connection/components/pending/Invitation";

import ExploreConnections from "./features/connection/components/mainPage/ExploreConnections";



const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/create-post",
    element: <CreatePost />,
  },
  {
    path: "/",
    element: <MainPage />,
    children: [
        {
          path: "feed",
          element: <Feed />
       },
        {
     path: "/explore",
     element: <ExploreConnections/>
  },
  // {
  //    path: "/profile",
  //    element: <Profile />
  // },
      {
        path: "connection",
        element: <Connections />,
      },
      {
        path: "connection/pending",
        element: <Pending />,
        children : [
            {
                path: "sent",
                element: <Sent />
            },
            {
                path: "invitation",
                element : <Invitation />
            }
        ]
        
      },
    ],
  },
  
]);

export default router;
