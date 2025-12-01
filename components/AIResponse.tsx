'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Product {
  id: string
  title: string
  handle: string
  price: string
  color?: string
}

interface AIResponseProps {
  response: string
  products: Product[]
  query: string
  onClose: () => void
}

const AIResponse = ({ response, products, query, onClose }: AIResponseProps) => {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-fade-in">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h3 className="font-semibold">AI Assistant</h3>
          </div>
          <button
            onClick={handleClose}
            className="hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Query */}
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">You asked:</p>
            <p className="text-gray-900 font-medium">"{query}"</p>
          </div>

          {/* AI Response */}
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">AI Response:</p>
            <p className="text-gray-800 leading-relaxed">{response}</p>
          </div>

          {/* Products */}
          {products.length > 0 && (
            <div>
              <p className="text-sm text-gray-500 mb-3">Matching Products:</p>
              <div className="grid grid-cols-1 gap-3">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.handle}`}
                    onClick={handleClose}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{product.title}</p>
                      {product.color && (
                        <p className="text-sm text-gray-600">{product.color}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{product.price}</p>
                      <svg className="w-4 h-4 text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AIResponse

