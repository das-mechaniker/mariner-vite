import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AgentGrid } from '../../../components/agent';
import { Agent } from '../../../types/api';

// Mock the LoadingIndicator component
jest.mock('../../../components/common', () => ({
  LoadingIndicator: () => <div data-testid="loading-indicator">Loading...</div>
}));

// Mock the AgentCard component
jest.mock('../../../components/agent/AgentCard', () => ({
  __esModule: true,
  default: ({ agent, onFavoriteToggle, onSelect }: any) => (
    <div data-testid={`agent-card-${agent.id}`} onClick={() => onSelect && onSelect(agent)}>
      {agent.name}
      <button 
        data-testid={`favorite-button-${agent.id}`}
        onClick={() => onFavoriteToggle(agent.id, !agent.isFavorite)}
      >
        Favorite
      </button>
    </div>
  )
}));

// Mock agent data
const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Test Agent 1',
    description: 'Description 1',
    category: 'Category 1',
    icon: '🧪',
    modelId: 'test-model-1',
    color: '#4F46E5',
    capabilities: [],
    usageCount: 42,
    lastUsed: '2023-03-01T12:00:00.000Z',
    isFavorite: false,
    isPublic: true,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Test Agent 2',
    description: 'Description 2',
    category: 'Category 2',
    icon: '🤖',
    modelId: 'test-model-2',
    color: '#10B981',
    capabilities: [],
    usageCount: 12,
    lastUsed: '2023-02-15T12:00:00.000Z',
    isFavorite: true,
    isPublic: true,
    createdAt: '2023-01-10T00:00:00.000Z',
    updatedAt: '2023-01-10T00:00:00.000Z'
  }
];

describe('AgentGrid Component', () => {
  const onFavoriteToggleMock = jest.fn();
  const onSelectAgentMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading indicator when isLoading is true', () => {
    render(
      <AgentGrid
        agents={[]}
        isLoading={true}
        onFavoriteToggle={onFavoriteToggleMock}
      />
    );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('renders error message when error is provided', () => {
    const errorMessage = 'Failed to load agents';
    
    render(
      <AgentGrid
        agents={[]}
        error={errorMessage}
        onFavoriteToggle={onFavoriteToggleMock}
      />
    );

    expect(screen.getByTestId('agent-grid-error')).toHaveTextContent(errorMessage);
  });

  it('renders empty state message when no agents are available', () => {
    render(
      <AgentGrid
        agents={[]}
        onFavoriteToggle={onFavoriteToggleMock}
      />
    );

    expect(screen.getByTestId('agent-grid-empty')).toBeInTheDocument();
  });

  it('renders all agents when provided', () => {
    render(
      <AgentGrid
        agents={mockAgents}
        onFavoriteToggle={onFavoriteToggleMock}
        onSelectAgent={onSelectAgentMock}
      />
    );

    expect(screen.getByTestId('agent-grid')).toBeInTheDocument();
    expect(screen.getByTestId('agent-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('agent-card-2')).toBeInTheDocument();
  });
}); 