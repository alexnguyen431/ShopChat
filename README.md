# Modern Fashion E-commerce

A fictitious e-commerce website powered by Shopify, inspired by the minimalist design of Cole Buxton.

## Features

- Clean, minimalist design matching Cole Buxton's aesthetic
- Product listing pages with filters and sorting
- Product detail pages with variant selection
- Responsive design for mobile and desktop
- Shopify Storefront API integration structure (ready to connect)

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shopify Storefront API** - E-commerce backend (structure ready)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Connecting to Shopify

To connect to a real Shopify store:

1. Create a `.env.local` file:
```
NEXT_PUBLIC_SHOPIFY_STORE_URL=https://your-store.myshopify.com/api/2024-01/graphql.json
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
```

2. Update the `lib/shopify.ts` file to use real API calls instead of mock data

3. Update pages to fetch from Shopify API instead of mock data

## Project Structure

```
├── app/
│   ├── collections/     # Collection pages
│   ├── products/         # Product detail pages
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles
├── components/
│   ├── Navigation.tsx    # Main navigation
│   ├── Footer.tsx        # Footer component
│   ├── ProductCard.tsx   # Product card component
│   ├── ProductGrid.tsx   # Product grid layout
│   └── FilterSidebar.tsx # Filters and sorting
└── lib/
    ├── mockData.ts       # Mock product data
    └── shopify.ts        # Shopify API integration
```

## Design Notes

The design follows Cole Buxton's aesthetic:
- Minimalist navigation with uppercase text
- Clean product cards with hover effects
- Simple typography (Inter font)
- Black and white color scheme with subtle grays
- Spacious layouts with plenty of whitespace

