import { useEffect, useState } from 'react';
import { Agent } from '../types/api';
import { AgentGrid } from '../components/agent';
import { agentService } from '../services/api';
import { FiSearch } from 'react-icons/fi';

const AgentLibrary = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch agents on component mount
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setIsLoading(true);
        const fetchedAgents = await agentService.getAgents();
        setAgents(fetchedAgents);
        setFilteredAgents(fetchedAgents);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load agents. Please try again later.');
        setIsLoading(false);
        console.error('Error fetching agents:', err);
      }
    };

    fetchAgents();
  }, []);

  // Filter agents based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredAgents(agents);
    } else {
      const filtered = agents.filter(
        (agent) =>
          agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAgents(filtered);
    }
  }, [searchTerm, agents]);

  // Handle favorite toggle
  const handleFavoriteToggle = async (id: string, isFavorite: boolean) => {
    try {
      await agentService.toggleFavorite(id, isFavorite);
      
      // Update state with toggled favorite
      setAgents(
        agents.map((agent) =>
          agent.id === id ? { ...agent, isFavorite } : agent
        )
      );
    } catch (err) {
      console.error('Error toggling favorite:', err);
      // Show error notification (could implement a toast component)
    }
  };

  // Handle selecting an agent
  const handleSelectAgent = (agent: Agent) => {
    // This would typically navigate to a detail page or open a modal
    console.log('Selected agent:', agent);
    // Future implementation: navigate to detail page
  };

  return (
    <div className="py-8" data-testid="agent-library-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Agent Library</h1>
        <p className="text-gray-600">Browse and use AI agents for investment professionals.</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-10 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search agents by name, description, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-testid="agent-search-input"
          />
        </div>
        
        <AgentGrid
          agents={filteredAgents}
          isLoading={isLoading}
          error={error || undefined}
          onFavoriteToggle={handleFavoriteToggle}
          onSelectAgent={handleSelectAgent}
        />
      </div>
    </div>
  );
};

export default AgentLibrary; 