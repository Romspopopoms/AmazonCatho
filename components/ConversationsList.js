import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ConversationsList = ({ conversations, onAddConversation, onDeleteConversation }) => {
  return (
    <div className="w-1/4 p-4 border-r border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Conversations</h2>
        <button onClick={onAddConversation} className="text-blue-500 hover:text-blue-600">
          <FontAwesomeIcon icon={faPlus} size="lg" />
        </button>
      </div>
      <div className="space-y-2">
        {conversations.map((conv, index) => (
          <div key={index} className="p-2 bg-gray-800 rounded-lg flex justify-between items-center">
            <span>Conversation {index + 1}</span>
            <button onClick={() => onDeleteConversation(index)} className="text-red-500 hover:text-red-600">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationsList;
