import { createBrowserRouter } from "react-router-dom";
import AdminLogin from "../pages/AdminLogin";
import AdminLayout from "../layout/AdminLayout";
import { adminRoutes } from "./AdminRoutes";
import Guard from "./Guard";

const NotFound = () => <div>Not Found</div>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: (
      <Guard>
        <AdminLayout />
      </Guard>
    ),
    children: adminRoutes,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
