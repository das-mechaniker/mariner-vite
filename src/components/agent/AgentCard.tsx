import { Agent } from '../../types/api';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

interface AgentCardProps {
  agent: Agent;
  onFavoriteToggle: (id: string, isFavorite: boolean) => void;
  onSelect?: (agent: Agent) => void;
}

/**
 * AgentCard component that displays an individual agent with its details
 * and allows toggling favorite status.
 */
export const AgentCard: React.FC<AgentCardProps> = ({ 
  agent, 
  onFavoriteToggle,
  onSelect
}) => {
  // Format the last used date
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Never used';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Truncate description if too long
  const truncateDescription = (text: string, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength).trim()}...`;
  };

  return (
    <div 
      className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
      data-testid="agent-card"
      onClick={() => onSelect && onSelect(agent)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div 
            className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-medium`}
            style={{ backgroundColor: agent.color || '#4F46E5' }}
          >
            {agent.icon || agent.name.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <h3 className="font-semibold" data-testid="agent-name">{agent.name}</h3>
            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full" data-testid="agent-category">
              {agent.category}
            </span>
          </div>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle(agent.id, !agent.isFavorite);
          }}
          className="text-gray-400 hover:text-yellow-500 transition-colors"
          aria-label={agent.isFavorite ? "Remove from favorites" : "Add to favorites"}
          data-testid="favorite-toggle"
        >
          {agent.isFavorite ? <FaHeart className="text-red-500" /> : <FiHeart />}
        </button>
      </div>
      
      <p className="text-sm text-gray-600 mb-4" data-testid="agent-description">
        {truncateDescription(agent.description)}
      </p>
      
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span data-testid="agent-usage-count">Used {agent.usageCount} times</span>
        <span data-testid="agent-last-used">Last used: {formatDate(agent.lastUsed)}</span>
      </div>
    </div>
  );
};

export default AgentCard; 