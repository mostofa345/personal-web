import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// FIX: Replacing 'react-icons' with inline SVGs to fix potential compilation errors.
const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
);
const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
);
const ThumbsUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M7 10v12h11.2a2.3 2.3 0 0 0 2.3-2.3v-2.1a2 2 0 0 0-2-2h-3.8V10h6V8a2 2 0 0 0-2-2h-12c-1.1 0-2 .9-2 2v2h4zM4 10h2V8H4V6c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v2H4zM18 4H6"/></svg>
);

// FIX: Hardcoding API_URL to prevent import.meta error
const API_URL = 'VITE_API_URL=https://personal-server-uf48.onrender.com/api';

const BlogPage = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to format the date to show 'Month Day, Year'
    const formatDate = (dateString) => {
        if (!dateString) return 'No Date';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Fetch published blogs from the API
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                // Fetch from the public endpoint (only published blogs)
                const response = await fetch(`${API_URL}/blogs`); 
                if (!response.ok) {
                    throw new Error('Failed to fetch published blogs');
                }
                const data = await response.json();
                setBlogPosts(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setError("Failed to load blog posts. Please check the server connection.");
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <div className="min-h-screen py-24 px-4 bg-[#1f242d] text-white flex items-center justify-center text-2xl font-bold">Loading Blog Posts...</div>;
    }

    if (error) {
        return <div className="min-h-screen py-24 px-4 bg-[#1f242d] text-red-500 flex items-center justify-center text-2xl font-bold">{error}</div>;
    }

    return (
        <section className="min-h-screen py-24 px-4 md:px-16 bg-[#1f242d] text-white">
             <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Playfair+Display:wght@400;700&family=Lato:wght@400;700&family=Montserrat:wght@400;700&family=Roboto:wght@400;700&family=Oswald:wght@400;700&family=Source+Sans+Pro:wght@400;700&family=Raleway:wght@400;700&family=Open+Sans:wght@400;700&family=Ubuntu:wght@400;700&family=Merriweather:wght@400;700&family=Lora:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div className="container mx-auto">
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold text-white mb-8 text-center font-inter"
                >
                    My <span className="text-[#7cf03d]">Blog</span>
                </motion.h1>

                {blogPosts.length === 0 ? (
                    <p className="text-center text-gray-400 text-xl py-12">No published blog posts found.</p>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {blogPosts.map((post) => (
                            // Ensure the key uses the correct MongoDB ID
                            <div key={post._id} className="bg-[#242a32] rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col">
                                {/* Image and Title Section */}
                                <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
                                    {/* Use blog.image from API */}
                                    <img
                                        src={post.image || 'https://via.placeholder.com/600x400?text=No+Image'}
                                        alt={post.title}
                                        className="w-full h-full object-cover rounded-t-xl"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    {/* Use blog.title from API */}
                                    <h3 className="text-2xl font-bold text-[#7cf03d] mb-2 font-poppins line-clamp-2">{post.title}</h3>
                                    
                                    {/* Date and Author */}
                                    <p className="text-gray-400 text-sm mb-4 font-raleway">
                                        By {post.author || 'Unknown Author'} on {formatDate(post.date)}
                                    </p>
                                    
                                    {/* Short Excerpt */}
                                    {/* We use blog.excerpt from the API as the summary */}
                                    <p className="text-gray-300 mb-6 font-lato line-clamp-3">{post.excerpt || 'No summary available.'}</p>
                                    
                                    {/* Action and Read More Section */}
                                    <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-700">
                                        <div className="flex space-x-4 text-xl">
                                            {/* Dummy/Placeholder Social Icons */}
                                            <div className="flex items-center text-gray-400 hover:text-red-500 transition-colors cursor-pointer" title="Loves">
                                                <HeartIcon />
                                                <span className="text-sm">0</span>
                                            </div>
                                            <div className="flex items-center text-gray-400 hover:text-blue-500 transition-colors cursor-pointer" title="Likes">
                                                <ThumbsUpIcon />
                                                <span className="text-sm">0</span>
                                            </div>
                                            <div className="flex items-center text-gray-400 hover:text-[#7cf03d] transition-colors cursor-pointer" title="Shares">
                                                <ShareIcon />
                                                <span className="text-sm">0</span>
                                            </div>
                                        </div>
                                        
                                        {/* Read More Link (Navigate to BlogRead) */}
                                        <Link
                                            // *** CRITICAL FIX: Changed post.id to post._id ***
                                            to={`/blog/${post._id}`} 
                                            className="px-4 py-2 bg-[#7cf03d] text-gray-900 font-bold rounded-lg hover:bg-[#6af52a] transition-colors font-roboto"
                                        >
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default BlogPage;
