import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SectionSubsectionForm = () => {
  const [sectionName, setSectionName] = useState('');
  const [subsectionName, setSubsectionName] = useState('');
  const [sectionId, setSectionId] = useState('');
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await axios.get('/api/sections');
        setSections(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSections();
  }, []);

  const handleSectionSubmit = async (e) => {
    e.preventDefault();
    try {
      var obj = {section: sectionName, subsection: ''};
      const response = await fetch('/api/addSousSection', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj)
      });      
      //const res = await axios.post('/api/sections', { name: sectionName });
      setSections([...sections, res.data]);
      setSectionName('');
    } catch (err) {
      console.error(err);
      alert('Une erreur est survenue lors de l\'ajout de la section');
    }
  };

  const handleSubsectionSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/subsections', { name: subsectionName, sectionId });
      setSubsectionName('');
      alert('Sous-section ajoutée avec succès');
    } catch (err) {
      console.error(err);
      alert('Une erreur est survenue lors de l\'ajout de la sous-section');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Ajouter une section</h2>
      <form onSubmit={handleSectionSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-4">
        <input
          type="text"
          placeholder="Nom de la section"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors">Ajouter une section</button>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4">Ajouter une sous-section</h2>
      <form onSubmit={handleSubsectionSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-4">
        <input
          type="text"
          placeholder="Nom de la sous-section"
          value={subsectionName}
          onChange={(e) => setSubsectionName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select 
          value={sectionId} 
          onChange={(e) => setSectionId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sélectionnez une section</option>
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.name}
            </option>
          ))}
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors">Ajouter une sous-section</button>
      </form>
    </div>
  );
};

export default SectionSubsectionForm;
