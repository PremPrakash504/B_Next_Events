import { useState } from "react";
import { useGetAllTestimonialsForAdminQuery, useUpdateReviewStatusMutation, useDeleteReviewMutation } from "../redux/indexSlice";
import { toast } from "react-toastify";

const statusLabel = (s) => ({ pending: "Pending", approved: "Approved", rejected: "Rejected" }[s] || s);

const Testimonials = () => {
  const { data: testimonialsData, isLoading } = useGetAllTestimonialsForAdminQuery();
  const [updateReviewStatus] = useUpdateReviewStatusMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const [filter, setFilter] = useState("all");
  const [deleteId, setDeleteId] = useState(null);

  const reviews = testimonialsData || [];
  const filteredReviews = filter === "all" ? reviews : reviews.filter((r) => r.status === filter);

  const handleApprove = async (id) => {
    try { await updateReviewStatus({ id, status: "approved" }).unwrap(); toast.success("Approved!"); }
    catch (err) { toast.error("Failed: " + err?.data?.message); }
  };

  const handleReject = async (id) => {
    try { await updateReviewStatus({ id, status: "rejected" }).unwrap(); toast.error("Rejected!"); }
    catch (err) { toast.error("Failed: " + err?.data?.message); }
  };

  const handleDelete = async (id) => {
    try { await deleteReview(id).unwrap(); setDeleteId(null); toast.success("Deleted!"); }
    catch (err) { toast.error("Failed: " + err?.data?.message); }
  };

  return (
    <div className="p-6 bg-brand-black min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-serif text-brand-gold">Client Testimonials</h1>
          <p className="text-white font-bold mt-1">Moderate and manage client reviews</p>
        </div>
        
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2">
        {["pending", "approved", "rejected", "all"].map((type) => (
          <button key={type} onClick={() => setFilter(type)} className={`px-4 py-2 rounded-full font-bold transition text-sm border ${filter === type ? "bg-brand-gold text-black border-brand-gold" : "border-brand-gold/30 text-white hover:bg-white/5"}`}>
            {type === "pending" && `Pending (${reviews.filter((r) => r.status === "pending").length})`}
            {type === "approved" && `Approved (${reviews.filter((r) => r.status === "approved").length})`}
            {type === "rejected" && `Rejected (${reviews.filter((r) => r.status === "rejected").length})`}
            {type === "all" && `All (${reviews.length})`}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <p className="text-white font-bold">Loading...</p>
        ) : filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div key={review.id} className="border border-brand-gold/20 rounded-xl p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-brand-gold">{review.name}</h3>
                    <span className="px-3 py-0.5 rounded-full text-xs font-bold border border-brand-gold/40 text-brand-gold">{statusLabel(review.status)}</span>
                  </div>
                  <p className="text-sm text-brand-gold/70 font-semibold mb-1">{review.designation}</p>
                  <p className="text-white font-bold">{review.feedback}</p>
                </div>
                {review.image && (
                  <img src={`http://localhost:5000${review.image}`} alt={review.name} className="w-16 h-16 rounded-full object-cover ml-4 border-2 border-brand-gold/30" />
                )}
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                {review.status === "pending" && (
                  <>
                    <button onClick={() => handleApprove(review.id)} className="bg-brand-gold text-black px-4 py-1.5 rounded-full text-sm font-bold hover:opacity-80 transition">Approve</button>
                    <button onClick={() => handleReject(review.id)} className="border border-brand-gold/30 text-white px-4 py-1.5 rounded-full text-sm font-bold hover:bg-white/5 transition">Reject</button>
                  </>
                )}
                <button onClick={() => setDeleteId(review.id)} className="border border-brand-gold/30 text-white px-4 py-1.5 rounded-full text-sm font-bold hover:bg-white/5 transition ml-auto">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <div className="border border-brand-gold/20 rounded-xl p-8 text-center text-white font-bold">No {filter !== "all" ? filter : ""} reviews found</div>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-black border border-brand-gold/30 rounded-2xl p-8 max-w-sm w-full">
            <h2 className="text-xl font-bold text-brand-gold mb-3">Delete Review?</h2>
            <p className="text-white font-bold mb-6">This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteId(null)} className="border border-brand-gold/30 text-white px-4 py-2 rounded-full font-bold hover:bg-white/5 transition">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="bg-brand-gold text-black px-4 py-2 rounded-full font-bold hover:opacity-80 transition">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;
