import { useState } from "react";
import { useGetBookingsQuery, useUpdateBookingMutation, useUpdateBookingStatusMutation, useDeleteBookingMutation } from "../redux/indexSlice";

const inputCls = "w-full px-4 py-2 bg-black border border-brand-gold/30 rounded-lg text-white font-bold placeholder-white/50 focus:outline-none focus:border-brand-gold transition";
const labelCls = "block text-sm font-bold text-brand-gold mb-1";
const statusLabel = (s) => ({ pending: "Pending", approved: "Approved", rejected: "Rejected" }[s] || s);

const Bookings = () => {
  const { data: bookingsData, isLoading } = useGetBookingsQuery();
  const [updateBooking] = useUpdateBookingMutation();
  const [updateBookingStatus] = useUpdateBookingStatusMutation();
  const [deleteBooking] = useDeleteBookingMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteId, setDeleteId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [statusDropdown, setStatusDropdown] = useState(null);

  const bookings = bookingsData?.data || [];
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.service_required.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch && (statusFilter === "all" || b.status === statusFilter);
  });

  const handleSave = async () => {
    try {
      await updateBooking({ id: editingId, full_name: editForm.full_name, email: editForm.email, phone: editForm.phone, service_required: editForm.service_required, message: editForm.message }).unwrap();
      setEditingId(null); setEditForm({});
      alert("Booking updated!");
    } catch (err) { alert("Failed: " + err?.data?.message); }
  };

  const handleStatusChange = async (id, status) => {
    try { await updateBookingStatus({ id, status }).unwrap(); setStatusDropdown(null); alert(`Booking ${status}!`); }
    catch (err) { alert("Failed: " + err?.data?.message); }
  };

  const handleDelete = async (id) => {
    try { await deleteBooking(id).unwrap(); setDeleteId(null); alert("Deleted!"); }
    catch (err) { alert("Failed: " + err?.data?.message); }
  };

  return (
    <div className="p-6 bg-brand-black min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-serif text-brand-gold">Bookings</h1>
          <p className="text-white font-bold mt-1">Manage service booking requests</p>
        </div>
        <div className="font-bold text-brand-gold border border-brand-gold/30 px-4 py-2 rounded-full">{bookings.length} Total</div>
      </div>

      {/* Search & Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input type="text" placeholder="Search by name, email, or service..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={inputCls} />
        <div className="flex gap-2">
          {["all", "pending", "approved", "rejected"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-2 rounded-full text-sm font-bold transition border ${statusFilter === s ? "bg-brand-gold text-black border-brand-gold" : "border-brand-gold/30 text-white hover:bg-white/5"}`}>
              {s === "all" ? "All" : statusLabel(s)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="border border-brand-gold/20 rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-white font-bold">Loading bookings...</div>
        ) : filteredBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-brand-gold/20">
                  {["Name", "Email", "Service", "Phone", "Status", "Actions"].map((h) => (
                    <th key={h} className={`px-6 py-3 text-left text-sm font-bold text-brand-gold ${h === "Actions" ? "text-center" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="px-6 py-4 font-bold text-white">{booking.full_name}</td>
                    <td className="px-6 py-4 text-white font-bold">{booking.email}</td>
                    <td className="px-6 py-4 text-white font-bold">{booking.service_required}</td>
                    <td className="px-6 py-4 text-white font-bold">{booking.phone}</td>
                    <td className="px-6 py-4">
                      <div className="relative inline-block">
                        <button onClick={() => setStatusDropdown(statusDropdown === booking.id ? null : booking.id)} className="px-3 py-1 rounded-full text-xs font-bold cursor-pointer border border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10 transition">
                          {statusLabel(booking.status)} v
                        </button>
                        {statusDropdown === booking.id && (
                          <div className="absolute left-0 mt-2 w-36 bg-black border border-brand-gold/30 rounded-xl shadow-lg z-50">
                            {["pending", "approved", "rejected"].map((s) => (
                              <button key={s} onClick={() => handleStatusChange(booking.id, s)} className="w-full text-left px-4 py-2 text-sm text-white font-bold hover:bg-white/5 hover:text-brand-gold transition first:rounded-t-xl last:rounded-b-xl">{statusLabel(s)}</button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => { setEditingId(booking.id); setEditForm(booking); }} className="bg-brand-gold text-black px-3 py-1.5 rounded-full text-xs font-bold mr-2 hover:opacity-80 transition">Edit</button>
                      <button onClick={() => setDeleteId(booking.id)} className="border border-brand-gold/30 text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-white/5 transition">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-white font-bold">No bookings found</div>
        )}
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-black border border-brand-gold/30 rounded-2xl w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-brand-gold/20">
              <h2 className="text-2xl font-bold text-brand-gold">Edit Booking</h2>
            </div>
            <div className="p-6 space-y-4">
              {[["Full Name", "full_name", "text"], ["Email", "email", "email"], ["Phone", "phone", "tel"], ["Service Required", "service_required", "text"]].map(([label, field, type]) => (
                <div key={field}>
                  <label className={labelCls}>{label}</label>
                  <input type={type} value={editForm[field] || ""} onChange={(e) => setEditForm({ ...editForm, [field]: e.target.value })} className={inputCls} />
                </div>
              ))}
              <div>
                <label className={labelCls}>Message</label>
                <textarea value={editForm.message || ""} onChange={(e) => setEditForm({ ...editForm, message: e.target.value })} rows="4" className={inputCls} />
              </div>
            </div>
            <div className="p-6 border-t border-brand-gold/20 flex justify-end gap-3">
              <button onClick={() => { setEditingId(null); setEditForm({}); }} className="border border-brand-gold/30 text-white px-5 py-2 rounded-full font-bold hover:bg-white/5 transition">Cancel</button>
              <button onClick={handleSave} className="bg-brand-gold text-black px-5 py-2 rounded-full font-bold hover:opacity-80 transition">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-black border border-brand-gold/30 rounded-2xl p-8 max-w-sm w-full">
            <h2 className="text-xl font-bold text-brand-gold mb-3">Delete Booking?</h2>
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

export default Bookings;
