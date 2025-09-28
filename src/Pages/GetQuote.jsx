import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const GetQuote = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectDescription: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.projectDescription) {
      // Navigate to the payment page, passing formData as state
      navigate('/payment', { state: { formData } });
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <section className="min-h-screen py-24 px-4 md:px-16 bg-[#1f242d] text-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-[#242a32] p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-2xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          Get a <span className="text-[#7cf03d]">Quote</span>
        </h2>
        <p className="text-gray-400 mb-8 text-center">
          Tell us about your project, and we'll send you a custom quote.
        </p>

        <form onSubmit={handleNext} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-4 bg-[#1f242d] border border-gray-700 rounded-md focus:outline-none focus:border-[#7cf03d] transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="youremail@example.com"
              className="w-full p-4 bg-[#1f242d] border border-gray-700 rounded-md focus:outline-none focus:border-[#7cf03d] transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="projectDescription" className="block text-gray-300 mb-2">Project Description</label>
            <textarea
              id="projectDescription"
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              placeholder="Describe your project in detail..."
              rows="6"
              className="w-full p-4 bg-[#1f242d] border border-gray-700 rounded-md focus:outline-none focus:border-[#7cf03d] transition-colors resize-none"
              required
            ></textarea>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full px-6 py-4 bg-[#7cf03d] text-gray-900 font-bold rounded-lg shadow-lg hover:bg-[#6af52a] transition-colors duration-300"
          >
            Request Quote
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default GetQuote;