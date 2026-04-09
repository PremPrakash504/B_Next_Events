import Dashboard from "../pages/Dashboard";
import Portfolio from "../pages/Portfolio";
import HeroSection from "../pages/HeroSection";
import Testimonials from "../pages/Testimonials";
import Bookings from "../pages/Bookings";
import Settings from "../pages/Settings";

export const adminRoutes = [
  { path: "dashboard", element: <Dashboard /> },
  { path: "portfolio", element: <Portfolio /> },
  { path: "hero-section", element: <HeroSection /> },
  { path: "testimonials", element: <Testimonials /> },
  { path: "bookings", element: <Bookings /> },
  { path: "settings", element: <Settings /> },
];
