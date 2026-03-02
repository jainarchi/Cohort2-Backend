import { RouterProvider } from "react-router-dom";
import router from "./app.routes";
import "../src/features/shared/global.scss";
import { AuthProvider } from "./features/auth/auth.context";
import { PostContextProvider } from "./features/post/postContext";
import { ConnectionProvider } from "./features/connection/ConnectionContext";
import { ProfileProvider } from "./features/profile/profileContext";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <ProfileProvider>
          
          <PostContextProvider>
            <ConnectionProvider>

              <RouterProvider router={router} />

            </ConnectionProvider>
          </PostContextProvider>

        </ProfileProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
