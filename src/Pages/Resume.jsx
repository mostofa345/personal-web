import "./resumi.css";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as TfiIcons from "react-icons/tfi";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { BiBrain } from "react-icons/bi";
import { BsAmazon } from "react-icons/bs";
import { FaBug, FaNodeJs, FaProjectDiagram, FaShieldAlt, FaVial, FaVuejs } from "react-icons/fa";
import { TfiMicrosoftAlt } from "react-icons/tfi";

// All imported icons (combined in one object)
const IconLibraries = {
    ...SiIcons,
    ...FaIcons,
    ...BiIcons,
    ...BsIcons,
    ...TfiIcons,
};

// --- Dynamic Icon Component ---
const DynamicIcon = ({ iconName, size = 50 }) => {
    // Attempt to retrieve the component from the combined libraries
    const IconComponent = IconLibraries[iconName]; 
    if (!IconComponent) {
        console.warn(`Icon component for ${iconName} not found. Defaulting to a question mark icon.`);
        return <div style={{ fontSize: size, color: '#ff6b6b' }}>?</div>; 
    }
    return <IconComponent size={size} />;
};

// API URL from .env 
const API_URL = import.meta.env.VITE_API_URL || 'VITE_API_URL=https://personal-server-uf48.onrender.com/api'; 

const tabs = ['Experience', 'Skills', 'Education', 'About Me'];

const Resume = () => {
    const [activeTab, setActiveTab] = useState('Education'); 
    const [resumeData, setResumeData] = useState({
        experience: [],
        education: [],
        skills: [],
        about: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Data Fetching Logic ---
    useEffect(() => {
        const fetchResumeData = async () => {
            try {
                // Fetch all resume items from the API
                const response = await axios.get(`${API_URL}/resume`);
                const data = response.data;

                // Group data by category
                const groupedData = {
                    experience: data.filter(item => item.category === 'experience'),
                    education: data.filter(item => item.category === 'education'),
                    skills: data.filter(item => item.category === 'skills'),
                    // 'about' ক্যাটাগরির ডেটাগুলোকে দুটি ভাগে ভাগ করা
                    about: data.filter(item => item.category === 'about'), 
                };
                
                setResumeData(groupedData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching resume data:", err);
                setError("Failed to load resume data. Please check the API connection.");
                setLoading(false);
            }
        };

        fetchResumeData();
    }, []);

    // Memoized content based on the active tab and fetched data
    const activeContent = useMemo(() => {
        // Renamed 'company' to 'institution' if it's an education item for consistency
        const renderList = (data, isSkill = false) => (
            <div className="resume-list">
                {data.length === 0 ? (
                    <p className="text-gray-400">No {activeTab.toLowerCase()} data added yet.</p>
                ) : (
                    data.map((item) => (
                        <div className="resume-item" key={item._id || item.id}>
                            {/* For Experience/Education */}
                            {!isSkill && (
                                <>
                                    <p className="year">{item.year}</p>
                                    <h3>{item.title}</h3>
                                    <p className="company">{item.company || item.institution || ''}</p> 
                                    <p>{item.description}</p>
                                </>
                            )}
                            {/* For Skills */}
                            {isSkill && (
                                <>
                                    <DynamicIcon iconName={item.icon} />
                                    <span>{item.title}</span> {/* Using 'title' as label for skills */}
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        );
        
        // 'about' ক্যাটাগরির ডেটাগুলোকে দুটি ভাগে ভাগ করা হলো:
        // 1. mainHeader: About Me (Header/Description) থেকে আসা আইটেম
        // 2. details: About Me (Title/Value Pair) থেকে আসা আইটেম (যেগুলোতে label এবং value আছে)
        const mainHeader = resumeData.about.find(item => item.description && item.title) || {}; 
        const aboutDetails = resumeData.about.filter(item => item.label && item.value); 

        switch (activeTab) {
            case 'Experience':
                return (
                    <div className="resume-detail experience active">
                        <h2 className="headding">My <span>Experience</span></h2>
                        <p className="desc">Below is a detailed timeline of my professional work experience, highlighting key roles and responsibilities.</p>
                        {renderList(resumeData.experience)}
                    </div>
                );
            case 'Skills':
                return (
                    <div className="resume-detail skills active">
                        <h2 className="headding">My <span>Development Skills</span></h2>
                        <p className="desc">
                            I have expertise across the full software development lifecycle, including front-end, back-end, databases, and modern tools for scalable application development.
                        </p>
                        {renderList(resumeData.skills, true)}
                    </div>
                );
            case 'Education':
                return (
                    <div className="resume-detail education active">
                        <h2 className="headding">My <span>Education</span></h2>
                        <p className="desc">A summary of my academic background and certified training that complements my professional skills.</p>
                        {renderList(resumeData.education)}
                    </div>
                );
            case 'About Me':
                
                return (
                    <div className="resume-detail about active">
                        <h2 className="headding">About <span>Me</span></h2>
                        {/* Main About Me Description */}
                        <p className="desc">
                            {mainHeader.description || "A dedicated and experienced developer with a passion for building scalable and efficient applications."}
                        </p>
                        
                        {/* Dynamic About Me Details (Title/Value Pair) */}
                        <div className="resume-list grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"> 
                            {aboutDetails.length === 0 ? (
                                <p className="text-gray-400 col-span-2">No About Me details added yet.</p>
                            ) : (
                                aboutDetails.map((item, index) => (
                                    <div className="resume-item flex" key={item._id || index}>
                                        {/* Title (Label) কে সবুজ করে দেখানো হলো */}
                                        <p className="text-gray-400 mr-2">
                                            <span className="text-[#7cf03d] font-semibold">{item.label}:</span> {item.value}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    }, [activeTab, resumeData]);

    if (loading) {
        return (
            <section className="resume w-full py-24 px-4 bg-gray-900 text-white text-center">
                <h2 className="text-3xl">Loading Resume Data...</h2>
            </section>
        );
    }

    if (error) {
        return (
            <section className="resume w-full py-24 px-4 bg-gray-900 text-white text-center">
                <h2 className="text-3xl text-red-500">{error}</h2>
            </section>
        );
    }


    return (
        <section className="resume w-full py-16 md:py-24 px-4 bg-gray-900 text-white">
            <div className="resume-container max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
                
                {/* Left Box: Buttons and Initial Text */}
                <div className="resume-box">
                    <h2 className="text-white">Why Hire Me?</h2> 
                    <p className="desc text-gray-400">I possess a strong blend of technical skills, practical experience, and a proven ability to deliver high-quality, scalable applications, making me a valuable asset to any team.</p>
                    
                    {/* Button Container */}
                    <div className="flex flex-wrap gap-4 md:flex-col md:gap-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                className={`resume-btn ${activeTab === tab ? 'active' : ''} 
                                        w-full md:w-auto px-6 py-3 rounded-lg font-semibold transition-colors
                                        hover:border-main-color hover:text-main-color`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* Right Box: Tab Content */}
                <div className="resume-box">
                    {activeContent}
                </div>

            </div>
        </section>
    );
}

export default Resume;