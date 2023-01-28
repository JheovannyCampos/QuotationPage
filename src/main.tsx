import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyle from "./global";
import Home from "./pages/Home";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <Home />
  </React.StrictMode>
);
