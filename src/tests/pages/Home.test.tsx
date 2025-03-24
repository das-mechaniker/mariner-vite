import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home';
import * as CommonComponents from '../../components/common';

// Mock the components used in Home
jest.mock('../../components/common', () => ({
  ...jest.requireActual('../../components/common'),
  QuickLinkCard: jest.fn(({ title }) => (
    <div data-testid="quick-link-card">{title}</div>
  )),
  ChatInputPlaceholder: jest.fn(() => (
    <div data-testid="chat-input-placeholder">Chat Input Placeholder</div>
  ))
}));

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the welcome section correctly', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Check if the title is rendered
    expect(screen.getByText('Welcome to Project Mariner')).toBeInTheDocument();
    
    // Check for the description text
    expect(screen.getByText(/Your centralized platform for AI resources/i)).toBeInTheDocument();
  });

  it('renders the correct number of QuickLinkCard components', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // We should have 7 sections (AI Chat, Agent Library, Documentation, etc.)
    const quickLinkCards = screen.getAllByTestId('quick-link-card');
    expect(quickLinkCards).toHaveLength(7);
    
    // Check if all section names are present
    expect(screen.getByText('AI Chat')).toBeInTheDocument();
    expect(screen.getByText('Agent Library')).toBeInTheDocument();
    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(screen.getByText('Research Labs')).toBeInTheDocument();
    expect(screen.getByText('Prompt Library')).toBeInTheDocument();
    expect(screen.getByText('Education Hub')).toBeInTheDocument();
    expect(screen.getByText('Enterprise Search')).toBeInTheDocument();
  });

  it('renders the ChatInputPlaceholder component', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByTestId('chat-input-placeholder')).toBeInTheDocument();
    expect(CommonComponents.ChatInputPlaceholder).toHaveBeenCalled();
  });
}); 