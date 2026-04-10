import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/authState";
import { indexSlice } from "../redux/indexSlice";
import heroBg from "../assets/hero.png";

const useLoginMutation = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({ url: "/auth/adminlogin", method: "POST", body }),
    }),
  }),
}).endpoints.login.useMutation;

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await login(form).unwrap();
      console.log("Admin login response:", response);
      dispatch(setUser({ email: form.email, role: "admin" }));
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Admin login error:", err);
      setError(
        err?.data?.message || err?.error || err?.message || "Login failed",
      );
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundColor: "#000000",
      }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-brand-gold/5 pointer-events-none" />

      {/* Header - same as home page */}
      <header className="absolute top-0 left-0 right-0 bg-brand-black/80 z-50 border-b border-brand-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center space-x-2">
          <span className="text-xl font-bold text-brand-gold font-serif">
            B Next Events
          </span>
          <span className="text-brand-gold/40 text-sm ml-2">— Admin Panel</span>
        </div>
      </header>

      {/* Login form - centered */}
      <div className="relative z-10 w-full px-4 sm:px-8">
        <div
          className="w-full max-w-md mx-auto bg-black border-2 border-brand-gold/40 rounded-2xl p-8 shadow-2xl"
          style={{ boxShadow: "0 0 30px rgba(212, 175, 55, 0.15)" }}
        >
          <div className="mb-8">
            <span className="inline-flex items-center text-brand-gold text-xs sm:text-sm font-medium">
              Admin Login
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-brand-gold leading-tight font-serif mt-2">
              Welcome <span className="text-brand-yellow">Back</span>
            </h1>
            <p className="text-brand-gold-light text-sm sm:text-base mt-3">
              Sign in to manage B Next Events
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
            <div>
              <label className="block text-sm font-medium text-brand-gold mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-brand-black border border-brand-gold/50 rounded-lg px-4 py-3 text-brand-gold-light placeholder-brand-gold/50 focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 transition backdrop-blur-sm"
                placeholder="Enter email here"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-gold mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-brand-black border border-brand-gold/50 rounded-lg px-4 py-3 text-brand-gold-light placeholder-brand-gold/50 focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 transition backdrop-blur-sm"
                placeholder="Enter password here"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-brand-orange to-brand-yellow text-brand-black px-8 py-3.5 rounded-lg hover:shadow-lg hover:shadow-brand-orange/50 transition-all duration-300 font-semibold disabled:opacity-60 mt-2"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
