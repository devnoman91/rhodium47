'use client';

import { useState } from 'react';
import FilterSidebar from '@/components/inventory/FilterSidebar';
import Image from 'next/image';
import Link from 'next/link';

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

interface InventoryClientProps {
  vehicles: Vehicle[];
  priceRange: {
    min: number;
    max: number;
  };
  collections: { handle: string; title: string }[];
  productsByCollection: Record<string, string[]>; // Map collection handle to product IDs
  filterOptions: any; // Dynamic filter options from tags
}

const criticalInlineStyles = `
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for Firefox */
.no-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}
`;

export default function InventoryClient({ vehicles, priceRange, collections, productsByCollection, filterOptions }: InventoryClientProps) {
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(vehicles);
  const [filters, setFilters] = useState({
    zipCode: '',
    status: '',
    models: [] as string[],
    vehicleType: '',
    armorLevel: '',
    drivetrain: '',
    fuelType: '',
    transmission: '',
    seatingCapacity: '',
    modelYear: '',
    paymentType: '',
    priceRange: [priceRange.min, priceRange.max] as [number, number],
    trim: '',
    mileageYear: '',
    paint: '',
    wheels: '',
    interior: '',
    seatLayout: '',
    additionalOptions: [] as string[]
  });

  // Create a map from collection title to handle for filtering
  const collectionTitleToHandle = new Map(
    collections.map(c => [c.title, c.handle])
  );

  // Helper function to check if vehicle has a specific tag
  const hasTag = (vehicle: Vehicle, prefix: string, value: string): boolean => {
    if (!vehicle.tags || !value) return true;
    const tagToFind = `${prefix}:${value}`.toLowerCase();
    return vehicle.tags.some(tag => tag.toLowerCase() === tagToFind);
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);

    // Apply filters to vehicles data
    let filtered = vehicles;

    // Filter by collections (models)
    if (newFilters.models.length > 0) {
      const selectedHandles = newFilters.models
        .map(title => collectionTitleToHandle.get(title))
        .filter(Boolean) as string[];

      const selectedProductIds = new Set<string>();
      selectedHandles.forEach(handle => {
        const productIds = productsByCollection[handle] || [];
        productIds.forEach(id => selectedProductIds.add(id));
      });

      filtered = filtered.filter(vehicle =>
        selectedProductIds.has(vehicle.id)
      );
    }

    // Filter by vehicle type (tag-based)
    if (newFilters.vehicleType) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'vehicle-type', newFilters.vehicleType));
    }

    // Filter by armor level (tag-based)
    if (newFilters.armorLevel) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'armor-level', newFilters.armorLevel));
    }

    // Filter by drivetrain (tag-based)
    if (newFilters.drivetrain) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'drivetrain', newFilters.drivetrain));
    }

    // Filter by fuel type (tag-based)
    if (newFilters.fuelType) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'fuel-type', newFilters.fuelType));
    }

    // Filter by transmission (tag-based)
    if (newFilters.transmission) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'transmission', newFilters.transmission));
    }

    // Filter by seating capacity (tag-based)
    if (newFilters.seatingCapacity) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'seating-capacity', newFilters.seatingCapacity));
    }

    // Filter by model year (tag-based)
    if (newFilters.modelYear) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'model-year', newFilters.modelYear));
    }

    // Filter by payment type (tag-based)
    if (newFilters.paymentType) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'payment', newFilters.paymentType));
    }

    // Filter by mileage/year (tag-based)
    if (newFilters.mileageYear) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'year', newFilters.mileageYear));
    }

    // Filter by paint (tag-based)
    if (newFilters.paint) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'paint', newFilters.paint));
    }

    // Filter by wheels (tag-based)
    if (newFilters.wheels) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'wheels', newFilters.wheels));
    }

    // Filter by interior (tag-based)
    if (newFilters.interior) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'interior', newFilters.interior));
    }

    // Filter by seat layout (tag-based)
    if (newFilters.seatLayout) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'seats', newFilters.seatLayout));
    }

    // Filter by additional options (tag-based, multiple selection)
    if (newFilters.additionalOptions.length > 0) {
      filtered = filtered.filter(vehicle =>
        newFilters.additionalOptions.every(option => hasTag(vehicle, 'option', option))
      );
    }

    // Filter by price range
    filtered = filtered.filter(vehicle =>
      vehicle.price >= newFilters.priceRange[0] &&
      vehicle.price <= newFilters.priceRange[1]
    );

    setFilteredVehicles(filtered);
  };

  return (
    <div className="min-h-screen pt-20 bg-[#FFFFFF] relative">
      <div className="flex">
        {/* Filter Sidebar - Sticky positioning */}
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="sticky top-20 h-screen w-80 bg-white z-[2] overflow-y-auto flex-shrink-0 no-scrollbar pb-[50px]">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            filterOptions={{
              ...filterOptions,
              models: collections.map(c => c.title), // Use collection titles as model options
              priceRange: priceRange
            }}
          />
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1 min-h-screen p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Inventory</h1>
            <p className="text-sm text-gray-600 mt-2">Showing {filteredVehicles.length} vehicles</p>
          </div>

          {/* Vehicle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <Link key={vehicle.id} href={`/inventory/${vehicle.handle}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  {/* Vehicle Image */}
                  <div className="relative h-48 w-full bg-gray-100">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.model}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Vehicle Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {vehicle.model}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {vehicle.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xl font-bold text-gray-900">
                          ${vehicle.price.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">Starting price</p>
                      </div>

                      <button className="px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* No Results */}
          {filteredVehicles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No vehicles match your current filters.</p>
              <button
                onClick={() => {
                  setFilters({
                    zipCode: '',
                    status: '',
                    models: [],
                    vehicleType: '',
                    armorLevel: '',
                    drivetrain: '',
                    fuelType: '',
                    transmission: '',
                    seatingCapacity: '',
                    modelYear: '',
                    paymentType: '',
                    priceRange: [priceRange.min, priceRange.max] as [number, number],
                    trim: '',
                    mileageYear: '',
                    paint: '',
                    wheels: '',
                    interior: '',
                    seatLayout: '',
                    additionalOptions: []
                  });
                  setFilteredVehicles(vehicles);
                }}
                className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
