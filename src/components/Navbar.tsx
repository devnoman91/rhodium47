'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { motion } from "framer-motion"
import { getNavbar } from '@/content/queries'
import { Navbar as NavbarType } from '@/content/types'
import AnnouncementBar from './AnnouncementBar'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [navbarData, setNavbarData] = useState<NavbarType | null>(null)
  const pathname = usePathname() ?? ''
  const isHomePage = pathname === '/'
  const isProductDetailPage = pathname.startsWith('/product-detail/')
  const shouldBeTransparent = isHomePage || isProductDetailPage

  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const data = await getNavbar()
        setNavbarData(data)
      } catch (error) {
        console.error('Error fetching navbar data:', error)
      }
    }
    fetchNavbarData()
  }, [])

  useEffect(() => {
    if (!shouldBeTransparent) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const viewportHeight = window.innerHeight
      setIsScrolled(scrollPosition > viewportHeight * 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [shouldBeTransparent])

  // ✅ Auto close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  if (!navbarData) {
    return null
  }

  return (
    <>
        <AnnouncementBar />
    <nav
      className={`fixed left-0 right-0 z-50 lg:px-12 md:px-4 px-5 py-4 font-helvetica transition-all duration-600 ${
        shouldBeTransparent
          ? isScrolled
            ? 'top-0 bg-[#560100]'
            : '[background:linear-gradient(180deg,_#000_0%,_rgba(0,0,0,0)_100%)]'
          : 'top-0 bg-[#560100] backdrop-blur-md shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center group">
            <div className="w-[148px] h-[44px] flex-shrink-0 aspect-[37/11] relative">
              <Image
                src={navbarData.logo.asset.url}
                alt={navbarData.logoAlt}
                fill
                sizes="148px"
                priority
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Links + CTA */}
        <div className="flex items-center justify-end space-x-8">
          <div className="hidden md:flex items-center space-x-8 lg:gap-[20px] gap-[10px]">
            {navbarData.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-helvetica text-white leading-[24px] hover:opacity-80 transition-opacity tracking-[0] m-0 px-[20px] py-0 font-light text-[16px]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative overflow-hidden hidden md:inline-flex
                       pt-[12.5px] pr-[15.5px] pb-[12.5px] pl-[15.5px]
                       rounded-[50px] items-center gap-4
                       bg-white text-black font-helvetica text-[16px] leading-[110%] font-medium
                       w-fit cursor-pointer border border-transparent group"
            onClick={() => {
              if (navbarData.ctaButton.link) {
                window.location.href = navbarData.ctaButton.link
              }
            }}
          >
            <span
              className="absolute inset-0 bg-[#560100] translate-x-full
                         transition-transform duration-700 ease-out rounded-[50px]
                         group-hover:translate-x-0"
            />
            <span className="relative z-10 transition-colors duration-700 ease-out group-hover:text-white">
              {navbarData.ctaButton.text}
            </span>
          </motion.button>

          {/* Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white"
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-black bg-opacity-90 rounded-lg p-4">
          <div className="flex flex-col space-y-4">
            {navbarData.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)} // ✅ close menu on link click
                className="font-helvetica text-white hover:opacity-80 transition-opacity font-normal text-[16px]"
              >
                {link.label}
              </Link>
            ))}

            <button
              className="mt-2 bg-white text-black px-5 py-2 rounded-full font-helvetica font-medium hover:bg-gray-100 transition-colors text-[16px] w-full"
              onClick={() => {
                setIsMenuOpen(false) // ✅ close menu before redirect
                if (navbarData.ctaButton.link) {
                  window.location.href = navbarData.ctaButton.link
                }
              }}
            >
              {navbarData.ctaButton.text}
            </button>
          </div>
        </div>
      )}
    </nav>
    </>
  )
}
