'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  onOpenChat?: (query: string) => void
  onCloseModal?: () => void
}

const SearchBar = ({ onOpenChat, onCloseModal }: SearchBarProps = {}) => {
  const [query, setQuery] = useState('')
  const [isAIMode, setIsAIMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Auto-focus input when component mounts (useful in modal)
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const trimmedQuery = query.trim().toLowerCase()
    
    // Detect if query looks like a question - activate immediately
    const isQuestion = 
      // Ends with question mark
      trimmedQuery.endsWith('?') ||
      // Question words (activate as soon as detected)
      trimmedQuery.startsWith('what') ||
      trimmedQuery.startsWith('how') ||
      trimmedQuery.startsWith('why') ||
      trimmedQuery.startsWith('when') ||
      trimmedQuery.startsWith('where') ||
      trimmedQuery.startsWith('which') ||
      trimmedQuery.startsWith('who') ||
      trimmedQuery.startsWith('wh') && trimmedQuery.length >= 2 || // "wh" could be "what", "when", "where", etc.
      trimmedQuery.startsWith('ho') && trimmedQuery.length >= 2 || // "ho" could be "how"
      // Command/question phrases
      trimmedQuery.startsWith('tell me') ||
      trimmedQuery.startsWith('show me') ||
      trimmedQuery.startsWith('find') ||
      trimmedQuery.startsWith('can') ||
      trimmedQuery.startsWith('do') ||
      trimmedQuery.startsWith('does') ||
      trimmedQuery.startsWith('is') ||
      trimmedQuery.startsWith('are') ||
      trimmedQuery.startsWith('will') ||
      trimmedQuery.startsWith('would') ||
      trimmedQuery.startsWith('should') ||
      trimmedQuery.startsWith('could') ||
      // Question patterns
      trimmedQuery.includes('?') ||
      (trimmedQuery.length > 0 && /^(what|how|why|when|where|which|who|can|do|does|is|are|will|would|should|could|tell|show|find)/.test(trimmedQuery))
    
    // Activate AI mode immediately when question pattern is detected (even with 1-2 chars)
    setIsAIMode(isQuestion && trimmedQuery.length > 0)
  }, [query])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!query.trim()) return

    // If AI mode, open chat interface
    if (isAIMode) {
      const queryToSend = query
      setQuery('')
      // Close modal if we're in a modal context
      if (onCloseModal) {
        onCloseModal()
      }
      // Call external callback with the query to open chat
      if (onOpenChat) {
        // Small delay to ensure modal closes first
        setTimeout(() => {
          onOpenChat(queryToSend)
        }, 100)
      }
      return
    }

    // Regular product search
    // Close modal if we're in a modal context
    if (onCloseModal) {
      onCloseModal()
    }
    router.push(`/collections/all?search=${encodeURIComponent(query)}`)
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          {/* AI Icon with animation */}
          {isAIMode && (
            <div className="absolute left-4 z-10 flex items-center">
              <div className="relative">
                {/* Pulsing ring animation */}
                <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: 'rgba(90, 49, 244, 0.2)' }} />
                <div className="relative w-5 h-5">
                  <svg
                    className="w-5 h-5 animate-pulse"
                    style={{ color: '#5A31F4' }}
                    fill="currentColor"
                    viewBox="0 0 100 125"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m72.97,56.78l-15.81-6.9c-3.82-1.67-6.87-4.72-8.54-8.54l-6.9-15.81c-.54-1.23-2.27-1.23-2.81,0l-6.9,15.81c-1.67,3.82-4.72,6.87-8.54,8.54l-15.84,6.91c-1.22.53-1.23,2.27,0,2.81l16.11,7.12c3.81,1.69,6.85,4.75,8.5,8.58l6.68,15.51c.53,1.23,2.28,1.24,2.81,0l6.89-15.79c1.67-3.82,4.72-6.87,8.54-8.54l15.81-6.9c1.23-.54,1.23-2.27,0-2.81Z"/>
                    <path d="m92.76,26.84l-9.14-3.99c-2.21-.96-3.97-2.73-4.93-4.93l-3.99-9.14c-.31-.71-1.31-.71-1.62,0l-3.99,9.14c-.96,2.21-2.73,3.97-4.93,4.93l-9.15,3.99c-.71.31-.71,1.31,0,1.62l9.31,4.12c2.2.97,3.96,2.75,4.91,4.96l3.86,8.96c.31.71,1.32.71,1.63,0l3.98-9.12c.96-2.21,2.73-3.97,4.93-4.93l9.14-3.99c.71-.31.71-1.31,0-1.62Z"/>
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Search input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isAIMode ? "Ask me anything about our products..." : "Search products or ask AI anything"}
            className={`w-full ${isAIMode ? 'pl-12' : 'pl-6'} pr-24 py-4 text-sm border transition-all duration-300 rounded-lg focus:outline-none`}
            style={isAIMode 
              ? { 
                  backgroundColor: 'white',
                  borderColor: '#5A31F4',
                }
              : {
                  backgroundColor: 'white',
                  borderColor: '#d1d5db',
                }
            }
            onFocus={(e) => {
              const target = e.target as HTMLInputElement
              target.style.borderColor = '#5A31F4'
              target.style.boxShadow = '0 0 0 2px rgba(90, 49, 244, 0.2), 0 0 20px rgba(90, 49, 244, 0.15), 0 0 40px rgba(90, 49, 244, 0.1)'
            }}
            onBlur={(e) => {
              const target = e.target as HTMLInputElement
              if (!isAIMode) {
                target.style.borderColor = '#d1d5db'
              }
              target.style.boxShadow = ''
            }}
          />

          {/* Search/AI button */}
          <button
            type="submit"
            className={`absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 text-sm font-medium transition-all duration-300 rounded-md flex items-center gap-2 ${
              isAIMode
                ? 'text-white'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
            style={isAIMode ? {
              background: 'linear-gradient(to right, #5A31F4, #9333ea)',
            } : {}}
            onMouseEnter={(e) => {
              if (isAIMode) {
                e.currentTarget.style.background = 'linear-gradient(to right, #4c28d4, #7e22ce)'
              }
            }}
            onMouseLeave={(e) => {
              if (isAIMode) {
                e.currentTarget.style.background = 'linear-gradient(to right, #5A31F4, #9333ea)'
              }
            }}
          >
            {isAIMode ? (
              <span>Ask AI</span>
            ) : (
              <span>Search</span>
            )}
          </button>
        </div>

        {/* AI Mode Indicator */}
        {isAIMode && (
          <div className="absolute top-full left-0 right-0 mt-2 px-4 py-3 bg-white/95 backdrop-blur-md border-2 rounded-lg shadow-lg animate-fade-in z-20" style={{ borderColor: '#5A31F4' }}>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold" style={{ color: '#5A31F4' }}>AI Mode Active</span>
              <span className="text-gray-700">• Ask questions about products, sizes, materials, and more</span>
            </div>
          </div>
        )}
      </form>

      {/* Floating AI particles animation (subtle) */}
      {isAIMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-float"
              style={{
                backgroundColor: 'rgba(90, 49, 244, 0.3)',
                left: `${20 + i * 30}%`,
                top: '50%',
                animationDelay: `${i * 0.5}s`,
                animationDuration: '3s',
              }}
            />
          ))}
        </div>
      )}

    </div>
  )
}

export default SearchBar

