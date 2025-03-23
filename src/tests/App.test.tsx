import { render, screen } from '@testing-library/react'
import App from '../App'

// Mock the child components to simplify testing
jest.mock('../components/layout', () => ({
  Layout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mocked-layout">{children}</div>
  ),
}))

jest.mock('../pages/Home', () => () => (
  <div data-testid="mocked-home-page">Home Page</div>
))

// Other page components are lazily loaded, so we don't need to mock them

describe('App', () => {
  it('renders the app with layout', () => {
    render(<App />)
    
    // Check that the layout is rendered
    expect(screen.getByTestId('mocked-layout')).toBeInTheDocument()
    
    // Check that the home page is rendered by default
    expect(screen.getByTestId('mocked-home-page')).toBeInTheDocument()
  })
}) 