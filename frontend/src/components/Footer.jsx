import logo from "../assets/logo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaTiktok,
} from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    {
      icon: FaFacebookF,
      href: "https://www.facebook.com/profile.php?id=61573409087859",
      label: "Facebook",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/bnexteventsnepal/",
      label: "Instagram",
    },
    {
      icon: FaTiktok,
      href: "https://www.tiktok.com/@bnexteventsnepal",
      label: "Tiktok",
    },
  ];

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "Professional Modeling",
    "Event Management",
    "Wedding Events",
    "Fashion Shows",
    "Corporate Events",
    "Talent Management",
  ];

  return (
    <footer className="bg-brand-black text-white border-t border-brand-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <img src={logo} className="w-18 h-16" />
              <span className="text-xl font-bold text-brand-gold font-serif">
                B Next Events
              </span>
            </div>
            <p className="text-brand-gold-light leading-relaxed">
              Nepal's premier modeling and events company, delivering excellence
              in fashion shows, corporate events, and talent management.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  className="bg-brand-gray-dark p-3 rounded-full hover:bg-gradient-to-r hover:from-brand-gold hover:to-brand-orange transition-all duration-300 border border-brand-gold/20"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-brand-gold">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-brand-gold-light hover:text-brand-gold transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-brand-gold">
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-brand-gold-light text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-brand-gold">
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="h-5 w-5 text-brand-gold mt-1 flex-shrink-0" />
                <div className="text-brand-gold-light text-sm">
                  <p>Kohalpur-11,Golpark,Banke</p>
                  <p>Nepal</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhoneAlt className="h-5 w-5 text-brand-gold flex-shrink-0" />
                <span className="text-brand-gold-light text-sm">
                  +977 9868075900
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="h-5 w-5 text-brand-gold flex-shrink-0" />
                <span className="text-brand-gold-light text-sm">
                  bnexteventsnepal@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-gold/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-brand-gold-light text-sm">
              © 2025 B Next Events Nepal. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-brand-gold-light hover:text-brand-gold text-sm transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-brand-gold-light hover:text-brand-gold text-sm transition-colors duration-200"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
