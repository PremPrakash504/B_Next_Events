import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../redux/authState";

const inputCls = "w-full px-4 py-2 bg-black border border-brand-gold/30 rounded-lg text-white font-bold placeholder-white/40 focus:outline-none focus:border-brand-gold transition";
const labelCls = "block text-sm font-bold text-brand-gold mb-1";

const Settings = () => {
  const { email } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [name, setName] = useState("Admin User");
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

  const initial = name.charAt(0).toUpperCase();

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    setShowPasswordForm(false);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    alert("Password changed successfully!");
  };

  return (
    <div className="p-6 bg-brand-black min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-serif text-brand-gold">My Profile</h1>
          <p className="text-white font-bold mt-1">Manage your profile and change password</p>
        </div>

        <div className="space-y-6">
          {/* Profile Card */}
          <div className="border border-brand-gold/20 rounded-xl p-8">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-full bg-brand-gold flex items-center justify-center flex-shrink-0">
                <span className="text-3xl font-bold text-black">{initial}</span>
              </div>
              <div>
                {!editMode ? (
                  <>
                    <h2 className="text-2xl font-bold text-white">{name}</h2>
                    <p className="text-brand-gold text-sm font-bold">Admin User</p>
                    <p className="text-white font-bold text-sm mt-1"><span className="text-brand-gold">Email: </span>{email || "admin@bnextevents.com"}</p>
                  </>
                ) : (
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="px-3 py-2 bg-black border border-brand-gold/30 rounded-lg text-white font-bold text-lg focus:outline-none focus:border-brand-gold" />
                )}
              </div>
            </div>
            <div className="flex gap-3">
              {!editMode ? (
                <button onClick={() => setEditMode(true)} className="bg-brand-gold text-black px-5 py-2 rounded-full font-bold hover:opacity-80 transition">Edit Profile</button>
              ) : (
                <>
                  <button onClick={() => { setEditMode(false); alert("Profile updated!"); }} className="bg-brand-gold text-black px-5 py-2 rounded-full font-bold hover:opacity-80 transition">Save</button>
                  <button onClick={() => setEditMode(false)} className="border border-brand-gold/30 text-white px-5 py-2 rounded-full font-bold hover:bg-white/5 transition">Cancel</button>
                </>
              )}
            </div>
          </div>

          {/* Security */}
          <div className="border border-brand-gold/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-brand-gold mb-6">Security</h3>
            {!showPasswordForm ? (
              <button onClick={() => setShowPasswordForm(true)} className="bg-brand-gold text-black px-5 py-2 rounded-full font-bold hover:opacity-80 transition">Change Password</button>
            ) : (
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {[["Current Password", "currentPassword"], ["New Password", "newPassword"], ["Confirm Password", "confirmPassword"]].map(([label, field]) => (
                  <div key={field}>
                    <label className={labelCls}>{label}</label>
                    <input type="password" name={field} value={passwordData[field]} onChange={handlePasswordChange} className={inputCls} />
                  </div>
                ))}
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={handleChangePassword} className="bg-brand-gold text-black px-5 py-2 rounded-full font-bold hover:opacity-80 transition">Update Password</button>
                  <button type="button" onClick={() => setShowPasswordForm(false)} className="border border-brand-gold/30 text-white px-5 py-2 rounded-full font-bold hover:bg-white/5 transition">Cancel</button>
                </div>
              </form>
            )}
          </div>

          {/* Logout */}
          <div className="border border-brand-gold/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-brand-gold mb-3">Logout</h3>
            <p className="text-white font-bold mb-6">Click below to logout from your account.</p>
            <button
              onClick={() => { if (confirm("Are you sure you want to logout?")) { dispatch(clearUser()); navigate("/"); } }}
              className="border border-brand-gold/30 text-white px-8 py-2.5 rounded-full font-bold hover:bg-white/5 hover:text-brand-gold transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
