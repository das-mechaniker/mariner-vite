import { FaRobot, FaBook, FaFlask, FaListAlt, FaGraduationCap, FaComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  const sections = [
    { title: 'AI Chat', path: '/chat', icon: <FaComment className="text-4xl mb-2" />, color: 'bg-accent' },
    { title: 'Agent Library', path: '/agent-library', icon: <FaRobot className="text-4xl mb-2" />, color: 'bg-primary' },
    { title: 'Documentation', path: '/documentation', icon: <FaBook className="text-4xl mb-2" />, color: 'bg-secondary' },
    { title: 'Research Labs', path: '/labs', icon: <FaFlask className="text-4xl mb-2" />, color: 'bg-success' },
    { title: 'Prompt Library', path: '/prompt-library', icon: <FaListAlt className="text-4xl mb-2" />, color: 'bg-warning' },
    { title: 'Education Hub', path: '/education', icon: <FaGraduationCap className="text-4xl mb-2" />, color: 'bg-danger' },
  ];

  return (
    <div className="py-8" data-testid="home-page">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-dark mb-4">Welcome to Project Mariner</h1>
        <p className="text-xl text-gray-600">Your centralized platform for AI resources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <Link 
            key={index} 
            to={section.path}
            className="flex flex-col items-center justify-center p-8 rounded-lg shadow-md hover:shadow-lg transition-all bg-white border hover:border-primary"
          >
            <div className={`${section.color} p-4 rounded-full text-white mb-4`}>
              {section.icon}
            </div>
            <h2 className="text-xl font-semibold text-dark">{section.title}</h2>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-dark">Quick Chat</h2>
          <p className="text-gray-600">Ask a question to get started</p>
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Type your question here..."
            className="flex-1 p-3 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/90">
            Ask
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home; 