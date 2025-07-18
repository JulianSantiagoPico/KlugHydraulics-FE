const Pumps = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-brand-dark mb-6">Hydraulic Pumps</h1>
      <p className="text-lg text-gray-700 mb-8">
        High-performance hydraulic pumps designed for industrial applications.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-brand-dark mb-4">Product Features</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="text-brand-primary">✓</span>
              <span>High pressure capabilities up to 350 bar</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-brand-primary">✓</span>
              <span>Variable displacement options</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-brand-primary">✓</span>
              <span>Excellent efficiency and reliability</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-brand-primary">✓</span>
              <span>Low noise operation</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-brand-primary">✓</span>
              <span>Compact design</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-brand-dark mb-4">Applications</h2>
          <ul className="space-y-3 text-gray-700">
            <li>• Industrial machinery</li>
            <li>• Construction equipment</li>
            <li>• Agricultural machinery</li>
            <li>• Marine applications</li>
            <li>• Material handling systems</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-brand-dark mb-4">Technical Support</h2>
        <p className="text-gray-700 mb-4">
          Our technical team is ready to help you select the right pump for your application.
        </p>
        <button className="bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-primary/90 transition-colors">
          Contact Technical Support
        </button>
      </div>
    </div>
  );
};

export default Pumps;
