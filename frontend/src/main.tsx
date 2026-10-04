import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";

import App from "./App";
import i18n from "./i18n";

import { ThemeProvider } from "./contexts/ThemeContext";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename="/site-digital-work">
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);