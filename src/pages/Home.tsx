import { FaRobot, FaBook, FaFlask, FaListAlt, FaGraduationCap, FaComment, FaSearch } from 'react-icons/fa';
import { QuickLinkCard, ChatInputPlaceholder } from '../components/common';

const Home = () => {
  const sections = [
    { 
      title: 'AI Chat', 
      path: '/chat', 
      icon: <FaComment className="text-4xl" />, 
      color: 'bg-accent',
      description: 'Interact with advanced AI assistants to get instant answers to your questions.'
    },
    { 
      title: 'Agent Library', 
      path: '/agent-library', 
      icon: <FaRobot className="text-4xl" />, 
      color: 'bg-primary',
      description: 'Explore our collection of specialized AI agents for investment professionals.'
    },
    { 
      title: 'Documentation', 
      path: '/documentation', 
      icon: <FaBook className="text-4xl" />, 
      color: 'bg-secondary',
      description: 'Access comprehensive documentation on AI tools, techniques, and best practices.'
    },
    { 
      title: 'Research Labs', 
      path: '/labs', 
      icon: <FaFlask className="text-4xl" />, 
      color: 'bg-success',
      description: 'Discover experimental AI applications and prototypes for investment research.'
    },
    { 
      title: 'Prompt Library', 
      path: '/prompt-library', 
      icon: <FaListAlt className="text-4xl" />, 
      color: 'bg-warning',
      description: 'Find and share optimized prompts for common investment analysis tasks.'
    },
    { 
      title: 'Education Hub', 
      path: '/education', 
      icon: <FaGraduationCap className="text-4xl" />, 
      color: 'bg-danger',
      description: 'Learn about AI applications in finance through curated educational resources.'
    },
    {
      title: 'Enterprise Search',
      path: '/search',
      icon: <FaSearch className="text-4xl" />,
      color: 'bg-dark',
      description: 'Search across all enterprise resources and AI tools in one place.'
    }
  ];

  return (
    <div className="py-8 px-4" data-testid="home-page">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-dark mb-4">Welcome to Project Mariner</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your centralized platform for AI resources, designed to empower investment professionals 
          with cutting-edge tools, comprehensive documentation, and specialized AI agents.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {sections.map((section, index) => (
          <QuickLinkCard
            key={index}
            title={section.title}
            description={section.description}
            path={section.path}
            icon={section.icon}
            color={section.color}
          />
        ))}
      </div>

      <div className="mt-12 max-w-3xl mx-auto">
        <ChatInputPlaceholder />
      </div>
    </div>
  );
};

export default Home; 