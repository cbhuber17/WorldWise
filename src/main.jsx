// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // Comment out StrictMode in dev to prevent multiple API calls that get cancelled
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
