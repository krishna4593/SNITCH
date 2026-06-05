import React, { useEffect, useState } from 'react';
import { useProduct } from '../hook/useProduct';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { handleGetSellerProducts } = useProduct();
    const sellerProducts = useSelector(state => state.product.sellerProducts) || [];
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                await handleGetSellerProducts();
            } catch (error) {
                console.error("Failed to fetch seller products:", error);
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
                    <div>
                        <Link to="/">
                            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tighter font-['Manrope',sans-serif] hover:opacity-80 transition-opacity">SNITCH</h1>
                        </Link>
                        <p className="text-xs uppercase tracking-[0.15em] text-[#7A6E63] mt-1 font-semibold">Seller Dashboard</p>
                    </div>
                    <Link
                        to="/seller/create-product"
                        className="hidden sm:inline-flex items-center justify-center py-2.5 px-6 border border-[#1b1c1a] rounded-xl text-sm font-semibold text-[#1b1c1a] hover:bg-[#1b1c1a] hover:text-white transition-all duration-300 font-['Manrope',sans-serif] tracking-wide"
                    >
                        + Add New Product
                    </Link>
                </div>
            </div>

            <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 pt-8 md:pb-5 pt-7">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-7 md:mb-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-light font-['Manrope',sans-serif] tracking-tight">Your Collection</h2>
                        <p className="text-[#7A6E63] mt-2 md:mt-3 max-w-xl text-sm leading-relaxed">
                            Manage your listed products. This space acts as a quiet gallery for your high-end fashion items, prioritizing the luxury of space and intentional design.
                        </p>
                    </div>

                    <div className="mt-6 sm:mt-0">
                        <Link
                            to="/seller/create-product"
                            className="sm:hidden inline-flex items-center justify-center py-2.5 px-6 bg-[#1b1c1a] rounded-xl text-sm font-semibold text-white transition-all duration-300 font-['Manrope',sans-serif] tracking-wide"
                        >
                            + Add New Product
                        </Link>
                    </div>
                </div>

                {/* Content Area */}
                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="animate-pulse flex flex-col group">
                                <div className="aspect-[4/5] bg-neutral-200 rounded-xl w-full mb-4"></div>
                                <div className="h-5 bg-neutral-200 w-3/4 mb-2 rounded"></div>
                                <div className="h-3 bg-neutral-200 w-full mb-4 rounded"></div>
                                <div className="h-4 bg-neutral-200 w-1/4 rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : sellerProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 border border-dashed border-[#E8E2D9] rounded-2xl bg-white/50 text-center px-4">
                        <svg className="w-16 h-16 text-neutral-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        <h3 className="text-xl font-['Manrope',sans-serif] font-medium text-[#1b1c1a]">Your gallery is empty</h3>
                        <p className="text-[#7A6E63] mt-2 mb-8 text-sm max-w-md">You haven't listed any products yet. Start adding your premium items to display them here.</p>
                        <Link
                            to="/seller/create-product"
                            className="inline-flex items-center justify-center py-3 px-8 bg-[#1b1c1a] text-white rounded-xl text-sm font-semibold hover:bg-[#2c2d2a] transition-all duration-300 font-['Manrope',sans-serif] tracking-wide"
                        >
                            List New Item
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-16">
                        {sellerProducts.map((product) => {
                            const mainImage = product.images?.[0]?.ImageUrl || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop';

                            return (
                                <div key={product._id} className="group flex flex-col cursor-pointer bg-white    border border-transparent hover:border-[#E8E2D9] hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] transition-all duration-300">
                                    {/* Image Wrapper */}
                                    <div className="aspect-[4/5] w-full relative overflow-hidden bg-neutral-100  mb-4 sm:mb-5">
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
                                                <svg className="w-4 h-4 text-[#1b1c1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
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
}

export default Dashboard;