// main.jsx
import { Component, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import PublicJournal from "./pages/PublicJournal";
import PublicBrgyJournal from "./pages/PublicBrgyJournal";
import PublicDocuments from "./pages/PublicDocuments";
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
        path: "/journaldatabase",
        element: <PublicJournal />,
      },
      {
        path: "/barangaydatabase",
        element: <PublicBrgyJournal />,
      },
      {
        path: "/documents",
        element: <PublicDocuments />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
