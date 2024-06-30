import React from 'react';
import GenerateImageForm from '../components/GenerateImageForm';

const GenerationImagePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Génération d&apos;Images</h1>
      <GenerateImageForm />
    </div>
  );
};

export default GenerationImagePage;
