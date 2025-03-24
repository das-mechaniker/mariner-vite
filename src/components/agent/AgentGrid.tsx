import { Agent } from '../../types/api';
import AgentCard from './AgentCard';
import { LoadingIndicator } from '../common';

interface AgentGridProps {
  agents: Agent[];
  isLoading?: boolean;
  error?: string;
  onFavoriteToggle: (id: string, isFavorite: boolean) => void;
  onSelectAgent?: (agent: Agent) => void;
}

/**
 * AgentGrid component that displays a responsive grid of agents
 */
export const AgentGrid: React.FC<AgentGridProps> = ({
  agents,
  isLoading = false,
  error,
  onFavoriteToggle,
  onSelectAgent
}) => {
  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md" data-testid="agent-grid-error">
        {error}
      </div>
    );
  }

  if (agents.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500" data-testid="agent-grid-empty">
        No agents found. Try adjusting your search criteria.
      </div>
    );
  }

  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      data-testid="agent-grid"
    >
      {agents.map((agent) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          onFavoriteToggle={onFavoriteToggle}
          onSelect={onSelectAgent}
        />
      ))}
    </div>
  );
};

export default AgentGrid; 