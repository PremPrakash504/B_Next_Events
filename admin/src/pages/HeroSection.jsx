import { useState } from "react";
import { useGetHeroSectionsQuery, useAddHeroSectionMutation, useUpdateHeroSectionMutation, useDeleteHeroSectionMutation } from "../redux/indexSlice";
import { toast } from "react-toastify";

const inputCls = "w-full px-4 py-2 bg-black border border-brand-gold/30 rounded-lg text-white font-bold placeholder-white/40 focus:outline-none focus:border-brand-gold transition";
const labelCls = "block text-sm font-bold text-brand-gold mb-1";

const HeroSection = () => {
  const { data: heroData, isLoading } = useGetHeroSectionsQuery();
  const [addHeroSection] = useAddHeroSectionMutation();
  const [updateHeroSection] = useUpdateHeroSectionMutation();
  const [deleteHeroSection] = useDeleteHeroSectionMutation();

  const [showModal, setShowModal] = useState(false);
  const [editingHero, setEditingHero] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({ title: "", subtitle: "", description: "", background_image: null });

  const heroSections = heroData?.data || [];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({ ...formData, [name]: type === "file" ? files?.[0] : value });
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingHero(null);
    setFormData({ title: "", subtitle: "", description: "", background_image: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("subtitle", formData.subtitle);
    formPayload.append("description", formData.description);
    if (formData.background_image) formPayload.append("background_image", formData.background_image);
    try {
      if (editingHero) {
        await updateHeroSection({ id: editingHero.id, formData: formPayload }).unwrap();
        toast.success("Updated!");
      } else {
        await addHeroSection(formPayload).unwrap();
        toast.success("Added!");
      }
      closeModal();
    } catch (err) { toast.error("Failed: " + err?.data?.message); }
  };

  const handleEdit = (hero) => {
    setEditingHero(hero);
    setFormData({ title: hero.title, subtitle: hero.subtitle, description: hero.description, background_image: null });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try { await deleteHeroSection(id).unwrap(); setDeleteId(null); toast.success("Deleted!"); }
    catch (err) { alert("Failed: " + err?.data?.message); }
  };

  return (
    <div className="p-6 bg-brand-black min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-serif text-brand-gold">Hero Section</h1>
          <p className="text-white font-bold mt-1">Manage your website's hero section</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-brand-gold text-black px-5 py-2 rounded-full font-bold hover:opacity-80 transition">
          Add Hero Section
        </button>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <p className="text-white font-bold">Loading...</p>
        ) : heroSections.length > 0 ? (
          heroSections.map((hero) => (
            <div key={hero.id} className="border border-brand-gold/20 rounded-xl p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-brand-gold mb-1">{hero.title}</h3>
                  <p className="text-sm text-brand-gold/70 font-semibold mb-2">{hero.subtitle}</p>
                  <p className="text-white font-bold mb-3">{hero.description}</p>
                  {hero.background_image && (
                    <img src={`http://localhost:5000/uploads/herosection/${hero.background_image}`} alt="Hero" className="w-32 h-20 object-cover rounded-lg border border-brand-gold/20" />
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button onClick={() => handleEdit(hero)} className="bg-brand-gold text-black px-4 py-1.5 rounded-full text-sm font-bold hover:opacity-80 transition">Edit</button>
                  <button onClick={() => setDeleteId(hero.id)} className="border border-brand-gold/30 text-white px-4 py-1.5 rounded-full text-sm font-bold hover:bg-white/5 transition">Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="border border-brand-gold/20 rounded-xl p-8 text-center text-white font-bold">No hero sections found. Add your first!</div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-black border border-brand-gold/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-brand-gold">{editingHero ? "Edit Hero Section" : "Add Hero Section"}</h3>
                <button onClick={closeModal} className="text-white hover:text-brand-gold text-xl font-bold">X</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div><label className={labelCls}>Title</label><input type="text" name="title" value={formData.title} onChange={handleChange} className={inputCls} required /></div>
                <div><label className={labelCls}>Subtitle</label><input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} className={inputCls} required /></div>
                <div><label className={labelCls}>Description</label><textarea name="description" value={formData.description} onChange={handleChange} rows={4} className={inputCls} required /></div>
                <div><label className={labelCls}>Background Image (Optional)</label><input type="file" name="background_image" onChange={handleChange} accept="image/*" className="w-full text-white text-sm font-bold" /></div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="bg-brand-gold text-black px-6 py-2 rounded-full font-bold hover:opacity-80 transition">{editingHero ? "Update" : "Add"}</button>
                  <button type="button" onClick={closeModal} className="border border-brand-gold/30 text-white px-6 py-2 rounded-full font-bold hover:bg-white/5 transition">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-black border border-brand-gold/30 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-brand-gold mb-3">Delete Hero Section?</h3>
            <p className="text-white font-bold mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-brand-gold text-black px-4 py-2 rounded-full font-bold hover:opacity-80 transition">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-brand-gold/30 text-white px-4 py-2 rounded-full font-bold hover:bg-white/5 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
