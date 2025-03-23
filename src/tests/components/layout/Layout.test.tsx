import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from '../../../components/layout';

describe('Layout Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: BrowserRouter });
  };

  test('renders the sidebar', () => {
    renderWithRouter(
      <Layout>
        <div data-testid="layout-child">Layout Content</div>
      </Layout>
    );
    
    // Check that the sidebar is rendered
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('renders the topbar with menu button', () => {
    renderWithRouter(
      <Layout>
        <div data-testid="layout-child">Layout Content</div>
      </Layout>
    );
    
    // Check that the topbar is rendered
    expect(screen.getByTestId('topbar')).toBeInTheDocument();
    
    // Check that the menu button is rendered
    expect(screen.getByTestId('menu-button')).toBeInTheDocument();
  });

  test('renders the children content', () => {
    renderWithRouter(
      <Layout>
        <div data-testid="layout-child">Layout Content</div>
      </Layout>
    );
    
    // Check that the children content is rendered
    expect(screen.getByTestId('layout-child')).toBeInTheDocument();
    expect(screen.getByText('Layout Content')).toBeInTheDocument();
  });

  test('renders a breadcrumb component', () => {
    renderWithRouter(
      <Layout>
        <div>Layout Content</div>
      </Layout>
    );
    
    // Check that the breadcrumb is rendered
    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
  });
}); 