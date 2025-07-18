const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-brand-dark mb-6">
        Welcome to Klüg Hydraulics
      </h1>
      <p className="text-lg text-gray-700 mb-4">
        Your trusted partner for professional hydraulic systems and components.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Quality Products</h3>
          <p className="text-gray-600">Industry-leading hydraulic components and systems.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Expert Support</h3>
          <p className="text-gray-600">Professional technical support and consultation.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Reliable Service</h3>
          <p className="text-gray-600">Fast delivery and comprehensive service solutions.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
