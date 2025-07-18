const Products = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-brand-dark mb-6">Our Products</h1>
      <p className="text-lg text-gray-700 mb-8">
        Discover our comprehensive range of hydraulic products and systems.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Hydraulic Pumps</h3>
          <p className="text-gray-600 mb-4">
            High-performance pumps for various industrial applications.
          </p>
          <button className="text-brand-primary hover:text-brand-dark font-medium">
            Learn More →
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Valves</h3>
          <p className="text-gray-600 mb-4">
            Precision control valves for optimal system performance.
          </p>
          <button className="text-brand-primary hover:text-brand-dark font-medium">
            Learn More →
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Hydraulic Motors</h3>
          <p className="text-gray-600 mb-4">
            Efficient motors for heavy-duty industrial operations.
          </p>
          <button className="text-brand-primary hover:text-brand-dark font-medium">
            Learn More →
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Filters</h3>
          <p className="text-gray-600 mb-4">
            Advanced filtration systems for clean hydraulic fluid.
          </p>
          <button className="text-brand-primary hover:text-brand-dark font-medium">
            Learn More →
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Power Units</h3>
          <p className="text-gray-600 mb-4">
            Complete hydraulic power units for various applications.
          </p>
          <button className="text-brand-primary hover:text-brand-dark font-medium">
            Learn More →
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Accessories</h3>
          <p className="text-gray-600 mb-4">
            Essential accessories and components for hydraulic systems.
          </p>
          <button className="text-brand-primary hover:text-brand-dark font-medium">
            Learn More →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
