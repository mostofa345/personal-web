import React from "react";

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4 hidden lg:block">
      <h2 className="text-lg font-bold mb-4 text-green-400">Menu</h2>
      <ul className="space-y-2">
        <li className="hover:bg-green-500 px-2 py-1 rounded cursor-pointer">Dashboard</li>
        <li className="hover:bg-green-500 px-2 py-1 rounded cursor-pointer">Projects</li>
        <li className="hover:bg-green-500 px-2 py-1 rounded cursor-pointer">Skills</li>
        <li className="hover:bg-green-500 px-2 py-1 rounded cursor-pointer">Contact</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
