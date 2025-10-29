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

  const toggleCheckboxFilter = (key: string, value: string) => {
    const currentValue = filters[key];
    const newValue = currentValue === value ? '' : value;
    updateFilter(key, newValue);
  };

  return (
    <div className="bg-white overflow-y-auto  no-scrollbar h-full px-[15px] pt-5">
      {/* Header */}
      <div className="mb-0">
        <h2 className="font-helvetica text-black mb-[5px] font-medium text-[26px] leading-[110%] tracking-[-0.52px]">Inventory</h2>

        {/* Active Filters Display */}
        {/* <div className="mt-4 space-y-2">
          {Object.entries(filters).map(([key, value]) => {
            if (!value || (Array.isArray(value) && value.length === 0)) return null;
            if (key === 'priceRange' && Array.isArray(value) &&
                value[0] === filterOptions.priceRange?.min && value[1] === filterOptions.priceRange?.max) return null;

            let displayValue = '';
            if (Array.isArray(value)) {
              displayValue = value.join(', ');
            } else if (typeof value === 'string' && value) {
              displayValue = value;
            }

            if (!displayValue) return null;

            return (
              <div key={key} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                <span className="text-sm font-helvetica text-gray-700 capitalize">
                  {displayValue}
                </span>
                <button
                  onClick={() => {
                    if (Array.isArray(value)) {
                      const newFilters = { ...filters, [key]: [] };
                      onFilterChange(newFilters);
                    } else {
                      const newFilters = { ...filters, [key]: '' };
                      onFilterChange(newFilters);
                    }
                  }}
                  className="text-gray-400 hover:text-gray-600 ml-2"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div> */}
        
        {/* Clear All Button */}
        <div className="mt-4">
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
                priceRange: [filterOptions.priceRange?.min || 0, filterOptions.priceRange?.max || 1000] as [number, number],
                trim: '',
                mileageYear: '',
                paint: '',
                wheels: '',
                interior: '',
                seatLayout: '',
                additionalOptions: []
              };
              onFilterChange(reset);
            }}
            className="w-full text-center  mb-5 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-helvetica"
          >
            Clear All Filters
          </button>
        </div>
      </div>

   

      {/* Model Filter */}
      <ExpandableFilterSection title="Model" isExpanded={true}>
        <div className="space-y-3 ">
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
              <span className="ml-[11px] text-[#111] font-normal text-[12px] leading-[160%] capitalize font-helvetica no-ligatures">{model}</span>
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
              <span className="ml-[11px] text-[#111] font-normal text-[12px] leading-[180%] capitalize font-helvetica no-ligatures">{type}</span>
            </label>
          ))}
        </div>

        {/* Price Range Slider - Cash Prices */}
        <div className="mt-4">
          <div className="flex items-center cursor-pointer gap-4 mb-2">
            <span className="text-[#111] font-normal text-[16px] leading-[180%] font-helvetica no-ligatures">${filters.priceRange[0].toLocaleString()}</span>
            <span className="text-[#111] font-normal text-[16px] leading-[180%] font-helvetica no-ligatures">-</span>
            <span className="text-[#111] font-normal text-[16px] leading-[180%] font-helvetica no-ligatures">${filters.priceRange[1].toLocaleString()}</span>
          </div>
       
          <input
            type="range"
            min={0}
            max={filterOptions.priceRange.max}
            value={filters.priceRange[1]}
            onChange={(e) => updateFilter('priceRange', [0, parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </ExpandableFilterSection>

      {/* Other Filters */}
      {[
        ['Vehicle Type', 'vehicleTypes', 'vehicleType'],
        ['Armor Level', 'armorLevels', 'armorLevel'],
        ['Drivetrain', 'drivetrains', 'drivetrain'],
        ['Fuel Type', 'fuelTypes', 'fuelType'],
        ['Transmission', 'transmissions', 'transmission'],
        ['Seating Capacity', 'seatingCapacities', 'seatingCapacity'],
        ['Model Year', 'modelYears', 'modelYear'],
        ['Mileage / Year', 'mileageYears', 'mileageYear'],
        ['Paint', 'paintOptions', 'paint'],
        ['Wheels', 'wheelOptions', 'wheels'],
        ['Interior', 'interiorOptions', 'interior'],
        ['Seat Layout', 'seatLayouts', 'seatLayout']
      ].map(([title, optionKey, filterKey]) =>
        (filterOptions[optionKey as string]?.length > 0 ? (
          <ExpandableFilterSection key={title} title={title}>
            <div className="space-y-3">
              {filterOptions[optionKey as string].map((option: string) => (
                <label key={option} className="flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={filters[filterKey as string] === option}
                    onChange={() => toggleCheckboxFilter(filterKey as string, option)}
                    className="rounded border-gray-300 accent-black text-black focus:ring-black"
                  />
                  <span className="ml-[11px] text-[#111] font-normal text-[12px] leading-[180%] capitalize font-helvetica no-ligatures">{option}</span>
                </label>
              ))}
            </div>
          </ExpandableFilterSection>
        ) : null)
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
                <span className="ml-[11px] text-[#111] font-normal text-[12px] leading-[180%] capitalize font-helvetica no-ligatures">{option}</span>
              </label>
            ))}
          </div>
        </ExpandableFilterSection>
      )}
    </div>
  );
}

