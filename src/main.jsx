import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./components/sign_in/SignIn.jsx";

import Feed from "./components/feed/Feed.jsx";
import ProfileContainer from "./components/profile_container/ProfileContainer.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/feed",
    element: <Feed />,
  },
  {
    path: "/profile",
    element: <ProfileContainer />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
