import { FaExternalLinkAlt, FaFlask, FaRocket, FaChartPie, FaFileAlt } from 'react-icons/fa';

const Labs = () => {
  const labProjects = [
    {
      name: 'Portfolio Optimization',
      description: 'AI-driven portfolio optimization with real-time rebalancing',
      tools: ['Python', 'TensorFlow', 'Financial Data API'],
      icon: <FaChartPie className="text-3xl text-primary" />,
      createdAt: '2023-12-15',
    },
    {
      name: 'Sentiment Analysis',
      description: 'Market sentiment analysis from news and social media',
      tools: ['NLP', 'Python', 'News API', 'Twitter API'],
      icon: <FaFileAlt className="text-3xl text-primary" />,
      createdAt: '2024-01-20',
    },
    {
      name: 'Risk Assessment',
      description: 'Advanced risk assessment models using machine learning',
      tools: ['R', 'Python', 'Statistical Models', 'Historical Data'],
      icon: <FaFlask className="text-3xl text-primary" />,
      createdAt: '2024-02-05',
    },
    {
      name: 'Automated Trading',
      description: 'Experimental automated trading system with reinforcement learning',
      tools: ['Python', 'Reinforcement Learning', 'Trading API'],
      icon: <FaRocket className="text-3xl text-primary" />,
      createdAt: '2024-03-10',
    },
  ];

  return (
    <div className="py-8" data-testid="labs-page">
      <h1 className="text-3xl font-bold mb-6">Research Labs</h1>
      <p className="text-gray-600 mb-8">Explore experimental tools and POCs developed by our research team.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {labProjects.map((project, index) => (
          <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  {project.icon}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold">{project.name}</h2>
                  <p className="text-sm text-gray-500">Created: {project.createdAt}</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, toolIndex) => (
                    <span key={toolIndex} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <a
                  href="#"
                  className="inline-flex items-center text-primary hover:text-primary/80"
                >
                  <span className="mr-1">Launch project</span>
                  <FaExternalLinkAlt size={12} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Submit Your Idea</h2>
        <p className="text-gray-600 mb-4">
          Have an idea for a new research project? Submit your proposal to the research team.
        </p>
        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
          Submit Proposal
        </button>
      </div>
    </div>
  );
};

export default Labs; 