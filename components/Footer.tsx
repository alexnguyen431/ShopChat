import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-gray-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="hover:text-gray-600">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4">Info</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-gray-600">
                  The Brand
                </Link>
              </li>
              <li>
                <Link href="/store" className="hover:text-gray-600">
                  The Store
                </Link>
              </li>
              <li>
                <Link href="/stockists" className="hover:text-gray-600">
                  Stockists
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-gray-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-gray-600">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4">Newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">
              Sign up for exclusive access
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
              />
              <button
                type="submit"
                className="w-full bg-black text-white py-2 text-sm font-medium hover:bg-gray-800"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>© 2025 Alex's Atelier. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

