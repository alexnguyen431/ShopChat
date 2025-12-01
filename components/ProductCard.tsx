import Link from 'next/link'
import Image from 'next/image'

interface ProductCardProps {
  id: string
  title: string
  price: string
  color?: string
  image: string
  href: string
}

const ProductCard = ({ title, price, color, image, href }: ProductCardProps) => {
  return (
    <Link href={href} className="group">
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium uppercase tracking-wide">{title}</h3>
        {color && (
          <p className="text-sm text-gray-600 mt-1 uppercase">{color}</p>
        )}
        <p className="text-sm font-medium mt-2">{price}</p>
      </div>
    </Link>
  )
}

export default ProductCard

