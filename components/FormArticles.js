import React, { useState, useEffect } from 'react';
import { put } from '@vercel/blob';

const ArticleForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [section, setSection] = useState('');
  const [subsection, setSubsection] = useState('');
  const [sections, setSections] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await fetch('/api/getSection');
        const data = await res.json();
        setSections(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSections();
  }, []);
  
  const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
  };
  
  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      //add blob
      const apiKey = process.env.BLOB_READ_WRITE_TOKEN;
      alert(apiKey)
      if (imageFile) {
          const blob = await put(title, imageFile, { access: 'public', token: apiKey });
          const retour = JSON.stringify(blob);
          const datablob = JSON.parse(retour);
        
          console.log('Debug blob:', datablob.url);
      }
      //add blob
      const res = await fetch('/api/addArticle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, price, section, subsection })
      });
      if (res.ok) {
        alert('Article ajouté avec succès');
        setTitle('');
        setDescription('');
        setPrice('');
        setSection('');
        setSubsection('');
        setLoading(false);
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
        <input 
          type="file" 
            onChange={handleImageChange} 
              disabled={loading} 
              className='file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-yellow-600 hover:file:bg-violet-100'
        /> 
        <select 
          value={section} 
          onChange={(e) => setSection(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sélectionnez une section</option>
          {sections.map((section) => (
            <option key={section.name} value={section.name}>
              {section.name}
            </option>
          ))}
        </select>
        <select 
          value={subsection} 
          onChange={(e) => setSubsection(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sélectionnez une sous-section</option>
          {sections.find(s => s.name === section)?.subsections.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors">Ajouter un article</button>
      </form>
    </div>
  );
};

export default ArticleForm;
