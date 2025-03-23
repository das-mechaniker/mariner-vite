import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Breadcrumb } from '../../../components/layout';
import { BreadcrumbItem } from '../../../types/layout';

describe('Breadcrumb Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: BrowserRouter });
  };

  const mockItems: BreadcrumbItem[] = [
    { title: 'Parent', path: '/parent' },
    { title: 'Child', path: '/parent/child' },
    { title: 'Current Page', path: '/parent/child/current' },
  ];

  test('renders all breadcrumb items', () => {
    renderWithRouter(<Breadcrumb items={mockItems} />);
    
    // Home is always shown
    expect(screen.getByText('Home')).toBeInTheDocument();
    
    // Check that all provided items are rendered
    expect(screen.getByText('Parent')).toBeInTheDocument();
    expect(screen.getByText('Child')).toBeInTheDocument();
    expect(screen.getByText('Current Page')).toBeInTheDocument();
  });

  test('last item is not a link and has current page marker', () => {
    renderWithRouter(<Breadcrumb items={mockItems} />);
    
    // The last item should be marked as the current page
    const currentPage = screen.getByText('Current Page');
    expect(currentPage.closest('[aria-current="page"]')).toBeInTheDocument();
    
    // The last item should not be a link
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3); // Home, Parent, and Child, but not Current Page
    
    // Verify each link has the correct href
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/parent');
    expect(links[2]).toHaveAttribute('href', '/parent/child');
  });

  test('renders correctly with empty items', () => {
    renderWithRouter(<Breadcrumb items={[]} />);
    
    // Only Home should be shown
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });
}); 