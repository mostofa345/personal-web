import "./Home.css";
import Newsletter from "../Components/layout/Newsletter";
import ProjectsSection from "../Components/Projects/ProjectsSection";
import React, { useEffect, useState } from "react";
import profileImg from "../assets/profile.png";
import { motion } from "framer-motion";
import { FaDiscord, FaFacebookF, FaGithub, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Home = () => {
  const jobTitles = ["Programmer", "Designer", "Developer", "Ethical-Hacker", "Marketer"];
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const location = useLocation();

  // Smooth Scroll for Hash Links
  useEffect(() => {
    if (location.hash) {
      const targetElement = document.getElementById(location.hash.substring(1));
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    }
  }, [location]);

  // Typing Effect
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % jobTitles.length;
      const fullText = jobTitles[i];

      setTypedText(
        isDeleting ? fullText.substring(0, typedText.length - 1) : fullText.substring(0, typedText.length + 1)
      );

      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && typedText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimeout);
  }, [typedText, isDeleting, loopNum, typingSpeed, jobTitles]);

  return (
    <div className="flex flex-col bg-[#1f242d] text-white min-h-screen">
      <main className="flex-1 flex items-center justify-center px-6 md:px-12">
        <section
          id="Home"
          className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-20 py-20 w-full max-w-6xl"
        >
          {/* Left Text Section */}
          <div className="home-detail flex-1 text-center md:text-left">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              MD Sazzadur Rahman
            </motion.h1>

            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              I'm a{" "}
              <span className="text-[#7cf03d] border-r-4 border-[#7cf03d] pr-1">
                {typedText}
              </span>
            </motion.h2>

            {/* Buttons & Social Links */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <a
                href="#"
                className="inline-block px-8 py-3 bg-[#7cf03d] text-[#1f242d] font-semibold rounded-full shadow-lg transition-all duration-300 hover:bg-transparent hover:text-[#7cf03d] hover:shadow-none border-2 border-[#7cf03d]"
              >
                Download CV
              </a>

              {/* Social Icons */}
              <div className="sci flex space-x-4">
                {[FaGithub, FaYoutube, FaLinkedinIn, FaDiscord, FaFacebookF].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-12 h-12 flex justify-center items-center rounded-full border-2 border-[#7cf03d] text-[#7cf03d] hover:bg-[#7cf03d] hover:text-[#1f242d] transition-all duration-300"
                  >
                    <Icon className="text-2xl" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Profile Image Section */}
          <div className="home-img">
            <div className="img-box">
              <div className="img-item">
                <img src={profileImg} alt="Profile" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Projects Section */}
      <ProjectsSection />

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default Home;