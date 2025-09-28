import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";

// আপনার API বেস URL, যা .env ফাইল থেকে আসে
const API_URL = import.meta.env.VITE_API_URL;

const ServiceDetails = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    const [serviceData, setServiceData] = useState(null); 
    const [reviews, setReviews] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Review Form State
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [name, setName] = useState('');
    
    // --- ডেটা ফেচিং (সার্ভিস ডিটেইলস ও রিভিউ) ---
    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                setError("Service ID is missing.");
                setLoading(false);
                return;
            }
            try {
                // 1. সার্ভিস ডিটেইলস ফেচ
                const serviceResponse = await fetch(`${API_URL}/services/${id}`); 
                if (!serviceResponse.ok) throw new Error(`Service fetch error! status: ${serviceResponse.status}`);
                const service = await serviceResponse.json();
                
                // ডিবাগিং এর জন্য কনসোলে ডেটা দেখান
                console.log("Fetched Service Data (Check coverImageUrl):", service); 

                setServiceData(service);

                // 2. রিভিউ ফেচ 
                const reviewsResponse = await fetch(`${API_URL}/reviews/${id}`); 
                if (!reviewsResponse.ok) throw new Error(`Reviews fetch error! status: ${reviewsResponse.status}`);
                const fetchedReviews = await reviewsResponse.json();
                setReviews(fetchedReviews);
                
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch data:", err);
                setError("Failed to load details or reviews. Check API connection and service ID.");
                setLoading(false);
            }
        };

        fetchData();
    }, [id]); 

    // --- রিভিউ সাবমিট হ্যান্ডেলার (API কল সহ) ---
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!name || !reviewText || !rating) {
            alert('Please fill out all fields and provide a rating.');
            return;
        }

        const newReview = { 
            serviceId: id,
            name, 
            reviewText, 
            rating, 
        };

        try {
            const response = await fetch(`${API_URL}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newReview),
            });

            if (!response.ok) throw new Error("Failed to submit review.");
            
            const savedReview = await response.json();
            
            // UI তে নতুন রিভিউটি যোগ করা হলো
            setReviews(prev => [savedReview, ...prev]); 
            
            // ফর্ম রিসেট
            setName('');
            setReviewText('');
            setRating(0);
            setHover(0);
            alert('Review submitted successfully!');
            
        } catch (err) {
            console.error("Error submitting review:", err);
            alert('Failed to submit review. Try again.');
        }
    };
    
    // Loading ও Error State
    if (loading) {
        return <section className="service-details py-24 px-4 bg-[#1f242d] text-white min-h-screen flex justify-center items-center">
            <p className="text-3xl text-[#7cf03d]">Loading Service Details...</p>
        </section>;
    }

    if (error) {
        return <section className="service-details py-24 px-4 bg-[#1f242d] text-white min-h-screen flex justify-center items-center">
            <p className="text-xl text-red-500">{error}</p>
        </section>;
    }
    
    if (!serviceData) {
        return <section className="service-details py-24 px-4 bg-[#1f242d] text-white min-h-screen flex justify-center items-center">
            <p className="text-xl text-gray-400">Service not found.</p>
        </section>;
    }

    // Average rating গণনা
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;
    const totalReviews = reviews.length;
    
    const featuresArray = serviceData.features || [];
    const priceRange = serviceData.priceRange || "Price on Request"; 
    
    
    // 🔥🔥🔥 ফিক্সড ইমেজ URL লজিক: `coverImageUrl` ব্যবহার করে Cloudinary URL প্রদর্শন 🔥🔥🔥
    
    const defaultCoverUrl = "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    
    // আপনার সার্ভার কোড অনুযায়ী সঠিক প্রপার্টি নামটি ব্যবহার করা হলো: serviceData.coverImageUrl
    const coverImageUrl = serviceData.coverImageUrl || defaultCoverUrl;
    
    // 🔥🔥🔥 ফিক্সড ইমেজ URL লজিক শেষ 🔥🔥🔥

    return (
        <section className="service-details py-24 px-4 md:px-16 lg:px-24 bg-[#1f242d] text-white min-h-screen">
            <div className="container mx-auto">
                
                {/* Service Heading */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{serviceData.title}</h1>
                    <p className="text-2xl text-[#7cf03d] font-semibold">{priceRange}</p>
                </motion.div>

                {/* Service Image */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative w-full h-[400px] md:h-[600px] rounded-xl overflow-hidden mb-12 shadow-2xl"
                >
                    <img
                        src={coverImageUrl} 
                        alt={serviceData.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Description and Features */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold mb-4">What's Included</h2>
                        <p className="text-lg text-gray-300 leading-relaxed mb-6">{serviceData.description}</p>
                        <ul className="space-y-3 text-lg font-medium">
                            {featuresArray.map((feature, index) => (
                                <li key={index} className="flex items-center text-white">
                                    <HiOutlineLightBulb className="text-[#7cf03d] mr-3 text-2xl" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button 
                            onClick={() => navigate('/get-quote')} 
                            className="mt-8 px-8 py-4 bg-[#7cf03d] text-gray-900 font-bold rounded-lg shadow-lg hover:bg-[#6af52a] transition-colors duration-300 transform hover:scale-105"
                        >
                            Get Quote
                        </button>
                    </motion.div>


                    {/* Reviews, Ratings, and Form */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="bg-[#242a32] p-8 rounded-xl shadow-2xl"
                    >
                        <h2 className="text-3xl font-bold mb-4 text-[#7cf03d]">Reviews & Ratings</h2>
                        {/* Rating Summary */}
                        <div className="flex items-center mb-6">
                            <div className="flex text-yellow-400 text-3xl mr-4">
                                {/* Average Rating Display */}
                                {[...Array(5)].map((star, index) => {
                                    const ratingValue = index + 1;
                                    return (
                                        <FaStar key={index} className={ratingValue <= averageRating ? 'text-yellow-400' : 'text-gray-600'} />
                                    );
                                })}
                            </div>
                            <p className="text-gray-300 text-lg">
                                {averageRating} out of 5 ({totalReviews} reviews) 
                            </p>
                        </div>
                        
                        {/* Review Submission Form */}
                        <form onSubmit={handleReviewSubmit} className="space-y-6">
                            <div className="flex items-center">
                                <span className="mr-4 text-lg">Your Rating:</span>
                                {[...Array(5)].map((star, index) => {
                                    const ratingValue = index + 1;
                                    return (
                                        <label key={index}>
                                            <input
                                                type="radio"
                                                name="rating"
                                                className="hidden"
                                                value={ratingValue}
                                                onClick={() => setRating(ratingValue)}
                                            />
                                            <FaStar
                                                className="cursor-pointer text-3xl"
                                                color={ratingValue <= (hover || rating) ? "#FFD700" : "#e4e5e9"}
                                                onMouseEnter={() => setHover(ratingValue)}
                                                onMouseLeave={() => setHover(0)}
                                            />
                                        </label>
                                    );
                                })}
                            </div>
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-4 bg-[#1f242d] border border-gray-700 rounded-md focus:outline-none focus:border-[#7cf03d] transition-colors"
                                required
                            />
                            <textarea
                                placeholder="Write your review here..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                className="w-full h-36 p-4 bg-[#1f242d] border border-gray-700 rounded-md focus:outline-none focus:border-[#7cf03d] transition-colors resize-none"
                                required
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-[#7cf03d] text-gray-900 font-bold rounded-lg hover:bg-[#6af52a] transition-colors"
                            >
                                Submit Review
                            </button>
                        </form>
                        
                        {/* Display Fetched Reviews */}
                        <div className="mt-8 pt-6 border-t border-gray-700 space-y-6">
                            <h3 className="text-2xl font-bold text-white">User Reviews ({totalReviews})</h3>
                            {reviews.length > 0 ? (
                                reviews.map((rev) => (
                                    <div key={rev._id} className="p-4 bg-[#1f242d] rounded-lg border border-gray-700">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-white font-semibold">{rev.name}</span>
                                            <span className="text-gray-400 text-sm">{new Date(rev.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex text-yellow-400 mb-2">
                                            {[...Array(5)].map((star, i) => (
                                                <FaStar key={i} className={i < rev.rating ? 'text-yellow-400' : 'text-gray-600'} />
                                            ))}
                                        </div>
                                        <p className="text-gray-300">{rev.reviewText}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400">No reviews yet. Be the first to leave one!</p>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ServiceDetails;