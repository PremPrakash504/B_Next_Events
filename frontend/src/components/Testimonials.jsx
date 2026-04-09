import { FaStar, FaQuoteLeft, FaPaperPlane } from "react-icons/fa";
import { useState } from "react";
import {
  useGetTestimonialsQuery,
  useSubmitReviewMutation,
} from "../redux/features/testimonialsSlice";

const Testimonials = () => {
  const { data, isLoading, isError } = useGetTestimonialsQuery();
  const [
    submitReview,
    { isLoading: reviewLoading, isSuccess: reviewSuccess, reset: reviewReset },
  ] = useSubmitReviewMutation();
  const [showModal, setShowModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    name: "",
    designation: "",
    feedback: "",
    rating: 5,
    image: null,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;
  const testimonials = data || [];

  const handleReviewChange = (e) => {
    const { name, value, type, files } = e.target;
    setReviewData({
      ...reviewData,
      [name]: type === "file" ? files?.[0] : value,
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    formPayload.append("name", reviewData.name);
    formPayload.append("desigination", reviewData.designation);
    formPayload.append("feedback", reviewData.feedback);
    formPayload.append("rating", reviewData.rating);
    if (reviewData.image) {
      formPayload.append("image", reviewData.image);
    }

    const result = await submitReview(formPayload);
    if (!result.error) {
      setReviewData({
        name: "",
        designation: "",
        feedback: "",
        rating: 5,
        image: null,
      });
      setTimeout(() => {
        reviewReset();
        setShowModal(false);
      }, 2000);
    }
  };

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
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 bg-gradient-to-r from-brand-gold to-brand-yellow text-brand-black px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold inline-flex items-center gap-2"
          >
            ⭐ Share Your Experience
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-brand-gray-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-brand-gold/20"
            >
              <div className="flex items-center mb-6">
                <img
                  src={
                    testimonial.image
                      ? `${import.meta.env.VITE_BASE_URL}/${testimonial.image.replace(/\\/g, "/")}`
                      : ""
                  }
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-bold text-brand-gold">
                    {testimonial.name}
                  </h4>
                  <p className="text-brand-gold-light">
                    {testimonial.designation}
                  </p>
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

      {/* Review Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-brand-black to-brand-gray-dark rounded-2xl border border-brand-gold/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Close Button */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-brand-gold font-serif">
                  Share Your Experience
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-brand-gold-light hover:text-brand-gold text-2xl font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleReviewSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-gold mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={reviewData.name}
                      onChange={handleReviewChange}
                      className="w-full px-4 py-2 rounded-lg border border-brand-gold/30 bg-brand-gray-dark text-white focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-200"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-gold mb-2">
                      Your Position/Designation
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={reviewData.designation}
                      onChange={handleReviewChange}
                      className="w-full px-4 py-2 rounded-lg border border-brand-gold/30 bg-brand-gray-dark text-white focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-200"
                      placeholder="e.g., Bride, Corporate Manager"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-gold mb-2">
                    Your Feedback
                  </label>
                  <textarea
                    name="feedback"
                    value={reviewData.feedback}
                    onChange={handleReviewChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-brand-gold/30 bg-brand-gray-dark text-white focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-200"
                    placeholder="Tell us about your experience with our services..."
                    required
                  ></textarea>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-gold mb-2">
                      Rating
                    </label>
                    <div className="flex items-center gap-2">
                      <select
                        name="rating"
                        value={reviewData.rating}
                        onChange={handleReviewChange}
                        className="px-4 py-2 rounded-lg border border-brand-gold/30 bg-brand-gray-dark text-white focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-200"
                      >
                        {[5, 4, 3, 2, 1].map((num) => (
                          <option key={num} value={num}>
                            {num} Star{num !== 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                      <div className="flex gap-1">
                        {[...Array(reviewData.rating)].map((_, i) => (
                          <FaStar key={i} className="h-5 w-5 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-gold mb-2">
                      Your Photo (Optional)
                    </label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleReviewChange}
                      accept="image/*"
                      className="w-full px-4 py-2 rounded-lg border border-brand-gold/30 bg-brand-gray-dark text-white focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-gold file:text-brand-black hover:file:bg-brand-gold-light"
                    />
                  </div>
                </div>

                <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-lg p-4">
                  <p className="text-sm text-brand-gold-light">
                    <strong>Note:</strong> Your review is anonymous and will be
                    submitted for approval before appearing on our website.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={reviewLoading}
                  className="w-full bg-gradient-to-r from-brand-gold to-brand-yellow text-brand-black px-8 py-3 rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {reviewLoading ? "Submitting..." : "Submit Review"}
                  <FaPaperPlane className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                {reviewSuccess && (
                  <p className="text-green-400 text-center font-semibold">
                    ✅ Review submitted successfully! Thank you for your
                    feedback.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
