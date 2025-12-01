'use client'

import { useState } from 'react'

const FilterSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const colors = [
    'Black',
    'White',
    'Navy',
    'Brown',
    'Khaki',
    'Grey',
    'Olive Green',
    'Tan',
    'Taupe',
    'Vintage Black',
    'Vintage Navy',
    'Vintage Khaki',
  ]

  const sortOptions = [
    'Featured',
    'Best selling',
    'Alphabetically, A-Z',
    'Alphabetically, Z-A',
    'Price, low to high',
    'Price, high to low',
    'Date, new to old',
  ]

  return (
    <>
      {/* Mobile filter button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 text-sm font-medium"
        >
          <span>Filters & Sort</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 pr-8">
        <div className="sticky top-24 space-y-8">
          {/* Sort */}
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4">Sort</h3>
            <select className="w-full px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black">
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Colors */}
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4">Color</h3>
            <div className="space-y-2">
              {colors.map((color) => (
                <label key={color} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-gray-300 text-black focus:ring-black"
                  />
                  <span className="text-sm">{color}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile filter overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white">
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl"
              >
                ×
              </button>
            </div>
            {/* Mobile filter content - same as desktop */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase mb-4">Sort</h3>
                <select className="w-full px-4 py-2 border border-gray-300 text-sm">
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase mb-4">Color</h3>
                <div className="space-y-2">
                  {colors.map((color) => (
                    <label key={color} className="flex items-center space-x-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">{color}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FilterSidebar

