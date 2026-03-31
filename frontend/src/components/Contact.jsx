import { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: "Phone",
      details: ["+977 9868075900", "081-534134"],
    },
    {
      icon: FaEnvelope,
      title: "Email",
      details: ["nexteventsnepal@gmail.com", "office.nextinfosys@gmail.com"],
    },
    {
      icon: FaMapMarkerAlt,
      title: "Address",
      details: ["Kohalpur-11,Golpark, Banke", "Nepal"],
    },
    {
      icon: FaClock,
      title: "Business Hours",
      details: [
        "Mon - Fri: 9:00 AM - 6:00 PM",
        "Sat - Sun: 10:00 AM - 4:00 PM",
      ],
    },
  ];

  return (
    <section id="contact" className="py-20 bg-brand-gray-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-serif">
            Get In Touch
          </h2>
          <p className="text-xl text-brand-gold-light max-w-3xl mx-auto">
            Ready to create something amazing together? Contact us today to
            discuss your modeling and event requirements.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-brand-gold mb-8 font-serif">
              Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-brand-gold to-brand-yellow p-3 rounded-xl">
                    <info.icon className="h-6 w-6 text-brand-black" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-brand-gold mb-2">
                      {info.title}
                    </h4>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-brand-gold-light">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-brand-black to-brand-gray-dark p-8 rounded-2xl border border-brand-gold/20">
              <h4 className="text-xl font-bold text-brand-gold mb-4">
                Why Choose Us?
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center text-brand-gold-light">
                  <div className="w-2 h-2 bg-gradient-to-r from-brand-gold to-brand-orange rounded-full mr-3"></div>
                  Professional and experienced team
                </li>
                <li className="flex items-center text-brand-gold-light">
                  <div className="w-2 h-2 bg-gradient-to-r from-brand-gold to-brand-orange rounded-full mr-3"></div>
                  Customized solutions for every event
                </li>
                <li className="flex items-center text-brand-gold-light">
                  <div className="w-2 h-2 bg-gradient-to-r from-brand-gold to-brand-orange rounded-full mr-3"></div>
                  Competitive pricing and packages
                </li>
                <li className="flex items-center text-brand-gold-light">
                  <div className="w-2 h-2 bg-gradient-to-r from-brand-gold to-brand-orange rounded-full mr-3"></div>
                  24/7 customer support
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-brand-black to-brand-gray-dark p-8 rounded-2xl border border-brand-gold/20">
            <h3 className="text-2xl font-bold text-brand-gold mb-6 font-serif">
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-brand-gold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-brand-gold/30 bg-brand-gray-dark text-white focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-gold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-brand-gold/30 bg-brand-gray-dark text-white focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-brand-gold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-brand-gold/30 bg-brand-gray-dark text-white focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-gold mb-2">
                    Service Required
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-brand-gold/30 bg-brand-gray-dark text-white focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="modeling">Professional Modeling</option>
                    <option value="events">Event Management</option>
                    <option value="wedding">Wedding Events</option>
                    <option value="corporate">Corporate Events</option>
                    <option value="fashion">Fashion Shows</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-gold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-brand-gold/30 bg-brand-gray-dark text-white focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-200"
                  placeholder="Tell us about your event requirements..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-brand-orange to-brand-yellow text-brand-black px-8 py-3 rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group font-semibold"
              >
                Send Message
                <FaPaperPlane className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
