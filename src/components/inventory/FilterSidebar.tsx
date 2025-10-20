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
    <div className="bg-white overflow-y-auto no-scrollbar h-full">
      {/* Header */}
      <div className="mb-0">
        <h2 className="font-helvetica text-black mb-[5px] font-medium text-[26px] leading-[110%] tracking-[-0.52px]">Inventory</h2>

        {/* Active Filters Display */}
        <div className="mt-4 space-y-2">
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
        </div>
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
            className={`flex-1 rounded-[4px] cursor-pointer font-medium transition-all duration-200 flex items-center justify-center font-helvetica text-center text-[12px] leading-[150%] capitalize no-ligatures ${
              filters.status === 'new'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            New
          </button>
          <button
            onClick={() => updateFilter('status', filters.status === 'pre-order' ? '' : 'pre-order')}
            className={`flex-1 px-[14px] py-[7px] cursor-pointer  rounded-[4px] transition-all duration-200 flex items-center justify-center font-helvetica  text-center font-medium text-[12px] leading-[150%] capitalize no-ligatures ${
              filters.status === 'pre-order'
                ? 'bg-black text-white shadow-sm'
                : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            Pre-Order
          </button>
        </div>
        <p className="text-[10px] text-gray-500 mt-1 font-helvetica">
          New: Published within 30 days • Pre-Order: Published more than 30 days ago
        </p>
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
