import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Agent } from '../types/api';
import { agentService } from '../services/api';
import { QuickLinkCard } from '../components/common/QuickLinkCard';
import { ChatInputPlaceholder } from '../components/common/ChatInputPlaceholder';
import { LoadingIndicator } from '../components/common';

// Icons
import { GoLightBulb } from 'react-icons/go';
import { RiRobot2Line } from 'react-icons/ri';
import { TbBooks } from 'react-icons/tb';
import { AiOutlineExperiment } from 'react-icons/ai';
import { SlNotebook } from 'react-icons/sl';

const Home = () => {
  const [featuredAgents, setFeaturedAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedAgents = async () => {
      try {
        setIsLoading(true);
        const agents = await agentService.getFeaturedAgents();
        setFeaturedAgents(agents);
      } catch (err) {
        console.error('Error fetching featured agents:', err);
        setError('Failed to load featured agents');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedAgents();
  }, []);

  return (
    <div className="py-8" data-testid="home-page">
      {/* Welcome section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-3">Welcome to Project Mariner</h1>
        <p className="text-xl text-gray-600">
          Your AI-powered platform for investment professionals
        </p>
      </div>

      {/* Quick links section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <QuickLinkCard
            title="Prompt Library"
            description="Access and create prompts for your use cases"
            icon={<GoLightBulb size={24} />}
            path="/prompt-library"
            color="bg-amber-100 text-amber-600"
          />
          <QuickLinkCard
            title="Agent Library"
            description="Browse and use AI agents"
            icon={<RiRobot2Line size={24} />}
            path="/agent-library"
            color="bg-indigo-100 text-indigo-600"
          />
          <QuickLinkCard
            title="Education"
            description="Learn AI best practices and techniques"
            icon={<TbBooks size={24} />}
            path="/education"
            color="bg-green-100 text-green-600"
          />
          <QuickLinkCard
            title="Research Labs"
            description="Explore experimental AI features"
            icon={<AiOutlineExperiment size={24} />}
            path="/labs"
            color="bg-purple-100 text-purple-600"
          />
          <QuickLinkCard
            title="Documentation"
            description="Read user guides and API docs"
            icon={<SlNotebook size={24} />}
            path="/documentation"
            color="bg-blue-100 text-blue-600"
          />
        </div>
      </div>

      {/* Chat placeholder */}
      <div className="mb-12">
        <ChatInputPlaceholder />
      </div>

      {/* Featured agents section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Featured Agents</h2>
          <Link to="/agent-library" className="text-primary hover:underline">
            View all
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <LoadingIndicator />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : featuredAgents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No featured agents available</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAgents.map((agent) => (
              <div
                key={agent.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-3">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: agent.color || '#4F46E5' }}
                  >
                    {agent.icon || agent.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold">{agent.name}</h3>
                    <span className="text-xs text-gray-500">{agent.category}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {agent.description}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Used {agent.usageCount} times</span>
                  <Link
                    to={`/agent-library?agent=${agent.id}`}
                    className="text-primary hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home; 