'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'

// Component to format markdown text with inline product tiles
const FormattedMessage = ({ 
  content, 
  products = [], 
  onClose 
}: { 
  content: string
  products?: Array<{
    id: string
    title: string
    handle: string
    price: string
    color?: string
    image?: string
  }>
  onClose?: () => void
}) => {
  // Find product mentioned in a line of text
  const findProductInText = (text: string) => {
    if (!products || products.length === 0) return null
    
    // Try to match product title and color in the text
    for (const product of products) {
      const titleLower = product.title.toLowerCase()
      const colorLower = product.color?.toLowerCase() || ''
      
      // Check if product title appears in text
      if (text.toLowerCase().includes(titleLower)) {
        // If color is specified, check if it matches
        if (colorLower && text.toLowerCase().includes(colorLower)) {
          return product
        } else if (!colorLower || text.toLowerCase().includes(`(${colorLower})`)) {
          return product
        }
      }
    }
    
    return null
  }

  const formatInlineMarkdown = (text: string): (string | JSX.Element)[] => {
    const parts: (string | JSX.Element)[] = []
    let currentIndex = 0
    let keyCounter = 0
    
    // Match bold (**text** or __text__)
    const boldRegex = /\*\*([^*]+)\*\*|__([^_]+)__/g
    let match
    
    while ((match = boldRegex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > currentIndex) {
        parts.push(text.substring(currentIndex, match.index))
      }
      
      // Add the bold text
      const boldText = match[1] || match[2]
      parts.push(
        <strong key={`bold-${keyCounter++}`} className="font-semibold text-gray-900">
          {boldText}
        </strong>
      )
      
      currentIndex = match.index + match[0].length
    }
    
    // Add remaining text
    if (currentIndex < text.length) {
      parts.push(text.substring(currentIndex))
    }
    
    return parts.length > 0 ? parts : [text]
  }

  const formatMarkdown = (text: string) => {
    // Split by lines to handle lists and paragraphs
    const lines = text.split('\n')
    const elements: JSX.Element[] = []
    const usedProductIds = new Set<string>()
    
    lines.forEach((line, lineIndex) => {
      const trimmedLine = line.trim()
      
      // Skip empty lines (but add spacing)
      if (!trimmedLine) {
        if (lineIndex < lines.length - 1) {
          elements.push(<br key={`br-${lineIndex}`} />)
        }
        return
      }
      
      // Check if it's a list item (starts with -, *, or •)
      if (/^[-*•]\s+/.test(trimmedLine)) {
        const listContent = trimmedLine.replace(/^[-*•]\s+/, '')
        const product = findProductInText(listContent)
        
        elements.push(
          <div key={`list-${lineIndex}`} className="my-2">
            <div className="flex items-start gap-2">
              <span className="text-gray-600 mt-1">•</span>
              <div className="flex-1">
                {formatInlineMarkdown(listContent)}
                {/* Inline product tile */}
                {product && !usedProductIds.has(product.id) && (
                  <div className="mt-2 mb-3">
                    <Link
                      href={`/products/${product.handle}`}
                      onClick={onClose}
                      className="group flex items-center gap-3 border border-gray-200 rounded-lg p-2 transition-all max-w-md"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#5A31F4'
                        e.currentTarget.style.backgroundColor = 'rgba(90, 49, 244, 0.05)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e5e7eb'
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                    >
                      {product.image && (
                        <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="64px"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 transition-colors truncate" onMouseEnter={(e) => { e.currentTarget.style.color = '#5A31F4' }} onMouseLeave={(e) => { e.currentTarget.style.color = '#111827' }}>{product.title}</p>
                        {product.color && (
                          <p className="text-xs text-gray-600">{product.color}</p>
                        )}
                        <p className="font-semibold text-sm text-gray-900 mt-0.5">{product.price}</p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
        
        if (product) {
          usedProductIds.add(product.id)
        }
        return
      }
      
      // Regular paragraph - check for product mentions
      const product = findProductInText(trimmedLine)
      elements.push(
        <div key={`para-${lineIndex}`} className="my-1">
          {formatInlineMarkdown(trimmedLine)}
          {/* Inline product tile */}
          {product && !usedProductIds.has(product.id) && (
            <div className="mt-2 mb-3">
              <Link
                href={`/products/${product.handle}`}
                onClick={onClose}
                className="group flex items-center gap-3 border border-gray-200 rounded-lg p-2 transition-all max-w-md"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#5A31F4'
                  e.currentTarget.style.backgroundColor = 'rgba(90, 49, 244, 0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb'
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                {product.image && (
                  <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="64px"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 transition-colors truncate" onMouseEnter={(e) => { e.currentTarget.style.color = '#5A31F4' }} onMouseLeave={(e) => { e.currentTarget.style.color = '#111827' }}>{product.title}</p>
                  {product.color && (
                    <p className="text-xs text-gray-600">{product.color}</p>
                  )}
                  <p className="font-semibold text-sm text-gray-900 mt-0.5">{product.price}</p>
                </div>
              </Link>
            </div>
          )}
        </div>
      )
      
      if (product) {
        usedProductIds.add(product.id)
      }
    })
    
    return elements
  }
  
  return <div className="formatted-message">{formatMarkdown(content)}</div>
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  products?: Array<{
    id: string
    title: string
    handle: string
    price: string
    color?: string
    image?: string
  }>
}

interface ChatInterfaceProps {
  initialQuery?: string
  onClose: () => void
}

const ChatInterface = ({ initialQuery = '', onClose }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const hasInitialized = useRef(false)
  const isLoadingRef = useRef(false)
  const lastAssistantMessageRef = useRef<HTMLDivElement>(null)
  const previousMessagesCountRef = useRef(0)
  const previousAssistantCountRef = useRef(0)

  useEffect(() => {
    // Count assistant messages
    const assistantCount = messages.filter(m => m.role === 'assistant').length
    
    // Only scroll if a new assistant message was added (not just any message)
    const newAssistantAdded = assistantCount > previousAssistantCountRef.current
    
    if (newAssistantAdded) {
      // Find the last assistant message index
      let lastAssistantIndex = -1
      for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].role === 'assistant') {
          lastAssistantIndex = i
          break
        }
      }
      
      // Scroll to top of newest assistant message
      if (lastAssistantMessageRef.current && lastAssistantIndex >= 0) {
        // Small delay to ensure DOM is updated and content is rendered
        setTimeout(() => {
          lastAssistantMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 150)
      }
    }
    
    // Update refs for next comparison
    previousMessagesCountRef.current = messages.length
    previousAssistantCountRef.current = assistantCount
  }, [messages])

  const handleSend = useCallback(async (query?: string) => {
    const messageText = query || input.trim()
    if (!messageText || isLoadingRef.current) return

    isLoadingRef.current = true
    setIsLoading(true)

    const userMessage: Message = { role: 'user', content: messageText }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    try {
      const response = await fetch('/api/ai-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: messageText }),
      })

      if (response.ok) {
        const data = await response.json()
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.response,
          products: data.products,
        }
        setMessages(prev => [...prev, assistantMessage])
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        }])
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      }])
    } finally {
      isLoadingRef.current = false
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }, [input])

  useEffect(() => {
    if (initialQuery && !hasInitialized.current) {
      hasInitialized.current = true
      handleSend(initialQuery)
    }
    inputRef.current?.focus()
  }, [initialQuery, handleSend])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend()
  }

  useEffect(() => {
    setMounted(true)
    // Prevent body scroll when chat is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const chatContent = (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-white">
      {/* Header */}
      <div className="text-white px-6 py-4 flex items-center justify-between shadow-lg" style={{ background: 'linear-gradient(to right, #5A31F4, #9333ea)' }}>
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 100 125" xmlns="http://www.w3.org/2000/svg">
            <path d="m72.97,56.78l-15.81-6.9c-3.82-1.67-6.87-4.72-8.54-8.54l-6.9-15.81c-.54-1.23-2.27-1.23-2.81,0l-6.9,15.81c-1.67,3.82-4.72,6.87-8.54,8.54l-15.84,6.91c-1.22.53-1.23,2.27,0,2.81l16.11,7.12c3.81,1.69,6.85,4.75,8.5,8.58l6.68,15.51c.53,1.23,2.28,1.24,2.81,0l6.89-15.79c1.67-3.82,4.72-6.87,8.54-8.54l15.81-6.9c1.23-.54,1.23-2.27,0-2.81Z"/>
            <path d="m92.76,26.84l-9.14-3.99c-2.21-.96-3.97-2.73-4.93-4.93l-3.99-9.14c-.31-.71-1.31-.71-1.62,0l-3.99,9.14c-.96,2.21-2.73,3.97-4.93,4.93l-9.15,3.99c-.71.31-.71,1.31,0,1.62l9.31,4.12c2.2.97,3.96,2.75,4.91,4.96l3.86,8.96c.31.71,1.32.71,1.63,0l3.98-9.12c.96-2.21,2.73-3.97,4.93-4.93l9.14-3.99c.71-.31.71-1.31,0-1.62Z"/>
          </svg>
          <div>
            <h2 className="text-lg font-semibold">Shop with AI</h2>
            <p className="text-xs text-white/80">Powered by Shopify</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-white/20 rounded-full p-2 transition-colors"
          aria-label="Close chat"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 bg-gray-50">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: 'linear-gradient(to right, #5A31F4, #9333ea)' }}>
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 100 125" xmlns="http://www.w3.org/2000/svg">
                  <path d="m72.97,56.78l-15.81-6.9c-3.82-1.67-6.87-4.72-8.54-8.54l-6.9-15.81c-.54-1.23-2.27-1.23-2.81,0l-6.9,15.81c-1.67,3.82-4.72,6.87-8.54,8.54l-15.84,6.91c-1.22.53-1.23,2.27,0,2.81l16.11,7.12c3.81,1.69,6.85,4.75,8.5,8.58l6.68,15.51c.53,1.23,2.28,1.24,2.81,0l6.89-15.79c1.67-3.82,4.72-6.87,8.54-8.54l15.81-6.9c1.23-.54,1.23-2.27,0-2.81Z"/>
                  <path d="m92.76,26.84l-9.14-3.99c-2.21-.96-3.97-2.73-4.93-4.93l-3.99-9.14c-.31-.71-1.31-.71-1.62,0l-3.99,9.14c-.96,2.21-2.73,3.97-4.93,4.93l-9.15,3.99c-.71.31-.71,1.31,0,1.62l9.31,4.12c2.2.97,3.96,2.75,4.91,4.96l3.86,8.96c.31.71,1.32.71,1.63,0l3.98-9.12c.96-2.21,2.73-3.97,4.93-4.93l9.14-3.99c.71-.31.71-1.31,0-1.62Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How can I help you today?</h3>
              <p className="text-gray-600">Ask me anything about our products, sizes, materials, or prices.</p>
            </div>
          )}

          {messages.map((message, index) => {
            // Find the index of the last assistant message
            let lastAssistantIndex = -1
            for (let i = messages.length - 1; i >= 0; i--) {
              if (messages[i].role === 'assistant') {
                lastAssistantIndex = i
                break
              }
            }
            // Check if this is the last assistant message
            const isLastAssistant = message.role === 'assistant' && index === lastAssistantIndex
            
            return (
            <div
              key={index}
              ref={isLastAssistant ? lastAssistantMessageRef : null}
              className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(to right, #5A31F4, #9333ea)' }}>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 100 125" xmlns="http://www.w3.org/2000/svg">
                    <path d="m72.97,56.78l-15.81-6.9c-3.82-1.67-6.87-4.72-8.54-8.54l-6.9-15.81c-.54-1.23-2.27-1.23-2.81,0l-6.9,15.81c-1.67,3.82-4.72,6.87-8.54,8.54l-15.84,6.91c-1.22.53-1.23,2.27,0,2.81l16.11,7.12c3.81,1.69,6.85,4.75,8.5,8.58l6.68,15.51c.53,1.23,2.28,1.24,2.81,0l6.89-15.79c1.67-3.82,4.72-6.87,8.54-8.54l15.81-6.9c1.23-.54,1.23-2.27,0-2.81Z"/>
                    <path d="m92.76,26.84l-9.14-3.99c-2.21-.96-3.97-2.73-4.93-4.93l-3.99-9.14c-.31-.71-1.31-.71-1.62,0l-3.99,9.14c-.96,2.21-2.73,3.97-4.93,4.93l-9.15,3.99c-.71.31-.71,1.31,0,1.62l9.31,4.12c2.2.97,3.96,2.75,4.91,4.96l3.86,8.96c.31.71,1.32.71,1.63,0l3.98-9.12c.96-2.21,2.73-3.97,4.93-4.93l9.14-3.99c.71-.31.71-1.31,0-1.62Z"/>
                  </svg>
                </div>
              )}
              
              <div className={`flex-1 ${message.role === 'user' ? 'max-w-[80%]' : 'max-w-[85%]'}`}>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'text-white ml-auto'
                      : 'bg-white text-gray-900 shadow-sm border border-gray-200'
                  }`}
                  style={message.role === 'user' ? { backgroundColor: '#5A31F4' } : undefined}
                >
                  <div className="leading-relaxed">
                    <FormattedMessage 
                      content={message.content} 
                      products={message.products}
                      onClose={onClose}
                    />
                  </div>
                </div>
              </div>

              {message.role === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            )
          })}

          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 100 125" xmlns="http://www.w3.org/2000/svg">
                  <path d="m72.97,56.78l-15.81-6.9c-3.82-1.67-6.87-4.72-8.54-8.54l-6.9-15.81c-.54-1.23-2.27-1.23-2.81,0l-6.9,15.81c-1.67,3.82-4.72,6.87-8.54,8.54l-15.84,6.91c-1.22.53-1.23,2.27,0,2.81l16.11,7.12c3.81,1.69,6.85,4.75,8.5,8.58l6.68,15.51c.53,1.23,2.28,1.24,2.81,0l6.89-15.79c1.67-3.82,4.72-6.87,8.54-8.54l15.81-6.9c1.23-.54,1.23-2.27,0-2.81Z"/>
                  <path d="m92.76,26.84l-9.14-3.99c-2.21-.96-3.97-2.73-4.93-4.93l-3.99-9.14c-.31-.71-1.31-.71-1.62,0l-3.99,9.14c-.96,2.21-2.73,3.97-4.93,4.93l-9.15,3.99c-.71.31-.71,1.31,0,1.62l9.31,4.12c2.2.97,3.96,2.75,4.91,4.96l3.86,8.96c.31.71,1.32.71,1.63,0l3.98-9.12c.96-2.21,2.73-3.97,4.93-4.93l9.14-3.99c.71-.31.71-1.31,0-1.62Z"/>
                </svg>
              </div>
              <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-200">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about our products..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none"
              onFocus={(e) => {
                e.target.style.borderColor = '#5A31F4'
                e.target.style.boxShadow = '0 0 0 2px rgba(90, 49, 244, 0.2)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db'
                e.target.style.boxShadow = ''
              }}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 text-white rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              style={{ background: 'linear-gradient(to right, #5A31F4, #9333ea)' }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.background = 'linear-gradient(to right, #4c28d4, #7e22ce)'
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.background = 'linear-gradient(to right, #5A31F4, #9333ea)'
                }
              }}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )

  if (!mounted) return null

  return createPortal(chatContent, document.body)
}

export default ChatInterface

