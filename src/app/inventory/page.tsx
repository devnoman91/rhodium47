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
  } catch (error: any) {
    console.error('Error fetching products from Shopify:', error);
    // Return empty array if there's an error
    vehicles = [];
  }

  return <InventoryClient vehicles={vehicles} />;
}
