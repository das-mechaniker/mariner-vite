export interface NavItem {
  id: string;
  title: string;
  path: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbItem {
  title: string;
  path: string;
}

export interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export interface LayoutProps {
  children: React.ReactNode;
} 