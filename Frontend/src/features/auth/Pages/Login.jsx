import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

const Login = () => {
    const navigate = useNavigate();
    // Redux auth
    const { handleLogin } = useAuth();
    const { loading: isLoading, error: authError } = useSelector((state) => state.auth);

    // Form state
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Validation state
    const [errors, setErrors] = useState({});
    
    // UI state
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
           const user = await handleLogin(
                    formData.email,
                    formData.password
                );
                // On success, navigate to home or dashboard
                if(user.role==="seller"){
                    navigate('/seller/dashboard');
                }else{
                    navigate('/');
                }
            } catch (err) {
             // error is set in redux state, so no local action needed
            }
            setFormData({
                email: '',
                password: '',
            });
        }
    };

    return (
        <div className="h-screen w-full bg-[#fbf9f6] flex items-center justify-center p-2 sm:p-4 font-['Inter',sans-serif] text-neutral-900 selection:bg-neutral-900 selection:text-white overflow-hidden">
            <div className="w-full max-w-[1100px] bg-white rounded-2xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col lg:flex-row h-full max-h-[700px]">
                
                {/* Left Side - Branding Section */}
                <div className="hidden lg:flex lg:w-1/2 bg-[#fbf9f6] text-[#1b1c1a] relative flex-col p-10 overflow-hidden border-r border-[#E8E2D9] group">
                    {/* Background Image */}
                    <img 
                        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" 
                        alt="Fashion Model Background" 
                        className="absolute inset-0 w-full h-full object-cover opacity-[0.15] transition-transform duration-1000 group-hover:scale-105 mix-blend-multiply pointer-events-none"
                    />

                    <div className="relative z-10 flex flex-col h-full justify-between">
                        {/* Top: Logo */}
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tighter font-['Manrope',sans-serif]">SNITCH</h1>
                            <div className="h-1 w-8 bg-[#C9A96E] mt-4 rounded-full opacity-80"></div>
                        </div>

                        {/* Bottom: Text Content */}
                        <div className="max-w-sm mb-4">
                            <h2 className="text-3xl font-light leading-tight mb-4 tracking-tight font-['Manrope',sans-serif]">
                                Welcome Back. <br/>
                                <span className="font-semibold text-[#C9A96E]">Log in to your account.</span>
                            </h2>
                            <p className="text-[#7A6E63] text-sm leading-relaxed font-light font-['Inter',sans-serif]">
                                Continue where you left off and discover the latest fashion trends.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form Section */}
                <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center bg-white relative overflow-y-hidden overflow-x-hidden custom-scrollbar">
                    {/* Add a subtle watermark/illustration on the right side background to fill space */}
                    <svg className="absolute -bottom-10 -right-10 w-64 h-60 text-neutral-50 opacity-50 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.1,-46.2C90.4,-33.3,96,-16.6,94.9,-0.6C93.8,15.4,86,30.8,76.5,44.5C67,58.2,55.8,70.2,42.2,77.7C28.6,85.2,14.3,88.2,0.1,88C-14.1,87.8,-28.2,84.4,-41.8,77.2C-55.4,70,-68.5,59,-77.3,45.6C-86.1,32.2,-90.6,16.1,-89.9,0.4C-89.2,-15.3,-83.3,-30.6,-74.2,-43.6C-65.1,-56.6,-52.8,-67.3,-39.3,-74.7C-25.8,-82.1,-12.9,-86.2,1.3,-88.4C15.5,-90.6,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
                    </svg>

                    <div className="max-w-[400px] w-full mx-auto relative z-10">
                        <div className="text-center lg:text-left mb-6">
                            <h2 className="text-4xl font-bold text-[#1b1c1a] tracking-tight font-['Manrope',sans-serif]">Welcome Back</h2>
                            <p className="text-[#7A6E63] mt-1 text-sm font-['Inter',sans-serif]">Please enter your details to sign in.</p>
                        </div>
                        
                        {authError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg flex items-start">
                                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{authError}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                            {/* Email */}
                            <div>
                                <div className="relative group">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder=" "
                                        className={`block w-full px-4 pt-5 pb-1.5 text-sm text-neutral-900 bg-neutral-50 border rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-neutral-900/20 focus:bg-white transition-all peer
                                            ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-neutral-200 focus:border-neutral-900'}`}
                                    />
                                    <label 
                                        htmlFor="email" 
                                        className={`absolute text-sm duration-300 transform -translate-y-1/2 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-3.5 peer-focus:scale-75 peer-focus:-translate-y-1/2 pointer-events-none
                                            ${errors.email ? 'text-red-500' : 'text-neutral-500 peer-focus:text-neutral-900'}`}
                                    >
                                        Email Address
                                    </label>
                                </div>
                                {errors.email && <p className="mt-1 text-xs text-red-500 flex items-center"><span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-1.5"></span>{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <div className="relative group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder=" "
                                        className={`block w-full px-4 pt-5 pb-1.5 pr-10 text-sm text-neutral-900 bg-neutral-50 border rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-neutral-900/20 focus:bg-white transition-all peer
                                            ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-neutral-200 focus:border-neutral-900'}`}
                                    />
                                    <label 
                                        htmlFor="password" 
                                        className={`absolute text-sm duration-300 transform -translate-y-1/2 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-3.5 peer-focus:scale-75 peer-focus:-translate-y-1/2 pointer-events-none
                                            ${errors.password ? 'text-red-500' : 'text-neutral-500 peer-focus:text-neutral-900'}`}
                                    >
                                        Password
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 focus:outline-none transition-colors z-20"
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                        )}
                                    </button>
                                </div>
                                {errors.password && <p className="mt-1 text-xs text-red-500 flex items-center"><span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-1.5"></span>{errors.password}</p>}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-[#1b1c1a] hover:bg-[#2c2d2a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1b1c1a] transition-all duration-200 active:scale-[0.98] disabled:opacity-70 shadow-sm font-['Manrope',sans-serif] tracking-wide"
                                >
                                    {isLoading ? (
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : null}
                                    {isLoading ? "Signing In..." : "Sign In"}
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="relative flex items-center py-1">
                                <div className="flex-grow border-t border-neutral-100"></div>
                                <span className="mx-4 text-[11px] font-medium text-neutral-400 uppercase">Or</span>
                                <div className="flex-grow border-t border-neutral-100"></div>
                            </div>

                            {/* Google Sign In Button */}
                            <div>
                                <a href="/api/auth/google"
                                    className="flex items-center justify-center w-full bg-transparent border border-[#E8E2D9] px-4 py-3 text-sm font-medium text-[#7A6E63] hover:border-[#C9A96E] hover:text-[#1b1c1a] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#C9A96E] focus:ring-offset-2 focus:ring-offset-[#fbf9f6]"
                                    style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.04em' }}
                                >
                                    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
                                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                        <path fill="none" d="M0 0h48v48H0z"></path>
                                    </svg>
                                    <span>Continue with Google</span>
                                </a>
                            </div>
                        </form>

                        <p className="mt-6 text-center text-sm text-neutral-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-semibold text-neutral-900 hover:text-neutral-700 hover:underline underline-offset-4">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;