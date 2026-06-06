import React, { useState } from 'react';
import { useProduct } from '../hook/useProduct';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const { handleCreateProduct } = useProduct();
     const navigate = useNavigate()
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priceAmount: '',
        priceCurrency: 'INR'
    });
    
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleImageChange = (e) => {
        processFiles(Array.from(e.target.files));
    };

    const processFiles = (files) => {
        if (images.length + files.length > 7) {
            setError('You can only upload a maximum of 7 images.');
            return;
        }
        
        setError(null);
        const newImages = [...images, ...files].slice(0, 7);
        setImages(newImages);
        
        // Create preview URLs
        const newPreviews = newImages.map(file => URL.createObjectURL(file));
        setImagePreviews(newPreviews);
    };

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        setImagePreviews(newImages.map(file => URL.createObjectURL(file)));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (images.length === 0) {
            setError('Please upload at least 1 image.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccessMessage("");
        
        try {
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('description', formData.description);
            submitData.append('priceAmount', formData.priceAmount);
            submitData.append('priceCurrency', formData.priceCurrency);
            
            images.forEach((image) => {
                submitData.append('images', image);
            });
            
            await handleCreateProduct(submitData);
            setSuccessMessage("Product created successfully!");
            
            // Reset form
            setFormData({
                title: '',
                description: '',
                priceAmount: '',
                priceCurrency: 'INR'
            });
            setImages([]);
            setImagePreviews([]);
            navigate('/seller/dashboard');
            
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to create product');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fbf9f6] py-12 px-4 sm:px-6 lg:px-8 font-['Inter',sans-serif] text-[#1b1c1a]">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold font-['Manrope',sans-serif] tracking-tight">Create Product</h1>
                    <p className="text-[#7A6E63] mt-2">Add a new item to your store's catalog.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8 sm:p-10">
                        
                        {error && (
                            <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-start">
                                <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}

                        {successMessage && (
                            <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-xl text-sm border border-green-100 flex items-start">
                                <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{successMessage}</span>
                            </div>
                        )}

                        <div className="space-y-8">
                            {/* Basic Details */}
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-[#1b1c1a] mb-2 font-['Manrope',sans-serif]">Product Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        required
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Classic White Linen Shirt"
                                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-[#1b1c1a] focus:border-[#1b1c1a] focus:bg-white transition-colors outline-none"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-[#1b1c1a] mb-2 font-['Manrope',sans-serif]">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        required
                                        rows="4"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Describe the material, fit, and style..."
                                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-[#1b1c1a] focus:border-[#1b1c1a] focus:bg-white transition-colors outline-none resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            <hr className="border-neutral-100" />

                            {/* Pricing */}
                            <div>
                                <h3 className="text-lg font-bold font-['Manrope',sans-serif] mb-4">Pricing Details</h3>
                                <div className="flex space-x-4">
                                    <div className="w-1/3">
                                        <label htmlFor="priceCurrency" className="block text-sm font-medium text-[#1b1c1a] mb-2">Currency</label>
                                        <select
                                            id="priceCurrency"
                                            name="priceCurrency"
                                            value={formData.priceCurrency}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-[#1b1c1a] focus:border-[#1b1c1a] focus:bg-white transition-colors outline-none appearance-none"
                                        >
                                            <option value="INR">INR (₹)</option>
                                            <option value="USD">USD ($)</option>
                                            <option value="EUR">EUR (€)</option>
                                            <option value="GBP">GBP (£)</option>
                                        </select>
                                    </div>
                                    <div className="w-2/3">
                                        <label htmlFor="priceAmount" className="block text-sm font-medium text-[#1b1c1a] mb-2">Amount</label>
                                        <input
                                            type="number"
                                            id="priceAmount"
                                            name="priceAmount"
                                            required
                                            min="0"
                                            step="0.01"
                                            value={formData.priceAmount}
                                            onChange={handleInputChange}
                                            placeholder="0.00"
                                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-[#1b1c1a] focus:border-[#1b1c1a] focus:bg-white transition-colors outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr className="border-neutral-100" />

                            {/* Images Upload */}
                            <div>
                                <div className="flex justify-between items-end mb-4">
                                    <h3 className="text-lg font-bold font-['Manrope',sans-serif]">Product Images</h3>
                                    <span className="text-sm text-[#7A6E63]">{images.length}/7 uploaded</span>
                                </div>
                                
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                                    {imagePreviews.map((preview, idx) => (
                                        <div key={idx} className="relative aspect-[4/5] rounded-xl overflow-hidden border border-neutral-200 group">
                                            <img src={preview} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeImage(idx)}
                                                    className="bg-white text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {images.length < 7 && (
                                        <label 
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            className={`relative aspect-[4/5] rounded-xl border-2 border-dashed transition-colors flex flex-col items-center justify-center cursor-pointer group 
                                                ${isDragging ? 'border-[#1b1c1a] bg-neutral-100' : 'border-neutral-300 hover:border-[#1b1c1a] hover:bg-neutral-50'}`}
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-2">
                                                <svg className="w-8 h-8 text-neutral-400 group-hover:text-[#1b1c1a] mb-3 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                                <p className="text-xs text-[#7A6E63] font-medium leading-relaxed">
                                                    Drag & drop<br/>or click to browse
                                                </p>
                                            </div>
                                            <input 
                                                type="file" 
                                                className="hidden" 
                                                accept="image/*" 
                                                multiple 
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    )}
                                </div>
                                <p className="text-xs text-[#7A6E63]">High-resolution images. JPEG, PNG. Max 7 files.</p>
                            </div>

                        </div>

                        {/* Submit Button */}
                        <div className="mt-10 pt-6 border-t border-neutral-100 flex justify-end">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full sm:w-auto px-8 py-3.5 bg-[#1b1c1a] text-white rounded-xl font-semibold font-['Manrope',sans-serif] tracking-wide hover:bg-[#2c2d2a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1b1c1a] transition-all disabled:opacity-70 flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Publishing...
                                    </>
                                ) : (
                                    "Publish Product"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateProduct;