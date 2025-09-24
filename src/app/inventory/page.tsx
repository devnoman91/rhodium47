'use client';

import { useState } from 'react';
import { inventoryData, filterOptions, VehicleInventory } from '@/data/inventory';
import VehicleCard from '@/components/inventory/VehicleCard';
import FilterSidebar from '@/components/inventory/FilterSidebar';
const criticalInlineStyles = `
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for Firefox */
.no-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}
`
export default function InventoryPage() {
  const [filteredVehicles, setFilteredVehicles] = useState<VehicleInventory[]>(inventoryData);
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

    // Apply filters to inventory data
    let filtered = inventoryData;

    // Filter by status
    if (newFilters.status) {
      filtered = filtered.filter(vehicle => vehicle.status === newFilters.status);
    }

    // Filter by models
    if (newFilters.models.length > 0) {
      filtered = filtered.filter(vehicle => newFilters.models.includes(vehicle.model));
    }

    // Filter by price range
    filtered = filtered.filter(vehicle =>
      vehicle.monthlyFinancing >= newFilters.priceRange[0] &&
      vehicle.monthlyFinancing <= newFilters.priceRange[1]
    );

    // Filter by trim
    if (newFilters.trim) {
      filtered = filtered.filter(vehicle => vehicle.trim === newFilters.trim);
    }

    // Filter by year
    if (newFilters.mileageYear) {
      filtered = filtered.filter(vehicle => vehicle.year.toString() === newFilters.mileageYear);
    }

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
          </div>

          {/* Vehicle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
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
                  setFilteredVehicles(inventoryData);
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