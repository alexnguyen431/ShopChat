// Shopify Storefront API integration
// This file provides the structure for connecting to Shopify's Storefront API

const SHOPIFY_STOREFRONT_ENDPOINT = process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL || ''
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || ''

interface ShopifyResponse<T> {
  data: T
  errors?: Array<{ message: string }>
}

async function shopifyFetch<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const response = await fetch(SHOPIFY_STOREFRONT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })

  const result: ShopifyResponse<T> = await response.json()

  if (result.errors) {
    throw new Error(result.errors[0].message)
  }

  return result.data
}

// Example GraphQL queries for Shopify Storefront API

export const GET_PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`

export const GET_PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`

export async function getProductsFromShopify() {
  // Uncomment and configure when ready to connect to Shopify
  // return shopifyFetch(GET_PRODUCTS_QUERY, { first: 20 })
  return null
}

export async function getProductByHandleFromShopify(handle: string) {
  // Uncomment and configure when ready to connect to Shopify
  // return shopifyFetch(GET_PRODUCT_BY_HANDLE_QUERY, { handle })
  return null
}

