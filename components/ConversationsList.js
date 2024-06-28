import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const ConversationsList = ({ conversations, currentConversation, onAddConversation, onDeleteConversation, onSelectConversation }) => {
  return (
    <div className="w-1/4 p-4 border-r border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Conversations</h2>
        <button onClick={onAddConversation} className="text-blue-500 hover:text-blue-600">
          <FontAwesomeIcon icon={faPlus} size="lg" />
        </button>
      </div>
      <div className="space-y-2">
        {conversations.map((conv, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg flex justify-between items-center cursor-pointer transition-all duration-300 ${index === currentConversation ? 'bg-blue-700 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => onSelectConversation(index)}
          >
            <span>Conversation {index + 1}</span>
            <button onClick={(e) => { e.stopPropagation(); onDeleteConversation(index); }} className="text-red-500 hover:text-red-600">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationsList;
