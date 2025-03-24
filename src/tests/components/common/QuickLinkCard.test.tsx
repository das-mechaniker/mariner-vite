import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QuickLinkCard } from '../../../components/common/QuickLinkCard';
import { FaBook } from 'react-icons/fa';

describe('QuickLinkCard', () => {
  const mockProps = {
    title: 'Test Title',
    description: 'Test Description',
    path: '/test-path',
    icon: <FaBook data-testid="test-icon" />,
    color: 'bg-primary'
  };

  it('renders the component with all props', () => {
    render(
      <BrowserRouter>
        <QuickLinkCard {...mockProps} />
      </BrowserRouter>
    );

    // Check if the title is rendered
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    
    // Check if the description is rendered
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    
    // Check if the icon is rendered
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    
    // Check if the button is rendered with the correct text
    expect(screen.getByText('Go to Test Title')).toBeInTheDocument();
    
    // Check if the link has the correct path
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test-path');
  });

  it('applies the correct color class', () => {
    render(
      <BrowserRouter>
        <QuickLinkCard {...mockProps} />
      </BrowserRouter>
    );

    // Get the icon container and check if it has the correct color class
    const iconContainer = screen.getByTestId('test-icon').closest('div');
    expect(iconContainer).toHaveClass('bg-primary');
  });
}); 