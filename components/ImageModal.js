import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';

const ImageModal = ({ imageUrl, onClose, onDelete }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'saved-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async () => {
    await onDelete(imageUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg relative">
        <button className="absolute top-2 right-2" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <img src={imageUrl} alt="Saved" className="w-full h-auto mb-4" />
        <div className="flex justify-between">
          <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleDownload}>
            <FontAwesomeIcon icon={faDownload} /> Télécharger
          </button>
          <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} /> Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
