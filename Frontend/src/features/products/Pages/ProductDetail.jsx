import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useProduct } from '../hook/useProduct';

const ProductDetail = () => {
    const { productId } = useParams();
    const { handleGetProductDetails } = useProduct();
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeImage, setActiveImage] = useState('');

    const handlePrevImage = (e) => {
        e.stopPropagation();
        if (!product?.images?.length) return;
        const currentIndex = product.images.findIndex(img => img.ImageUrl === activeImage);
        const prevIndex = currentIndex <= 0 ? product.images.length - 1 : currentIndex - 1;
        setActiveImage(product.images[prevIndex].ImageUrl);
    };

    const handleNextImage = (e) => {
        e.stopPropagation();
        if (!product?.images?.length) return;
        const currentIndex = product.images.findIndex(img => img.ImageUrl === activeImage);
        const nextIndex = currentIndex === product.images.length - 1 ? 0 : currentIndex + 1;
        setActiveImage(product.images[nextIndex].ImageUrl);
    };

    useEffect(() => {
        async function fetchProduct() {
            setIsLoading(true);
            try {
                const data = await handleGetProductDetails(productId);
                setProduct(data);
                if (data?.images?.length > 0) {
                    setActiveImage(data.images[0].ImageUrl);
                }
            } catch (error) {
                console.error("Failed to fetch product details:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProduct();
    }, [productId]);

    const formatPrice = (amount, currency) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: currency || 'INR',
            minimumFractionDigits: 0,
        }).format(amount || 0);
    };

    return (
        <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] font-['Inter',sans-serif] selection:bg-neutral-900 selection:text-white pb-4">
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

            <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 pt-4 md:pt-6">
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center text-sm font-medium text-[#7A6E63] hover:text-[#1b1c1a] transition-colors mb-4 sm:mb-6"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Collection
                </button>

                {isLoading ? (
                    <div className="flex flex-col lg:flex-row gap-12 animate-pulse">
                        <div className="w-full lg:w-1/2 aspect-[3/4] bg-neutral-200 rounded-2xl"></div>
                        <div className="w-full lg:w-1/2 pt-4">
                            <div className="h-10 bg-neutral-200 w-3/4 mb-6 rounded"></div>
                            <div className="h-6 bg-neutral-200 w-1/4 mb-10 rounded"></div>
                            <div className="h-4 bg-neutral-200 w-full mb-3 rounded"></div>
                            <div className="h-4 bg-neutral-200 w-full mb-3 rounded"></div>
                            <div className="h-4 bg-neutral-200 w-2/3 mb-12 rounded"></div>
                            <div className="flex gap-4">
                                <div className="h-14 bg-neutral-200 w-1/2 rounded-xl"></div>
                                <div className="h-14 bg-neutral-200 w-1/2 rounded-xl"></div>
                            </div>
                        </div>
                    </div>
                ) : !product ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <svg className="w-16 h-16 text-neutral-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <h3 className="text-xl font-['Manrope',sans-serif] font-medium text-[#1b1c1a]">Product not found</h3>
                        <p className="text-[#7A6E63] mt-2 mb-8 text-sm">The item you are looking for does not exist or has been removed.</p>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
                        {/* Image Gallery */}
                        <div className="w-full lg:w-1/2 flex flex-col-reverse sm:flex-row gap-4">
                            {/* Thumbnails (if multiple images) */}
                            {product.images && product.images.length > 1 && (
                                <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-24 shrink-0 [scrollbar-width:none]">
                                    {product.images.map((img, idx) => (
                                        <button 
                                            key={img._id || idx}
                                            onClick={() => setActiveImage(img.ImageUrl)}
                                            className={`aspect-[3/4] w-20 sm:w-full overflow-hidden rounded-lg border-2 transition-all duration-300 shrink-0 ${activeImage === img.ImageUrl ? 'border-[#1b1c1a]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                        >
                                            <img src={img.ImageUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                            
                            {/* Main Image */}
                            <div className="w-full h-[500px] lg:h-[650px] max-h-[70vh] bg-neutral-100 rounded-2xl overflow-hidden relative group">
                                <img 
                                    src={activeImage || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop'} 
                                    alt={product.title} 
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                {/* Scroll Buttons */}
                                {product.images && product.images.length > 1 && (
                                    <>
                                        <button 
                                            onClick={handlePrevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white text-[#1b1c1a]"
                                        >
                                            <svg className="w-5 h-5 pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                                        </button>
                                        <button 
                                            onClick={handleNextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white text-[#1b1c1a]"
                                        >
                                            <svg className="w-5 h-5 pl-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="w-full lg:w-1/2 flex flex-col pt-0 lg:pt-2">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Manrope',sans-serif] text-[#1b1c1a] capitalize tracking-tight leading-tight">
                                {product.title}
                            </h1>
                            
                            <p className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Manrope',sans-serif] text-[#1b1c1a] mt-4 mb-8">
                                {formatPrice(product.price?.amount, product.price?.currency)}
                            </p>

                            <div className="w-full h-[1px] bg-[#E8E2D9] mb-6"></div>

                            <div className="mb-6">
                                <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#1b1c1a] mb-2">Description</h3>
                                <p className="text-[#7A6E63] text-base leading-relaxed whitespace-pre-wrap font-medium">
                                    {product.description}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-auto flex flex-col sm:flex-row gap-4 pt-4">
                                <button className="flex-1 py-4 px-8 border border-[#1b1c1a] rounded-xl text-base font-bold text-[#1b1c1a] hover:bg-neutral-100 transition-all duration-300 font-['Manrope',sans-serif] tracking-wide flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                    Add to Cart
                                </button>
                                <button className="flex-1 py-4 px-8 bg-[#1b1c1a] rounded-xl text-base font-bold text-white hover:bg-[#2c2d2a] hover:shadow-xl hover:shadow-black/10 transition-all duration-300 font-['Manrope',sans-serif] tracking-wide">
                                    Buy Now
                                </button>
                            </div>

                            {/* Trust badges / Extra info */}
                            <div className="mt-6 grid grid-cols-2 gap-6 pt-6 border-t border-[#E8E2D9]">
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-[#7A6E63] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <p className="text-xs text-[#7A6E63] font-medium leading-relaxed">Guaranteed Authenticity</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-[#7A6E63] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <p className="text-xs text-[#7A6E63] font-medium leading-relaxed">Dispatch within 24-48 hrs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default ProductDetail;