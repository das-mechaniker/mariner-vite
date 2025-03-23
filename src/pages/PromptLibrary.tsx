import { useState } from 'react';
import { FaCopy, FaPlus, FaTag, FaFolder, FaSearch } from 'react-icons/fa';

const PromptLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const promptCategories = ['Finance', 'Investment', 'Analysis', 'Research', 'All'];
  
  const prompts = [
    {
      id: 1,
      title: 'Portfolio Risk Analysis',
      promptText: 'Analyze the risk factors in the following portfolio composition: [PORTFOLIO_DATA]. Identify high-risk assets and suggest mitigation strategies.',
      category: 'Investment',
      tags: ['Risk', 'Portfolio', 'Analysis'],
      createdAt: '2024-02-10',
    },
    {
      id: 2,
      title: 'Market Trend Detection',
      promptText: 'Using the last 6 months of market data, identify emerging trends in [SECTOR] with a focus on [SPECIFIC_AREA]. Provide supporting evidence and potential investment opportunities.',
      category: 'Research',
      tags: ['Market', 'Trends', 'Opportunities'],
      createdAt: '2024-01-15',
    },
    {
      id: 3,
      title: 'Financial Report Summary',
      promptText: 'Summarize the key points from the following quarterly report: [REPORT_TEXT]. Highlight revenue changes, profit margins, and forward-looking statements.',
      category: 'Analysis',
      tags: ['Reports', 'Summary', 'Financial'],
      createdAt: '2024-03-05',
    },
    {
      id: 4,
      title: 'Investment Thesis Generator',
      promptText: 'Generate an investment thesis for [COMPANY] based on its fundamentals, market position, competitive landscape, and growth prospects. Include potential risks and catalysts.',
      category: 'Investment',
      tags: ['Thesis', 'Strategy', 'Analysis'],
      createdAt: '2024-02-22',
    },
  ];
  
  const filteredPrompts = searchTerm
    ? prompts.filter(
        prompt =>
          prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : prompts;

  return (
    <div className="py-8" data-testid="prompt-library-page">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Prompt Library</h1>
          <p className="text-gray-600">Manage and reuse effective prompts for AI interactions</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-md flex items-center">
          <FaPlus className="mr-2" />
          New Prompt
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              className="w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Search prompts by title or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {promptCategories.map((category, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded-full text-sm ${
                  index === promptCategories.length - 1
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrompts.map((prompt) => (
          <div key={prompt.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold text-dark">{prompt.title}</h2>
                <button className="text-primary hover:text-primary/80" title="Copy prompt">
                  <FaCopy />
                </button>
              </div>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <FaFolder className="mr-1" /> 
                <span>{prompt.category}</span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4 h-20 overflow-hidden">
                {prompt.promptText}
              </p>
              <div className="flex flex-wrap gap-1 mb-2">
                {prompt.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    <FaTag className="mr-1" size={10} />
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-right text-xs text-gray-500">
                Added on {prompt.createdAt}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptLibrary; 