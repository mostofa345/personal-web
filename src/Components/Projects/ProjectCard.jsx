import React, { useState } from "react";
import { FaCode, FaEye } from "react-icons/fa";

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  const openNew = (url) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  // ফিক্সড ইমেজ URL লজিক: project.images অ্যারের প্রথম URL ব্যবহার করা হচ্ছে
  const defaultImageUrl = "https://placehold.co/600x400/242a32/fff?text=No+Image";

  const imageUrl =
    project.images && project.images.length > 0
      ? project.images[0]
      : defaultImageUrl;

  return (
    // Card container is now set to display flex column
    <div
      className="relative bg-[#2a2f3a] rounded-2xl overflow-hidden shadow-lg border border-[#7cf03d]/30 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col h-full" // Added flex flex-col h-full
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* IMAGE (Fixed Height) */}
      <div className="relative h-56 overflow-hidden flex-shrink-0">
        <img
          src={imageUrl} // ফিক্সড URL ব্যবহার করা হলো
          alt={project.title || "Project Image"}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />

        {/* OVERLAY ICONS */}
        <div
          className={`absolute inset-0 flex items-center justify-center gap-6 bg-black/50 transition-all duration-300 ${
            isHovered ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {project.githubLink && (
            <button
              onClick={() => openNew(project.githubLink)}
              className="p-4 rounded-full bg-[#1f242d] text-[#7cf03d] border border-[#7cf03d] hover:bg-[#7cf03d] hover:text-[#1f242d] transition text-2xl"
              title="View Code"
            >
              <FaCode />
            </button>
          )}

          {project.liveLink && (
            <button
              onClick={() => openNew(project.liveLink)}
              className="p-4 rounded-full bg-[#1f242d] text-[#7cf03d] border border-[#7cf03d] hover:bg-[#7cf03d] hover:text-[#1f242d] transition text-2xl"
              title="View Live"
            >
              <FaEye />
            </button>
          )}
        </div>
      </div>

      {/* CARD BODY - This section uses flex-grow to take up remaining vertical space */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Project Title - Boro Akare */}
        <h3 className="text-2xl font-bold text-white mb-2 hover:text-[#7cf03d] transition duration-300 flex-shrink-0">
          {project.title}
        </h3>

        {/* Short Description - Fixed Height and clamped to 3 lines (to ensure consistent card height) */}
        <p className="text-gray-300 text-sm mb-3 hover:text-[#7cf03d] transition duration-300 h-16 line-clamp-3 overflow-hidden flex-shrink-0">
          {project.shortDescription}
        </p>

        {/* TAGS - Always pushed to the bottom due to flex-grow on the content above it */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags &&
            Array.isArray(project.tags) &&
            project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs rounded-full bg-[#1f242d] text-[#7cf03d] border border-[#7cf03d]/40"
              >
                {tag}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
