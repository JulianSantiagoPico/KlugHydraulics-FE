const Valves = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-brand-dark mb-6">Hydraulic Valves</h1>
      <p className="text-lg text-gray-700 mb-8">
        Precision control valves for optimal hydraulic system performance.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Directional Valves</h3>
          <p className="text-gray-600 mb-4">
            Control the direction of fluid flow in hydraulic systems.
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 2-way to 4-way configurations</li>
            <li>• Manual and pilot operated</li>
            <li>• High flow capacity</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Pressure Valves</h3>
          <p className="text-gray-600 mb-4">
            Relief, reducing, and sequence valves for pressure control.
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Adjustable pressure settings</li>
            <li>• Direct or pilot operated</li>
            <li>• High accuracy</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Flow Control Valves</h3>
          <p className="text-gray-600 mb-4">
            Regulate flow rate and system speed control.
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Needle and ball valves</li>
            <li>• Bypass and non-bypass types</li>
            <li>• Temperature compensated</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-brand-dark mb-4">Why Choose Our Valves?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-brand-dark mb-2">Quality Materials</h3>
            <p className="text-gray-700">
              Manufactured from high-grade steel and materials for long-lasting performance.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-brand-dark mb-2">Precision Engineering</h3>
            <p className="text-gray-700">
              Tight tolerances and quality control ensure consistent performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Valves;
