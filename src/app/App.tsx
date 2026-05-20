import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

import { AppLayout } from "./layout/AppLayout";
import { routePaths } from "./routes/paths";
import { AuditPage } from "../pages/AuditPage";
import { ComparePage } from "../pages/ComparePage";
import { ConnectPage } from "../pages/ConnectPage";
import { ConsentPage } from "../pages/ConsentPage";
import { DataPage } from "../pages/DataPage";
import { NotFoundPage } from "../pages/NotFoundPage";

const AppRoutes = () =>
  useRoutes([
    {
      path: routePaths.root,
      element: <AppLayout />,
      children: [
        { index: true, element: <ConnectPage /> },
        { path: routePaths.consent.slice(1), element: <ConsentPage /> },
        { path: routePaths.data.slice(1), element: <DataPage /> },
        { path: routePaths.audit.slice(1), element: <AuditPage /> },
        { path: routePaths.compare.slice(1), element: <ComparePage /> },
        { path: routePaths.notFound.slice(1), element: <NotFoundPage /> },
        { path: "*", element: <Navigate to={routePaths.notFound} replace /> },
      ],
    },
  ]);

export const App = () => <AppRoutes />;
