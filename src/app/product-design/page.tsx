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

// Helper function to build filter options from all product tags
function buildFilterOptionsFromTags(products: any[]) {
  const filterSets = {
    vehicleTypes: new Set<string>(),
    armorLevels: new Set<string>(),
    drivetrains: new Set<string>(),
    fuelTypes: new Set<string>(),
    transmissions: new Set<string>(),
    seatingCapacities: new Set<string>(),
    modelYears: new Set<string>(),
    paymentTypes: new Set<string>(),
    mileageYears: new Set<string>(),
    paintOptions: new Set<string>(),
    wheelOptions: new Set<string>(),
    interiorOptions: new Set<string>(),
    seatLayouts: new Set<string>(),
    additionalOptions: new Set<string>()
  };

  products.forEach(product => {
    if (!product.tags) return;

    product.tags.forEach((tag: string) => {
      const lowerTag = tag.toLowerCase();

      if (lowerTag.startsWith('vehicle-type:')) {
        filterSets.vehicleTypes.add(tag.split(':')[1]?.trim() || '');
      } else if (lowerTag.startsWith('armor-level:')) {
        filterSets.armorLevels.add(tag.split(':')[1]?.trim() || '');
      } else if (lowerTag.startsWith('drivetrain:')) {
        filterSets.drivetrains.add(tag.split(':')[1]?.trim() || '');
      } else if (lowerTag.startsWith('fuel-type:')) {
        filterSets.fuelTypes.add(tag.split(':')[1]?.trim() || '');
      } else if (lowerTag.startsWith('transmission:')) {
        filterSets.transmissions.add(tag.split(':')[1]?.trim() || '');
      } else if (lowerTag.startsWith('seating-capacity:')) {
        filterSets.seatingCapacities.add(tag.split(':')[1]?.trim() || '');
      } else if (lowerTag.startsWith('model-year:')) {
        filterSets.modelYears.add(tag.split(':')[1]?.trim() || '');
      } else if (lowerTag.startsWith('payment:')) {
        filterSets.paymentTypes.add(tag.split(':')[1]?.trim() || '');
      } else if (lowerTag.startsWith('year:')) {
        filterSets.mileageYears.add(tag.split(':')[1]?.trim() || '');
      } else if (lowerTag.startsWith('paint:')) {
        filterSets.paintOptions.add(tag.split(':')[1]?.trim() || '');
      } else if (lowerTag.startsWith('wheels:')) {
        filterSets.wheelOptions.add(tag.split(':')[1]?.trim() || '');
      } else if (lowerTag.startsWith('interior:')) {
        filterSets.interiorOptions.add(tag.split(':')[1]?.trim() || '');
      } else if (lowerTag.startsWith('seats:')) {
        filterSets.seatLayouts.add(tag.split(':')[1]?.trim() || '');
      } else if (lowerTag.startsWith('option:')) {
        filterSets.additionalOptions.add(tag.split(':')[1]?.trim() || '');
      }
    });
  });

  // Convert sets to sorted arrays and filter out empty values
  return {
    vehicleTypes: Array.from(filterSets.vehicleTypes).filter(Boolean).sort(),
    armorLevels: Array.from(filterSets.armorLevels).filter(Boolean).sort(),
    drivetrains: Array.from(filterSets.drivetrains).filter(Boolean).sort(),
    fuelTypes: Array.from(filterSets.fuelTypes).filter(Boolean).sort(),
    transmissions: Array.from(filterSets.transmissions).filter(Boolean).sort(),
    seatingCapacities: Array.from(filterSets.seatingCapacities).filter(Boolean).sort(),
    modelYears: Array.from(filterSets.modelYears).filter(Boolean).sort().reverse(),
    paymentTypes: Array.from(filterSets.paymentTypes).filter(Boolean).sort(),
    mileageYears: Array.from(filterSets.mileageYears).filter(Boolean).sort().reverse(),
    paintOptions: Array.from(filterSets.paintOptions).filter(Boolean).sort(),
    wheelOptions: Array.from(filterSets.wheelOptions).filter(Boolean).sort(),
    interiorOptions: Array.from(filterSets.interiorOptions).filter(Boolean).sort(),
    seatLayouts: Array.from(filterSets.seatLayouts).filter(Boolean).sort(),
    additionalOptions: Array.from(filterSets.additionalOptions).filter(Boolean).sort()
  };
}

export default async function InventoryPage() {
  let vehicles: Vehicle[] = [];
  let collections: { handle: string; title: string }[] = [];
  let productsByCollection: Record<string, string[]> = {}; // Map collection handle to product IDs
  let dynamicPriceRange = { min: 750, max: 1050 }; // Default fallback values
  let filterOptions: any = {};

  try {
    // Fetch all products from Shopify
    const products = await getProducts({});

    // Log the first product's tags to see the structure
    if (products.length > 0) {
      console.log('Sample Product Tags:', JSON.stringify({
        productTitle: products[0].title,
        tags: products[0].tags
      }, null, 2));
    }

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

    // Build filter options from product tags
    filterOptions = buildFilterOptionsFromTags(products);

    // Log the generated filter options
    console.log('Generated Filter Options:', JSON.stringify(filterOptions, null, 2));

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
      tags: product.tags, // Store tags for filtering
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
      filterOptions={filterOptions}
    />
  );
}
