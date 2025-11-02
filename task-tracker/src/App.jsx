// src/App.jsx
import React from "react";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Home />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          // Default options for all toasts
          duration: 2800,
          style: {
            padding: "10px 14px",
            borderRadius: "8px",
            color: "#fff",
            fontWeight: 600,
            boxShadow: "0 6px 18px rgba(15,23,42,0.12)",
          },
        }}
      />
    </>
  );
}
