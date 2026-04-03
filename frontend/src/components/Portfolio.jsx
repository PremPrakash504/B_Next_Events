import { FaExternalLinkAlt } from "react-icons/fa";
import { useGetPortfolioQuery } from "../redux/features/portfolioSlice";

const Portfolio = () => {
  const { data, isLoading, isError } = useGetPortfolioQuery();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;
  const portfolioItems = data?.data || [];

  return (
    <section
      id="portfolio"
      className="py-20 bg-gradient-to-br from-brand-black to-brand-gray-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-serif">
            Our Portfolio
          </h2>
          <p className="text-xl text-brand-gold-light max-w-3xl mx-auto">
            Explore our stunning collection of successful events, fashion shows,
            and modeling projects that showcase our expertise and creativity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={`${import.meta.env.VITE_BASE_URL}/${item.image.split(',')[0].replace(/\\/g, '/')}`}
                alt={item.title}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-brand-gold text-brand-black px-3 py-1 rounded-full text-sm font-medium mb-3 w-fit">
                  {item.category}
                </div>
                <h3 className="text-white text-xl font-bold mb-2">
                  {item.title}
                </h3>
                <button className="flex items-center text-white hover:text-brand-gold transition-colors duration-200">
                  View Details
                  <FaExternalLinkAlt className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-brand-orange to-brand-yellow text-brand-black px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 font-semibold">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
