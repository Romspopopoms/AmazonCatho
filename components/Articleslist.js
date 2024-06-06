import React, { useState, useEffect } from 'react';

const ArticlesList = ({ selectedSubsection }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articlesRes = await fetch('/api/getArticles');
        if (!articlesRes.ok) {
          throw new Error(`Failed to fetch articles: ${articlesRes.statusText}`);
        }
        const articlesData = await articlesRes.json();
        setArticles(articlesData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const filteredArticles = articles.filter(article => article.subsection === selectedSubsection);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Articles à Acheter</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredArticles.map((article) => (
          <div key={article.id} className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={article.imageurl}
              alt={article.title}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
            <p className="text-gray-700 mb-2">{article.description}</p>
            <p className="text-gray-900 font-bold mb-2">{article.price} €</p>
            <button className="mt-4 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors">Acheter</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesList;
