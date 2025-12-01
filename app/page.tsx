import Link from 'next/link'
import ProductGrid from '@/components/ProductGrid'
import ShopWithAI from '@/components/ShopWithAI'
import { getFeaturedProducts, getNewLaunches } from '@/lib/mockData'

export default function Home() {
  const newLaunches = getNewLaunches()
  const featuredProducts = getFeaturedProducts()

  return (
    <>
      {/* Background Section - Full Width */}
      <section className="relative w-full" style={{ minHeight: '711px' }}>
        <div className="absolute inset-0 flex">
          {/* Left Image */}
          <div 
            className="w-1/2 h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/hero-image-1.jpg')",
            }}
          />
          {/* Right Image */}
          <div 
            className="w-1/2 h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/hero-image-2.jpg')",
            }}
          />
        </div>
        {/* Dark gradient overlay at bottom for text */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none" />
        {/* Text overlay */}
        <div className="absolute bottom-8 left-8 z-10 text-white">
          <h2 className="text-4xl font-bold mb-2 font-serif">Black Friday Sale Now On</h2>
          <p className="text-xl font-sans">Up to 40% off</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Shop with AI */}
      <ShopWithAI />

      {/* New Launches */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold uppercase tracking-wide font-serif">New Launches</h2>
          <Link href="/collections/new-launches" className="text-sm font-medium hover:underline">
            View all
          </Link>
        </div>
        <ProductGrid products={newLaunches} />
      </section>

      {/* Featured Collections */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link href="/collections/aw25" className="group relative aspect-[4/5] bg-gray-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
            <div className="absolute bottom-8 left-8 z-20 text-white">
              <h3 className="text-2xl font-light mb-2">AW25</h3>
              <p className="text-sm">Shop Collection</p>
            </div>
          </Link>
          <Link href="/collections/core" className="group relative aspect-[4/5] bg-gray-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
            <div className="absolute bottom-8 left-8 z-20 text-white">
              <h3 className="text-2xl font-light mb-2">Core Collection</h3>
              <p className="text-sm">Shop Collection</p>
            </div>
          </Link>
          <Link href="/collections/resort-2025" className="group relative aspect-[4/5] bg-gray-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
            <div className="absolute bottom-8 left-8 z-20 text-white">
              <h3 className="text-2xl font-light mb-2">Resort 2025</h3>
              <p className="text-sm">Shop Collection</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold uppercase tracking-wide font-serif">Featured</h2>
          <Link href="/collections/all" className="text-sm font-medium hover:underline">
            View all
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>
      </div>
    </>
  )
}

