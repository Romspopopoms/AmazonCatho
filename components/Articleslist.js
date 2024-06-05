import React, { useState, useEffect } from 'react';

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articlesRes = await fetch('/api/getArticles');
        if (!articlesRes.ok) {
          throw new Error(`Failed to fetch articles: ${articlesRes.statusText}`);
        }
        const articlesData = await articlesRes.json();
        setArticles(articlesData);

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
    fetchData();
  }, []);

  const getArticlesBySubsection = (subsectionName) => {
    return articles.filter(article => article.subsection === subsectionName);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Articles à Acheter</h2>
      {sections.map((section) => (
        <div key={section.name} className="w-full max-w-6xl bg-white p-4 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-2">{section.name}</h3>
          {section.subsections.map((subsection) => (
            <div key={subsection} className="mb-4">
              <h4 className="text-lg font-medium mb-2">{subsection}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {getArticlesBySubsection(subsection).map((article) => (
                  <div key={article.id} className="bg-white p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                    <p className="text-gray-700 mb-2">{article.description}</p>
                    <p className="text-gray-900 font-bold mb-2">{article.price} €</p>
                    <button className="mt-4 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors">Acheter</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ArticlesList;
