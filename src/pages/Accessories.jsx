const Accessories = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-brand-dark mb-6">Hydraulic Accessories</h1>
      <p className="text-lg text-gray-700 mb-8">
        Essential components and accessories to complete your hydraulic system.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Hoses & Fittings</h3>
          <p className="text-gray-600 mb-4">
            High-quality hydraulic hoses and connection fittings.
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Multiple pressure ratings</li>
            <li>• Various hose materials</li>
            <li>• Standard and custom lengths</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Gauges & Instruments</h3>
          <p className="text-gray-600 mb-4">
            Precision instruments for system monitoring.
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Pressure gauges</li>
            <li>• Temperature indicators</li>
            <li>• Flow meters</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Accumulators</h3>
          <p className="text-gray-600 mb-4">
            Energy storage and shock absorption solutions.
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Bladder type</li>
            <li>• Piston type</li>
            <li>• Diaphragm type</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Reservoirs & Tanks</h3>
          <p className="text-gray-600 mb-4">
            Storage solutions for hydraulic fluid.
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Various capacities</li>
            <li>• Breather caps</li>
            <li>• Sight gauges</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Seals & O-Rings</h3>
          <p className="text-gray-600 mb-4">
            Comprehensive sealing solutions for all applications.
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Various materials</li>
            <li>• Standard and metric sizes</li>
            <li>• High temperature options</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Heat Exchangers</h3>
          <p className="text-gray-600 mb-4">
            Temperature control solutions for hydraulic systems.
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Air cooled</li>
            <li>• Water cooled</li>
            <li>• Immersion heaters</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold text-brand-dark mb-4">Hydraulic Fluids</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-brand-dark mb-2">Mineral Oils</h3>
            <p className="text-gray-600">Standard hydraulic fluids for general applications</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-brand-dark mb-2">Synthetic Fluids</h3>
            <p className="text-gray-600">High-performance fluids for demanding conditions</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-brand-dark mb-2">Biodegradable</h3>
            <p className="text-gray-600">Environmentally friendly hydraulic fluids</p>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold text-brand-dark mb-4">Installation Services</h2>
        <p className="text-gray-700 mb-4">
          Our certified technicians provide professional installation and maintenance services.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-brand-dark mb-2">On-Site Installation</h3>
            <p className="text-gray-700">Complete system installation and commissioning</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-brand-dark mb-2">Maintenance Programs</h3>
            <p className="text-gray-700">Scheduled maintenance to ensure optimal performance</p>
          </div>
        </div>
      </div>
      
      <div className="bg-primary-blue text-white p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Complete Solutions</h2>
        <p className="mb-4">
          From individual components to complete system packages, we have everything you need for your hydraulic applications.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-white text-primary-blue px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Browse Catalog
          </button>
          <button className="border border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition-colors">
            Request Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Accessories;
