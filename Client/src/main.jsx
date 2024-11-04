import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster.jsx";
import ProviderComponent from "./context/index.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProviderComponent>
      <App />
      <Toaster />
    </ProviderComponent>
  </BrowserRouter>
);
