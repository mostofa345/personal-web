import "./style.css";
import PortfolioItem from "./Projects/PortfolioItem";
import React, { useEffect, useState } from "react";
import axios from "axios";

// client/src/components/Portfolio.jsx

// ***আপনার style.css ফাইলটি Import করা হলো***
// নতুন কম্পোনেন্টটি ইমপোর্ট করুন

const Portfolio = () => {
    // ***এখানে এখন আর 'slides' নয়, 'projects' অ্যারে রাখা হবে***
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // মনে রাখবেন, BASE_API_URL আপনার .env ফাইলে সেট করা থাকতে হবে
    const BASE_API_URL = import.meta.env.VITE_API_URL;
    const API_URL = `${BASE_API_URL}/portfolio`;

    // --- ডেটা আনার লজিক ---
    useEffect(() => {
        const fetchProjects = async () => {
            // API URL চেকিং লজিক (আপনি আপনার প্রোজেক্টে এই লজিকটি সম্পূর্ণ করতে পারেন)
            if (!BASE_API_URL) {
                setError("API URL not configured in .env file.");
                setLoading(false);
                return;
            }
            
            try {
                const response = await axios.get(API_URL);
                // ***এখানে সবগুলি প্রজেক্টের অ্যারে (৪টি প্রজেক্ট) সরাসরি সেভ করা হলো***
                setProjects(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching projects:", err);
                setError("Failed to load projects. Check server and API connection.");
                setLoading(false);
            }
        };
        
        fetchProjects();
    }, [BASE_API_URL, API_URL]); // dependency array update করা হলো

    // --- রেন্ডারিং ---
    if (loading) {
        // CSS ব্যবহারের জন্য সাধারণ div ব্যবহার করা হলো
        return <section className="portfolio loading-state">Loading projects...</section>;
    }

    if (error) {
        return <section className="portfolio error-state">{error}</section>;
    }
    
    if (projects.length === 0) {
        return <section className="portfolio no-projects">No portfolio projects available yet.</section>;
    }

    return (
        // ***আপনার কাস্টম CSS ক্লাস ব্যবহার করা হলো***
        <section className="portfolio">
            <h2 className="headding">
                Latest <span>Projects</span>
            </h2>
            
            {/* ***গুরুত্বপূর্ণ: এখানে projects অ্যারে লুপ করা হলো, যা একটার নিচে আরেকটা দেখাবে*** */}
            {projects.map((project, index) => (
                // PortfolioItem কম্পোনেন্টকে কল করা হলো
                <PortfolioItem
                    key={project._id}
                    project={project}
                    projectIndex={index} // প্রজেক্টের সিরিয়াল নম্বর (0, 1, 2...) পাঠানোর জন্য
                />
            ))}
        </section>
    );
};

export default Portfolio;