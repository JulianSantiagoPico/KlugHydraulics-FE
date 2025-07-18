const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-brand-dark mb-6">About Us</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-gray-700 mb-4">
          Klüg Hydraulics is a leading provider of hydraulic solutions for industrial applications.
        </p>
        <p className="text-gray-700 mb-4">
          With decades of experience in the hydraulic industry, we offer comprehensive solutions 
          including pumps, valves, motors, and complete hydraulic systems.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div>
            <h3 className="text-2xl font-semibold text-brand-dark mb-4">Our Mission</h3>
            <p className="text-gray-700">
              To provide innovative hydraulic solutions that enhance productivity and efficiency 
              for our customers worldwide.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-brand-dark mb-4">Our Values</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• Quality and reliability</li>
              <li>• Customer satisfaction</li>
              <li>• Innovation and technology</li>
              <li>• Environmental responsibility</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
