import React from "react";
import { NavLink } from "react-router-dom";

import { routePaths } from "../../app/routes/paths";

export const Header = () => {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="app-brand">
          <h1>Healthcare Data Workflow Demo</h1>
          <p>Static MVP prototype</p>
        </div>
        <nav className="app-nav" aria-label="Primary navigation">
          <NavLink to={routePaths.root}>Connect</NavLink>
          <NavLink to={routePaths.consent}>Consent</NavLink>
          <NavLink to={routePaths.data}>Data</NavLink>
          <NavLink to={routePaths.audit}>Audit</NavLink>
          <NavLink to={routePaths.compare}>Compare</NavLink>
        </nav>
      </div>
    </header>
  );
};
