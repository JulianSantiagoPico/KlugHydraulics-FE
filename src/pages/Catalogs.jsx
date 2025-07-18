const Catalogs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-brand-dark mb-6">Product Catalogs</h1>
      <p className="text-lg text-gray-700 mb-8">
        Download our comprehensive product catalogs and technical documentation.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Hydraulic Pumps Catalog</h3>
          <p className="text-gray-600 mb-4">
            Complete specifications and technical data for all pump models.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">PDF • 2.5 MB</span>
            <button className="bg-brand-primary text-white px-4 py-2 rounded hover:bg-brand-primary/90">
              Download
            </button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Valves Catalog</h3>
          <p className="text-gray-600 mb-4">
            Detailed information on our valve products and applications.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">PDF • 1.8 MB</span>
            <button className="bg-brand-primary text-white px-4 py-2 rounded hover:bg-brand-primary/90">
              Download
            </button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Motors Catalog</h3>
          <p className="text-gray-600 mb-4">
            Technical specifications for hydraulic motors and drive systems.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">PDF • 2.1 MB</span>
            <button className="bg-brand-primary text-white px-4 py-2 rounded hover:bg-brand-primary/90">
              Download
            </button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Filters Catalog</h3>
          <p className="text-gray-600 mb-4">
            Filtration solutions and maintenance guidelines.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">PDF • 1.4 MB</span>
            <button className="bg-brand-primary text-white px-4 py-2 rounded hover:bg-brand-primary/90">
              Download
            </button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Power Units Catalog</h3>
          <p className="text-gray-600 mb-4">
            Complete hydraulic power unit configurations and options.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">PDF • 3.2 MB</span>
            <button className="bg-brand-primary text-white px-4 py-2 rounded hover:bg-brand-primary/90">
              Download
            </button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">General Catalog</h3>
          <p className="text-gray-600 mb-4">
            Complete product overview with all categories and solutions.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">PDF • 5.8 MB</span>
            <button className="bg-brand-primary text-white px-4 py-2 rounded hover:bg-brand-primary/90">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalogs;
