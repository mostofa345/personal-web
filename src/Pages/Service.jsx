import * as FaIcons from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// react-icons/fa থেকে আইকন ডায়নামিকভাবে ইম্পোর্ট করার জন্য একটি নতুন প্যাকেজ দরকার
// যেহেতু আপনি বিভিন্ন প্যাকেজ থেকে আইকন ব্যবহার করছেন, সব আইকন এক জায়গায় আনব
import {
    BsCodeSlash,
    BsLaptop,
    BsPalette,
    BsBrush,
    BsGraphUp,
    BsWordpress,
    BsCamera,
    BsArrowRight,
} from "react-icons/bs";
// Fa icons কে অ্যাডমিন প্যানেলে ব্যবহার করেছেন, তাই এগুলোকেও আনতে হবে

// আপনার অ্যাডমিন প্যানেলের সার্ভিস ডেটা থেকে iconName (যেমন: 'FaReact') অনুযায়ী
// ডায়নামিকভাবে আইকন কম্পোনেন্ট রেন্ডার করার জন্য একটি ফাংশন
const getIconComponent = (iconName) => {
    // এখানে আপনার ব্যবহৃত সব icon library যোগ করতে পারেন
    const Icons = { ...FaIcons }; // ধরে নিচ্ছি অ্যাডমিন প্যানেলে FaIcons ব্যবহার করেছেন
    
    // আপনি যদি BS (Bootstrap) আইকনগুলিও ব্যবহার করতে চান:
    // const BsIcons = { BsCodeSlash, BsLaptop, BsPalette, BsBrush, BsGraphUp, BsWordpress, BsCamera };
    // const AllIcons = { ...FaIcons, ...BsIcons };

    // আপাতত, আমরা শুধু FaIcons এবং আপনার Services.jsx এ থাকা আইকনগুলো কনসিডার করছি
    // অ্যাডমিন প্যানেলে যদি 'FaReact' সেভ করে থাকেন, তবে FaIcons.FaReact রেন্ডার হবে।
    const IconComponent = Icons[iconName];

    // যদি কোনো আইকন না পাওয়া যায়, তবে একটি ডিফল্ট আইকন বা null রিটার্ন করবে
    if (IconComponent) {
        return <IconComponent />;
    }
    // যদি অ্যাডমিন প্যানেলে iconName 'BsCodeSlash' হিসাবে সেভ করা হয়, তবে এর জন্য আলাদা লজিক লাগবে 
    // তার চেয়ে সহজ হলো, অ্যাডমিন প্যানেলে iconName হিসাবে 'FaReact' অথবা 'FaStar' এরকম সেভ করা 

    // যেহেতু আমি আপনার অ্যাডমিন প্যানেলের iconName ডেটা সম্পর্কে নিশ্চিত নই, 
    // আপনার বিদ্যমান BsCodeSlash-কে ডিফল্ট আইকন হিসেবে ব্যবহার করছি।
    return <BsCodeSlash />;
};


const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // API থেকে সার্ভিস ডেটা ফেচ করার লজিক
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/services`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setServices(data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch services:", err);
                setError("Failed to load services. Please check the API connection.");
                setLoading(false);
            }
        };

        fetchServices();
    }, []); // Empty dependency array means this runs once on mount

    const handleGetServiceClick = (serviceId) => {
        // প্রতিটি সার্ভিসের জন্য ডায়নামিক রাউটিং সেট করা হলো
        navigate(`/services-details/${serviceId}`); 
    };

    // Loading State
    if (loading) {
        return <section className="services py-16 px-4 bg-[#1f242d] text-white pt-24 min-h-screen flex justify-center items-center">
            <p className="text-3xl text-[#7cf03d]">Loading Services...</p>
        </section>;
    }

    // Error State
    if (error) {
        return <section className="services py-16 px-4 bg-[#1f242d] text-white pt-24 min-h-screen flex justify-center items-center">
            <p className="text-xl text-red-500">{error}</p>
        </section>;
    }
    
    // No Services State
    if (services.length === 0) {
        return <section className="services py-16 px-4 bg-[#1f242d] text-white pt-24 min-h-screen flex justify-center items-center">
            <p className="text-xl text-gray-400">No services found in the database.</p>
        </section>;
    }

    return (
        <section className="services py-16 px-4 md:px-8 bg-[#1f242d] text-white pt-24 sm:pt-32 lg:pt-40">
            {/* Page Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] text-center mb-12 font-bold text-white font-sans">
                My <span className="text-[#7cf03d]">Services</span>
            </h2>

            {/* Services Grid (API Data-based) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div
                        key={service._id} // MongoDB's _id ব্যবহার করা হলো
                        className="flex flex-col justify-between bg-[#323946] border-[0.2rem] border-[#323946] rounded-[1rem] p-6 transition-transform duration-500 hover:scale-105 hover:border-[#7cf03d]"
                    >
                        <div className="flex justify-between items-center mb-4">
                            {/* ডায়নামিক আইকন রেন্ডার করা হলো */}
                            <div className="text-[3rem] text-[#7cf03d]">
                                {getIconComponent(service.iconName)} 
                            </div>
                            <a
                                href="#"
                                className="inline-flex bg-[#fff] rounded-full p-3 hover:bg-[#7cf03d] transition-all duration-500"
                            >
                                <BsArrowRight className="text-[#1f242d] text-2xl transform rotate-[225deg] hover:rotate-180 transition-transform duration-500" />
                            </a>
                        </div>
                        {/* Service Title */}
                        <h3 className="text-2xl md:text-3xl mb-4 font-bold text-[#7cf03d] font-sans">
                            {service.title}
                        </h3>
                        {/* Short Description */}
                        <p className="text-base md:text-[1.4rem] mb-6 font-sans text-gray-300">
                            {service.shortDescription}
                        </p>
                        {/* Get Service Button */}
                        <div
                            className="mt-auto bg-[#7cf03d] text-black font-semibold py-2 px-4 rounded text-center cursor-pointer hover:bg-black hover:text-[#7cf03d] transition-colors duration-300"
                            onClick={() => handleGetServiceClick(service._id)} // _id পাস করা হলো
                        >
                            Get Service
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;