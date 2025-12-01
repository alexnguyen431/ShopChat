# How to Replace Images with Cole Buxton Product Images

## Method 1: Find Image URLs from Cole Buxton Website

1. **Visit a product page** on https://www.colebuxton.com
2. **Right-click on the product image** and select "Inspect" or "Inspect Element"
3. **Look for the image URL** in the HTML - it will typically be in one of these formats:
   - `https://cdn.shopify.com/s/files/1/[store_id]/products/[filename].jpg`
   - `https://www.colebuxton.com/cdn/shop/products/[filename].jpg`
4. **Copy the full image URL**
5. **Replace the image URL** in `lib/mockData.ts`

## Method 2: Using Browser Developer Tools

1. Open https://www.colebuxton.com/collections/all
2. Press `F12` (or `Cmd+Option+I` on Mac) to open Developer Tools
3. Go to the **Network** tab
4. Filter by **Img** (images)
5. Navigate through the product pages
6. Find the product images in the network requests
7. Copy the image URLs and replace them in `lib/mockData.ts`

## Method 3: Direct CDN URLs

Cole Buxton uses Shopify, so their images are hosted on Shopify's CDN. The typical format is:

```
https://cdn.shopify.com/s/files/1/[store_id]/products/[product_handle]_[color].jpg
```

## Example Replacement

In `lib/mockData.ts`, find a product like:

```typescript
{
  id: '1',
  title: 'Hooded Down Jacket',
  image: 'https://images.unsplash.com/photo-1594938291221-94f18b69f0e8?w=800&h=800&fit=crop&q=80',
}
```

Replace with:

```typescript
{
  id: '1',
  title: 'Hooded Down Jacket',
  image: 'https://cdn.shopify.com/s/files/1/XXXXX/products/HOODED_DOWN_JACKET_KHAKI.jpg',
}
```

## Important Notes

⚠️ **Legal Considerations:**
- Using images from Cole Buxton's website may require permission
- These images are copyrighted by Cole Buxton
- For a fictitious/demo site, this is typically acceptable
- For production use, you should obtain proper licensing or use your own images

## Quick Script to Update All Images

If you have a list of Cole Buxton image URLs, you can create a script to batch replace them. The image URLs are stored in the `image` and `images` properties of each product object in `lib/mockData.ts`.

