const HydraulicMotors = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-brand-dark mb-6">Hydraulic Motors</h1>
      <p className="text-lg text-gray-700 mb-8">
        High-performance hydraulic motors for industrial applications.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Gear Motors</h3>
          <p className="text-gray-600 mb-4">
            Reliable and cost-effective solution for medium-duty applications.
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• High torque output</li>
            <li>• Compact design</li>
            <li>• Low maintenance</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-brand-dark mb-3">Piston Motors</h3>
          <p className="text-gray-600 mb-4">
            High-efficiency motors for heavy-duty applications.
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Variable displacement</li>
            <li>• High power density</li>
            <li>• Excellent speed control</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibent text-brand-dark mb-3">Vane Motors</h3>
          <p className="text-gray-600 mb-4">
            Smooth operation and good starting torque characteristics.
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Quiet operation</li>
            <li>• Good starting torque</li>
            <li>• Balanced design</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold text-brand-dark mb-4">Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-brand-dark mb-2">Construction Equipment</h3>
            <p className="text-gray-600">Excavators, loaders, and cranes</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-brand-dark mb-2">Industrial Machinery</h3>
            <p className="text-gray-600">Conveyors, mixers, and winches</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-brand-dark mb-2">Agricultural Equipment</h3>
            <p className="text-gray-600">Tractors, harvesters, and irrigation</p>
          </div>
        </div>
      </div>
      
      <div className="bg-primary-blue text-white p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Technical Support</h2>
        <p className="mb-4">
          Our engineering team provides comprehensive technical support for motor selection and application.
        </p>
        <button className="bg-white text-primary-blue px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Contact Technical Support
        </button>
      </div>
    </div>
  );
};

export default HydraulicMotors;
