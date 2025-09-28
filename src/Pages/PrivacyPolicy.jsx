import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
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
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-[#7cf03d]">
            Your privacy is important to me.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-[#242a32] p-6 md:p-12 rounded-xl shadow-2xl border border-[#3b3b3b]"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">1. Information I Collect</h2>
          <p className="text-base text-gray-300 mb-8">
            I may collect personal information such as your name, email address, and any messages you send to me through the contact form. This information is used solely to respond to your inquiries and to provide my services.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">2. How I Use Your Information</h2>
          <p className="text-base text-gray-300 mb-8">
            The information I collect is used to:
            <ul className="list-disc list-inside mt-2 text-gray-400">
              <li>Respond to your questions and service requests.</li>
              <li>Improve my website and services.</li>
              <li>Communicate with you about your projects.</li>
            </ul>
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">3. Data Sharing</h2>
          <p className="text-base text-gray-300 mb-8">
            I do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist me in operating my website, conducting my business, or servicing you, so long as those parties agree to keep this information confidential.
          </p>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">4. Data Security</h2>
          <p className="text-base text-gray-300 mb-8">
            I implement a variety of security measures to maintain the safety of your personal information when you submit a request or access your personal information.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">5. Your Consent</h2>
          <p className="text-base text-gray-300 mb-8">
            By using my site, you consent to this privacy policy.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg md:text-xl font-bold text-white mb-4">
            If you have any questions about this policy, please contact me.
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

export default PrivacyPolicy;
