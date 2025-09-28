import ProjectCard from "./ProjectCard";
import ProjectNav from "./ProjectNav";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || "VITE_API_URL=https://personal-server-uf48.onrender.com/api";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");

  // Fetch projects from the API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/projects`);
        setProjects(response.data);
      } catch (err) {
        setError("Failed to fetch projects.");
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(["All"]);
    projects.forEach((p) => p.category && cats.add(p.category));
    return Array.from(cats);
  }, [projects]);

  const filtered = useMemo(
    () =>
      projects.filter((p) => (filter === "All" ? true : p.category === filter)),
    [projects, filter]
  );

  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-[#181a1d] text-white text-center">
        <div className="max-w-6xl mx-auto px-6">
          <p>Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 md:py-16 bg-[#181a1d] text-white text-center">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-[#181a1d] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#f6f6f6]">
            My Best Projects
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Click a category to filter projects
          </p>
        </motion.div>

        {/* NAV */}
        <ProjectNav categories={categories} active={filter} onChange={setFilter} />

        {/* GRID */}
        <motion.div
          layout
          // The grid container will automatically adjust card size to fit the content due to the changes in ProjectCard
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.length > 0 ? (
            filtered.map((project) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* ProjectCard now uses flexbox and h-full to ensure equal height */}
                <ProjectCard project={project} />
              </motion.div>
            ))
          ) : (
            <p className="text-center w-full">
              No projects found for this category.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
