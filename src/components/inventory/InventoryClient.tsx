'use client';

import { useState } from 'react';
import FilterSidebar from '@/components/inventory/FilterSidebar';
import VehicleCard from '@/components/inventory/VehicleCard';

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
  publishedAt: string;
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
  scrollbar-width: none;
  -ms-overflow-style: none;
}
`;

export default function InventoryClient({
  vehicles,
  priceRange,
  collections,
  productsByCollection,
  filterOptions
}: InventoryClientProps) {
  // Filter out vehicles with "Due Today" in the title before processing
  const filteredVehiclesInitial = vehicles.filter(vehicle => !vehicle.title.toLowerCase().includes('due today'));
  
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(filteredVehiclesInitial);
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
    priceRange: [0, priceRange.max] as [number, number],
    trim: '',
    mileageYear: '',
    paint: '',
    wheels: '',
    interior: '',
    seatLayout: '',
    additionalOptions: [] as string[]
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const getVehicleStatus = (publishedAt: string): string => {
    const publishedDate = new Date(publishedAt);
    const now = new Date();
    const daysSincePublished = (now.getTime() - publishedDate.getTime()) / (1000 * 3600 * 24);
    return daysSincePublished <= 30 ? 'new' : 'pre-order';
  };

  const collectionTitleToHandle = new Map(
    collections.map(c => [c.title, c.handle])
  );

  const hasTag = (vehicle: Vehicle, prefix: string, value: string): boolean => {
    if (!vehicle.tags || !value) return true;
    const tagToFind = `${prefix}:${value}`.toLowerCase();
    return vehicle.tags.some(tag => tag.toLowerCase() === tagToFind);
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);

    // Start with the base filtered list (excluding "Due Today" products)
    let filtered = vehicles.filter(vehicle => !vehicle.title.toLowerCase().includes('due today'));

    if (newFilters.status) {
      filtered = filtered.filter(vehicle => {
        const status = getVehicleStatus(vehicle.publishedAt);
        return status === newFilters.status;
      });
    }

    if (newFilters.models.length > 0) {
      filtered = filtered.filter(vehicle =>
        newFilters.models.some(modelName =>
          vehicle.title.toLowerCase().includes(modelName.toLowerCase()) ||
          vehicle.model.toLowerCase().includes(modelName.toLowerCase())
        )
      );
    }

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

    if (newFilters.additionalOptions.length > 0) {
      filtered = filtered.filter(vehicle =>
        newFilters.additionalOptions.every(option => hasTag(vehicle, 'option', option))
      );
    }

    // Filter by price using LOWEST cash variant price
    filtered = filtered.filter(vehicle => {
      // Find ALL cash variants and get the LOWEST price
      const cashVariants = vehicle.variants?.filter((variant: any) =>
        variant.title && variant.title.toLowerCase().includes('cash')
      ) || [];

      let displayPrice = vehicle.price;
      if (cashVariants.length > 0) {
        const cashPrices = cashVariants.map((v: any) => parseFloat(v.price?.amount || 0)).filter(p => p > 0);
        if (cashPrices.length > 0) {
          displayPrice = Math.min(...cashPrices);
        }
      }

      return displayPrice >= newFilters.priceRange[0] && displayPrice <= newFilters.priceRange[1];
    });

    setFilteredVehicles(filtered);
  };

  // Function to check if any filter is active (excluding default price range)
  const hasActiveFilters = () => {
    return Object.entries(filters).some(([key, value]) => {
      if (!value || (Array.isArray(value) && value.length === 0)) return false;
      if (key === 'priceRange' && Array.isArray(value) &&
          value[0] === 0 && value[1] === priceRange.max) return false;
      if (key === 'zipCode' && value === '') return false;
      if (key === 'status' && value === '') return false;
      return true;
    });
  };

  const clearAllFilters = () => {
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
      priceRange: [0, priceRange.max] as [number, number],
      trim: '',
      mileageYear: '',
      paint: '',
      wheels: '',
      interior: '',
      seatLayout: '',
      additionalOptions: []
    };
    setFilters(reset);
    // When clearing filters, still apply the "Due Today" filter
    setFilteredVehicles(vehicles.filter(vehicle => !vehicle.title.toLowerCase().includes('due today')));
  };

  // Get active filters for the vehicle cards
  const getActiveFiltersForCards = () => {
    const activeFilters = Object.entries(filters).filter(([key, value]) => {
      if (!value || (Array.isArray(value) && value.length === 0)) return false;
      if (key === 'priceRange' && Array.isArray(value) &&
          value[0] === 0 && value[1] === priceRange.max) return false;
      return true;
    });
    return activeFilters.map(([key, value]) => ({ key, value }));
  };

  return (
    <div className="min-h-screen pt-[170px]  md:pb-[95px] pb-[30px] bg-[#FFFFFF] relative">
      {/* Mobile header with inventory title, zip code, new/pre-order buttons, and filter button */}
      <div className="md:hidden px-[15px] ">
       <h2 className="font-helvetica text-black mb-[5px] font-medium text-[26px] leading-[110%] tracking-[-0.52px]">Inventory</h2>
        <div className="mb-[28px] flex gap-4">
          <input
            type="text"
            placeholder="Enter zip code"
            value={filters.zipCode}
            onChange={(e) => handleFilterChange({ ...filters, zipCode: e.target.value })}
            className="flex-1 px-1 py-0 placeholder-[#747474] focus:outline-none focus:ring-0 focus:ring-black focus:border-transparent text-[#747474] font-normal text-[12px] leading-[110%] tracking-[-0.24px] underline font-helvetica not-italic decoration-solid"
          />
          
         
        </div>
        
        <div className='flex gap-[20px] justify-between'>

        

           <div className="flex gap-2 px-[11px] py-[8px] rounded-[4px] bg-[#F4F1F2] max-w-[153px] w-full">
            {/* New Button */}
            <button
              onClick={() =>
                handleFilterChange({
                  ...filters,
                  status: filters.status === 'new' ? '' : 'new',
                })
              }
              className={`relative px-[10px] py-[7px] overflow-hidden  rounded-[4px] cursor-pointer font-medium transition-all duration-200 flex items-center justify-center font-helvetica text-center text-[12px] leading-[150%] capitalize no-ligatures group
                ${
                  filters.status === 'new'
                    ? 'bg-[#560100] text-white shadow-sm'
                    : 'bg-[#560100] text-white'
                }`}
            >
              {/* Sliding overlay */}
              {filters.status !== 'new' && (
                <span
                  className="absolute inset-0 bg-white translate-x-full transition-transform duration-500 ease-in-out rounded-[4px] group-hover:translate-x-0"
                />
              )}

              {/* Text */}
              <span
                className={`relative z-10 transition-colors duration-500 ease-in-out
                  ${filters.status === 'new' ? 'group-hover:text-[#000]' : 'group-hover:text-[#000]'}`}
              >
                New
              </span>
            </button>

            {/* Pre-Order Button */}
            <button
              onClick={() =>
                handleFilterChange({
                  ...filters,
                  status: filters.status === 'pre-order' ? '' : 'pre-order',
                })
              }
              className={`relative px-[2px] py-[7px] overflow-hidden flex-1 rounded-[4px] cursor-pointer font-medium transition-all duration-200 flex items-center justify-center font-helvetica text-center text-[12px] leading-[150%] capitalize no-ligatures group
                ${
                  filters.status === 'pre-order'
                    ? 'bg-[#560100] text-white shadow-sm'
                    : 'bg-white text-[#000]'
                }`}
            >
              {/* Sliding overlay */}
              {filters.status !== 'pre-order' && (
                <span
                  className="absolute inset-0 bg-[#560100] translate-x-full transition-transform duration-500 ease-in-out rounded-[4px] group-hover:translate-x-0"
                />
              )}

              {/* Text */}
              <span
                className={`relative z-10 transition-colors duration-500 ease-in-out
                  ${filters.status === 'pre-order' ? 'group-hover:text-white' : 'group-hover:text-white'}`}
              >
               Pre-Owned
              </span>
            </button>
          </div>

            <button 
            onClick={() => setIsFilterOpen(true)}
            className="relative flex justify-between cursor-pointer items-center overflow-hidden pl-[12px] pr-[15px] py-[15px] max-w-[153px] w-full rounded-[4px] bg-[#E6E6E6] text-[#000] font-[500] font-helvetica text-center text-[12px] leading-[150%] capitalize no-ligatures whitespace-nowrap"
          >
            Filter
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
              <path d="M4.243 5.657L0 1.414L1.415 0L4.243 2.829L7.071 0L8.486 1.414L4.243 5.657Z" fill="black"/>
            </svg>
          </button>
         </div>
      </div>
      
      <div className="flex max-w-[1600px] px-[15px] m-auto gap-[45px]">
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        {/* Sidebar - Hidden on mobile when filter is closed */}
        <div className={`${isFilterOpen ? 'absolute top-[130px] inset-0 z-50 w-full' : 'hidden'} md:block md:relative md:inset-auto md:z-auto md:w-full md:max-w-[200px] md:bg-white md:z-[2] md:flex-shrink-0`}>
          <div className={`h-full ${isFilterOpen ? 'bg-white' : ''} md:bg-white`}>
            {/* Mobile header for filter sidebar */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
              <h2 className="text-xl font-helvetica font-medium text-black">Filters</h2>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="text-black text-xl"
              >
                ×
              </button>
            </div>
            
            {/* New and Pre-Order buttons in sidebar */}
            <div className="hidden md:block mb-2 pt-5">
               <h2 className="font-helvetica text-black  font-medium text-[26px] leading-[110%] tracking-[-0.52px] mb-5">Inventory</h2>
              <div className="flex gap-2 px-[17px] py-[8px] rounded-[4px]" style={{ backgroundColor: '#F4F1F2' }}>
                <button
                  onClick={() => handleFilterChange({ ...filters, status: filters.status === 'new' ? '' : 'new' })}
                  className={`relative overflow-hidden flex-1 rounded-[4px] cursor-pointer font-medium transition-all duration-200 flex items-center justify-center font-helvetica text-center text-[12px] leading-[150%] capitalize no-ligatures group
                    ${filters.status === 'new'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'bg-[#560100] text-white'}`}
                >
                  {/* Sliding overlay */}
                  {! (filters.status === 'new') && (
                    <span
                      className="absolute inset-0 bg-[#fff] translate-x-full
                                 transition-transform duration-500 ease-in-out rounded-[4px]
                                 group-hover:translate-x-0"
                    />
                  )}

                  {/* Button text */}
                  <span className={`relative z-10 transition-colors duration-500 ease-in-out
                    ${filters.status === 'new' ? 'group-hover:text-[#000]' : 'group-hover:text-[#000]'}`}>
                    New
                  </span>
                </button>

                <button
                  onClick={() => handleFilterChange({ ...filters, status: filters.status === 'pre-order' ? '' : 'pre-order' })}
                  className={`relative overflow-hidden flex-1 px-[2px] py-[7px] cursor-pointer rounded-[4px] transition-all duration-200 flex items-center justify-center font-helvetica text-center font-medium text-[12px] leading-[150%] capitalize no-ligatures group
                    ${filters.status === 'pre-order'
                      ? 'bg-[#560100] text-white shadow-sm'
                      : 'bg-white text-black'}`}
                >
                  {/* Sliding overlay */}
                  {! (filters.status === 'pre-order') && (
                    <span
                      className="absolute inset-0 bg-[#560100] translate-x-full
                                 transition-transform duration-500 ease-in-out rounded-[4px]
                                 group-hover:translate-x-0"
                    />
                  )}

                  {/* Button text */}
                  <span className={`relative z-10 transition-colors duration-500 ease-in-out
                    ${filters.status === 'pre-order' ? 'group-hover:text-white' : 'group-hover:text-white'}`}>
                   
                    Pre-Owned
                  </span>
                </button>
              </div>
            </div>
            
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              filterOptions={{
                ...filterOptions,
                models: vehicles
                  .filter(v => !v.title.toLowerCase().includes('due today')) // Filter out models with "Due Today" in the title
                  .map(v => v.title)
                  .filter((value, index, self) => self.indexOf(value) === index), // Remove duplicates
                priceRange: priceRange
              }}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-h-screen md:pt-[50px] pt-[21px]">
          
          {/* Show Clear Filters button when filters are active */}
          {hasActiveFilters() && (
            <div className="mb-6">
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-helvetica"
              >
                Clear Filters
              </button>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-x-[15px] gap-y-[35px]">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard 
                key={vehicle.id} 
                vehicle={vehicle} 
                activeFilters={getActiveFiltersForCards()} 
              />
            ))}
          </div>

          {filteredVehicles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No vehicles match your current filters.</p>
              <button
                onClick={clearAllFilters}
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
