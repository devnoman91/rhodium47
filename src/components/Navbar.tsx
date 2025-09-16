'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="flex items-center">
        <div className="flex-1 flex items-center">
          <div className="bg-white rounded-full p-2 mr-3">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">Rh</span>
            </div>
          </div>
          <div className="text-white">
            <span className="font-bold text-lg">RHODIUM 45</span>
            <p className="text-xs opacity-80">Armoured Luxury Supercars</p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-end space-x-8">
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/vehicles" className="text-white hover:opacity-80 transition-opacity">
              Vehicles
            </Link>
            <Link href="/discover" className="text-white hover:opacity-80 transition-opacity">
              Discover
            </Link>
            <Link href="/shop" className="text-white hover:opacity-80 transition-opacity">
              Shop
            </Link>
            <Link href="/support" className="text-white hover:opacity-80 transition-opacity">
              Support
            </Link>
          </div>

          <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
            Book a Consultation
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-black bg-opacity-90 rounded-lg p-4">
          <div className="flex flex-col space-y-4">
            <Link href="/vehicles" className="text-white hover:opacity-80 transition-opacity">
              Vehicles
            </Link>
            <Link href="/discover" className="text-white hover:opacity-80 transition-opacity">
              Discover
            </Link>
            <Link href="/shop" className="text-white hover:opacity-80 transition-opacity">
              Shop
            </Link>
            <Link href="/support" className="text-white hover:opacity-80 transition-opacity">
              Support
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}