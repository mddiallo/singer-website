import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LanguageProvider } from "./context/LanguageContext";
import "./styles/global.css";
import "./styles/animations.css";
import App from "./App.jsx";

const root = document.getElementById("root");
document.documentElement.lang =
  localStorage.getItem("singer_site_locale") || "fr";

createRoot(root).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);
