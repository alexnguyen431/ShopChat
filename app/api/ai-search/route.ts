import { NextRequest, NextResponse } from 'next/server'
import { getAllProducts } from '@/lib/mockData'

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    // Get all products for context
    const products = getAllProducts()
    
    // Create product context for AI with sales and fit data
    const productList = products.map(p => {
      let info = `- ${p.title}${p.color ? ` (${p.color})` : ''} - ${p.price}${p.collection ? ` [${p.collection}]` : ''}${p.description ? ` - ${p.description}` : ''}`
      if (p.salesCount) {
        info += ` | Sales: ${p.salesCount.toLocaleString()} units`
      }
      if (p.popularityRank) {
        info += ` | Popularity Rank: #${p.popularityRank}`
      }
      if (p.fitInfo) {
        if (p.fitInfo.recommendedHeight) {
          info += ` | Recommended Height: ${p.fitInfo.recommendedHeight}`
        }
        if (p.fitInfo.recommendedWeight) {
          info += ` | Recommended Weight: ${p.fitInfo.recommendedWeight}`
        }
        if (p.fitInfo.fitNotes) {
          info += ` | Fit Notes: ${p.fitInfo.fitNotes}`
        }
      }
      return info
    }).join('\n')

    // Check if Gemini API key is available
    const geminiApiKey = process.env.GEMINI_API_KEY

    if (geminiApiKey) {
      // Use Google Gemini API
      try {
        const geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `You are a helpful shopping assistant for Alex's Atelier, a premium fashion store. 
Help customers find products, answer questions about materials, sizes, prices, styles, popularity, and fit recommendations.

IMPORTANT GUIDELINES:
- NEVER disclose actual sales numbers or specific sales data to customers. Use qualitative terms instead.
- When customers ask about "popular products" or "best sellers" or "trending items": Use the Popularity Rank and Sales data INTERNALLY to identify top products, but describe them using terms like "very popular", "bestseller", "customer favorite", "trending", "highly rated", etc. Lower rank numbers (1, 2, 3) are more popular. Higher sales counts indicate best sellers.
- Products for their height/weight: Use the Recommended Height and Recommended Weight data, along with Fit Notes, to suggest appropriate sizes and products.
- When describing popularity: Use phrases like "one of our most popular items", "a customer favorite", "bestseller", "trending right now", "highly sought after" - but NEVER mention specific sales numbers.

Available products with internal sales data and fit information (use this data to inform your recommendations, but don't share the numbers):
${productList}

User question: "${query}"

Provide a helpful, concise response. When mentioning products:
- If asked about popularity: Use qualitative descriptions like "very popular", "bestseller", "customer favorite" - NEVER mention sales numbers
- If asked about fit for height/weight: Use the recommended height/weight ranges and fit notes
- Be friendly and professional.
- Remember: Sales data is for internal use only - describe popularity qualitatively, not quantitatively.`
                }]
              }]
            }),
          }
        )

        if (geminiResponse.ok) {
          const data = await geminiResponse.json()
          console.log('Gemini API Response:', JSON.stringify(data, null, 2))
          
          const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, but I couldn\'t generate a response at this time.'

          // Extract product names from AI response and match to products
          const responseLower = aiResponse.toLowerCase()
          const queryLower = query.toLowerCase()
          
          // Extract color from query if mentioned (with variations)
          const colorMap: Record<string, string[]> = {
            'white': ['white'],
            'black': ['black'],
            'grey': ['grey', 'gray'],
            'gray': ['grey', 'gray'],
            'navy': ['navy', 'blue'],
            'olive': ['olive', 'green'],
            'green': ['olive', 'green'],
            'brown': ['brown'],
            'red': ['red'],
            'blue': ['navy', 'blue'],
            'pink': ['pink'],
            'orange': ['orange'],
            'taupe': ['taupe'],
          }
          
          let mentionedColor: string | undefined
          for (const [key, variations] of Object.entries(colorMap)) {
            if (queryLower.includes(key) || responseLower.includes(key) || 
                variations.some(v => queryLower.includes(v) || responseLower.includes(v))) {
              mentionedColor = key
              break
            }
          }
          
          // Try to find products mentioned in the AI response first
          let matchingProducts: typeof products = []
          
          // Check each product to see if it's mentioned in the response
          products.forEach(product => {
            const productTitleLower = product.title.toLowerCase()
            const productColorLower = (product.color || '').toLowerCase()
            
            // Create variations of product title for matching
            const productTitleVariations = [
              productTitleLower,
              productTitleLower.replace(/\s+/g, '-'),
              productTitleLower.replace(/-/g, ' '),
              productTitleLower.replace('cb star', 'cb star'),
              productTitleLower.replace('cole buxton', 'cole buxton'),
            ]
            
            // Check if product title appears in response (with or without color)
            const titleMentioned = productTitleVariations.some(variation => 
              responseLower.includes(variation)
            )
            
            if (titleMentioned) {
              // If color is mentioned in query/response, prioritize exact color matches
              if (mentionedColor) {
                // Check if this product's color matches
                if (productColorLower.includes(mentionedColor)) {
                  matchingProducts.push(product)
                } else if (product.variants?.some(v => v.color.toLowerCase().includes(mentionedColor))) {
                  // Product has variant with mentioned color - include it
                  matchingProducts.push(product)
                }
              } else {
                // No specific color filter, include the product
                matchingProducts.push(product)
              }
            } else {
              // Also check if product is mentioned with color in parentheses, e.g., "Cole Buxton T-Shirt (WHITE)"
              const productWithColor = `${productTitleLower} (${productColorLower})`
              if (responseLower.includes(productWithColor)) {
                matchingProducts.push(product)
              }
            }
          })

          // If no products found in response, fall back to query-based matching
          if (matchingProducts.length === 0) {
            // Check for collection/category mentions
            const collectionKeywords: Record<string, string[]> = {
              't-shirt': ['t-shirts', 't-shirt', 'tshirt', 'tshirts'],
              'hoodie': ['hoodies', 'hoodie'],
              'sweatshirt': ['sweatshirts', 'sweatshirt'],
              'sneaker': ['sneakers', 'sneaker', 'shoe', 'shoes'],
              'pants': ['pants', 'trousers'],
              'shirt': ['shirts', 'shirt'],
            }
            
            let mentionedCollection: string | undefined
            for (const [key, variations] of Object.entries(collectionKeywords)) {
              if (variations.some(v => queryLower.includes(v) || responseLower.includes(v))) {
                mentionedCollection = key
                break
              }
            }
            
            matchingProducts = products.filter(product => {
              const searchTerms = [
                product.title.toLowerCase(),
                product.color?.toLowerCase(),
                product.collection?.toLowerCase(),
                product.description?.toLowerCase(),
              ].filter(Boolean)
              
              // More flexible matching - check if query terms match any product attributes
              const queryWords = queryLower.split(/\s+/).filter((w: string) => w.length > 2)
              let matchesQuery = queryWords.some((word: string) => 
                searchTerms.some((term: string | undefined) => term?.includes(word) || false)
              ) || searchTerms.some((term: string | undefined) => term?.includes(queryLower) || false)
              
              // If collection is mentioned, check if product belongs to that collection
              if (mentionedCollection && product.collection) {
                const productCollection = product.collection.toLowerCase()
                if (productCollection.includes(mentionedCollection) || 
                    collectionKeywords[mentionedCollection]?.some(v => productCollection.includes(v))) {
                  matchesQuery = true
                }
              }
              
              // If color is mentioned, also check color match
              if (mentionedColor && matchesQuery) {
                const productColorLower = product.color?.toLowerCase() || ''
                return productColorLower.includes(mentionedColor) || 
                       product.variants?.some(v => v.color.toLowerCase().includes(mentionedColor))
              }
              
              return matchesQuery
            })
          }

          // Deduplicate
          const uniqueProducts = Array.from(
            new Map(matchingProducts.map(p => [p.id, p])).values()
          )

          return NextResponse.json({
            response: aiResponse,
            products: uniqueProducts.slice(0, 10).map(p => ({
              id: p.id,
              title: p.title,
              handle: p.handle,
              price: p.price,
              color: p.color,
              image: p.image,
            })),
            query,
          })
        } else {
          const errorData = await geminiResponse.text()
          console.error('Gemini API Error Response:', geminiResponse.status, errorData)
          console.error('API Key present:', !!geminiApiKey)
          // Fall through to fallback
        }
      } catch (geminiError) {
        console.error('Gemini API Error:', geminiError)
        // Fall through to fallback
      }
    } else {
      console.log('No Gemini API key found, using fallback')
    }

    // Fallback: Simple keyword-based search (when no API key or API fails)
    const queryLower = query.toLowerCase()
    
    const matchingProducts = products.filter(product => {
      const searchTerms = [
        product.title.toLowerCase(),
        product.color?.toLowerCase(),
        product.collection?.toLowerCase(),
        product.description?.toLowerCase(),
      ].filter(Boolean)
      
      return searchTerms.some((term: string | undefined) => term?.includes(queryLower) || false)
    })

    // Generate a natural language response
    let response = ''
    if (matchingProducts.length > 0) {
      response = `I found ${matchingProducts.length} product${matchingProducts.length > 1 ? 's' : ''} that match your query. `
      if (queryLower.includes('price') || queryLower.includes('cost') || queryLower.includes('expensive')) {
        const prices = matchingProducts.map(p => p.price).filter(Boolean)
        response += `Prices range from ${prices[0]} to ${prices[prices.length - 1]}. `
      }
      if (queryLower.includes('color') || queryLower.includes('colour')) {
        const colors = [...new Set(matchingProducts.map(p => p.color).filter(Boolean))]
        response += `Available in ${colors.join(', ')}. `
      }
      response += `Here are the matching products: ${matchingProducts.slice(0, 5).map(p => p.title).join(', ')}.`
    } else {
      response = `I couldn't find exact matches for "${query}". However, we have a wide selection of products. Try searching for specific items like "hoodie", "sneaker", or "t-shirt".`
    }

    return NextResponse.json({
      response,
      products: matchingProducts.slice(0, 10).map(p => ({
        id: p.id,
        title: p.title,
        handle: p.handle,
        price: p.price,
        color: p.color,
        image: p.image,
      })),
      query,
    })
  } catch (error) {
    console.error('AI Search Error:', error)
    return NextResponse.json(
      { error: 'Failed to process AI search' },
      { status: 500 }
    )
  }
}

