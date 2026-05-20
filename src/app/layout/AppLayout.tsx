import React from "react";
import { Outlet } from "react-router-dom";

import { Footer } from "../../shared/ui/Footer";
import { Header } from "../../shared/ui/Header";

export const AppLayout = () => {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
