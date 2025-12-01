import Image from 'next/image'
import { getProductByHandle } from '@/lib/mockData'
import { notFound } from 'next/navigation'

interface ProductPageProps {
  params: {
    handle: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductByHandle(params.handle)

  if (!product) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {product.images && product.images.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <div key={idx} className="relative aspect-square bg-gray-100">
                  <Image
                    src={img}
                    alt={`${product.title} ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-light uppercase tracking-wide mb-4">
            {product.title}
          </h1>
          {product.color && (
            <p className="text-lg text-gray-600 mb-6 uppercase">{product.color}</p>
          )}
          <p className="text-2xl font-medium mb-8">{product.price}</p>

          {product.description && (
            <div className="mb-8 text-sm text-gray-700 space-y-2">
              <p>{product.description}</p>
            </div>
          )}

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold uppercase mb-4">Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    className="px-4 py-2 border border-gray-300 text-sm hover:border-black transition-colors"
                  >
                    {variant.color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold uppercase mb-4">Size</h3>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 border border-gray-300 text-sm hover:border-black transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <button className="w-full bg-black text-white py-4 text-sm font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors mb-4">
            Add to Cart
          </button>

          <button className="w-full border border-black text-black py-4 text-sm font-medium uppercase tracking-wide hover:bg-black hover:text-white transition-colors">
            Buy Now
          </button>

          {/* Product Details */}
          <div className="mt-12 space-y-4 text-sm">
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold uppercase cursor-pointer">Product Details</summary>
              <p className="mt-4 text-gray-600">
                Premium quality materials and craftsmanship. Designed for modern living.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold uppercase cursor-pointer">Shipping & Returns</summary>
              <p className="mt-4 text-gray-600">
                Free shipping on orders over £100. 30-day returns accepted.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}

