'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';


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
    <div className=" py-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between text-left"
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

  return (
    <div className="w-80 bg-white pt-[50px] pr-[30px] pb-[50px] pl-[50px] overflow-y-auto h-full">
      {/* Header */}
      <div className="mb-2">
        <h2 className="font-helvetica text-black font-medium text-[26px] leading-[110%] tracking-[-0.52px]">Inventory</h2>
      </div>

      {/* Zip Code Input */}
      <div className="mb-[28px]">
        <input
          type="text"
          placeholder="Enter zip code"
          value={filters.zipCode}
          onChange={(e) => updateFilter('zipCode', e.target.value)}
          className="w-full px-1 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-[#747474] font-normal text-[12px] leading-[110%] tracking-[-0.24px] underline"
        />
      </div>

      {/* Status Filter */}
      <div className="mb-[28px]">
        <div className="flex gap-2 p-1 rounded" style={{ backgroundColor: '#F4F1F2' }}>
          <button
            onClick={() => updateFilter('status', filters.status === 'new' ? '' : 'new')}
            className={`flex-1 h-10 rounded  font-medium transition-all duration-200 flex items-center justify-center font-helvetica text-black text-center text-[12px] leading-[150%] capitalize no-ligatures ${
              filters.status === 'new'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-700 hover:bg-black hover:text-white'
            }`}
          >
            New
          </button>
          <button
            onClick={() => updateFilter('status', filters.status === 'pre-order' ? '' : 'pre-order')}
            className={`flex-1 h-10 rounded transition-all duration-200 flex items-center justify-center font-helvetica text-black text-center font-medium text-[12px] leading-[150%] capitalize no-ligatures ${
              filters.status === 'pre-order'
                ? 'bg-black text-white shadow-sm'
                : 'text-gray-700 hover:bg-black hover:text-white'
            }`}
          >
            Pre-Order
          </button>
        </div>
      </div>

      {/* Model Filter */}
      <ExpandableFilterSection title="Model" isExpanded={true}>
        <div className="space-y-3">
          {filterOptions.models.map((model: string) => (
            <label key={model} className="flex items-cente">
              <input
                type="checkbox"
                checked={filters.models.includes(model)}
                onChange={(e) => {
                  const newModels = e.target.checked
                    ? [...filters.models, model]
                    : filters.models.filter((m: string) => m !== model);
                  updateFilter('models', newModels);
                }}
                className="border-gray-300 text-black focus:ring-black"
              />
              <span className="ml-2 text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">{model}</span>
            </label>
          ))}
        </div>
      </ExpandableFilterSection>

      {/* Payment Filter */}
      <ExpandableFilterSection title="Payment" isExpanded={true}>
        <div className="space-y-3">
          {filterOptions.paymentTypes.map((type: string) => (
            <label key={type} className="flex items-cente">
              <input
                type="radio"
                name="paymentType"
                checked={filters.paymentType === type}
                onChange={() => updateFilter('paymentType', type)}
                className="border-gray-300 text-black focus:ring-black"
              />
              <span className="ml-2 text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">{type}</span>
            </label>
          ))}
        </div>

        {/* Price Range Slider */}
        <div className="mt-4">
          <div className="flex items-center  gap-4 mb-2">
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
          <div className="mt-2 font-helvetica text-[#747474] font-normal text-[12px] leading-[140%] tracking-[-0.24px]">
            Include $7,500 Federal Tax Credit<br />
            See Eligibility Requirements
          </div>
        </div>
      </ExpandableFilterSection>

      {/* Trim Filter */}
      <ExpandableFilterSection title="Trim">
        <div className="space-y-3">
          {filterOptions.trims.map((trim: string) => (
            <label key={trim} className="flex items-center">
              <input
                type="radio"
                name="trim"
                checked={filters.trim === trim}
                onChange={() => updateFilter('trim', trim)}
                className="border-gray-300 text-black focus:ring-black"
              />
              <span className="ml-2 text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">{trim}</span>
            </label>
          ))}
        </div>
      </ExpandableFilterSection>

      {/* Mileage/Year Filter */}
      <ExpandableFilterSection title="Mileage / Year">
        <div className="space-y-3">
          {filterOptions.mileageYears.map((year: string) => (
            <label key={year} className="flex items-cente">
              <input
                type="radio"
                name="mileageYear"
                checked={filters.mileageYear === year}
                onChange={() => updateFilter('mileageYear', year)}
                className="border-gray-300 text-black focus:ring-black"
              />
              <span className="ml-2 text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">{year}</span>
            </label>
          ))}
        </div>
      </ExpandableFilterSection>

      {/* Paint Filter */}
      <ExpandableFilterSection title="Paint">
        <div className="space-y-3">
          {filterOptions.paintOptions.map((paint: string) => (
            <label key={paint} className="flex items-cente">
              <input
                type="radio"
                name="paint"
                checked={filters.paint === paint}
                onChange={() => updateFilter('paint', paint)}
                className="border-gray-300 text-black focus:ring-black"
              />
              <span className="ml-2 text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">{paint}</span>
            </label>
          ))}
        </div>
      </ExpandableFilterSection>

      {/* Wheels Filter */}
      <ExpandableFilterSection title="Wheels">
        <div className="space-y-3">
          {filterOptions.wheelOptions.map((wheel: string) => (
            <label key={wheel} className="flex items-center">
              <input
                type="radio"
                name="wheels"
                checked={filters.wheels === wheel}
                onChange={() => updateFilter('wheels', wheel)}
                className="border-gray-300 text-black focus:ring-black"
              />
              <span className="ml-2 text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">{wheel}</span>
            </label>
          ))}
        </div>
      </ExpandableFilterSection>

      {/* Interior Filter */}
      <ExpandableFilterSection title="Interior">
        <div className="space-y-3">
          {filterOptions.interiorOptions.map((interior: string) => (
            <label key={interior} className="flex items-center">
              <input
                type="radio"
                name="interior"
                checked={filters.interior === interior}
                onChange={() => updateFilter('interior', interior)}
                className="border-gray-300 text-black focus:ring-black"
              />
              <span className="ml-2 text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">{interior}</span>
            </label>
          ))}
        </div>
      </ExpandableFilterSection>

      {/* Seat Layout Filter */}
      <ExpandableFilterSection title="Seat Layout">
        <div className="space-y-3">
          {filterOptions.seatLayouts.map((layout: string) => (
            <label key={layout} className="flex items-center">
              <input
                type="radio"
                name="seatLayout"
                checked={filters.seatLayout === layout}
                onChange={() => updateFilter('seatLayout', layout)}
                className="border-gray-300 text-black focus:ring-black"
              />
              <span className="ml-2 text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">{layout}</span>
            </label>
          ))}
        </div>
      </ExpandableFilterSection>

      {/* Additional Options Filter */}
      <ExpandableFilterSection title="Additional Options">
        <div className="space-y-3">
          {filterOptions.additionalOptions.map((option: string) => (
            <label key={option} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.additionalOptions.includes(option)}
                onChange={(e) => {
                  const newOptions = e.target.checked
                    ? [...filters.additionalOptions, option]
                    : filters.additionalOptions.filter((o: string) => o !== option);
                  updateFilter('additionalOptions', newOptions);
                }}
                className="rounded border-gray-300 text-black focus:ring-black"
              />
              <span className="ml-2 text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">{option}</span>
            </label>
          ))}
        </div>
      </ExpandableFilterSection>

      {/* Vehicle History Filter */}
      <ExpandableFilterSection title="Vehicle History">
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="vehicleHistory"
              checked={filters.vehicleHistory === 'clean'}
              onChange={() => updateFilter('vehicleHistory', 'clean')}
              className="border-gray-300 text-black focus:ring-black"
            />
            <span className="ml-2 text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">Clean History</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="vehicleHistory"
              checked={filters.vehicleHistory === 'accident'}
              onChange={() => updateFilter('vehicleHistory', 'accident')}
              className="border-gray-300 text-black focus:ring-black"
            />
            <span className="ml-2 text-[#111] font-normal text-[16px] leading-[180%] capitalize font-helvetica no-ligatures">Previous Accident</span>
          </label>
        </div>
      </ExpandableFilterSection>
    </div>
  );
}