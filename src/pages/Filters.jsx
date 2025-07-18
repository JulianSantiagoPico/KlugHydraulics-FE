const Filters = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-brand-dark mb-6">Hydraulic Filters</h1>
      <p className="text-lg text-gray-700 mb-8">
        Essential filtration solutions to keep your hydraulic systems clean and efficient.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Suction Filters</h3>
          <p className="text-gray-600 mb-4">
            Protect pumps from contamination at the reservoir intake.
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Low pressure drop</li>
            <li>• High dirt holding capacity</li>
            <li>• Bypass valve protection</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Pressure Filters</h3>
          <p className="text-gray-600 mb-4">
            High-pressure filtration for critical system protection.
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• High-pressure capability</li>
            <li>• Fine filtration ratings</li>
            <li>• Clogging indicator</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Return Filters</h3>
          <p className="text-gray-600 mb-4">
            Final filtration before fluid returns to the reservoir.
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Tank-top or in-tank mounting</li>
            <li>• Easy maintenance</li>
            <li>• Multiple element options</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold text-brand-dark mb-4">Filter Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-brand-dark mb-2">Cellulose Media</h3>
            <p className="text-gray-700 mb-4">
              Cost-effective filtration for standard applications.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Economical option</li>
              <li>• Good dirt holding capacity</li>
              <li>• Standard efficiency</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-brand-dark mb-2">Synthetic Media</h3>
            <p className="text-gray-700 mb-4">
              Advanced filtration for demanding applications.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• High efficiency</li>
              <li>• Extended service life</li>
              <li>• Temperature resistant</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-brand-dark mb-4">Maintenance Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-brand-dark mb-2">Regular Inspection</h3>
            <p className="text-gray-700">
              Check filter indicators and replace elements before bypass occurs.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-brand-dark mb-2">Proper Installation</h3>
            <p className="text-gray-700">
              Follow manufacturer guidelines for correct filter placement and sizing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
