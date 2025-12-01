'use client'

import { useState } from 'react'
import Link from 'next/link'
import SearchModal from './SearchModal'
import ChatInterface from './ChatInterface'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isShopOpen, setIsShopOpen] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [chatInitialQuery, setChatInitialQuery] = useState('')

  const shopCategories = [
    'T-Shirts',
    'Hoodies',
    'Sweatshirts',
    'Pants',
    'Denim',
    'Shirts',
    'Knitwear',
    'Leather',
    'Outerwear',
  ]

  const collections = [
    'AW25',
    'RESORT 2025',
    'Core Collection',
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="relative flex items-center justify-end h-16">
          {/* Center - Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-2xl tracking-tight font-serif">alex's clothing store</h1>
          </Link>

          {/* Right - Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => setShowSearchModal(true)}
              className="text-sm font-medium hover:text-gray-600"
            >
              Search
            </button>
            <button className="text-sm font-medium hover:text-gray-600">
              Account
            </button>
            <button className="text-sm font-medium hover:text-gray-600">
              Cart (0)
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Secondary nav */}
        <div className="hidden md:flex items-center justify-center space-x-8 h-12 border-t border-gray-100">
          <div
            className="relative"
            onMouseEnter={() => setIsShopOpen(true)}
            onMouseLeave={() => setIsShopOpen(false)}
          >
            <button className="text-sm font-medium hover:text-gray-600">
              Shop
            </button>
            {isShopOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg py-2">
                {shopCategories.map((category) => (
                  <Link
                    key={category}
                    href={`/collections/${category.toLowerCase().replace(' ', '-')}`}
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/collections/footwear" className="text-sm font-medium hover:text-gray-600">
            Footwear
          </Link>
          <Link href="/collections/accessories" className="text-sm font-medium hover:text-gray-600">
            Accessories
          </Link>
          <Link href="/gift-card" className="text-sm font-medium hover:text-gray-600">
            Gift Card
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-4">
            <button 
              onClick={() => {
                setShowSearchModal(true)
                setIsMenuOpen(false)
              }}
              className="block py-2 text-sm font-medium w-full text-left"
            >
              Search
            </button>
            <div>
              <p className="text-xs font-semibold uppercase mb-2">Shop</p>
              {shopCategories.map((category) => (
                <Link
                  key={category}
                  href={`/collections/${category.toLowerCase().replace(' ', '-')}`}
                  className="block py-2 text-sm"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {showSearchModal && (
        <SearchModal
          onClose={() => setShowSearchModal(false)}
          onOpenChat={(query: string) => {
            setChatInitialQuery(query)
            setShowChat(true)
          }}
        />
      )}

      {/* Chat Interface */}
      {showChat && (
        <ChatInterface
          initialQuery={chatInitialQuery}
          onClose={() => {
            setShowChat(false)
            setChatInitialQuery('')
          }}
        />
      )}
    </nav>
  )
}

export default Navigation

