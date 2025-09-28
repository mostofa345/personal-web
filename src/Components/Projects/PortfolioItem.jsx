import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { BsArrowLeftShort, BsGithub } from "react-icons/bs";

// client/src/components/PortfolioItem.jsx


const PortfolioItem = ({ project, projectIndex }) => {
    // এই imageIndex স্টেটটি স্লাইডার এবং টেক্সট ডেটা পরিবর্তন নিয়ন্ত্রণ করে।
    const [imageIndex, setImageIndex] = useState(0); 

    if (!project || !project.images || project.images.length === 0) {
        return null; 
    }

    // imageIndex অনুযায়ী বর্তমান ডেটা টানা হচ্ছে
    const currentImageSlide = project.images[imageIndex]; 
    
    // ***স্লাইড নম্বর (01, 02...) - এটি পরিবর্তন হবে***
    const displaySlideNumb = String(imageIndex + 1).padStart(2, '0');
    
    // মোট স্লাইডের সংখ্যা
    const totalSlides = String(project.images.length).padStart(2, '0');


    // নেভিগেশন হ্যান্ডলার
    const handleNextImage = () => {
        if (imageIndex < project.images.length - 1) {
            setImageIndex(imageIndex + 1);
        }
    };

    const handlePrevImage = () => {
        if (imageIndex > 0) {
            setImageIndex(imageIndex - 1);
        }
    };

    return (
        // প্রতিটি প্রজেক্টের নিচে গ্যাপের জন্য mb-20 যোগ করা হলো
        <div className="portfolio-container mb-20 md:mb-24"> 
            
            {/* Portfolio Details (বাম দিক) */}
            <div className="portfolio-box detail-box">
                <div className="portfolio-detail active"> 
                    
                    {/* 1. স্লাইড নম্বর (প্রজেক্ট নম্বর নয়) - এটিই এখন 01, 02, 03... হবে */}
                    <p className="numb">{displaySlideNumb}</p>
                    
                    {/* 2. টাইটেল (স্লাইড অনুযায়ী পরিবর্তন) */}
                    <h3>{currentImageSlide.imageTitle}</h3> 
                    
                    {/* 3. ডেসক্রিপশন (স্লাইড অনুযায়ী পরিবর্তন) */}
                    <p>{currentImageSlide.imageDesc}</p> 
                    
                    <div className="tech">
                        <p>{currentImageSlide.imageTech}</p>
                    </div>
                    
                    {/* Live/Github Link */}
                    <div className="live-github">
                        <a href={project.liveLink || '#'} target="_blank" rel="noopener noreferrer">
                            <BsArrowLeftShort /> <span>Live Project</span>
                        </a>
                        <a href={project.githubLink || '#'} target="_blank" rel="noopener noreferrer">
                            <BsGithub /> <span>Github Repository</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Image Carousel (ডান দিক) */}
            <div className="portfolio-box image-box relative"> 
                <div className="portfolio-carousel">
                    <div
                        className="img-slide"
                        style={{
                            transform: `translateX(calc(${imageIndex * -100}%))`, 
                        }}
                    >
                        {project.images.map((item, i) => (
                            <div key={i} className="img-item">
                                <img
                                    src={item.imageUrl} 
                                    alt={item.imageTitle}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Wrapper (বাটন) */}
                {project.images.length > 1 && (
                    <div 
                        // বাটনগুলিকে ইমেজ বক্সের বাইরে, নিচে ডানে আনার জন্য
                        className="absolute bottom-[-4rem] right-0 flex items-center gap-4 pr-1" 
                    >
                        {/* স্লাইড নম্বর দেখানোর অংশ, আপনার পছন্দ না হলে এই <p> ট্যাগটি বাদ দিতে পারেন */}
                        {/* <p className="text-white text-base">
                            {displaySlideNumb} / {totalSlides}
                        </p> */}
                        
                        <div className="navigation flex gap-1"> {/* gap-1 দিয়ে বাটনের দূরত্ব কমানো হলো */}
                            {/* ***বাটনের আকার ছোট করা হলো: w-8 h-8 (আগে ছিল w-10/12) এবং টেক্সট সাইজ ছোট করা হলো*** */}
                            <button 
                                className={`w-8 h-8 rounded-md flex items-center justify-center text-lg transition-colors 
                                            ${imageIndex === 0 ? "bg-gray-600 border border-gray-500 text-gray-400 cursor-not-allowed" : "bg-gray-700 border border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-700"}`} 
                                onClick={handlePrevImage}
                                disabled={imageIndex === 0}
                            >
                                <BsChevronLeft />
                            </button>
                            <button
                                className={`w-8 h-8 rounded-md flex items-center justify-center text-lg transition-colors 
                                            ${imageIndex === project.images.length - 1 ? "bg-gray-600 border border-gray-500 text-gray-400 cursor-not-allowed" : "bg-gray-700 border border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-700"}`}
                                onClick={handleNextImage}
                                disabled={imageIndex === project.images.length - 1}
                            >
                                <BsChevronRight />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PortfolioItem;