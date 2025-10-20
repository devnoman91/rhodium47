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
  descriptionHtml?: string;
  handle: string;
  variants?: any[];
  options?: any[];
  tags?: string[];
  metafields?: { key: string; value: string }[];
}

interface InventoryClientProps {
  vehicles: Vehicle[];
  priceRange: {
    min: number;
    max: number;
  };
  collections: { handle: string; title: string }[];
  productsByCollection: Record<string, string[]>;
  filterOptions: any;
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

// Helper function to extract specs from top-heading HTML
function extractTopHeadingSpecs(html: string): string {
  if (!html) return '';

  const topHeadingStart = html.indexOf('<div id="top-heading">');
  if (topHeadingStart === -1) return '';

  const topHeadingEnd = html.indexOf('</div>', topHeadingStart);
  if (topHeadingEnd === -1) return '';

  const topHeadingHtml = html.substring(topHeadingStart, topHeadingEnd + 6);

  // Running in browser (client component) — create element to strip tags
  const tempDiv = typeof document !== 'undefined' ? document.createElement('div') : null;
  if (!tempDiv) return topHeadingHtml.replace(/<[^>]+>/g, '');
  tempDiv.innerHTML = topHeadingHtml;
  return tempDiv.textContent || tempDiv.innerText || '';
}

export default function InventoryClient({
  vehicles,
  priceRange,
  collections,
  productsByCollection,
  filterOptions
}: InventoryClientProps) {
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

  // Create a map from collection title to handle for filtering (if needed)
  const collectionTitleToHandle = new Map(
    collections.map(c => [c.title, c.handle])
  );

  // Helper: determine if vehicle has a tag like "prefix:value"
  const hasTag = (vehicle: Vehicle, prefix: string, value: string): boolean => {
    if (!vehicle.tags || !value) return true;
    const tagToFind = `${prefix}:${value}`.toLowerCase();
    return vehicle.tags.some(tag => tag.toLowerCase() === tagToFind);
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);

    // Start filtering from the original vehicles array
    let filtered = vehicles;

    // Filter by product names (models)
    if (newFilters.models.length > 0) {
      filtered = filtered.filter(vehicle =>
        newFilters.models.some(modelName =>
          vehicle.title.toLowerCase().includes(modelName.toLowerCase()) ||
          vehicle.model.toLowerCase().includes(modelName.toLowerCase())
        )
      );
    }

    // Tag-based filters (vehicle-type, armor-level, drivetrain, fuel-type, transmission, seating-capacity, model-year, payment, year/mileage, paint, wheels, interior, seats)
    if (newFilters.vehicleType) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'vehicle-type', newFilters.vehicleType));
    }
    if (newFilters.armorLevel) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'armor-level', newFilters.armorLevel));
    }
    if (newFilters.drivetrain) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'drivetrain', newFilters.drivetrain));
    }
    if (newFilters.fuelType) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'fuel-type', newFilters.fuelType));
    }
    if (newFilters.transmission) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'transmission', newFilters.transmission));
    }
    if (newFilters.seatingCapacity) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'seating-capacity', newFilters.seatingCapacity));
    }
    if (newFilters.modelYear) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'model-year', newFilters.modelYear));
    }
    if (newFilters.paymentType) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'payment', newFilters.paymentType));
    }
    if (newFilters.mileageYear) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'year', newFilters.mileageYear));
    }
    if (newFilters.paint) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'paint', newFilters.paint));
    }
    if (newFilters.wheels) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'wheels', newFilters.wheels));
    }
    if (newFilters.interior) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'interior', newFilters.interior));
    }
    if (newFilters.seatLayout) {
      filtered = filtered.filter(vehicle => hasTag(vehicle, 'seats', newFilters.seatLayout));
    }

    // Additional options (must include every selected option)
    if (newFilters.additionalOptions.length > 0) {
      filtered = filtered.filter(vehicle =>
        newFilters.additionalOptions.every(option => hasTag(vehicle, 'option', option))
      );
    }

    // Price range filter
    filtered = filtered.filter(vehicle =>
      vehicle.price >= newFilters.priceRange[0] &&
      vehicle.price <= newFilters.priceRange[1]
    );

    setFilteredVehicles(filtered);
  };

  return (
    <div className="min-h-screen pt-[126px] pb-[95px] bg-[#FFFFFF] relative">
      <div className="flex max-w-[1600px] m-auto gap-[45px]">
        {/* Inject small critical styles */}
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />

        {/* Sidebar */}
        <div className="sticky top-20 h-screen w-full max-w-[199px] bg-white z-[2] overflow-y-auto flex-shrink-0 no-scrollbar">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            filterOptions={{
              ...filterOptions,
              models: vehicles.map(v => v.title).filter((value, index, self) => self.indexOf(value) === index),
              priceRange: priceRange
            }}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 min-h-screen pt-[50px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[15px] gap-y-[35px]">
            {filteredVehicles.map((vehicle) => {
              const specsText = extractTopHeadingSpecs(vehicle.descriptionHtml || '');

              return (
                <Link key={vehicle.id} href={`/inventory/${vehicle.handle}`}>
                  <div className="h-full overflow-hidden rounded-[10px] border border-[#E0E0E0] group cursor-pointer ">
                    {/* Image */}
                    <div className="relative h-[230px] w-full overflow-hidden">
                      {/* next/image requires domain config if using remote; fallback to <img> if needed */}
                      <Image
                        src={vehicle.image}
                        alt={vehicle.model}
                        fill
                        className="w-full h-full object-cover group-hover:scale-110 transition-all ease-in-out duration-400"
                      />
                    </div>

                    {/* Info */}
                    <div className='p-[24px]'>
                      <div className="max-w-[320px]">
                        <h3 className="text-[16px] font-[500] font-helvetica text-[#111] mb-1">
                          {vehicle.model}
                        </h3>
                        <p className="text-[14px] font-[600] font-helvetica text-[#111] mb-[8px]">
                          ${vehicle.price.toLocaleString()}
                        </p>

                        {specsText && (
                          <p className="text-[12px] text-[#636363] mb-[10px] line-clamp-3 font-[400] font-helvetica leading-[150%] capitalize">
                            {specsText}
                          </p>
                        )}

                        {/* Display vehicle tags (all tags) */}
                        {vehicle.tags && vehicle.tags.length > 0 && (
                          <div className="flex flex-wrap gap-[6px] mt-[6px]">
                            {vehicle.tags.map((tag, idx) => {
                              const cleanTag = tag.includes(':') ? tag.split(':')[1] : tag;
                              return (
                                <span
                                  key={idx}
                                  className="bg-[#F4F4F4] text-[#111] text-[10px] font-helvetica font-medium px-[8px] py-[3px] rounded-full capitalize"
                                >
                                  {cleanTag}
                                </span>
                              );
                            })}
                          </div>
                        )}

                        {/* Active filters summary */}
                        <div className="mt-2">
                          {(() => {
                            const activeFilters = Object.entries(filters).filter(([key, value]) => {
                              if (!value || (Array.isArray(value) && value.length === 0)) return false;
                              if (key === 'priceRange' && Array.isArray(value) &&
                                  value[0] === priceRange.min && value[1] === priceRange.max) return false;
                              return true;
                            });

                            if (activeFilters.length === 0) return null;

                            const filterTexts = activeFilters.map(([key, value]) => {
                              let displayValue = '';
                              if (Array.isArray(value)) {
                                displayValue = value.join(', ');
                              } else if (typeof value === 'string' && value) {
                                displayValue = value;
                              }
                              return displayValue ? `${key.replace(/([A-Z])/g, ' $1').toLowerCase()}: ${displayValue}` : null;
                            }).filter(Boolean);

                            return filterTexts.length > 0 ? (
                              <p className="text-[10px] text-gray-500 font-helvetica leading-[140%]">
                                {filterTexts.join(' • ')}
                              </p>
                            ) : null;
                          })()}
                        </div>

                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* No results */}
          {filteredVehicles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No vehicles match your current filters.</p>
              <button
                onClick={() => {
                  const reset = {
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
                  };
                  setFilters(reset);
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
