import React, { useState } from 'react';

const UserProfile = ({ saveProfile }) => {
  const [name, setName] = useState('');
  const [activityType, setActivityType] = useState('');
  const [subActivityType, setSubActivityType] = useState('');
  const [customActivityType, setCustomActivityType] = useState('');
  const [targetAudience, setTargetAudience] = useState([]);
  const [goals, setGoals] = useState([]);
  const [preferredPlatforms, setPreferredPlatforms] = useState([]);
  const [contentTypes, setContentTypes] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const profileData = {
      name,
      activityType: activityType === 'Autre' ? customActivityType : activityType,
      subActivityType,
      targetAudience,
      goals,
      preferredPlatforms,
      contentTypes,
    };
    saveProfile(profileData);
  };

  const handleCheckboxChange = (event, setState) => {
    const value = event.target.value;
    setState(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const subActivityOptions = {
    'E-commerce': ['Vente de produits physiques', 'Vente de produits numériques', 'Dropshipping', 'Autre'],
    'Services': ['Consultation', 'Coaching', 'Design', 'Développement', 'Autre'],
    'Technologie': ['Développement logiciel', 'Matériel informatique', 'Cyber-sécurité', 'Autre'],
    'Éducation': ['Cours en ligne', 'Tutorat', 'Formations en présentiel', 'Autre'],
    'Santé': ['Médecine', 'Fitness', 'Bien-être', 'Nutrition', 'Autre'],
    'Finance': ['Conseils financiers', 'Comptabilité', 'Investissements', 'Autre'],
    'Hôtellerie': ['Hôtels', 'Restaurants', 'Voyages', 'Autre'],
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-lg w-full max-w-md">
      <h2 className="text-2xl text-white mb-4">Profil Utilisateur</h2>
      <div className="mb-4">
        <label className="block text-white mb-2">Nom:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 bg-gray-900 text-white border border-gray-600 rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Type d&apos;activité:</label>
        <select
          value={activityType}
          onChange={(e) => setActivityType(e.target.value)}
          className="p-2 bg-gray-900 text-white border border-gray-600 rounded w-full"
          required
        >
          <option value="">Sélectionnez un type d&apos;activité</option>
          <option value="E-commerce">E-commerce</option>
          <option value="Services">Services</option>
          <option value="Technologie">Technologie</option>
          <option value="Éducation">Éducation</option>
          <option value="Santé">Santé</option>
          <option value="Finance">Finance</option>
          <option value="Hôtellerie">Hôtellerie</option>
          <option value="Autre">Autre</option>
        </select>
      </div>
      {activityType && activityType !== 'Autre' && (
        <div className="mb-4">
          <label className="block text-white mb-2">Sous-type d&apos;activité:</label>
          <select
            value={subActivityType}
            onChange={(e) => setSubActivityType(e.target.value)}
            className="p-2 bg-gray-900 text-white border border-gray-600 rounded w-full"
            required
          >
            <option value="">Sélectionnez un sous-type d&apos;activité</option>
            {subActivityOptions[activityType].map((subType) => (
              <option key={subType} value={subType}>{subType}</option>
            ))}
          </select>
        </div>
      )}
      {activityType === 'Autre' && (
        <div className="mb-4">
          <label className="block text-white mb-2">Précisez votre activité:</label>
          <input
            type="text"
            value={customActivityType}
            onChange={(e) => setCustomActivityType(e.target.value)}
            className="p-2 bg-gray-900 text-white border border-gray-600 rounded w-full"
            required
          />
        </div>
      )}
      {subActivityType === 'Autre' && (
        <div className="mb-4">
          <label className="block text-white mb-2">Précisez votre sous-type d&apos;activité:</label>
          <input
            type="text"
            value={customActivityType}
            onChange={(e) => setCustomActivityType(e.target.value)}
            className="p-2 bg-gray-900 text-white border border-gray-600 rounded w-full"
            required
          />
        </div>
      )}
      <div className="mb-4">
        <label className="block text-white mb-2">Public cible:</label>
        <div className="flex flex-wrap gap-2">
          {['Adolescents', 'Jeunes adultes', 'Adultes', 'Seniors', 'Professionnels', 'Entreprises', 'Parents', 'Enfants', 'Autre'].map(audience => (
            <label key={audience} className="flex items-center text-white">
              <input
                type="checkbox"
                value={audience}
                onChange={(e) => handleCheckboxChange(e, setTargetAudience)}
                className="mr-2"
              />
              {audience}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Objectifs:</label>
        <div className="flex flex-wrap gap-2">
          {['Augmenter la notoriété de la marque', 'Générer des leads', 'Accroître les ventes', 'Améliorer l\'engagement des utilisateurs', 'Développer une communauté', 'Autre'].map(goal => (
            <label key={goal} className="flex items-center text-white">
              <input
                type="checkbox"
                value={goal}
                onChange={(e) => handleCheckboxChange(e, setGoals)}
                className="mr-2"
              />
              {goal}
            </label>
          ))}
        </div>
      </div>
      {targetAudience.includes('Autre') && (
        <div className="mb-4">
          <label className="block text-white mb-2">Précisez votre public cible:</label>
          <input
            type="text"
            value={customActivityType}
            onChange={(e) => setCustomActivityType(e.target.value)}
            className="p-2 bg-gray-900 text-white border border-gray-600 rounded w-full"
            required
          />
        </div>
      )}
      {goals.includes('Autre') && (
        <div className="mb-4">
          <label className="block text-white mb-2">Précisez vos objectifs:</label>
          <input
            type="text"
            value={customActivityType}
            onChange={(e) => setCustomActivityType(e.target.value)}
            className="p-2 bg-gray-900 text-white border border-gray-600 rounded w-full"
            required
          />
        </div>
      )}
      <div className="mb-4">
        <label className="block text-white mb-2">Plateformes préférées:</label>
        <div className="flex flex-wrap gap-2">
          {['Instagram', 'TikTok', 'Facebook', 'LinkedIn', 'Twitter'].map(platform => (
            <label key={platform} className="flex items-center text-white">
              <input
                type="checkbox"
                value={platform}
                onChange={(e) => handleCheckboxChange(e, setPreferredPlatforms)}
                className="mr-2"
              />
              {platform}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Types de contenu:</label>
        <div className="flex flex-wrap gap-2">
          {['Posts', 'Reels', 'Carrousels', 'Stories', 'Lives'].map(contentType => (
            <label key={contentType} className="flex items-center text-white">
              <input
                type="checkbox"
                value={contentType}
                onChange={(e) => handleCheckboxChange(e, setContentTypes)}
                className="mr-2"
              />
              {contentType}
            </label>
          ))}
        </div>
      </div>
      
      <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full">Sauvegarder</button>
    </form>
  );
};

export default UserProfile;
