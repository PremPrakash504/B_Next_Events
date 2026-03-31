
import {
  FaCamera,
  FaUsers,
  FaCalendarAlt,
  FaMagic,
  FaHeart,
  FaTrophy,
} from "react-icons/fa";

const Services = () => {
  const services = [
    {
      icon: FaCamera,
      title: "Professional Modeling",
      description:
        "Elite models for fashion shows, photoshoots, and commercial campaigns across Nepal.",
      features: [
        "Fashion Shows",
        "Product Launches",
        "Commercial Shoots",
        "Brand Campaigns",
      ],
    },
    {
      icon: FaCalendarAlt,
      title: "Event Management",
      description:
        "Complete event planning and execution services for corporate and private events.",
      features: [
        "Corporate Events",
        "Fashion Weeks",
        "Product Launches",
        "Private Parties",
      ],
    },
    {
      icon: FaUsers,
      title: "Talent Management",
      description:
        "Comprehensive talent development and management for aspiring models and performers.",
      features: [
        "Model Training",
        "Portfolio Development",
        "Career Guidance",
        "Industry Connections",
      ],
    },
    {
      icon: FaMagic,
      title: "Creative Direction",
      description:
        "Artistic vision and creative direction for fashion shows and brand campaigns.",
      features: [
        "Concept Development",
        "Styling Services",
        "Art Direction",
        "Brand Strategy",
      ],
    },
    {
      icon: FaHeart,
      title: "Wedding Events",
      description:
        "Elegant wedding planning and coordination services with professional models.",
      features: [
        "Wedding Planning",
        "Bridal Modeling",
        "Reception Management",
        "Photography Coordination",
      ],
    },
    {
      icon: FaTrophy,
      title: "Competition Events",
      description:
        "Organization and management of beauty pageants and modeling competitions.",
      features: [
        "Pageant Organization",
        "Judging Coordination",
        "Stage Management",
        "Media Coverage",
      ],
    },
  ];

  return (
    <section id="services" className="py-20 bg-brand-gray-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-serif">
            Our Premium Services
          </h2>
          <p className="text-xl text-brand-gold-light max-w-3xl mx-auto">
            From professional modeling to complete event management, we deliver
            excellence in every aspect of the fashion and events industry in
            Nepal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-brand-black to-brand-gray-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-brand-gold/20 hover:border-brand-gold/40"
            >
              <div className="bg-gradient-to-r from-brand-gold to-brand-yellow p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="h-8 w-8 text-brand-black" />
              </div>

              <h3 className="text-2xl font-bold text-brand-gold mb-4 font-serif">
                {service.title}
              </h3>
              <p className="text-brand-gold-light mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-white">
                    <div className="w-2 h-2 bg-gradient-to-r from-brand-gold to-brand-orange rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
