'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import SearchBar from './SearchBar'

interface SearchModalProps {
  onClose: () => void
  onOpenChat?: (query: string) => void
}

const SearchModal = ({ onClose, onOpenChat }: SearchModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  const suggestionPills = [
    "What are your most popular products?",
    "What size should I get if I'm 5'10\"?",
    "Show me t shirts under £300",
    "What materials are your t-shirts made from?",
    "Recommend products for my height and weight"
  ]

  const handlePillClick = (question: string) => {
    if (onOpenChat) {
      onOpenChat(question)
    }
  }

  useEffect(() => {
    setMounted(true)
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const modalContent = (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        // Close if clicking the backdrop
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div 
        ref={modalRef}
        className="bg-white shadow-2xl w-full max-w-2xl animate-fade-in"
        style={{ borderRadius: '24px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Search Bar */}
          <SearchBar onCloseModal={onClose} onOpenChat={onOpenChat} />
          
          {/* Suggestion Pills Marquee */}
          <div className="mt-6 -mx-6 overflow-hidden">
            <div className="flex gap-4 animate-marquee whitespace-nowrap">
              {/* Duplicate pills for seamless loop */}
              {[...suggestionPills, ...suggestionPills].map((pill, index) => (
                <button
                  key={index}
                  onClick={() => handlePillClick(pill)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full transition-all duration-200 flex-shrink-0"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#5A31F4'
                    e.currentTarget.style.color = '#5A31F4'
                    e.currentTarget.style.backgroundColor = 'rgba(90, 49, 244, 0.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#d1d5db'
                    e.currentTarget.style.color = '#374151'
                    e.currentTarget.style.backgroundColor = 'white'
                  }}
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (!mounted) return null

  return createPortal(modalContent, document.body)
}

export default SearchModal

