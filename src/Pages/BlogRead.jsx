import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

// Inline SVG Icons for consistent styling
const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-red-500"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
);
const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-500"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
);
const ThumbsUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#7cf03d]"><path d="M7 10v12h11.2a2.3 2.3 0 0 0 2.3-2.3v-2.1a2 2 0 0 0-2-2h-3.8V10h6V8a2 2 0 0 0-2-2h-12c-1.1 0-2 .9-2 2v2h4zM4 10h2V8H4V6c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v2H4zM18 4H6"/></svg>
);

// API URL (Make sure this matches your backend server address)
const API_URL = 'VITE_API_URL=https://personal-server-uf48.onrender.com/api';

const BlogRead = () => {
    const { id } = useParams(); 
    
    // State declarations
    const [comment, setComment] = useState("");
    const [name, setName] = useState("");
    const [submittedComments, setSubmittedComments] = useState([]); 
    const [blogPost, setBlogPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commentStatus, setCommentStatus] = useState(null); // Feedback for comment submission

    // Function to fetch comments for the current blog ID
    const fetchComments = async () => {
        if (!id) return;
        try {
            // API Endpoint: /api/blogs/:id/comments
            const response = await fetch(`${API_URL}/blogs/${id}/comments`);
            if (!response.ok) {
                // If comments fail to load, log it but don't stop the main page
                console.warn(`Could not retrieve existing comments for blog ID ${id}.`);
                return;
            }
            const data = await response.json();
            setSubmittedComments(data);
        } catch (err) {
            console.error("Error fetching comments:", err);
        }
    };

    // --- Main Data Fetching Effect ---
    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                setError("Blog ID not found. Please navigate from the correct link.");
                setLoading(false);
                return;
            }

            try {
                // 1. Fetch Blog Post
                const blogResponse = await fetch(`${API_URL}/blogs/${id}`); 
                
                if (!blogResponse.ok) {
                    const errorText = await blogResponse.text();
                    if (blogResponse.status === 404) {
                        throw new Error('Blog post not found.');
                    }
                    throw new Error(`Server Error: ${blogResponse.status} - ${errorText}`);
                }
                
                const blogData = await blogResponse.json();
                setBlogPost(blogData);
                
                // 2. Fetch Comments
                await fetchComments();

                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(`Failed to load content. Error: ${err.message}`);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // --- Comment Submission Handler ---
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        setCommentStatus('Submitting comment...');

        if (!name.trim() || !comment.trim()) {
            setCommentStatus('Name and comment are required!');
            return;
        }

        try {
            // API Endpoint: /api/blogs/:id/comments
            const commentPayload = { name, comment };
            
            const response = await fetch(`${API_URL}/blogs/${id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentPayload),
            });

            if (!response.ok) {
                let errorMessage = 'Failed to submit comment.';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (e) {
                    // Handle cases where response body is not JSON (e.g., 404 HTML page)
                    errorMessage = response.status === 404 ? 'API endpoint not found (404).' : `Server responded with status ${response.status}.`;
                }
                
                // Log the error with the endpoint path
                console.error(`Error submitting comment to ${API_URL}/blogs/${id}/comments:`, response.status, errorMessage);
                throw new Error(errorMessage);
            }

            // Success: Refetch the comments list to show the new one
            await fetchComments(); 

            // Clear form and show success message
            setName("");
            setComment("");
            setCommentStatus('Comment submitted successfully!');
            setTimeout(() => setCommentStatus(null), 3000);

        } catch (err) {
            console.error("Submission catch error:", err);
            setCommentStatus(`Submission Failed: ${err.message}`);
        }
    };

    // --- Loading, Error, and Not Found UI ---
    if (loading) {
        return <div className="min-h-screen py-24 px-4 bg-[#1f242d] text-white flex items-center justify-center text-2xl font-bold">Loading Blog Content...</div>;
    }

    if (error) {
        return <div className="min-h-screen py-24 px-4 bg-[#1f242d] text-red-500 flex items-center justify-center text-2xl font-bold text-center">Error: {error}</div>;
    }

    if (!blogPost) {
        return (
            <div className="min-h-screen py-24 px-4 md:px-16 bg-[#1f242d] text-white flex items-center justify-center text-2xl font-bold">
                Blog Post Not Found.
            </div>
        );
    }

    // Prepare content for rendering (keeping original blog language in content)
    const formattedDate = new Date(blogPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const fullContentHTML = `
        <h1 class="text-4xl md:text-5xl font-bold mb-6 text-[#7cf03d] font-poppins">${blogPost.title}</h1>
        <p class="text-gray-400 text-lg mb-4 font-raleway">By ${blogPost.author || 'Unknown'} | Date: ${formattedDate} | Category: ${blogPost.category || 'General'}</p>
        <div class="prose prose-invert max-w-none text-lg text-gray-300 mb-8 font-lato">
            ${blogPost.content}
        </div>
    `;

    return (
        <section className="min-h-screen py-24 px-4 md:px-16 bg-[#1f242d] text-white">
            {/* CSS styles for rich text content */}
            <style>{`
                .prose-invert h1, .prose-invert h2, .prose-invert h3 { color: #fff; }
                .prose-invert a { color: #7cf03d; text-decoration: underline; }
                .prose-invert blockquote { border-left: 4px solid #7cf03d; padding-left: 1rem; color: #ccc; }
                .prose-invert img { max-width: 100%; height: auto; border-radius: 8px; margin-top: 1.5rem; margin-bottom: 1.5rem; }
            `}</style>
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Raleway:wght@400;700&family=Lato:wght@400;700&family=Montserrat:wght@400;700&display=swap"
                rel="stylesheet"
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="container mx-auto max-w-4xl"
            >
                {/* Featured Image */}
                <div className="relative w-full h-[300px] md:h-[500px] rounded-xl overflow-hidden mb-8 shadow-2xl">
                    <img
                        src={blogPost.image || 'https://via.placeholder.com/1200x600/1f242d/7cf03d?text=Featured+Image'}
                        alt={blogPost.title || "Featured Blog Image"}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
                </div>

                <div className="bg-[#242a32] p-6 md:p-12 rounded-xl shadow-2xl">
                    {/* Blog Content */}
                    <div dangerouslySetInnerHTML={{ __html: fullContentHTML }} />

                    {/* Engagement Buttons (Like, Love, Share) - Now fully English */}
                    <div className="flex items-center space-x-6 mt-12 mb-8 border-t border-b border-gray-700 py-4">
                        <motion.button 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.9 }} 
                            className="flex items-center font-bold hover:text-red-400 transition-colors text-red-500"
                        >
                            <HeartIcon /> Love
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.9 }} 
                            className="flex items-center font-bold hover:text-blue-400 transition-colors text-blue-500"
                        >
                            <ShareIcon /> Share
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.9 }} 
                            className="flex items-center font-bold hover:text-[#6af52a] transition-colors text-[#7cf03d]"
                        >
                            <ThumbsUpIcon /> Like
                        </motion.button>
                    </div>

                    {/* Comment Form */}
                    <div>
                        <h2 className="text-3xl font-bold mb-6 font-poppins text-white">Leave a Comment</h2>
                        {commentStatus && (
                            <p className={`p-3 mb-4 rounded-lg font-semibold ${commentStatus.includes('successfully') ? 'bg-green-600' : commentStatus.includes('Submitting') ? 'bg-yellow-600 text-gray-900' : 'bg-red-600'} text-white transition-opacity`}>
                                {commentStatus}
                            </p>
                        )}
                        <form onSubmit={handleCommentSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 bg-[#1f242d] border border-gray-700 rounded-lg focus:outline-none focus:border-[#7cf03d] text-white"
                                required
                            />
                            <textarea
                                placeholder="Write your comment here..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full h-36 p-3 bg-[#1f242d] border border-gray-700 rounded-lg focus:outline-none focus:border-[#7cf03d] resize-none text-white"
                                required
                            ></textarea>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={commentStatus === 'Submitting comment...'}
                                className="w-full px-6 py-3 bg-[#7cf03d] text-gray-900 font-bold rounded-lg hover:bg-[#6af52a] transition-colors shadow-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
                            >
                                Submit Comment
                            </motion.button>
                        </form>
                    </div>

                    {/* Display Comments List */}
                    <div className="mt-10 pt-6 border-t border-gray-700 space-y-6">
                        <h3 className="text-2xl font-bold text-white font-montserrat">{submittedComments.length} Reader Comments</h3>
                        {submittedComments.length > 0 ? (
                            submittedComments.map((rev) => (
                                <motion.div 
                                    key={rev._id || Math.random()} 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="p-5 bg-[#1f242d] rounded-xl border border-gray-700 shadow-md"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-white font-semibold text-lg">{rev.name}</span>
                                        <span className="text-gray-400 text-xs mt-1">
                                            {new Date(rev.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed italic">{rev.comment}</p>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-gray-400">No comments yet. Be the first to comment!</p>
                        )}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default BlogRead;
