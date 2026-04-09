import { useState } from "react";
import { useGetPortfoliosQuery, useAddPortfolioMutation, useUpdatePortfolioMutation, useDeletePortfolioMutation, useGetCategoriesQuery } from "../redux/indexSlice";

const inputCls = "w-full px-4 py-2 bg-black border border-brand-gold/30 rounded-lg text-white font-bold placeholder-white/40 focus:outline-none focus:border-brand-gold transition";
const labelCls = "block text-sm font-bold text-brand-gold mb-1";

const Portfolio = () => {
  const { data: portfolioData, isLoading } = useGetPortfoliosQuery();
  const { data: categoriesData } = useGetCategoriesQuery();
  const [addPortfolio] = useAddPortfolioMutation();
  const [updatePortfolio] = useUpdatePortfolioMutation();
  const [deletePortfolio] = useDeletePortfolioMutation();

  const [showModal, setShowModal] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  const [formData, setFormData] = useState({ title: "", category_id: "", description: "", details: "", image: [] });

  const portfolios = portfolioData?.data || [];
  const categories = categoriesData?.data || [];

  const resetForm = () => {
    setFormData({ title: "", category_id: "", description: "", details: "", image: [] });
    setEditingPortfolio(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("category_id", formData.category_id);
    formPayload.append("description", formData.description);
    formPayload.append("details", formData.details);
    formData.image.forEach((file) => formPayload.append("image", file));
    try {
      if (editingPortfolio) {
        await updatePortfolio({ id: editingPortfolio.id, formData: formPayload }).unwrap();
        alert("Portfolio updated!");
      } else {
        await addPortfolio(formPayload).unwrap();
        alert("Portfolio added!");
      }
      setShowModal(false);
      resetForm();
    } catch (error) { alert("Error: " + error.message); }
  };

  const handleEdit = (portfolio) => {
    setEditingPortfolio(portfolio);
    setFormData({ title: portfolio.title, category_id: portfolio.category_id, description: portfolio.description, details: portfolio.details || "", image: [] });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this portfolio item?")) {
      try { await deletePortfolio(id).unwrap(); alert("Deleted!"); }
      catch (error) { alert("Error: " + error.message); }
    }
  };

  return (
    <div className="p-6 bg-brand-black min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold font-serif text-brand-gold">Portfolio Management</h1>
          <p className="text-white font-bold mt-1">Manage your portfolio items</p>
        </div>
        <button onClick={() => { resetForm(); setShowModal(true); }} className="bg-brand-gold text-black px-5 py-2 rounded-full font-bold hover:opacity-80 transition">
          Add Item
        </button>
      </div>

      {isLoading ? (
        <p className="text-white font-bold">Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio) => (
            <div key={portfolio.id} className="border border-brand-gold/20 rounded-xl overflow-hidden">
              {portfolio.image && (
                <img src={`${import.meta.env.VITE_DEV_BACKEND_URL}/${portfolio.image.split(",")[0]}`} alt={portfolio.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold text-brand-gold mb-1">{portfolio.title}</h3>
                <p className="text-sm text-brand-gold/70 font-semibold mb-2">{portfolio.category_name}</p>
                <p className="text-sm text-white font-bold mb-4 line-clamp-3">{portfolio.description}</p>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(portfolio)} className="bg-brand-gold text-black px-4 py-1.5 rounded-full text-sm font-bold hover:opacity-80 transition">Edit</button>
                  <button onClick={() => handleDelete(portfolio.id)} className="border border-brand-gold/30 text-white px-4 py-1.5 rounded-full text-sm font-bold hover:bg-white/5 transition">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-black border border-brand-gold/30 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-brand-gold mb-4">{editingPortfolio ? "Edit Portfolio Item" : "Add Portfolio Item"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className={labelCls}>Title</label><input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inputCls} required /></div>
              <div>
                <label className={labelCls}>Category</label>
                <select value={formData.category_id} onChange={(e) => setFormData({ ...formData, category_id: e.target.value })} className={inputCls} required>
                  <option value="">Select Category</option>
                  {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.category_name}</option>)}
                </select>
              </div>
              <div><label className={labelCls}>Description</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className={inputCls} rows="3" required /></div>
              <div><label className={labelCls}>Details</label><textarea value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} className={inputCls} rows="3" /></div>
              <div><label className={labelCls}>Images</label><input type="file" multiple accept="image/*" onChange={(e) => setFormData({ ...formData, image: Array.from(e.target.files) })} className="w-full text-white text-sm font-bold" {...(editingPortfolio ? {} : { required: true })} /></div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="bg-brand-gold text-black px-6 py-2 rounded-full font-bold hover:opacity-80 transition">{editingPortfolio ? "Update" : "Add"}</button>
                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="border border-brand-gold/30 text-white px-6 py-2 rounded-full font-bold hover:bg-white/5 transition">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
