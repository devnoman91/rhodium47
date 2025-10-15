import { getProducts } from '@/lib/shopify';
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
}

export default async function InventoryPage() {
  let vehicles: Vehicle[] = [];
  let dynamicPriceRange = { min: 750, max: 1050 }; // Default fallback values

  try {
    // Fetch products from Shopify
    const products = await getProducts({});

    // Transform Shopify products to match your design needs
    vehicles = products.map((product) => ({
      id: product.id,
      model: product.title,
      title: product.description || product.title,
      price: parseFloat(product.priceRange.minVariantPrice.amount),
      image: product.images[0]?.url || '/images/vehicle.png',
      description: product.description,
      handle: product.handle,
      // Additional fields from variants/options if needed
      variants: product.variants,
      options: product.options,
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

  return <InventoryClient vehicles={vehicles} priceRange={dynamicPriceRange} />;
}
