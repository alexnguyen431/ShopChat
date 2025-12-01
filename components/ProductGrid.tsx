import ProductCard from './ProductCard'

interface Product {
  id: string
  title: string
  price: string
  color?: string
  image: string
  handle: string
}

interface ProductGridProps {
  products: Product[]
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          color={product.color}
          image={product.image}
          href={`/products/${product.handle}`}
        />
      ))}
    </div>
  )
}

export default ProductGrid

