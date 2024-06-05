import React, { useState, useEffect } from 'react';

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [sections, setSections] = useState([]);
  const [subsections, setSubsections] = useState([]);

  useEffect(() => {
    const fetchArticlesSectionsAndSubsections = async () => {
      try {
        const articlesRes = await fetch('/api/getArticles');
        const articlesData = await articlesRes.json();
        setArticles(articlesData);

        const sectionsRes = await fetch('/api/getSection');
        const sectionsData = await sectionsRes.json();
        setSections(sectionsData);

        const subsectionsRes = await fetch('/api/getSubsections');
        const subsectionsData = await subsectionsRes.json();
        setSubsections(subsectionsData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchArticlesSectionsAndSubsections();
  }, []);

  const getSectionName = (sectionId) => {
    const section = sections.find(section => section.id === sectionId);
    return section ? section.name : 'Unknown Section';
  };

  const getSubsectionName = (subsectionId) => {
    const subsection = subsections.find(subsection => subsection.id === subsectionId);
    return subsection ? subsection.name : 'Unknown Subsection';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Articles à Acheter</h2>
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
            <p className="text-gray-700 mb-2">{article.description}</p>
            <p className="text-gray-900 font-bold mb-2">{article.price} €</p>
            <p className="text-gray-500 mb-1">Section: {getSectionName(article.sectionId)}</p>
            <p className="text-gray-500">Sous-section: {getSubsectionName(article.subsectionId)}</p>
            <button className="mt-4 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors">Acheter</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesList;
