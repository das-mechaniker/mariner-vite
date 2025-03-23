import { Link } from 'react-router-dom';
import { BreadcrumbProps } from '../../types/layout';

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="breadcrumb" data-testid="breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link to="/" className="text-primary hover:underline">
            Home
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <span className="mx-2 text-gray-500">/</span>
            {index === items.length - 1 ? (
              <span className="text-gray-700 font-medium" aria-current="page">
                {item.title}
              </span>
            ) : (
              <Link to={item.path} className="text-primary hover:underline">
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb; 