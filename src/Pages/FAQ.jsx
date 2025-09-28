import React from "react";
import { motion } from "framer-motion";

const faqData = [
  {
    question: "What services do you offer?",
    answer: "I provide modern web development, UI/UX design, and custom software solutions. You can see examples of my work on my portfolio page."
  },
  {
    question: "What is your work process like?",
    answer: "First, I discuss your needs in detail, then create a project plan and begin the design and development. I provide regular updates throughout the project."
  },
  {
    question: "What is the cost of a website?",
    answer: "The cost depends on the project's complexity, features, and timeline. For a precise quote, please send a request on my 'Get Quote' page."
  },
  {
    question: "How long does a project take to complete?",
    answer: "The timeline depends on the type of project. Small projects usually take a few weeks, while larger projects can take a few months. We set an estimated timeline before starting a project."
  },
  {
    question: "How do I make a payment?",
    answer: "Please contact me to discuss payment methods in detail. We typically use bank transfers or other online payment methods."
  },
  {
    question: "What is your quality guarantee?",
    answer: "I ensure high-quality work and my primary goal is client satisfaction. If any issues arise, I try to resolve them quickly."
  },
];

const FAQ = () => {
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
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl text-[#7cf03d]">
            Answers to some of the questions you might have.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#242a32] p-6 rounded-xl shadow-2xl border border-[#3b3b3b] hover:border-[#7cf03d] transition-colors duration-300"
            >
              <h3 className="text-xl md:text-2xl font-bold text-[#7cf03d] mb-4">
                {item.question}
              </h3>
              <p className="text-base text-gray-300">
                {item.answer}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg md:text-xl font-bold text-white mb-4">
            Is your question not here?
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

export default FAQ;
