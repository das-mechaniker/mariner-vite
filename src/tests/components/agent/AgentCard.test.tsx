import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AgentCard } from '../../../components/agent';
import { Agent } from '../../../types/api';

// Mock agent data
const mockAgent: Agent = {
  id: '1',
  name: 'Test Agent',
  description: 'This is a test agent for unit testing purposes.',
  category: 'Test',
  icon: '🧪',
  modelId: 'test-model',
  color: '#4F46E5',
  capabilities: [],
  usageCount: 42,
  lastUsed: '2023-03-01T12:00:00.000Z',
  isFavorite: false,
  isPublic: true,
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z'
};

describe('AgentCard Component', () => {
  const onFavoriteToggleMock = jest.fn();
  const onSelectMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders agent information correctly', () => {
    render(
      <AgentCard
        agent={mockAgent}
        onFavoriteToggle={onFavoriteToggleMock}
        onSelect={onSelectMock}
      />
    );

    // Check if name, category, and description are rendered
    expect(screen.getByTestId('agent-name')).toHaveTextContent('Test Agent');
    expect(screen.getByTestId('agent-category')).toHaveTextContent('Test');
    expect(screen.getByTestId('agent-description')).toHaveTextContent('This is a test agent for unit testing purposes.');
    
    // Check usage information
    expect(screen.getByTestId('agent-usage-count')).toHaveTextContent('Used 42 times');
    expect(screen.getByTestId('agent-last-used')).toHaveTextContent('Last used: Mar 1, 2023');
  });

  it('truncates long descriptions', () => {
    const longDescriptionAgent = {
      ...mockAgent,
      description: 'This is a very long description that should be truncated because it exceeds the maximum length allowed for display in the card component and we want to make sure it works properly.'
    };

    render(
      <AgentCard
        agent={longDescriptionAgent}
        onFavoriteToggle={onFavoriteToggleMock}
      />
    );

    const description = screen.getByTestId('agent-description').textContent;
    expect(description).toContain('...');
    expect(description?.length).toBeLessThan(longDescriptionAgent.description.length);
  });

  it('calls onFavoriteToggle when favorite button is clicked', () => {
    render(
      <AgentCard
        agent={mockAgent}
        onFavoriteToggle={onFavoriteToggleMock}
      />
    );

    // Click the favorite button
    fireEvent.click(screen.getByTestId('favorite-toggle'));
    
    // Check if the onFavoriteToggle function was called with correct args
    expect(onFavoriteToggleMock).toHaveBeenCalledWith('1', true);
  });

  it('calls onSelect when the card is clicked', () => {
    render(
      <AgentCard
        agent={mockAgent}
        onFavoriteToggle={onFavoriteToggleMock}
        onSelect={onSelectMock}
      />
    );

    // Click the card (not the favorite button)
    fireEvent.click(screen.getByTestId('agent-card'));
    
    // Check if the onSelect function was called with the agent
    expect(onSelectMock).toHaveBeenCalledWith(mockAgent);
  });

  it('displays different icon for favorited agents', () => {
    const favoritedAgent = { ...mockAgent, isFavorite: true };
    
    const { rerender } = render(
      <AgentCard
        agent={mockAgent}
        onFavoriteToggle={onFavoriteToggleMock}
      />
    );

    // Initially not favorited
    expect(screen.getByTestId('favorite-toggle').innerHTML).not.toContain('text-red-500');
    
    // Rerender with favorited agent
    rerender(
      <AgentCard
        agent={favoritedAgent}
        onFavoriteToggle={onFavoriteToggleMock}
      />
    );
    
    // Should now show favorited icon
    expect(screen.getByTestId('favorite-toggle').innerHTML).toContain('text-red-500');
  });
}); 