import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import Breadcrumb from './Breadcrumb';
import { BreadcrumbItem } from '../../types/layout';

interface TopbarProps {
  onMenuClick: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  
  // Generate breadcrumb items based on current path
  useEffect(() => {
    const generateBreadcrumbs = () => {
      const pathParts = location.pathname.split('/').filter(Boolean);
      
      if (pathParts.length === 0) {
        setBreadcrumbs([]);
        return;
      }
      
      const breadcrumbItems: BreadcrumbItem[] = pathParts.map((part, index) => {
        const path = `/${pathParts.slice(0, index + 1).join('/')}`;
        return {
          title: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
          path,
        };
      });
      
      setBreadcrumbs(breadcrumbItems);
    };
    
    generateBreadcrumbs();
  }, [location]);
  
  return (
    <header className="bg-white border-b" data-testid="topbar">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center lg:hidden">
          <button
            onClick={onMenuClick}
            className="p-2 text-gray-600 rounded-md hover:bg-gray-100"
            aria-label="Toggle menu"
            data-testid="menu-button"
          >
            <FaBars className="text-xl" />
          </button>
        </div>
        
        <div className="ml-4 flex-grow">
          <Breadcrumb items={breadcrumbs} />
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Placeholder for user profile, notifications, etc. */}
          <div className="h-8 w-8 bg-primary rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default Topbar; 