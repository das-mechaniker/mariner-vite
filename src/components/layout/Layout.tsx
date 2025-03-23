import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { LayoutProps } from '../../types/layout';

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  // Reset sidebar state when route changes
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setSidebarOpen(true); // Keep sidebar open on large screens
    } else {
      setSidebarOpen(false); // Close sidebar on smaller screens during navigation
    }
  }, [location.pathname]);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    // Set initial state
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  
  const closeSidebar = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };
  
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white" data-testid="layout">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <Topbar onMenuClick={toggleSidebar} />
        
        <main className="flex-1 w-full overflow-y-auto p-4 bg-light">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout; 