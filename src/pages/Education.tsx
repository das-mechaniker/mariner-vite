import { FaExternalLinkAlt, FaPlay, FaGraduationCap, FaLaptop, FaChalkboardTeacher } from 'react-icons/fa';

const Education = () => {
  const courses = [
    {
      title: 'Introduction to AI for Investment Professionals',
      provider: 'LinkedIn Learning',
      duration: '2h 15m',
      level: 'Beginner',
      type: 'Video Course',
      icon: <FaPlay className="text-primary" />,
    },
    {
      title: 'Advanced Machine Learning for Market Analysis',
      provider: 'Coursera',
      duration: '6 weeks',
      level: 'Intermediate',
      type: 'Interactive Course',
      icon: <FaLaptop className="text-primary" />,
    },
    {
      title: 'Generative AI Applications in Finance',
      provider: 'edX',
      duration: '4 weeks',
      level: 'Advanced',
      type: 'Certification',
      icon: <FaGraduationCap className="text-primary" />,
    },
    {
      title: 'Hands-on Workshop: Building AI Models for Portfolio Analysis',
      provider: 'Internal',
      duration: '1 day',
      level: 'Intermediate',
      type: 'Workshop',
      icon: <FaChalkboardTeacher className="text-primary" />,
    },
  ];

  return (
    <div className="py-8" data-testid="education-page">
      <h1 className="text-3xl font-bold mb-6">Education Hub</h1>
      <p className="text-gray-600 mb-8">Access learning resources and training materials for AI in investment.</p>
      
      <div className="mb-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Featured Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Beginner', 'Intermediate', 'Advanced', 'All Levels'].map((level, index) => (
            <div key={index} className="bg-primary/10 rounded-lg p-4 text-center cursor-pointer hover:bg-primary/20 transition-colors">
              <h3 className="font-medium text-primary">{level}</h3>
              <p className="text-sm text-gray-600">Resources</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Available Courses</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                        {course.icon}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{course.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.provider}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.duration}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.level}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-primary hover:text-primary/80 flex items-center">
                      <span className="mr-1">Access</span>
                      <FaExternalLinkAlt size={12} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Education; 