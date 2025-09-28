import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

// client/src/components/PortfolioImageCarousel.jsx (এই ফাইলটি তৈরি করুন)


const PortfolioImageCarousel = ({ images, title }) => {
    // এই indexটি শুধুমাত্র একটি প্রজেক্টের একাধিক ইমেজ স্লাইড করার জন্য
    const [imageIndex, setImageIndex] = useState(0); 
    
    if (!images || images.length === 0) {
        return <div className="h-96 bg-gray-700 flex items-center justify-center text-gray-400 rounded-lg">No Images Available</div>;
    }

    const handleNextImage = () => {
        if (imageIndex < images.length - 1) setImageIndex(imageIndex + 1);
    };

    const handlePrevImage = () => {
        if (imageIndex > 0) setImageIndex(imageIndex - 1);
    };

    return (
        <div className="portfolio-box w-full md:w-1/2 relative">
            <div className="portfolio-carousel overflow-hidden">
                <div
                    className="img-slide flex transition-transform duration-500"
                    // ইমেজ স্লাইড করার জন্য transform ব্যবহার করা হলো
                    style={{
                        transform: `translateX(calc(${imageIndex * -100}%))`, 
                    }}
                >
                    {images.map((item, i) => (
                        <div key={i} className="img-item min-w-full flex-shrink-0">
                            <img
                                src={item.imageUrl} 
                                alt={`${title} - Image ${i + 1}`}
                                className="w-full h-96 object-cover rounded-lg"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation (ইমেজ পরিবর্তন করার জন্য) - আপনার স্ক্রিনশটের মতো ডানে নিচের দিকে */}
            {images.length > 1 && (
              <div className="navigation absolute bottom-4 w-full flex justify-end gap-2 pr-4"> 
                  <button 
                      className={`p-2 bg-gray-600/70 text-white rounded-full ${imageIndex === 0 ? "opacity-40" : ""}`} 
                      onClick={handlePrevImage}
                      disabled={imageIndex === 0}
                  >
                      <BsChevronLeft className="text-xl" />
                  </button>
                  <button
                      className={`p-2 bg-gray-600/70 text-white rounded-full ${imageIndex === images.length - 1 ? "opacity-40" : ""}`}
                      onClick={handleNextImage}
                      disabled={imageIndex === images.length - 1}
                  >
                      <BsChevronRight className="text-xl" />
                  </button>
              </div>
            )}
        </div>
    );
};

export default PortfolioImageCarousel;