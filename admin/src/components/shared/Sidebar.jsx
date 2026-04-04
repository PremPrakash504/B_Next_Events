import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/authState";

const links = [
  { name: "Dashboard", path: "/admin/dashboard" },
];

const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white flex flex-col p-4">
      <h2 className="text-xl font-bold mb-8 text-yellow-400">Admin Panel</h2>
      <nav className="flex flex-col gap-2 flex-1">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition ${isActive ? "bg-yellow-400 text-black font-semibold" : "hover:bg-gray-700"}`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
      <button
        onClick={() => dispatch(clearUser())}
        className="mt-auto px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
