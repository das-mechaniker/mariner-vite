const AgentLibrary = () => {
  return (
    <div className="py-8" data-testid="agent-library-page">
      <h1 className="text-3xl font-bold mb-6">Agent Library</h1>
      <p className="text-gray-600 mb-8">Browse and use AI agents for investment professionals.</p>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <input
            type="text"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search agents..."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  A{index + 1}
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold">Agent {index + 1}</h3>
                  <p className="text-sm text-gray-500">Category</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                This is a placeholder description for Agent {index + 1}. In the final implementation, this will show the agent's capabilities and purpose.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Used 15 times</span>
                <button className="text-primary hover:underline text-sm">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentLibrary; 