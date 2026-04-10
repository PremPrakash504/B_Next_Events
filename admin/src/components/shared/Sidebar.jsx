import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/authState";

const links = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Portfolio", path: "/admin/portfolio" },
  { name: "Hero Section", path: "/admin/hero-section" },
  { name: "Testimonials", path: "/admin/testimonials" },
  { name: "Bookings", path: "/admin/bookings" },
  { name: "Profile", path: "/admin/settings" },
];

const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-64 min-h-screen bg-brand-black border-r border-brand-gold/20 flex flex-col p-4">
      <h2 className="text-xl font-bold font-serif text-brand-gold mb-1">
        B Next Events
      </h2>
      <p className="text-xs text-brand-gold/50 mb-8">Admin Panel</p>

      {/* nav bata flex-1 hataiyo */}
      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `px-4 py-2.5 rounded-lg transition text-sm font-bold ${
                isActive
                  ? "bg-brand-gold text-brand-black"
                  : "text-white hover:bg-brand-gold/10 hover:text-brand-gold"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

     z
      <button
        onClick={() => dispatch(clearUser())}
        className="mt-10 px-4 py-2.5 border border-brand-gold/30 text-white font-bold rounded-lg hover:bg-brand-gold/10 hover:text-brand-gold transition text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
