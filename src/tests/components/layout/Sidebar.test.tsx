import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Sidebar } from '../../../components/layout';

describe('Sidebar Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: BrowserRouter });
  };

  test('renders all navigation items', () => {
    renderWithRouter(<Sidebar />);
    
    // Check that all navigation items are rendered
    expect(screen.getByTestId('nav-home')).toBeInTheDocument();
    expect(screen.getByTestId('nav-education')).toBeInTheDocument();
    expect(screen.getByTestId('nav-documentation')).toBeInTheDocument();
    expect(screen.getByTestId('nav-agent-library')).toBeInTheDocument();
    expect(screen.getByTestId('nav-labs')).toBeInTheDocument();
    expect(screen.getByTestId('nav-prompt-library')).toBeInTheDocument();
    expect(screen.getByTestId('nav-chat')).toBeInTheDocument();
  });

  test('renders with Project Mariner title', () => {
    renderWithRouter(<Sidebar />);
    
    expect(screen.getByText('Project Mariner')).toBeInTheDocument();
  });

  test('handles closing on mobile', () => {
    const mockOnClose = jest.fn();
    renderWithRouter(<Sidebar isOpen={true} onClose={mockOnClose} />);
    
    // Verify the overlay is rendered when isOpen is true
    const overlay = screen.getByTestId('sidebar-overlay');
    expect(overlay).toBeInTheDocument();
    
    // Click the overlay to close
    overlay.click();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
}); 