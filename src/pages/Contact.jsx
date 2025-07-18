const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-brand-dark mb-6">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-8">
        Get in touch with our team for inquiries, support, or more information.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-brand-dark mb-4">Get in Touch</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 text-brand-primary">📧</div>
              <span className="text-gray-700">info@klughydraulics.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 text-brand-primary">📞</div>
              <span className="text-gray-700">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 text-brand-primary">📍</div>
              <span className="text-gray-700">123 Industrial Ave, City, State 12345</span>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-brand-dark mb-4">Business Hours</h3>
            <div className="space-y-2 text-gray-700">
              <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p>Saturday: 9:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-brand-dark mb-4">Send us a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input 
                type="email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea 
                rows="4" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                placeholder="Your message..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-brand-primary text-white py-2 px-4 rounded-md hover:bg-brand-primary/90 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
