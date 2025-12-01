'use client'

import { useState } from 'react'
import SearchBar from './SearchBar'
import ChatInterface from './ChatInterface'

const ShopWithAI = () => {
  const [showChat, setShowChat] = useState(false)
  const [chatInitialQuery, setChatInitialQuery] = useState('')

  const suggestionPills = [
    "What are your most popular products?",
    "What size should I get if I'm 5'10\"?",
    "Show me t shirts under £300",
    "What materials are your t-shirts made from?",
    "Recommend products for my height and weight"
  ]

  const handlePillClick = (question: string) => {
    setChatInitialQuery(question)
    setShowChat(true)
  }

  return (
    <>
      <section className="mb-20">
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center justify-center gap-3 mb-8">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 100 125" xmlns="http://www.w3.org/2000/svg">
              <path d="m72.97,56.78l-15.81-6.9c-3.82-1.67-6.87-4.72-8.54-8.54l-6.9-15.81c-.54-1.23-2.27-1.23-2.81,0l-6.9,15.81c-1.67,3.82-4.72,6.87-8.54,8.54l-15.84,6.91c-1.22.53-1.23,2.27,0,2.81l16.11,7.12c3.81,1.69,6.85,4.75,8.5,8.58l6.68,15.51c.53,1.23,2.28,1.24,2.81,0l6.89-15.79c1.67-3.82,4.72-6.87,8.54-8.54l15.81-6.9c1.23-.54,1.23-2.27,0-2.81Z"/>
              <path d="m92.76,26.84l-9.14-3.99c-2.21-.96-3.97-2.73-4.93-4.93l-3.99-9.14c-.31-.71-1.31-.71-1.62,0l-3.99,9.14c-.96,2.21-2.73,3.97-4.93,4.93l-9.15,3.99c-.71.31-.71,1.31,0,1.62l9.31,4.12c2.2.97,3.96,2.75,4.91,4.96l3.86,8.96c.31.71,1.32.71,1.63,0l3.98-9.12c.96-2.21,2.73-3.97,4.93-4.93l9.14-3.99c.71-.31.71-1.31,0-1.62Z"/>
            </svg>
            <h2 className="text-2xl tracking-wide font-serif">shop with ai</h2>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-center text-gray-700 mb-6">
              Ask our AI assistant anything about our products. Get personalized recommendations, find the perfect fit, or discover new styles.
            </p>
            <SearchBar 
              onOpenChat={(query: string) => {
                setChatInitialQuery(query)
                setShowChat(true)
              }}
            />
          </div>
          
          {/* Suggestion Pills Marquee */}
          <div className="mt-6 -mx-8 overflow-hidden">
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
      </section>

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
    </>
  )
}

export default ShopWithAI

