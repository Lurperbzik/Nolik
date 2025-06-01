import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/Home.page";
import { LoginPage } from "./pages/Login.page";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { AdminRoute } from "./pages/AdminRoute";
import { Button } from "@mantine/core";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <Button />
      </AdminRoute>
    ),
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
