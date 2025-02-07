import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ErrorComponent from "./components/ErrorComponent.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ErrorComponent>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorComponent>
  // </StrictMode>
);
