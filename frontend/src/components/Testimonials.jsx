import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { useGetTestimonialsQuery } from "../redux/features/testimonialsSlice";

const Testimonials = () => {
  const { data, isLoading, isError } = useGetTestimonialsQuery();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;
  const testimonials = data || [];

  return (
    <section className="py-20 bg-gradient-to-br from-brand-black to-brand-gray-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-serif">
            What Our Clients Say
          </h2>
          <p className="text-xl text-brand-gold-light max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our valued clients have
            to say about their experience working with us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-brand-gray-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-brand-gold/20"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image ? `${import.meta.env.VITE_BASE_URL}/${testimonial.image.replace(/\\/g, '/')}` : ''}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-bold text-brand-gold">
                    {testimonial.name}
                  </h4>
                  <p className="text-brand-gold-light">{testimonial.designation}</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              <FaQuoteLeft className="h-8 w-8 text-brand-gold mb-4" />
              <p className="text-brand-gold-light leading-relaxed italic">
                                "{testimonial.feedback}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
