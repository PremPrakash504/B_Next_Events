import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHero } from "../redux/features/heroSlice";
import { FaArrowRight } from "react-icons/fa";
import modeling from "../assets/hero.jpg";

const Hero = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.hero);

  useEffect(() => {
    dispatch(fetchHero());
  }, [dispatch]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const heroData = data ? data[0] : null;
  const backgroundImage = heroData ? `url(${heroData.imageUrl})` : modeling;
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center"
      style={{
        backgroundImage: `url(${modeling})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="absolute bottom-8 left-4 sm:left-8 px-4 sm:px-0">
        <div className="inline-flex items-center text-brand-gold px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
          Nepal's Premier Modeling & Events Company
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-white leading-tight font-serif">
          Elevate Your
          <span className="bg-gradient-to-r from-brand-gold to-brand-yellow bg-clip-text text-transparent">
            {" "}
            Events
          </span>
        </h1>
        <p className="text-sm sm:text-lg md:text-xl text-brand-gold-light leading-relaxed max-w-xl sm:max-w-2xl">
          Professional modeling services and exceptional event management across
          Nepal. We bring your vision to life with elegance and precision.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3">
          <a
            href="#contact"
            className="bg-gradient-to-r from-brand-orange to-brand-yellow text-brand-black px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:shadow-xl transition-all duration-300 flex items-center justify-center group font-semibold text-sm sm:text-base"
          >
            Get Started
            <FaArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#portfolio"
            className="border-2 border-brand-gold text-brand-gold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:border-brand-yellow hover:text-brand-yellow transition-all duration-300 font-semibold text-sm sm:text-base"
          >
            View Portfolio
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
