import { FaUsers, FaAward, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import aboutImg from "../assets/about.jpg";

const About = () => {
  const stats = [
    { icon: FaUsers, value: "100+", label: "Events Completed" },
    { icon: FaAward, value: "10+", label: "Awards Won" },
    { icon: FaMapMarkerAlt, value: "7", label: "Cities Covered" },
    { icon: FaClock, value: "2+", label: "Years Experience" },
  ];

  return (
    <section id="about" className="py-20 bg-brand-gray-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-white font-serif">
                About Next Model Kohalpur - Best Event Management Company in Banke, Nepal
              </h2>
              <p className="text-xl text-brand-gold-light leading-relaxed">
                Next Model Kohalpur is the premier event management company in Kohalpur Banke, Nepaljung, Nepal. Founded with a vision to revolutionize the modeling and events industry in Nepal, we have become the top choice for brands, individuals, and organizations seeking excellence in event management across Banke district.
              </p>
              <p className="text-brand-gold-light leading-relaxed">
                Our experienced team of event management professionals in Kohalpur brings creativity, precision, and passion to every project. From intimate gatherings to grand fashion shows in Nepaljung, we ensure each event is executed flawlessly with attention to every detail. We proudly serve Kohalpur, Banke, Nepaljung and surrounding areas in Nepal.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-brand-black to-brand-gray-dark p-6 rounded-xl text-center border border-brand-gold/20"
                >
                  <div className="bg-gradient-to-r from-brand-gold to-brand-yellow p-3 rounded-full w-fit mx-auto mb-4">
                    <stat.icon className="h-6 w-6 text-brand-black" />
                  </div>
                  <div className="text-3xl font-bold text-brand-gold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-brand-gold-light text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute w-50 sm:w-full inset-0 bg-gradient-to-r from-brand-gold to-brand-orange rounded-3xl transform -rotate-6"></div>
            <img
              src={aboutImg}
              alt="Team"
              className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
            />
            <div className="absolute -top-6 -right-2 bg-white p-6 rounded-2xl shadow-xl">
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-black">100%</div>
                <div className="text-brand-gray-dark text-sm">
                  Client Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
