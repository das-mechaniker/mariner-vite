import { useState } from 'react';
import { FaPaperPlane, FaRobot, FaUser, FaRegSmile, FaPaperclip } from 'react-icons/fa';

const Chat = () => {
  const [message, setMessage] = useState('');
  
  // Mock chat messages
  const initialMessages = [
    {
      sender: 'bot',
      content: 'Hello! I\'m your AI assistant for Project Mariner. How can I help you today?',
      timestamp: new Date(Date.now() - 60000 * 15).toISOString(),
    },
    {
      sender: 'user',
      content: 'Can you explain what Project Mariner is?',
      timestamp: new Date(Date.now() - 60000 * 10).toISOString(),
    },
    {
      sender: 'bot',
      content: 'Project Mariner is a platform designed to centralize AI resources for investment professionals. It includes tools like agent libraries, documentation, research labs, and prompt libraries to help you leverage AI in your investment work.',
      timestamp: new Date(Date.now() - 60000 * 5).toISOString(),
    },
  ];
  
  const [messages, setMessages] = useState(initialMessages);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = {
      sender: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, userMessage]);
    setMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        sender: 'bot',
        content: 'This is a placeholder response. In the full implementation, this would be an actual response from an AI model.',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);
  };
  
  return (
    <div className="py-8 h-full" data-testid="chat-page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">AI Chat</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col h-[calc(100vh-220px)]">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
              <FaRobot />
            </div>
            <div className="ml-3">
              <h2 className="font-semibold">Mariner Assistant</h2>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[75%] rounded-lg p-3 ${
                msg.sender === 'user' 
                  ? 'bg-primary text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}>
                <div className="flex items-center mb-1">
                  {msg.sender === 'bot' ? (
                    <FaRobot className="mr-2 text-primary" />
                  ) : (
                    <FaUser className="mr-2 text-white" />
                  )}
                  <span className="text-xs">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex items-center">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-primary"
              title="Attach file"
            >
              <FaPaperclip />
            </button>
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-primary"
              title="Insert emoji"
            >
              <FaRegSmile />
            </button>
            <input
              type="text"
              className="flex-grow mx-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="p-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center"
              disabled={!message.trim()}
            >
              <FaPaperPlane className="mr-1" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;

 