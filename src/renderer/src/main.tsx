import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { HashRouter, Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { ModalAdd } from "./components/ModalAdd";
import { ModalDelete } from "./components/ModalDelete";
import { ModalConfig } from "./components/ModalConfig";
import { ModalMenu } from "./components/ModalMenu";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" Component={Header} />

        <Route path="/modalAdd" Component={ModalAdd} />
        <Route path="/modalDelete" Component={ModalDelete} />
        <Route path="/modalConfig" Component={ModalConfig} />
        <Route path="/modalMenu" Component={ModalMenu} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
