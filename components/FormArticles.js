import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArticleForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [sectionId, setSectionId] = useState('');
  const [subsectionId, setSubsectionId] = useState('');
  const [sections, setSections] = useState([]);
  const [subsections, setSubsections] = useState([]);

  useEffect(() => {
    const fetchSectionsAndSubsections = async () => {
      try {
        const sectionsRes = await axios.get('/api/sections');
        setSections(sectionsRes.data);

        const subsectionsRes = await axios.get('/api/subsections');
        setSubsections(subsectionsRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSectionsAndSubsections();
  }, []);

  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/articles', { title, description, price, sectionId, subsectionId });
      alert('Article ajouté avec succès');
      setTitle('');
      setDescription('');
      setPrice('');
      setSectionId('');
      setSubsectionId('');
    } catch (err) {
      console.error(err);
      alert('Une erreur est survenue lors de l\'ajout de l\'article');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Ajouter un article</h2>
      <form onSubmit={handleArticleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-4">
        <input
          type="text"
          placeholder="Titre de l'article"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Description de l'article"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Prix de l'article"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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
        <select 
          value={subsectionId} 
          onChange={(e) => setSubsectionId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sélectionnez une sous-section</option>
          {subsections.filter(subsection => subsection.section_id === sectionId).map((subsection) => (
            <option key={subsection.id} value={subsection.id}>
              {subsection.name}
            </option>
          ))}
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors">Ajouter un article</button>
      </form>
    </div>
  );
};

export default ArticleForm;
