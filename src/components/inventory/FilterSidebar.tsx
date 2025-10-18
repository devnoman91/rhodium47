'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

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

interface FilterSidebarProps {
  filters: any;
  onFilterChange: (filters: any) => void;
  filterOptions: any;
}

interface ExpandableFilterSectionProps {
  title: string;
  isExpanded?: boolean;
  children: React.ReactNode;
}

function ExpandableFilterSection({ title, isExpanded = false, children }: ExpandableFilterSectionProps) {
  const [expanded, setExpanded] = useState(isExpanded);

  return (
    <div className="mb-[30px]">
       <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between cursor-pointer text-left"
      >
        <span className="font-helvetica text-[#111] text-center font-medium text-[16px] leading-[150%] capitalize no-ligatures">{title}</span>
        {expanded ? (
          <ChevronUpIcon className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDownIcon className="h-4 w-4 text-gray-500" />
        )}
      </button>
      {expanded && <div className="mt-4">{children}</div>}
    </div>
  );
}
    
export default function FilterSidebar({ filters, onFilterChange, filterOptions }: FilterSidebarProps) {
  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
  };

  // Helper function to toggle checkbox filters (unselect if already selected)
  const toggleCheckboxFilter = (key: string, value: string) => {
    const currentValue = filters[key];
    const newValue = currentValue === value ? '' : value;
    updateFilter(key, newValue);
  };

  return (
    <div className=" bg-white  overflow-y-auto no-scrollbar h-full">
      {/* Header */}
      <div className="mb-0">
        <h2 className="font-helvetica text-black mb-[5px] font-medium text-[26px] leading-[110%] tracking-[-0.52px]">Inventory</h2>
      </div>

      {/* Zip Code Input */}
      <div className="mb-[28px]">
        <input
          type="text"
          placeholder="Enter zip code"
          value={filters.zipCode}
          onChange={(e) => updateFilter('zipCode', e.target.value)}
          className="w-full px-1 py-0 placeholder-gray-500 focus:outline-none focus:ring-0 focus:ring-black focus:border-transparent text-[#747474] font-normal text-[12px] leading-[110%] tracking-[-0.24px] underline font-helvetica not-italic decoration-solid"
        />
      </div>

      {/* Status Filter */}
      <div className="mb-[28px]">
        <div className="flex gap-2 px-[17px] py-[8px] rounded-[4px]" style={{ backgroundColor: '#F4F1F2' }}>
          <button
            onClick={() => updateFilter('status', filters.status === 'new' ? '' : 'new')}
            className={`flex-1 rounded-[4px] cursor-pointer font-medium transition-all duration-200 flex items-center justify-center font-helvetica text-black text-center text-[12px] leading-[150%] capitalize no-ligatures ${
              filters.status === 'new'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-700 hover:bg-black hover:text-white'
            }`}
          >
            New
          </button>
          <button
            onClick={() => updateFilter('status', filters.status === 'pre-order' ? '' : 'pre-order')}
            className={`flex-1 px-[14px] py-[7px] cursor-pointer  rounded-[4px] transition-all duration-200 flex items-center justify-center font-helvetica  text-center font-medium text-[12px] leading-[150%] capitalize no-ligatures ${
              filters.status === 'pre-order'
                ? 'bg-black text-white shadow-sm'
                : 'text-[#fff] hover:bg-black hover:text-white bg-[#000]'
            }`}
          >
            Pre-Order
          </button>
        </div>
      </div>

      {/* Model Filter */}
      <ExpandableFilterSection title="Model" isExpanded={true}>
        <div className="space-y-3">
          {filterOptions.models?.map((model: string) => (
            <label key={model} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.models.includes(model)}
                onChange={(e) => {
                  const newModels = e.target.checked
                    ? [...filters.models, model]
                    : filters.models.filter((m: string) => m !== model);
                  updateFilter('models', newModels);
                }}
                className="rounded border-gray-300 accent-black text-black focus:ring-black"
              />
              <span className="ml-[11px] text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">{model}</span>
            </label>
          ))}
        </div>
      </ExpandableFilterSection>
       {/* Payment Filter */}
      <ExpandableFilterSection title="Payment" isExpanded={true}>
        <div className="space-y-3">
          {filterOptions.paymentTypes?.map((type: string) => (
            <label key={type} className="flex  cursor-pointer items-center">
              <input
                type="checkbox"
                checked={filters.paymentType === type}
                onChange={() => toggleCheckboxFilter('paymentType', type)}
                className="rounded border-gray-300 accent-black text-black focus:ring-black"
              />
              <span className="ml-[11px] text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">{type}</span>
            </label>
          ))}
        </div>

        {/* Price Range Slider */}
        <div className="mt-4">
          <div className="flex items-center cursor-pointer gap-4 mb-2">
            <span className="text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">${filters.priceRange[0]}</span>
            <span className="text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">-</span>
            <span className="text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">${filters.priceRange[1]}</span>
          </div>
          <input
            type="range"
            min={filterOptions.priceRange.min}
            max={filterOptions.priceRange.max}
            value={filters.priceRange[1]}
            onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="mt-2 font-helvetica text-[#747474] border-b border-[#747474] font-normal text-[12px] leading-[140%] tracking-[-0.24px]">
            Include $7,500 Federal Tax Credit<br />
            See Eligibility Requirements
          </div>
        </div>
      </ExpandableFilterSection>

      {/* Vehicle Type Filter */}
      {filterOptions.vehicleTypes?.length > 0 && (
        <ExpandableFilterSection title="Vehicle Type">
          <div className="space-y-3">
            {filterOptions.vehicleTypes.map((type: string) => (
              <label key={type} className="flex  cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={filters.vehicleType === type}
                  onChange={() => toggleCheckboxFilter('vehicleType', type)}
                  className="rounded border-gray-300 accent-black text-black focus:ring-black"
                />
                <span className="ml-[11px] text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">{type}</span>
              </label>
            ))}
          </div>
        </ExpandableFilterSection>
      )}

      {/* Armor Level Filter */}
      {filterOptions.armorLevels?.length > 0 && (
        <ExpandableFilterSection title="Armor Level">
          <div className="space-y-3">
            {filterOptions.armorLevels.map((level: string) => (
              <label key={level} className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={filters.armorLevel === level}
                  onChange={() => toggleCheckboxFilter('armorLevel', level)}
                  className="rounded border-gray-300 accent-black text-black focus:ring-black"
                />
                <span className="ml-[11px] text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">{level}</span>
              </label>
            ))}
          </div>
        </ExpandableFilterSection>
      )}

      {/* Drivetrain Filter */}
      {filterOptions.drivetrains?.length > 0 && (
        <ExpandableFilterSection title="Drivetrain">
          <div className="space-y-3">
            {filterOptions.drivetrains.map((drivetrain: string) => (
              <label key={drivetrain} className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={filters.drivetrain === drivetrain}
                  onChange={() => toggleCheckboxFilter('drivetrain', drivetrain)}
                  className="rounded border-gray-300 accent-black text-black focus:ring-black"
                />
                <span className="ml-[11px] text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">{drivetrain}</span>
              </label>
            ))}
          </div>
        </ExpandableFilterSection>
      )}

      {/* Fuel Type Filter */}
      {filterOptions.fuelTypes?.length > 0 && (
        <ExpandableFilterSection title="Fuel Type">
          <div className="space-y-3">
            {filterOptions.fuelTypes.map((fuel: string) => (
              <label key={fuel} className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={filters.fuelType === fuel}
                  onChange={() => toggleCheckboxFilter('fuelType', fuel)}
                  className="rounded border-gray-300 accent-black text-black focus:ring-black"
                />
                <span className="ml-[11px] text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">{fuel}</span>
              </label>
            ))}
          </div>
        </ExpandableFilterSection>
      )}

      {/* Transmission Filter */}
      {filterOptions.transmissions?.length > 0 && (
        <ExpandableFilterSection title="Transmission">
          <div className="space-y-3">
            {filterOptions.transmissions.map((transmission: string) => (
              <label key={transmission} className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={filters.transmission === transmission}
                  onChange={() => toggleCheckboxFilter('transmission', transmission)}
                  className="rounded border-gray-300 accent-black text-black focus:ring-black"
                />
                <span className="ml-[11px] text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">{transmission}</span>
              </label>
            ))}
          </div>
        </ExpandableFilterSection>
      )}

      {/* Seating Capacity Filter */}
      {filterOptions.seatingCapacities?.length > 0 && (
        <ExpandableFilterSection title="Seating Capacity">
          <div className="space-y-3">
            {filterOptions.seatingCapacities.map((capacity: string) => (
              <label key={capacity} className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={filters.seatingCapacity === capacity}
                  onChange={() => toggleCheckboxFilter('seatingCapacity', capacity)}
                  className="rounded border-gray-300 accent-black text-black focus:ring-black"
                />
                <span className="ml-[11px] text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">{capacity}</span>
              </label>
            ))}
          </div>
        </ExpandableFilterSection>
      )}

      {/* Model Year Filter */}
      {filterOptions.modelYears?.length > 0 && (
        <ExpandableFilterSection title="Model Year">
          <div className="space-y-3">
            {filterOptions.modelYears.map((year: string) => (
              <label key={year} className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={filters.modelYear === year}
                  onChange={() => toggleCheckboxFilter('modelYear', year)}
                  className="rounded border-gray-300 accent-black text-black focus:ring-black"
                />
                <span className="ml-[11px] text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">{year}</span>
              </label>
            ))}
          </div>
        </ExpandableFilterSection>
      )}

    
      {/* Mileage/Year Filter */}
      {filterOptions.mileageYears?.length > 0 && (
        <ExpandableFilterSection title="Mileage / Year">
          <div className="space-y-3">
            {filterOptions.mileageYears.map((year: string) => (
              <label key={year} className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={filters.mileageYear === year}
                  onChange={() => toggleCheckboxFilter('mileageYear', year)}
                  className="rounded border-gray-300 accent-black text-black focus:ring-black"
                />
                <span className="ml-[11px] text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">{year}</span>
              </label>
            ))}
          </div>
        </ExpandableFilterSection>
      )}

      {/* Paint Filter */}
      {filterOptions.paintOptions?.length > 0 && (
        <ExpandableFilterSection title="Paint">
          <div className="space-y-3">
            {filterOptions.paintOptions.map((paint: string) => (
              <label key={paint} className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={filters.paint === paint}
                  onChange={() => toggleCheckboxFilter('paint', paint)}
                  className="rounded border-gray-300 accent-black text-black focus:ring-black"
                />
                <span className="ml-[11px] text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">{paint}</span>
              </label>
            ))}
          </div>
        </ExpandableFilterSection>
      )}

      {/* Wheels Filter */}
      {filterOptions.wheelOptions?.length > 0 && (
        <ExpandableFilterSection title="Wheels">
          <div className="space-y-3">
            {filterOptions.wheelOptions.map((wheel: string) => (
              <label key={wheel} className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={filters.wheels === wheel}
                  onChange={() => toggleCheckboxFilter('wheels', wheel)}
                  className="rounded border-gray-300 accent-black text-black focus:ring-black"
                />
                <span className="ml-[11px] text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">{wheel}</span>
              </label>
            ))}
          </div>
        </ExpandableFilterSection>
      )}

      {/* Interior Filter */}
      {filterOptions.interiorOptions?.length > 0 && (
        <ExpandableFilterSection title="Interior">
          <div className="space-y-3">
            {filterOptions.interiorOptions.map((interior: string) => (
              <label key={interior} className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={filters.interior === interior}
                  onChange={() => toggleCheckboxFilter('interior', interior)}
                  className="rounded border-gray-300 accent-black text-black focus:ring-black"
                />
                <span className="ml-[11px] text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">{interior}</span>
              </label>
            ))}
          </div>
        </ExpandableFilterSection>
      )}

      {/* Seat Layout Filter */}
      {filterOptions.seatLayouts?.length > 0 && (
        <ExpandableFilterSection title="Seat Layout">
          <div className="space-y-3">
            {filterOptions.seatLayouts.map((layout: string) => (
              <label key={layout} className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={filters.seatLayout === layout}
                  onChange={() => toggleCheckboxFilter('seatLayout', layout)}
                  className="rounded border-gray-300 accent-black text-black focus:ring-black"
                />
                <span className="ml-[11px] text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">{layout}</span>
              </label>
            ))}
          </div>
        </ExpandableFilterSection>
      )}

      {/* Additional Options Filter */}
      {filterOptions.additionalOptions?.length > 0 && (
        <ExpandableFilterSection title="Additional Options">
          <div className="space-y-3">
            {filterOptions.additionalOptions.map((option: string) => (
              <label key={option} className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={filters.additionalOptions.includes(option)}
                  onChange={(e) => {
                    const newOptions = e.target.checked
                      ? [...filters.additionalOptions, option]
                      : filters.additionalOptions.filter((o: string) => o !== option);
                    updateFilter('additionalOptions', newOptions);
                  }}
                  className="rounded border-gray-300 accent-black  text-black focus:ring-black"
                />
                <span className="ml-[11px] text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">{option}</span>
              </label>
            ))}
          </div>
        </ExpandableFilterSection>
      )}

    </div>
  );
}