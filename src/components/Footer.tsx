import React from 'react'

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 to-gray-900"></div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="px-6 py-16 lg:py-24 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Preserve the world's<br />
              spirit of adventure.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              We dedicate ourselves to crafting a future worthy of our descendants
              and protecting the vehicles for centuries ahead
            </p>

            {/* Newsletter Signup */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1">
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-left">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Input your email in here"
                  className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:border-white text-white placeholder-gray-400"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="zip" className="block text-sm font-medium mb-2 text-left">
                  Zip
                </label>
                <input
                  type="text"
                  id="zip"
                  placeholder="Input your zip code in here"
                  className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:border-white text-white placeholder-gray-400"
                />
              </div>
              <div className="flex items-end">
                <button className="px-8 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Company Info and Contact */}
        <div className="border-t border-gray-700 px-6 py-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-white rounded flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-sm">45</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">RHODIUM 45</h3>
                  <p className="text-sm text-gray-400">Armored Luxury Supercars</p>
                </div>
              </div>
            </div>
            <div className="text-lg">
              hello@yourdomain.com
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="border-t border-gray-700 px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Company Description */}
              <div className="lg:col-span-2">
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  Empowering your journey with the comfort solutions you seek, innovative and reliable.
                </p>
                <button className="text-white border-b border-gray-400 pb-1 hover:border-white transition-colors duration-200">
                  Learn more
                </button>

                {/* Newsletter Subscription */}
                <div className="mt-12">
                  <p className="text-gray-300 mb-4">Stay updated with the latest news and offers!</p>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Email address"
                      className="flex-1 px-4 py-3 bg-transparent border border-gray-600 rounded-l-full focus:outline-none focus:border-white text-white placeholder-gray-400"
                    />
                    <button className="px-6 py-3 bg-transparent border border-gray-600 border-l-0 rounded-r-full hover:bg-gray-800 transition-colors duration-200">
                      →
                    </button>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="font-semibold text-lg mb-6">Services</h4>
                <ul className="space-y-4 text-gray-300">
                  <li><a href="#" className="hover:text-white transition-colors duration-200">Consultation</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-200">Custom Design</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-200">Maintenance / Service Centers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-200">Training</a></li>
                </ul>
              </div>

              {/* Technology */}
              <div>
                <h4 className="font-semibold text-lg mb-6">Technology</h4>
                <ul className="space-y-4 text-gray-300">
                  <li><a href="#" className="hover:text-white transition-colors duration-200">Rhodium 45 Armor</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-200">BR6+ Protection</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-200">Hybrid Electric</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-200">Security Systems</a></li>
                </ul>
              </div>

              {/* Company & Vehicles */}
              <div className="space-y-8">
                {/* Company */}
                <div>
                  <h4 className="font-semibold text-lg mb-6">Company</h4>
                  <ul className="space-y-4 text-gray-300">
                    <li><a href="#" className="hover:text-white transition-colors duration-200">About Us</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Texas Facility</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Career</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Support</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Find Us</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Customer Stories</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Events</a></li>
                  </ul>
                </div>

                {/* Vehicles */}
                <div>
                  <h4 className="font-semibold text-lg mb-6">Vehicles</h4>
                  <ul className="space-y-4 text-gray-300">
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Sentinel</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Guardian</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Fortress</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Phantom</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Custom Builds</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 px-6 py-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              Copyright © 2025. All rights reserved
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer