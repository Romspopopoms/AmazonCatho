import React, { useState, useEffect } from 'react';

const ArticleForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [subsectionId, setSubsectionId] = useState('');
  const [subsections, setSubsections] = useState([]);

  useEffect(() => {
    const fetchSubsections = async () => {
      try {
        const subsectionsRes = await fetch('/api/getSubSection');
        const subsectionsData = await subsectionsRes.json();
        setSubsections(subsectionsData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSubsections();
  }, []);

  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, price, sectionId, subsectionId })
      });
      if (res.ok) {
        alert('Article ajouté avec succès');
        setTitle('');
        setDescription('');
        setPrice('');
        setSectionId('');
        setSubsectionId('');
      } else {
        alert('Une erreur est survenue lors de l\'ajout de l\'article');
      }
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
