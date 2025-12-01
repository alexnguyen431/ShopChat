import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-4xl font-light mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8">Page not found</p>
      <Link
        href="/"
        className="inline-block bg-black text-white px-8 py-3 text-sm font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
}

