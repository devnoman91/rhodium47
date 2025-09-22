
'use client'

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="absolute top-5 left-0 right-0 z-50 px-12  py-4 font-helvetica">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center group">
            <div className="w-[148px] h-[44px] flex-shrink-0 aspect-[37/11] relative">
              <Image src="/logo.png" alt="Rhodium 47" fill sizes="148px" priority className="object-contain" />
            </div>
           
          </Link>
        </div>

        <div className="flex items-center justify-end space-x-8">
          <div className="hidden md:flex items-center space-x-8 gap-[20px]">
            <Link href="/vehicles" className="font-helvetica text-white leading-[24px] hover:opacity-80 transition-opacity tracking-[0] m-0 px-[20px] py-0 font-normal text-[16px]">
              Vehicles
            </Link>
            <Link href="/discover" className="font-helvetica text-white leading-[24px] hover:opacity-80 transition-opacity tracking-[0] m-0 px-[20px] py-0 font-normal text-[16px]">
              Discover
            </Link>
            <Link href="/shop" className="font-helvetica text-white  leading-[24px]  hover:opacity-80 transition-opacity tracking-[0] m-0 px-[20px] py-0 font-normal text-[16px]">
              Shop
            </Link>
            <Link href="/support" className="font-helvetica  leading-[24px] text-white hover:opacity-80 transition-opacity tracking-[0] m-0 px-[20px] py-0 font-normal text-[16px]">
              Support
            </Link>
          </div>

          <button className="hidden  md:inline-flex pt-[12.5px] pr-[15.5px] pb-[12.5px] pl-[23.5px] rounded-[50px] flex items-center gap-4 bg-white text-black no-underline font-helvetica text-[16px] leading-[110%] tracking-[0] font-medium transition ease-[0.4s] w-fit cursor-pointer">
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
            <Link href="/vehicles" className="font-helvetica text-white hover:opacity-80 transition-opacity font-normal text-[16px]">
              Vehicles
            </Link>
            <Link href="/discover" className="font-helvetica text-white hover:opacity-80 transition-opacity font-normal text-[16px]">
              Discover
            </Link>
            <Link href="/shop" className="font-helvetica text-white hover:opacity-80 transition-opacity font-normal text-[16px]">
              Shop
            </Link>
            <Link href="/support" className="font-helvetica text-white hover:opacity-80 transition-opacity font-normal text-[16px]">
              Support
            </Link>

            <button className="mt-2 bg-white text-black px-5 py-2 rounded-full font-helvetica font-medium hover:bg-gray-100 transition-colors text-[16px] w-full">
              Book a Consultation
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}









