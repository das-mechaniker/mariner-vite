import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AgentLibrary from '../../pages/AgentLibrary';
import { agentService } from '../../services/api';

// Mock the AgentGrid component
jest.mock('../../components/agent', () => ({
  AgentGrid: ({ agents, isLoading, error, onFavoriteToggle, onSelectAgent }: any) => (
    <div data-testid="agent-grid-component">
      <div>Total Agents: {agents.length}</div>
      <div data-testid="is-loading">{isLoading.toString()}</div>
      <div data-testid="error-message">{error || 'No Error'}</div>
      <button 
        data-testid="toggle-favorite-button" 
        onClick={() => agents[0] && onFavoriteToggle(agents[0].id, !agents[0].isFavorite)}
      >
        Toggle Favorite
      </button>
      <button 
        data-testid="select-agent-button" 
        onClick={() => agents[0] && onSelectAgent(agents[0])}
      >
        Select Agent
      </button>
    </div>
  )
}));

// Mock the agent service
jest.mock('../../services/api', () => ({
  agentService: {
    getAgents: jest.fn(),
    toggleFavorite: jest.fn(),
  }
}));

// Mock agents data
const mockAgents = [
  {
    id: '1',
    name: 'Test Agent 1',
    description: 'Description 1',
    category: 'Category 1',
    icon: '🧪',
    usageCount: 42,
    lastUsed: '2023-03-01T12:00:00.000Z',
    isFavorite: false,
    isPublic: true,
    modelId: 'test-model',
    color: '#4F46E5',
    capabilities: [],
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Test Agent 2',
    description: 'Description 2',
    category: 'Category 2',
    icon: '🤖',
    usageCount: 12,
    lastUsed: '2023-02-15T12:00:00.000Z',
    isFavorite: true,
    isPublic: true,
    modelId: 'test-model-2',
    color: '#10B981',
    capabilities: [],
    createdAt: '2023-01-10T00:00:00.000Z',
    updatedAt: '2023-01-10T00:00:00.000Z'
  }
];

describe('AgentLibrary Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (agentService.getAgents as jest.Mock).mockResolvedValue(mockAgents);
    (agentService.toggleFavorite as jest.Mock).mockResolvedValue({
      ...mockAgents[0],
      isFavorite: true
    });
  });

  it('renders the page title and description', async () => {
    render(<AgentLibrary />);
    
    expect(screen.getByText('Agent Library')).toBeInTheDocument();
    expect(screen.getByText(/Browse and use AI agents/)).toBeInTheDocument();
  });

  it('fetches agents on mount', async () => {
    render(<AgentLibrary />);
    
    expect(agentService.getAgents).toHaveBeenCalledTimes(1);
    
    await waitFor(() => {
      expect(screen.getByTestId('is-loading').textContent).toBe('false');
    });

    expect(screen.getByText('Total Agents: 2')).toBeInTheDocument();
  });

  it('handles search functionality', async () => {
    render(<AgentLibrary />);
    
    await waitFor(() => {
      expect(screen.getByTestId('is-loading').textContent).toBe('false');
    });

    // Type in search input
    const searchInput = screen.getByTestId('agent-search-input');
    fireEvent.change(searchInput, { target: { value: 'Test Agent 1' } });
    
    // Should filter the agents
    expect(screen.getByText('Total Agents: 1')).toBeInTheDocument();

    // Clear search
    fireEvent.change(searchInput, { target: { value: '' } });
    
    // Should show all agents again
    expect(screen.getByText('Total Agents: 2')).toBeInTheDocument();
  });

  it('handles favorite toggle', async () => {
    render(<AgentLibrary />);
    
    await waitFor(() => {
      expect(screen.getByTestId('is-loading').textContent).toBe('false');
    });

    // Click the toggle favorite button
    fireEvent.click(screen.getByTestId('toggle-favorite-button'));
    
    // Should call the toggleFavorite function
    expect(agentService.toggleFavorite).toHaveBeenCalledWith('1', true);
  });

  it('handles search by category', async () => {
    render(<AgentLibrary />);
    
    await waitFor(() => {
      expect(screen.getByTestId('is-loading').textContent).toBe('false');
    });

    // Type in search input
    const searchInput = screen.getByTestId('agent-search-input');
    fireEvent.change(searchInput, { target: { value: 'Category 2' } });
    
    // Should filter the agents by category
    expect(screen.getByText('Total Agents: 1')).toBeInTheDocument();
  });

  it('handles API errors', async () => {
    // Mock an API error
    (agentService.getAgents as jest.Mock).mockRejectedValue(new Error('Failed to fetch agents'));
    
    render(<AgentLibrary />);
    
    await waitFor(() => {
      expect(screen.getByTestId('is-loading').textContent).toBe('false');
    });

    // Should display error message via AgentGrid
    expect(screen.getByTestId('error-message').textContent).toContain('Failed to load agents');
  });
}); 