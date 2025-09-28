import React from "react";
import { motion } from "framer-motion";

const TermsOfService = () => {
  return (
    <section className="min-h-screen py-24 px-4 md:px-16 bg-[#1f242d] text-white">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
          .font-inter {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>
      <div className="container mx-auto font-inter">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-lg md:text-xl text-[#7cf03d]">
            Please read these terms before using my services.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-[#242a32] p-6 md:p-12 rounded-xl shadow-2xl border border-[#3b3b3b]"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">1. Acceptance of Services</h2>
          <p className="text-base text-gray-300 mb-8">
            By using my website, you agree to these terms. If you do not agree with these terms, please do not use my services.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">2. Intellectual Property</h2>
          <p className="text-base text-gray-300 mb-8">
            All content, logos, and designs on this website are my property. No content, images, or designs may be used, copied, or distributed without my prior written permission.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">3. Privacy</h2>
          <p className="text-base text-gray-300 mb-8">
            Your personal information is safe with me. I do not sell, exchange, or disclose your personal information to third parties, unless required by law.
          </p>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">4. Limitations</h2>
          <p className="text-base text-gray-300 mb-8">
            Using my services for any illegal or unethical activities is strictly prohibited.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">5. Changes to Terms</h2>
          <p className="text-base text-gray-300 mb-8">
            I reserve the right to change these terms at any time. The changes will be updated on this page.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg md:text-xl font-bold text-white mb-4">
            Have any questions?
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 text-[#1f242d] bg-[#7cf03d] rounded-full font-bold text-lg hover:bg-[#6af52a] transition-colors duration-300 shadow-lg"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsOfService;
