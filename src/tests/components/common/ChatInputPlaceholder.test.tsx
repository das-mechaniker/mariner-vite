import { render, screen } from '@testing-library/react';
import { ChatInputPlaceholder } from '../../../components/common/ChatInputPlaceholder';

describe('ChatInputPlaceholder', () => {
  it('renders the component correctly', () => {
    render(<ChatInputPlaceholder />);

    // Check if the title is displayed
    expect(screen.getByText('Quick Chat')).toBeInTheDocument();
    
    // Check if the subtitle is displayed
    expect(screen.getByText('Ask a question to get started')).toBeInTheDocument();
    
    // Check if the input field is displayed
    expect(screen.getByPlaceholderText('Type your question here...')).toBeInTheDocument();
    
    // Check if the button is displayed
    expect(screen.getByText('Ask')).toBeInTheDocument();
  });

  it('has the correct accessibility attributes', () => {
    render(<ChatInputPlaceholder />);
    
    // Check if the input has the correct aria-label
    const input = screen.getByLabelText('Chat input');
    expect(input).toBeInTheDocument();
    
    // Check if the button has the correct aria-label
    const button = screen.getByLabelText('Send message');
    expect(button).toBeInTheDocument();
  });
}); 