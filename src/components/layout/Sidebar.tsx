import { NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, FileText, MessageSquare, Cpu, FlaskConical, MessageCircle, Search, Anchor } from 'lucide-react';
import { NavItem, SidebarProps } from '../../types/layout';

const navItems: NavItem[] = [
  { id: 'home', title: 'Home', path: '/', icon: <Home size={20} /> },
  { id: 'education', title: 'Education', path: '/education', icon: <BookOpen size={20} /> },
  { id: 'documentation', title: 'Documentation', path: '/documentation', icon: <FileText size={20} /> },
  { id: 'prompt-library', title: 'Prompt Library', path: '/prompt-library', icon: <MessageSquare size={20} /> },
  { id: 'agent-library', title: 'Agent Library', path: '/agent-library', icon: <Cpu size={20} /> },
  { id: 'labs', title: 'Labs', path: '/labs', icon: <FlaskConical size={20} /> },
  { id: 'chat', title: 'Chat', path: '/chat', icon: <MessageCircle size={20} /> },
  { id: 'search', title: 'Enterprise Search', path: '/search', icon: <Search size={20} /> },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
          data-testid="sidebar-overlay"
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-[280px] transform bg-white border-r border-[#e5e7eb] transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-0 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        data-testid="sidebar"
      >
        {/* Header with Logo */}
        <div className="flex items-center px-5 py-5 border-b border-[#e5e7eb]">
          <div className="text-2xl font-bold text-[#0f172a] flex items-center">
            ProjectMariner
            <span className="ml-2 text-[#0f172a]">
              <Anchor size={24} />
            </span>
          </div>
        </div>

        {/* Search Container */}
        <div className="p-4 border-b border-[#e5e7eb]">
          <div className="flex items-center bg-[#f3f4f6] rounded-lg px-4 py-2.5">
            <Search size={18} className="text-[#9ca3af] mr-2.5" />
            <span className="text-[#9ca3af] text-base">Search...</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/' && location.pathname.startsWith(item.path));
            
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={`flex items-center px-4 py-3 mx-1 my-1 text-base ${
                  isActive
                    ? 'bg-[#f3f4f6] text-[#1e293b]'
                    : 'text-[#4b5563] hover:bg-[#f9fafb]'
                }`}
                onClick={() => window.innerWidth < 1024 && onClose()}
                data-testid={`nav-${item.id}`}
              >
                <span className={`mr-3 w-6 flex items-center justify-center ${isActive ? 'text-[#4b5563]' : 'text-[#6b7280]'}`}>
                  {item.icon}
                </span>
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="border-t border-[#e5e7eb] p-4 flex items-center mt-auto">
          <div className="w-9 h-9 rounded bg-[#1f2937] text-white flex items-center justify-center mr-3 font-bold text-sm">
            DU
          </div>
          <div className="flex flex-col">
            <div className="font-medium text-base text-[#1f2937]">Default User</div>
            <div className="text-sm text-[#6b7280]">User</div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar; 