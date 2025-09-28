import * as FaIcons from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// src/components/layout/Footer.jsx (Updated Client File)

// Import all icon libraries you might use in the footer for social icons

// API URL from .env file
const API_URL = import.meta.env.VITE_API_URL || 'VITE_API_URL=https://personal-server-uf48.onrender.com/api'; 

// Helper component to render icons dynamically
const DynamicIcon = ({ iconName, size = 30 }) => {
    const IconComponent = FaIcons[iconName]; 
    if (!IconComponent) return null; // Hide if icon is not found
    return <IconComponent size={size} />;
};


const Footer = () => {
    const [footerLinks, setFooterLinks] = useState([]);
    const [socialIcons, setSocialIcons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                const response = await axios.get(`${API_URL}/footer`);
                const data = response.data;
                
                // Separate links and social icons based on the 'type' field
                const links = data.filter(item => item.type === 'link');
                const socials = data.filter(item => item.type === 'social');
                
                setFooterLinks(links);
                setSocialIcons(socials);
                setLoading(false);

            } catch (err) {
                console.error("Error fetching footer data:", err);
                // Fallback to empty arrays on failure
                setLoading(false);
            }
        };

        fetchFooterData();
    }, []);

    // You can add a loading state here if needed, but footers usually load quickly or asynchronously.
    // if (loading) return <div className="bg-[#1f242d] py-16 text-center text-white">Loading Footer...</div>;


    return (
        <footer className="bg-[#1f242d] text-white py-16 px-6 md:px-12 lg:px-24">
            <div className="container mx-auto">
                
                {/* Footer links (Navigation) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-y-6 gap-x-4 border-b border-gray-700 pb-12 mb-12">
                    {footerLinks.map((link, index) => (
                        <div key={link._id || index} className="flex justify-center md:justify-start">
                            <Link to={link.path} className="text-base font-medium text-white hover:text-[#7cf03d] transition-colors duration-300">
                                {link.name}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Copyright and social icons section */}
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-8 md:space-y-0">
                    <p className="text-gray-400 text-sm md:text-base">
                        &copy; {new Date().getFullYear()} Personal. All Rights Reserved. {/* This part remains static/hardcoded */}
                    </p>
                    <div className="flex space-x-6">
                        {socialIcons.map((social, index) => {
                            return (
                                <a
                                    key={social._id || index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-[#7cf03d] transition-colors duration-300 text-2xl md:text-3xl"
                                >
                                    <DynamicIcon iconName={social.icon} />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;