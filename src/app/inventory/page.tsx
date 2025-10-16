import { getProducts, getCollections, getCollectionProducts } from '@/lib/shopify';
import InventoryClient from '@/components/inventory/InventoryClient';

interface Vehicle {
  id: string;
  model: string;
  title: string;
  price: number;
  image: string;
  description: string;
  handle: string;
  variants?: any[];
  options?: any[];
  tags?: string[]; // Product tags
}

export default async function InventoryPage() {
  let vehicles: Vehicle[] = [];
  let collections: { handle: string; title: string }[] = [];
  let productsByCollection: Record<string, string[]> = {}; // Map collection handle to product IDs
  let dynamicPriceRange = { min: 750, max: 1050 }; // Default fallback values

  try {
    // Fetch all products from Shopify
    const products = await getProducts({});

    // Fetch collections from Shopify
    const shopifyCollections = await getCollections();

    // Filter out the "All" collection and hidden collections
    collections = shopifyCollections
      .filter(col => col.handle !== '' && !col.handle.startsWith('hidden'))
      .map(col => ({
        handle: col.handle,
        title: col.title
      }));

    // Fetch products for each collection to build the mapping
    for (const collection of collections) {
      try {
        const collectionProducts = await getCollectionProducts({
          collection: collection.handle
        });
        productsByCollection[collection.handle] = collectionProducts.map(p => p.id);
      } catch (error) {
        console.error(`Error fetching products for collection ${collection.handle}:`, error);
        productsByCollection[collection.handle] = [];
      }
    }

    // Transform Shopify products to match your design needs
    vehicles = products.map((product) => ({
      id: product.id,
      model: product.title,
      title: product.title,
      price: parseFloat(product.priceRange.minVariantPrice.amount),
      image: product.images[0]?.url || '/images/vehicle.png',
      description: product.description,
      handle: product.handle,
      variants: product.variants,
      options: product.options,
      tags: product.tags, // Store tags to identify collections
    }));

    // Calculate dynamic price range from actual products
    if (vehicles.length > 0) {
      const prices = vehicles.map(v => v.price);
      dynamicPriceRange = {
        min: Math.floor(Math.min(...prices)),
        max: Math.ceil(Math.max(...prices))
      };
    }
  } catch (error: any) {
    console.error('Error fetching products from Shopify:', error);
    // Return empty array if there's an error
    vehicles = [];
  }

  return (
    <InventoryClient
      vehicles={vehicles}
      priceRange={dynamicPriceRange}
      collections={collections}
      productsByCollection={productsByCollection}
    />
  );
}
