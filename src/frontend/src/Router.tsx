import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/Home.page";
import { LoginPage } from "./pages/Login.page";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { AdminRoute } from "./pages/AdminRoute";
import { Home } from "./AdminPage/Home";

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
        <Home />
      </AdminRoute>
    ),
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
