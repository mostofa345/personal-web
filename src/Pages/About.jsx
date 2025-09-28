import React from "react";
import { motion } from "framer-motion";

const About = () => {
  const skills = [
    { name: "Digital Marketing", icon: "📊" },
    { name: "Web Design", icon: "🎨" },
    { name: "Web Development", icon: "💻" },
    { name: "Software Development", icon: "⚙️" },
    { name: "Graphic Design", icon: "🖌️" },
  ];

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
            About Me
          </h1>
          <p className="text-lg md:text-xl text-[#7cf03d]">
            A passionate professional dedicated to creating exceptional digital experiences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-[#242a32] p-6 md:p-12 rounded-xl shadow-2xl border border-[#3b3b3b] text-center"
        >
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">MD Sazzadur Rahman</h2>
            <p className="text-base md:text-lg text-gray-400">
              I am a versatile professional with a strong foundation in digital marketing, web design, and software development. I specialize in building user-friendly and visually appealing websites that help businesses succeed online. My passion lies in bridging the gap between design and functionality to deliver impactful digital solutions.
            </p>
          </div>
          
          <div className="border-t border-[#3b3b3b] pt-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">My Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="bg-[#1f242d] p-6 rounded-lg shadow-lg flex items-center justify-center space-x-4 border border-[#7cf03d] transition-transform duration-300 hover:scale-105"
                >
                  <span className="text-3xl">{skill.icon}</span>
                  <p className="text-xl font-semibold text-white">{skill.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mt-16"
        >
          <p className="text-lg md:text-xl font-bold text-white mb-4">
            Ready to start a new project?
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

export default About;
