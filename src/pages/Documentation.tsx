import { FaBook, FaSearch, FaTools, FaRobot, FaDatabase, FaChartLine } from 'react-icons/fa';

const Documentation = () => {
  const categories = [
    { name: 'Getting Started', icon: <FaBook />, count: 5 },
    { name: 'API Reference', icon: <FaTools />, count: 12 },
    { name: 'Agent Development', icon: <FaRobot />, count: 8 },
    { name: 'Data Management', icon: <FaDatabase />, count: 6 },
    { name: 'Analytics', icon: <FaChartLine />, count: 4 },
  ];

  return (
    <div className="py-8" data-testid="documentation-page">
      <h1 className="text-3xl font-bold mb-6">Documentation Center</h1>
      <p className="text-gray-600 mb-8">Explore guides, tutorials and reference materials.</p>
      
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            className="w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search documentation..."
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  {category.icon}
                </div>
                <h3 className="ml-3 font-semibold">{category.name}</h3>
              </div>
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{category.count} docs</span>
            </div>
            <p className="text-sm text-gray-600">
              Browse documentation related to {category.name.toLowerCase()}.
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Recently Updated</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
              <h3 className="font-medium text-primary">Documentation Title {item}</h3>
              <p className="text-sm text-gray-600 my-1">
                Brief description of the documentation goes here.
              </p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Updated 2 days ago</span>
                <span>Category Name</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documentation; 