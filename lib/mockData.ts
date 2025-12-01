// Mock product data - in a real app, this would come from Shopify Storefront API
// Using actual uploaded image filenames

export interface Product {
  id: string
  title: string
  handle: string
  price: string
  color?: string
  image: string
  images?: string[]
  description?: string
  variants?: {
    id: string
    color: string
  }[]
  sizes?: string[]
  collection?: string
  salesCount?: number
  popularityRank?: number
  fitInfo?: {
    recommendedHeight?: string
    recommendedWeight?: string
    fitNotes?: string
  }
}

const products: Product[] = [
  // Sweatshirts & Hoodies
  {
    id: '1',
    title: 'CB Star Sweatshirt',
    handle: 'cb-star-sweatshirt',
    price: '£180',
    color: 'NAVY',
    image: '/images/290095_Cole_Buxton-07-3940.jpg.jpeg',
    description: 'Premium crewneck sweatshirt featuring the iconic CB star logo.',
    variants: [
      { id: '1-1', color: 'NAVY' },
      { id: '1-2', color: 'BLACK' },
      { id: '1-3', color: 'OLIVE GREEN' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    collection: 'sweatshirts',
    salesCount: 1247,
    popularityRank: 3,
    fitInfo: {
      recommendedHeight: '5\'6" - 6\'2"',
      recommendedWeight: '140-200 lbs',
      fitNotes: 'Regular fit, true to size. Size M fits most customers 5\'8"-5\'11" and 160-180 lbs.'
    },
  },
  {
    id: '2',
    title: 'CB Star Hoodie',
    handle: 'cb-star-hoodie',
    price: '£210',
    color: 'NAVY',
    image: '/images/290095_Cole_Buxton-07-3945.jpg.jpeg',
    variants: [
      { id: '2-1', color: 'NAVY' },
      { id: '2-2', color: 'BLACK' },
      { id: '2-3', color: 'OLIVE GREEN' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    collection: 'hoodies',
    salesCount: 2156,
    popularityRank: 1,
    fitInfo: {
      recommendedHeight: '5\'7" - 6\'3"',
      recommendedWeight: '145-210 lbs',
      fitNotes: 'Oversized fit, runs slightly large. Size M fits most customers 5\'9"-6\'0" and 170-190 lbs.'
    },
  },
  {
    id: '3',
    title: 'CB Star Hoodie',
    handle: 'cb-star-hoodie-black',
    price: '£210',
    color: 'BLACK',
    image: '/images/290095_Cole_Buxton-07-3950.jpg.jpeg',
    collection: 'hoodies',
  },
  {
    id: '4',
    title: 'Core Sportswear Hoodie',
    handle: 'core-sportswear-hoodie',
    price: '£225',
    color: 'NAVY',
    image: '/images/290095_Cole_Buxton-07-3958.jpg.jpeg',
    variants: [
      { id: '4-1', color: 'NAVY' },
      { id: '4-2', color: 'GREY' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    collection: 'hoodies',
    salesCount: 1893,
    popularityRank: 2,
    fitInfo: {
      recommendedHeight: '5\'6" - 6\'2"',
      recommendedWeight: '140-200 lbs',
      fitNotes: 'Athletic fit, slightly slim. Size M fits most customers 5\'8"-5\'11" and 160-180 lbs.'
    },
  },
  {
    id: '5',
    title: 'Core Sportswear Hoodie',
    handle: 'core-sportswear-hoodie-grey',
    price: '£225',
    color: 'GREY',
    image: '/images/290095_Cole_Buxton-07-3980.jpg.jpeg',
    collection: 'hoodies',
  },
  {
    id: '6',
    title: 'CB Star Sweatshirt',
    handle: 'cb-star-sweatshirt-black',
    price: '£180',
    color: 'BLACK',
    image: '/images/290095_Cole_Buxton-07-3987.jpg.jpeg',
    collection: 'sweatshirts',
  },
  {
    id: '7',
    title: 'CB Star Sweatshirt',
    handle: 'cb-star-sweatshirt-olive',
    price: '£180',
    color: 'OLIVE GREEN',
    image: '/images/290095_Cole_Buxton-07-3995.jpg.jpeg',
    collection: 'sweatshirts',
  },
  {
    id: '8',
    title: 'CB Star Hoodie',
    handle: 'cb-star-hoodie-olive',
    price: '£210',
    color: 'OLIVE GREEN',
    image: '/images/290095_Cole_Buxton-07-4021.jpg.jpeg',
    collection: 'hoodies',
  },

  // T-Shirts
  {
    id: '9',
    title: 'Cole Buxton T-Shirt',
    handle: 'cole-buxton-t-shirt-grey',
    price: '£95',
    color: 'GREY',
    image: '/images/290095_Cole_Buxton-07-4027.jpg.jpeg',
    variants: [
      { id: '9-1', color: 'GREY' },
      { id: '9-2', color: 'WHITE' },
      { id: '9-3', color: 'BLACK' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    collection: 't-shirts',
    salesCount: 3421,
    popularityRank: 1,
    fitInfo: {
      recommendedHeight: '5\'5" - 6\'1"',
      recommendedWeight: '130-190 lbs',
      fitNotes: 'Classic fit, true to size. Size M fits most customers 5\'8"-5\'11" and 150-170 lbs.'
    },
  },
  {
    id: '10',
    title: 'Cole Buxton T-Shirt',
    handle: 'cole-buxton-t-shirt-white',
    price: '£95',
    color: 'WHITE',
    image: '/images/290095_Cole_Buxton-07-4038.jpg.jpeg',
    collection: 't-shirts',
  },
  {
    id: '11',
    title: 'CB Star T-Shirt',
    handle: 'cb-star-t-shirt-olive',
    price: '£95',
    color: 'OLIVE GREEN',
    image: '/images/290095_Cole_Buxton-08-1365.jpg.jpeg',
    variants: [
      { id: '11-1', color: 'OLIVE GREEN' },
      { id: '11-2', color: 'NAVY' },
      { id: '11-3', color: 'BLACK' },
      { id: '11-4', color: 'WHITE' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    collection: 't-shirts',
    salesCount: 2894,
    popularityRank: 2,
    fitInfo: {
      recommendedHeight: '5\'5" - 6\'1"',
      recommendedWeight: '130-190 lbs',
      fitNotes: 'Classic fit, true to size. Size M fits most customers 5\'8"-5\'11" and 150-170 lbs.'
    },
  },
  {
    id: '12',
    title: 'CB Star T-Shirt',
    handle: 'cb-star-t-shirt-navy',
    price: '£95',
    color: 'NAVY',
    image: '/images/290095_Cole_Buxton-08-1373.jpg.jpeg',
    collection: 't-shirts',
  },
  {
    id: '13',
    title: 'CB Star T-Shirt',
    handle: 'cb-star-t-shirt-black',
    price: '£95',
    color: 'BLACK',
    image: '/images/290095_Cole_Buxton-08-1379.jpg.jpeg',
    collection: 't-shirts',
  },
  {
    id: '14',
    title: 'CB Star T-Shirt',
    handle: 'cb-star-t-shirt-white',
    price: '£95',
    color: 'WHITE',
    image: '/images/290095_Cole_Buxton-08-1387.jpg.jpeg',
    collection: 't-shirts',
  },
  {
    id: '15',
    title: 'Core Sportswear T-Shirt',
    handle: 'core-sportswear-t-shirt-black',
    price: '£95',
    color: 'BLACK',
    image: '/images/290095_Cole_Buxton-08-1412.jpg.jpeg',
    variants: [
      { id: '15-1', color: 'BLACK' },
      { id: '15-2', color: 'BROWN' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    collection: 't-shirts',
  },
  {
    id: '16',
    title: 'Core Sportswear T-Shirt',
    handle: 'core-sportswear-t-shirt-brown',
    price: '£95',
    color: 'BROWN',
    image: '/images/290095_Cole_Buxton-08-1420.jpg.jpeg',
    collection: 't-shirts',
  },
  {
    id: '17',
    title: 'Core Sportswear T-Shirt',
    handle: 'core-sportswear-t-shirt-white',
    price: '£95',
    color: 'WHITE',
    image: '/images/290095_Cole_Buxton-08-1427.jpg.jpeg',
    collection: 't-shirts',
  },

  // Long Sleeve T-Shirts
  {
    id: '18',
    title: 'CB Star Long Sleeve',
    handle: 'cb-star-long-sleeve-black',
    price: '£120',
    color: 'BLACK',
    image: '/images/290095_Cole_Buxton-08-1432.jpg.jpeg',
    variants: [
      { id: '18-1', color: 'BLACK' },
      { id: '18-2', color: 'GREY' },
      { id: '18-3', color: 'WHITE' },
      { id: '18-4', color: 'ORANGE' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    collection: 't-shirts',
  },
  {
    id: '19',
    title: 'CB Star Long Sleeve',
    handle: 'cb-star-long-sleeve-grey',
    price: '£120',
    color: 'GREY',
    image: '/images/290095_Cole_Buxton-08-1436.jpg.jpeg',
    collection: 't-shirts',
  },
  {
    id: '20',
    title: 'CB Star Long Sleeve',
    handle: 'cb-star-long-sleeve-white',
    price: '£120',
    color: 'WHITE',
    image: '/images/290095_Cole_Buxton-08-1441.jpg.jpeg',
    collection: 't-shirts',
  },
  {
    id: '21',
    title: 'CB Star Long Sleeve',
    handle: 'cb-star-long-sleeve-orange',
    price: '£120',
    color: 'ORANGE',
    image: '/images/290095_Cole_Buxton-08-1453.jpg.jpeg',
    collection: 't-shirts',
  },
  {
    id: '22',
    title: 'C.B. AW25 Sports Long Sleeve',
    handle: 'cb-aw25-sports-long-sleeve-black',
    price: '£120',
    color: 'BLACK',
    image: '/images/290095_Cole_Buxton-08-1457.jpg.jpeg',
    description: 'AW25 collection long sleeve featuring sportswear graphics.',
    sizes: ['S', 'M', 'L', 'XL'],
    collection: 't-shirts',
  },

  // Knitwear
  {
    id: '23',
    title: 'CB Star Knit Sweater',
    handle: 'cb-star-knit-sweater-grey',
    price: '£245',
    color: 'GREY',
    image: '/images/290095_Cole_Buxton-08-1490.jpg.jpeg',
    variants: [
      { id: '23-1', color: 'GREY' },
      { id: '23-2', color: 'OLIVE GREEN' },
      { id: '23-3', color: 'BLACK' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    collection: 'knitwear',
    salesCount: 892,
    popularityRank: 5,
    fitInfo: {
      recommendedHeight: '5\'7" - 6\'2"',
      recommendedWeight: '150-195 lbs',
      fitNotes: 'Relaxed fit, slightly oversized. Size M fits most customers 5\'9"-6\'0" and 170-185 lbs.'
    },
  },
  {
    id: '24',
    title: 'CB Star Knit Sweater',
    handle: 'cb-star-knit-sweater-olive',
    price: '£245',
    color: 'OLIVE GREEN',
    image: '/images/290095_Cole_Buxton-08-1495.jpg.jpeg',
    collection: 'knitwear',
  },
  {
    id: '25',
    title: 'CB Star Knit Sweater',
    handle: 'cb-star-knit-sweater-black',
    price: '£245',
    color: 'BLACK',
    image: '/images/290095_Cole_Buxton-08-1500.jpg.jpeg',
    collection: 'knitwear',
  },

  // Pants
  {
    id: '26',
    title: 'CB Star Knit Pants',
    handle: 'cb-star-knit-pants-black',
    price: '£245',
    color: 'BLACK',
    image: '/images/290095_Cole_Buxton-08-1505.jpg.jpeg',
    variants: [
      { id: '26-1', color: 'BLACK' },
      { id: '26-2', color: 'OLIVE GREEN' },
      { id: '26-3', color: 'GREY' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    collection: 'pants',
    salesCount: 1567,
    popularityRank: 4,
    fitInfo: {
      recommendedHeight: '5\'6" - 6\'2"',
      recommendedWeight: '140-200 lbs',
      fitNotes: 'Regular fit, true to size. Size M fits most customers 5\'8"-5\'11" and 160-180 lbs.'
    },
  },
  {
    id: '27',
    title: 'CB Star Knit Pants',
    handle: 'cb-star-knit-pants-olive',
    price: '£245',
    color: 'OLIVE GREEN',
    image: '/images/290142_Cole_Buxton-08-0381.jpg.jpeg',
    collection: 'pants',
  },
  {
    id: '28',
    title: 'CB Star Knit Pants',
    handle: 'cb-star-knit-pants-grey',
    price: '£245',
    color: 'GREY',
    image: '/images/290142_Cole_Buxton-08-0388.jpg.jpeg',
    collection: 'pants',
  },
  {
    id: '29',
    title: 'Workwear Pants',
    handle: 'workwear-pants-brown',
    price: '£245',
    color: 'BROWN',
    image: '/images/290142_Cole_Buxton-08-0394.jpg.jpeg',
    variants: [
      { id: '29-1', color: 'BROWN' },
      { id: '29-2', color: 'BLACK' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    collection: 'pants',
  },
  {
    id: '30',
    title: 'Workwear Pants',
    handle: 'workwear-pants-black',
    price: '£245',
    color: 'BLACK',
    image: '/images/290142_Cole_Buxton-08-0411_30102888-63c9-42a9-be69-1e8d92d55909.jpg.jpeg',
    collection: 'pants',
  },
  {
    id: '31',
    title: 'Cargo Pants',
    handle: 'cargo-pants-olive',
    price: '£245',
    color: 'OLIVE GREEN',
    image: '/images/290142_Cole_Buxton-08-0415.jpg.jpeg',
    sizes: ['S', 'M', 'L', 'XL'],
    collection: 'pants',
  },

  // Polo Shirts
  {
    id: '32',
    title: 'Cole Buxton Polo',
    handle: 'cole-buxton-polo-black',
    price: '£120',
    color: 'BLACK',
    image: '/images/290142_Cole_Buxton-08-0624.jpg.jpeg',
    variants: [
      { id: '32-1', color: 'BLACK' },
      { id: '32-2', color: 'BROWN' },
      { id: '32-3', color: 'OLIVE GREEN' },
      { id: '32-4', color: 'WHITE' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    collection: 'shirts',
  },
  {
    id: '33',
    title: 'Cole Buxton Polo',
    handle: 'cole-buxton-polo-brown',
    price: '£120',
    color: 'BROWN',
    image: '/images/290142_Cole_Buxton-08-0646.jpg.jpeg',
    collection: 'shirts',
  },
  {
    id: '34',
    title: 'Cole Buxton Polo',
    handle: 'cole-buxton-polo-olive',
    price: '£120',
    color: 'OLIVE GREEN',
    image: '/images/290142_Cole_Buxton-08-1065.jpg.jpeg',
    collection: 'shirts',
  },
  {
    id: '35',
    title: 'Cole Buxton Polo',
    handle: 'cole-buxton-polo-white',
    price: '£120',
    color: 'WHITE',
    image: '/images/290161_Cole_Buxton-07-6327.jpg.jpeg',
    collection: 'shirts',
  },

  // Henley & Shorts
  {
    id: '36',
    title: 'Taupe Henley',
    handle: 'taupe-henley',
    price: '£120',
    color: 'TAUPE',
    image: '/images/taupe_henley-3.jpg.jpeg',
    sizes: ['S', 'M', 'L', 'XL'],
    collection: 'shirts',
  },
  {
    id: '37',
    title: 'Brown Shorts',
    handle: 'brown-shorts',
    price: '£95',
    color: 'BROWN',
    image: '/images/brown_shorts-1_3_d70ad7f7-6546-46b9-a987-31caafe4687b.jpg.jpeg',
    sizes: ['S', 'M', 'L', 'XL'],
    collection: 'pants',
  },

  // Footwear - Wilson Sneakers
  {
    id: '38',
    title: 'The Wilson Sneaker',
    handle: 'the-wilson-sneaker-black',
    price: '£275',
    color: 'BLACK',
    image: '/images/1_20250715_CB_WILSON-SHOE_ECOM-CAMPAIGN_0024_1_20250715_CB_WILSON-SHOE_ECOM-CAMPAIGN_013.jpg.jpeg',
    variants: [
      { id: '38-1', color: 'BLACK' },
      { id: '38-2', color: 'BLUE' },
      { id: '38-3', color: 'RED' },
      { id: '38-4', color: 'GREEN' },
      { id: '38-5', color: 'PINK' },
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    collection: 'footwear',
    salesCount: 4567,
    popularityRank: 1,
    fitInfo: {
      recommendedHeight: '5\'4" - 6\'4"',
      recommendedWeight: '120-220 lbs',
      fitNotes: 'True to size. Most customers wear their regular shoe size. Size 9 fits most customers 5\'9"-6\'0".'
    },
  },
  {
    id: '39',
    title: 'The Wilson Sneaker',
    handle: 'the-wilson-sneaker-blue',
    price: '£275',
    color: 'BLUE',
    image: '/images/1_20250715_CB_WILSON-SHOE_ECOM-CAMPAIGN_0044_1_20250715_CB_WILSON-SHOE_ECOM-CAMPAIGN_017.jpg.jpeg',
    collection: 'footwear',
  },
  {
    id: '40',
    title: 'The Wilson Sneaker',
    handle: 'the-wilson-sneaker-red',
    price: '£275',
    color: 'RED',
    image: '/images/2_20250715_CB_WILSON-SHOE_ECOM-CAMPAIGN_0127_2_20250715_CB_WILSON-SHOE_ECOM-CAMPAIGN_072.jpg.jpeg',
    collection: 'footwear',
  },
  {
    id: '41',
    title: 'The Wilson Sneaker',
    handle: 'the-wilson-sneaker-green',
    price: '£275',
    color: 'GREEN',
    image: '/images/2_20250715_CB_WILSON-SHOE_ECOM-CAMPAIGN_0152_2_20250715_CB_WILSON-SHOE_ECOM-CAMPAIGN_046.jpg.jpeg',
    collection: 'footwear',
  },
  {
    id: '42',
    title: 'The Wilson Sneaker',
    handle: 'the-wilson-sneaker-pink',
    price: '£275',
    color: 'PINK',
    image: '/images/3_20250715_CB_WILSON-SHOE_ECOM-CAMPAIGN_0110_3_20250715_CB_WILSON-SHOE_ECOM-CAMPAIGN_020_7a6c8e81-72a6-405f-a4ea-0cd408acd84c.jpg.jpeg',
    collection: 'footwear',
  },
  {
    id: '43',
    title: 'The Wilson Sneaker',
    handle: 'the-wilson-sneaker-variant-1',
    price: '£275',
    color: 'VARIANT',
    image: '/images/4_20250715_CB_WILSON-SHOE_ECOM-CAMPAIGN_0207_4_20250715_CB_WILSON-SHOE_ECOM-CAMPAIGN_032.jpg.jpeg',
    collection: 'footwear',
  },
  {
    id: '44',
    title: 'The Wilson Sneaker',
    handle: 'the-wilson-sneaker-variant-2',
    price: '£275',
    color: 'VARIANT',
    image: '/images/5_20250715_CB_WILSON-SHOE_ECOM-CAMPAIGN_0223_5_20250715_CB_WILSON-SHOE_ECOM-CAMPAIGN_034.jpg.jpeg',
    collection: 'footwear',
  },
  {
    id: '45',
    title: 'The Wilson Sneaker',
    handle: 'the-wilson-sneaker-variant-3',
    price: '£275',
    color: 'VARIANT',
    image: '/images/5_20250715_CB_WILSON-SHOE_ECOM-CAMPAIGN_0250_5_20250715_CB_WILSON-SHOE_ECOM-CAMPAIGN_039.jpg.jpeg',
    collection: 'footwear',
  },
]

export function getAllProducts(): Product[] {
  return products
}

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle)
}

export function getFeaturedProducts(): Product[] {
  return products.slice(0, 8)
}

export function getNewLaunches(): Product[] {
  return [
    products[21], // C.B. AW25 Sports Long Sleeve
    products[37], // The Wilson Sneaker Black
    products[4],   // Core Sportswear Hoodie
    products[22], // CB Star Long Sleeve Black
  ]
}

export function getProductsByCollection(collection: string): Product[] {
  return products.filter((p) => p.collection === collection)
}
