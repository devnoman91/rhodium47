'use client';

import { useState } from 'react';
import { filterOptions } from '@/data/inventory';
import VehicleCard from '@/components/inventory/VehicleCard';
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
}

interface InventoryClientProps {
  vehicles: Vehicle[];
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

export default function InventoryClient({ vehicles }: InventoryClientProps) {
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(vehicles);
  const [filters, setFilters] = useState({
    zipCode: '',
    status: '',
    models: [] as string[],
    paymentType: '',
    priceRange: [filterOptions.priceRange.min, filterOptions.priceRange.max] as [number, number],
    trim: '',
    mileageYear: '',
    paint: '',
    wheels: '',
    interior: '',
    seatLayout: '',
    additionalOptions: [] as string[],
    vehicleHistory: ''
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);

    // Apply filters to vehicles data
    let filtered = vehicles;

    // Filter by models
    if (newFilters.models.length > 0) {
      filtered = filtered.filter(vehicle => newFilters.models.includes(vehicle.model));
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
            filterOptions={filterOptions}
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
                    paymentType: '',
                    priceRange: [filterOptions.priceRange.min, filterOptions.priceRange.max] as [number, number],
                    trim: '',
                    mileageYear: '',
                    paint: '',
                    wheels: '',
                    interior: '',
                    seatLayout: '',
                    additionalOptions: [],
                    vehicleHistory: ''
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
