// main.jsx
import { Component, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import App from "./App";
// import Database from "./Database";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <Header />, // Header is now the layout
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/database",
        element: <App />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
