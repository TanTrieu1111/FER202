import { useRoutes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

import LoginPage from "../pages/LoginPage";
import AccountListPage from "../pages/AccountListPage";
import AccountDetailPage from "../pages/AccountDetailPage";

export default function AppRoutes() {
  const { user } = useContext(AuthContext);

  const routes = useRoutes([
    {
      path: "/",
      element: <Navigate to="/login" replace />
    },

    {
      path: "/login",
      element: <LoginPage />
    },

    {
      path: "/accounts",
      element: user ? <AccountListPage /> : <Navigate to="/login" replace />
    },

    {
      path: "/accounts/:id",
      element: user ? <AccountDetailPage /> : <Navigate to="/login" replace />
    },

    {
      path: "*",
      element: <Navigate to="/login" replace />
    }
  ]);

  return routes;
}