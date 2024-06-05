import React from 'react';

const Navbar = ({ sections, onSelectSubsection }) => {
  return (
    <nav className="bg-blue-500 p-4 text-white w-full">
      <ul className="flex space-x-4">
        {sections.map((section) => (
          <li key={section.name} className="relative group">
            <button className="focus:outline-none">
              {section.name}
            </button>
            <ul className="absolute left-0 top-full mt-2 w-48 bg-white text-black shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {section.subsections.map((subsection) => (
                <li key={subsection}>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    onClick={() => onSelectSubsection(subsection)}
                  >
                    {subsection}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
