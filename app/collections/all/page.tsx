import ProductGrid from '@/components/ProductGrid'
import FilterSidebar from '@/components/FilterSidebar'
import { getAllProducts } from '@/lib/mockData'

export default function AllProductsPage() {
  const products = getAllProducts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-light uppercase tracking-wide mb-2">All Products</h1>
        <p className="text-sm text-gray-600">{products.length} items</p>
      </div>

      <div className="flex flex-col md:flex-row">
        <FilterSidebar />
        <div className="flex-1">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  )
}

