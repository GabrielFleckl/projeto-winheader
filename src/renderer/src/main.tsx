import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { HashRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { ModalAdd } from "./pages/ModalAdd";
import { ModalDelete } from "./pages/ModalDelete";
import { ModalConfig } from "./pages/ModalConfig";
import { ModalMenu } from "./pages/ModalMenu";

createRoot(document.getElementById("root")!).render(
  <StrictMode> 
    <HashRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/modalAdd" Component={ModalAdd} />
        <Route path="/modalDelete" Component={ModalDelete} />
        <Route path="/modalConfig" Component={ModalConfig} />
        <Route path="/modalMenu" Component={ModalMenu} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
