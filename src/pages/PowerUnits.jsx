const PowerUnits = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-brand-dark mb-6">Hydraulic Power Units</h1>
      <p className="text-lg text-gray-700 mb-8">
        Complete hydraulic power solutions designed for your specific applications.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Standard Units</h3>
          <p className="text-gray-600 mb-4">
            Pre-configured power units for common applications.
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 3-50 HP configurations</li>
            <li>• Multiple voltage options</li>
            <li>• Quick delivery</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Custom Units</h3>
          <p className="text-gray-600 mb-4">
            Engineered solutions for specific requirements.
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Application-specific design</li>
            <li>• Special materials available</li>
            <li>• Complete testing</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Portable Units</h3>
          <p className="text-gray-600 mb-4">
            Mobile power solutions for field operations.
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Compact design</li>
            <li>• Easy transport</li>
            <li>• Battery or engine options</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold text-brand-dark mb-4">Components Included</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-brand-dark mb-2">Motor</h3>
            <p className="text-gray-600">Electric or engine drive</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-brand-dark mb-2">Pump</h3>
            <p className="text-gray-600">Gear, vane, or piston</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-brand-dark mb-2">Reservoir</h3>
            <p className="text-gray-600">With filtration system</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-brand-dark mb-2">Controls</h3>
            <p className="text-gray-600">Valve manifold block</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-brand-dark mb-4">Design Services</h2>
          <p className="text-gray-700 mb-4">
            Our engineering team works with you to design the perfect power unit for your application.
          </p>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• Application analysis</li>
            <li>• System sizing and selection</li>
            <li>• 3D modeling and drawings</li>
            <li>• Performance calculations</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-brand-dark mb-4">Testing & Quality</h2>
          <p className="text-gray-700 mb-4">
            Every power unit undergoes comprehensive testing before delivery.
          </p>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• Pressure testing</li>
            <li>• Flow rate verification</li>
            <li>• Temperature monitoring</li>
            <li>• Performance documentation</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-primary-blue text-white p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Need a Custom Solution?</h2>
        <p className="mb-4">
          Contact our engineering team to discuss your specific requirements and get a customized power unit solution.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-white text-primary-blue px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Request Quote
          </button>
          <button className="border border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition-colors">
            Technical Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default PowerUnits;
