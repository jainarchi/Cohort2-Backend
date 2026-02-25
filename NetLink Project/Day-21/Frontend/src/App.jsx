import { RouterProvider } from "react-router-dom";
import router from "./app.routes";
import "../src/features/shared/global.scss";
import { AuthProvider } from "./features/auth/auth.context";
import { PostContextProvider } from "./features/post/postContext";



const App = () => {
  return (
    <div>
      <AuthProvider>
        <PostContextProvider>

          <RouterProvider router={router} />

        </PostContextProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
