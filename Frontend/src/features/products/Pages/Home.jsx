import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useProduct } from '../hook/useProduct';

const Home = () => {
    const { allProducts } = useSelector((state) => state.product);
    const user = useSelector((state) => state.auth.user);
    const { handleGetAllProducts } = useProduct();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                await handleGetAllProducts();
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const formatPrice = (amount, currency) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: currency || 'INR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="h-screen overflow-y-auto bg-[#fbf9f6] text-[#1b1c1a] font-['Inter',sans-serif] selection:bg-neutral-900 selection:text-white pb-20 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {/* Minimalist Top Navigation / Header area */}
            <div className="w-full bg-[#fbf9f6] border-b border-[#E8E2D9] sticky top-0 z-30 bg-opacity-90 backdrop-blur-md">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 py-4 lg:py-5 flex justify-between items-center">
                    {/* Left corner: Logo */}
                    <div>
                        <Link to="/">
                            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tighter font-['Manrope',sans-serif] hover:opacity-80 transition-opacity">SNITCH</h1>
                        </Link>
                    </div>

                    {/* Right corner: User Profile or Login */}
                    <div>
                        {user ? (
                            <div className="flex items-center gap-4">
                                {user.role === 'seller' && (
                                    <Link to="/seller/dashboard" className="text-sm font-semibold text-[#7A6E63] hover:text-[#1b1c1a] transition-colors hidden sm:block">
                                        Dashboard
                                    </Link>
                                )}
                                <div className="w-10 h-10 rounded-full bg-[#1b1c1a] text-white flex items-center justify-center font-bold text-lg cursor-pointer hover:opacity-80 transition-opacity">
                                    {user.fullname ? user.fullname.charAt(0).toUpperCase() : 'U'}
                                </div>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="inline-flex items-center justify-center py-2.5 px-6 border border-[#1b1c1a] rounded-xl text-sm font-semibold text-[#1b1c1a] hover:bg-[#1b1c1a] hover:text-white transition-all duration-300 font-['Manrope',sans-serif] tracking-wide"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 pt-8 md:pb-5 pt-7">
                <div className="flex flex-col mb-7 md:mb-10">
                    <h2 className="text-3xl md:text-5xl font-light font-['Manrope',sans-serif] tracking-tight">Curated Archive</h2>
                    <p className="text-[#7A6E63] mt-2 md:mt-4 max-w-xl text-sm leading-relaxed">
                        Explore our complete collection of curated luxury pieces. Handpicked and designed for modern elegance.
                    </p>
                </div>

                {/* Content Area */}
                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                            <div key={i} className="animate-pulse flex flex-col group">
                                <div className="aspect-[4/5] bg-neutral-200 rounded-xl w-full mb-4"></div>
                                <div className="h-5 bg-neutral-200 w-3/4 mb-2 rounded"></div>
                                <div className="h-3 bg-neutral-200 w-full mb-4 rounded"></div>
                                <div className="h-4 bg-neutral-200 w-1/4 rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : !allProducts || allProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 border border-dashed border-[#E8E2D9] rounded-2xl bg-white/50 text-center px-4">
                        <svg className="w-16 h-16 text-neutral-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        <h3 className="text-xl font-['Manrope',sans-serif] font-medium text-[#1b1c1a]">No products found</h3>
                        <p className="text-[#7A6E63] mt-2 mb-8 text-sm max-w-md">We are currently updating our collection. Please check back later.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-16">
                        {allProducts.map((product) => {
                            const mainImage = product.images?.[0]?.ImageUrl || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop';

                            return (
                                <div 
                                    key={product._id} 
                                    onClick={() => navigate(`/product/${product._id}`)}
                                    className="group flex flex-col cursor-pointer bg-white border border-transparent hover:border-[#E8E2D9] hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] transition-all duration-300"
                                >
                                    {/* Image Wrapper */}
                                    <div className="aspect-[4/5] w-full relative overflow-hidden bg-neutral-100 mb-4 sm:mb-5">
                                        <img
                                            src={mainImage}
                                            alt={product.title}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex flex-col flex-grow px-1">
                                        <div className="flex justify-between items-start mb-1.5">
                                            <h3 className="text-base sm:text-lg font-bold font-['Manrope',sans-serif] text-[#1b1c1a] capitalize truncate pr-4">
                                                {product.title}
                                            </h3>
                                        </div>

                                        <p className="text-xs text-[#7A6E63] line-clamp-2 leading-relaxed mb-4 flex-grow font-medium">
                                            {product.description}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between">
                                            <p className="text-sm sm:text-base font-extrabold tracking-wider font-['Manrope',sans-serif] text-[#1b1c1a]">
                                                {formatPrice(product.price?.amount, product.price?.currency)}
                                            </p>
                                            <div className="w-8 h-8 rounded-full bg-[#fbf9f6] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <svg className="w-4 h-4 text-[#1b1c1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;