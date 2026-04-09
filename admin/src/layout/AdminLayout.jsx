import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";
const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-brand-black">
      <Sidebar />
      <div className="flex-1 bg-brand-black">
        <Outlet />
      </div>
    </div>
  );
};
export default AdminLayout;
