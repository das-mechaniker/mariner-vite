import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Topbar } from '../../../components/layout';

describe('Topbar Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: BrowserRouter });
  };

  test('renders with breadcrumb', () => {
    const mockOnMenuClick = jest.fn();
    renderWithRouter(<Topbar onMenuClick={mockOnMenuClick} />);
    
    // Check that the breadcrumb exists
    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
  });

  test('calls onMenuClick when menu button is clicked', () => {
    const mockOnMenuClick = jest.fn();
    renderWithRouter(<Topbar onMenuClick={mockOnMenuClick} />);
    
    // Find and click the menu button
    const menuButton = screen.getByTestId('menu-button');
    fireEvent.click(menuButton);
    
    // Verify the click handler was called
    expect(mockOnMenuClick).toHaveBeenCalledTimes(1);
  });

  test('updates breadcrumbs when location changes', () => {
    const mockOnMenuClick = jest.fn();
    
    // Mock window.location to simulate being on a specific page
    // Note: This is a simplified approach; in a real test, you might use React Router's MemoryRouter
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/agent-library'
      },
      writable: true
    });
    
    renderWithRouter(<Topbar onMenuClick={mockOnMenuClick} />);
    
    // The breadcrumb should show the current path
    expect(screen.getByText('Agent library')).toBeInTheDocument();
  });
}); 