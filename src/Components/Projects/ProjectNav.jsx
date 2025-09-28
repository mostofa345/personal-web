import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_URL = "VITE_API_URL=https://personal-server-uf48.onrender.com/api";

const ProjectNav = ({ active, onChange }) => {
  const [navTags, setNavTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(`${API_URL}/projectnav`);
        if (!response.ok) {
          throw new Error('Failed to fetch project tags.');
        }
        const data = await response.json();
        const allTags = [{ name: "All" }, ...data];
        setNavTags(allTags);
        setError(null);
      } catch (err) {
        console.error("Error fetching project tags:", err);
        setError("Project tags load kora jayni.");
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  if (loading) {
    return <p className="text-center text-white">Loading project tags...</p>;
  }

  if (error) {
    return <p className="text-center text-red-400">{error}</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {navTags.map((tag) => (
        <motion.button
          key={tag._id || tag.name}
          onClick={() => onChange(tag.name)}
          className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${
            active === tag.name ? "bg-[#7cf03d] text-[#1f242d]" : "bg-[#242a32] text-white hover:bg-[#7cf03d] hover:text-[#1f242d]"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {tag.name}
        </motion.button>
      ))}
    </div>
  );
};

export default ProjectNav;
