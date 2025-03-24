import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

export const ChatInputPlaceholder: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-dark">Quick Chat</h2>
        <p className="text-gray-600">Ask a question to get started</p>
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="Type your question here..."
          className="flex-1 p-3 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Chat input"
        />
        <button 
          className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/90 flex items-center justify-center"
          aria-label="Send message"
        >
          <FaPaperPlane className="mr-2" />
          Ask
        </button>
      </div>
    </div>
  );
}; 