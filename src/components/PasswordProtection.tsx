'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const SITE_PASSWORD = 'rhodium2025' // Change this to your desired password

export default function PasswordProtection({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if password is stored in sessionStorage
    const stored = sessionStorage.getItem('siteUnlocked')
    if (stored === 'true') {
      setIsUnlocked(true)
    }
    setIsLoading(false)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password === SITE_PASSWORD) {
      sessionStorage.setItem('siteUnlocked', 'true')
      setIsUnlocked(true)
      setError('')
    } else {
      setError('Incorrect password. Please try again.')
      setPassword('')
    }
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!isUnlocked) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="w-full max-w-md px-8">
          <div className="text-center mb-8">
            <div className="w-[200px] h-[60px] relative mx-auto mb-6">
              <Image
                src="/logo.png"
                alt="Rhodium 45"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-white font-helvetica text-2xl font-light mb-2">
              Password Protected
            </h1>
            <p className="text-gray-400 font-helvetica text-sm">
              Enter password to access this site
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 font-helvetica focus:outline-none focus:border-white/40 transition-colors"
                autoFocus
              />
              {error && (
                <p className="text-red-400 text-sm mt-2 font-helvetica">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black py-3 rounded-full font-helvetica font-medium hover:bg-gray-100 transition-colors"
            >
              Enter Site
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-xs font-helvetica">
              &copy; {new Date().getFullYear()} Rhodium 45. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
