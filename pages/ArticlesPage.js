import React, { useState, useEffect } from 'react';
import NavbarSection from '../components/NavbarSection';
import ArticlesList from '../components/Articleslist';

const HomePage = () => {
  const [sections, setSections] = useState([]);
  const [selectedSubsection, setSelectedSubsection] = useState('');

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const sectionsRes = await fetch('/api/getSection');
        if (!sectionsRes.ok) {
          throw new Error(`Failed to fetch sections: ${sectionsRes.statusText}`);
        }
        const sectionsData = await sectionsRes.json();
        setSections(sectionsData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSections();
  }, []);

  const handleSelectSubsection = (subsection) => {
    setSelectedSubsection(subsection);
  };

  return (
    <div>
      <NavbarSection sections={sections} onSelectSubsection={handleSelectSubsection} />
      <ArticlesList selectedSubsection={selectedSubsection} />
    </div>
  );
};

export default HomePage;
