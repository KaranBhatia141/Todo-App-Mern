import React from 'react'

function Footer() {
  return (
    
    <footer className="bg-black text-gray-400 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo / Brand */}
          <div>
            <h2 className="text-white text-2xl font-bold mb-2">Todo-Mern-App</h2>
            <p className="text-sm">
              Bringing quality and innovation to the web.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/profile" className="hover:text-white transition">Profile</a></li>
              {/* <li><a href="#" className="hover:text-white transition">Services</a></li> */}
              {/* <li><a href="#" className="hover:text-white transition">Contact</a></li> */}
            </ul>
          </div>

          {/* Contact / Social */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-2">Contact</h3>
            <p>Email: <a href="mailto:info@example.com" className="hover:text-white">https://github.com/KaranBhatia141</a></p>
            <p>Phone: <a href="tel:+1234567890" className="hover:text-white">xxxxxxxx90</a></p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          <p>© {new Date().getFullYear()} YourBrand. All rights reserved.By Karan Bhatia</p>
        </div>
      </div>
    </footer>
  );
};
  

export default Footer