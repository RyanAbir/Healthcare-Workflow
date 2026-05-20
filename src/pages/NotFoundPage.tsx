import React from "react";
import { Link } from "react-router-dom";

import { routePaths } from "../app/routes/paths";

export const NotFoundPage = () => {
  return (
    <section>
      <h1>Not Found</h1>
      <p>This page does not exist in the demo routes.</p>
      <Link to={routePaths.root}>Go to Connect</Link>
    </section>
  );
};
