import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import fashionHero from '../../../assets/images/fashion-hero.png';
import { useAuth } from '../hook/useAuth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister } = useAuth();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullname: '',
    contact: '',
    email: '',
    password: '',
    isSeller: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id === 'seller' ? 'isSeller' : id]: type === 'checkbox' ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister(
        formData.fullname,
        formData.email,
        formData.password,
        formData.contact,
        formData.isSeller
      );
    
      navigate('/');

    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e2e2e2] font-['Inter',_sans-serif] flex items-center justify-center p-4 md:p-10 selection:bg-[#ffd700] selection:text-[#3a3000]">
      {/* Hero Background Texture (Subtle Glows) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#ffd700]/5 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-[#e9c400]/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Main Registration Shell */}
      <main className="relative z-10 w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Branding & Image (Visible on Desktop) */}
        <div className="hidden lg:flex flex-col space-y-8 animate-in fade-in slide-in-from-left duration-1000">
          <header>
            <h1 className="text-6xl font-black tracking-[0.4em] text-[#e2e2e2] mb-4">SNITCH</h1>
            <p className="text-[#d0c6ab] text-lg tracking-[0.2em] uppercase font-medium">The Shadow Curator</p>
          </header>
          
          <div className="relative group overflow-hidden rounded-[40px] border border-[#4d4732]/20 shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
            <img 
              src={fashionHero} 
              alt="SNITCH Fashion" 
              className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-8 left-8">
              <p className="text-[#ffd700] font-black text-xs uppercase tracking-[0.3em]">Spring Summer '24</p>
              <h3 className="text-2xl font-bold text-white mt-2">Inner Circle Exclusive</h3>
            </div>
          </div>
        </div>

        {/* Right Column: Registration Form */}
        <div className="w-full max-w-[500px] mx-auto lg:ml-auto self-center">
          {/* Mobile Header (Hidden on Desktop) */}
          <header className="lg:hidden mb-10 text-center">
            <h1 className="text-4xl font-black tracking-[0.3em] text-[#e2e2e2] mb-2">SNITCH</h1>
            <p className="text-[#d0c6ab] text-xs tracking-[0.15em] uppercase font-medium">Exclusive Curation</p>
          </header>

          {/* Centered Glassmorphic Card */}
          <div className="bg-[#1f1f1f]/60 backdrop-blur-[40px] p-8 md:p-12 rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-[#4d4732]/15">
            <div className="mb-10">
              <h2 className="text-2xl font-bold tracking-tight text-[#e2e2e2] mb-2">Create Account</h2>
              <p className="text-[#d0c6ab] text-sm">Enter your details to access the network.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-6 md:space-y-8">
              {/* Inputs Container */}
              <div className="space-y-5 md:space-y-6">
                {/* Full Name */}
                <div className="relative group">
                  <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-[#ffd700] mb-2 ml-1">Full Name</label>
                  <input
                    id="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full bg-[#1b1b1b] border-b-2 border-[#4d4732]/30 focus:border-[#ffd700] text-[#e2e2e2] py-3 px-1 transition-all duration-300 outline-none placeholder:text-[#d0c6ab]/30 text-sm"
                    placeholder="ALEXANDER VOGUE"
                    type="text"
                    required
                  />
                </div>

                {/* Contact Number */}
                <div className="relative group">
                  <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-[#ffd700] mb-2 ml-1">Contact Number</label>
                  <input
                    id="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full bg-[#1b1b1b] border-b-2 border-[#4d4732]/30 focus:border-[#ffd700] text-[#e2e2e2] py-3 px-1 transition-all duration-300 outline-none placeholder:text-[#d0c6ab]/30 text-sm"
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                    required
                  />
                </div>

                {/* Email */}
                <div className="relative group">
                  <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-[#ffd700] mb-2 ml-1">Email Address</label>
                  <input
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#1b1b1b] border-b-2 border-[#4d4732]/30 focus:border-[#ffd700] text-[#e2e2e2] py-3 px-1 transition-all duration-300 outline-none placeholder:text-[#d0c6ab]/30 text-sm"
                    placeholder="curator@snitch.luxury"
                    type="email"
                    required
                  />
                </div>

                {/* Password */}
                <div className="relative group">
                  <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-[#ffd700] mb-2 ml-1">Secure Password</label>
                  <input
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-[#1b1b1b] border-b-2 border-[#4d4732]/30 focus:border-[#ffd700] text-[#e2e2e2] py-3 px-1 transition-all duration-300 outline-none placeholder:text-[#d0c6ab]/30 text-sm"
                    placeholder="••••••••••••"
                    type="password"
                    required
                  />
                </div>
              </div>

              {/* Checkbox Section */}
              <div className="flex items-center space-x-3 py-2">
                <div className="relative flex items-center">
                  <input
                    id="seller"
                    checked={formData.isSeller}
                    onChange={handleChange}
                    className="peer h-5 w-5 appearance-none rounded border-2 border-[#4d4732]/40 checked:bg-[#ffd700] checked:border-[#ffd700] transition-all cursor-pointer"
                    type="checkbox"
                  />
                  <svg
                    className="absolute w-3 h-3 text-[#3a3000] opacity-0 peer-checked:opacity-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <label className="text-sm text-[#d0c6ab] cursor-pointer select-none" htmlFor="seller">
                  Register as Seller
                </label>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <button
                  disabled={loading}
                  className={`w-full py-5 bg-[#ffd700] text-[#3a3000] font-black uppercase tracking-[0.2em] text-xs rounded-full shadow-[0_10px_30px_rgba(255,215,0,0.2)] hover:shadow-[0_15px_40px_rgba(255,215,0,0.3)] active:scale-[0.98] transition-all duration-300 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  type="submit"
                >
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
              </div>
            </form>

            {/* Footer Links */}
            <footer className="mt-10 text-center">
              <p className="text-[#d0c6ab] text-[11px] tracking-wide">
                Already part of the network?
                <a className="text-[#ffd700] font-bold hover:underline underline-offset-4 ml-1" href="#">
                  LOGIN
                </a>
              </p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;