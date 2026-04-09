import { useGetBookingsQuery, useGetTestimonialsQuery } from "../redux/indexSlice";

const statusLabel = (s) => ({ pending: "Pending", approved: "Approved", rejected: "Rejected" }[s] || s);

const Dashboard = () => {
  const { data: bookingsData, isLoading: bookingsLoading } = useGetBookingsQuery();
  const { data: testimonialsData, isLoading: testimonialsLoading } = useGetTestimonialsQuery();

  const bookings = bookingsData?.data || [];
  const testimonials = testimonialsData || [];

  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const approvedBookings = bookings.filter((b) => b.status === "approved");
  const rejectedBookings = bookings.filter((b) => b.status === "rejected");

  const stats = [
    { title: "Total Bookings", value: bookings.length },
    { title: "Pending", value: pendingBookings.length },
    { title: "Approved", value: approvedBookings.length },
    { title: "Rejected", value: rejectedBookings.length },
  ];

  return (
    <div className="p-6 bg-brand-black min-h-screen">
      <h1 className="text-3xl font-bold font-serif text-brand-gold mb-1">Dashboard</h1>
      <p className="text-white font-bold mb-8">Welcome to B Next Events Admin Panel</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((s) => (
          <div key={s.title} className="bg-black border border-brand-gold/30 rounded-xl p-6">
            <p className="text-sm text-brand-gold font-bold">{s.title}</p>
            <p className="text-4xl font-bold text-white mt-2">{s.value || 0}</p>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="border border-brand-gold/20 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-bold text-brand-gold mb-4">Recent Bookings</h2>
        {bookingsLoading ? (
          <p className="text-white font-bold">Loading...</p>
        ) : bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-gold/20">
                  {["Name", "Service", "Email", "Status"].map((h) => (
                    <th key={h} className="px-4 py-2 text-left text-brand-gold font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map((booking) => (
                  <tr key={booking.id} className="border-b border-white/5">
                    <td className="px-4 py-3 text-white font-bold">{booking.full_name}</td>
                    <td className="px-4 py-3 text-white font-bold">{booking.service_required}</td>
                    <td className="px-4 py-3 text-white font-bold">{booking.email}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-bold border border-brand-gold/40 text-brand-gold">
                        {statusLabel(booking.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-white font-bold">No bookings yet</p>
        )}
      </div>

      {/* Recent Reviews */}
      <div className="border border-brand-gold/20 rounded-xl p-6">
        <h2 className="text-lg font-bold text-brand-gold mb-4">Recent Reviews</h2>
        {testimonialsLoading ? (
          <p className="text-white font-bold">Loading...</p>
        ) : testimonials.length > 0 ? (
          <div className="space-y-3">
            {testimonials.slice(0, 5).map((review) => (
              <div key={review.id} className="border-b border-white/5 pb-3">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-white">{review.name}</h3>
                  <span className="text-xs font-bold border border-brand-gold/40 text-brand-gold px-2 py-0.5 rounded-full">{statusLabel(review.status)}</span>
                </div>
                <p className="text-brand-gold text-sm font-semibold">{review.designation}</p>
                <p className="text-white font-bold mt-1 line-clamp-2 text-sm">{review.feedback}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white font-bold">No reviews yet</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
