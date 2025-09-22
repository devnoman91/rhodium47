'use client';

import Image from 'next/image';
import { VehicleInventory } from '@/data/inventory';

interface VehicleCardProps {
  vehicle: VehicleInventory;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="rounded-[10px] border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200" style={{ backgroundColor: '#F4F1F2' }}>
      {/* Vehicle Image */}
      <div className="aspect-[4/3] relative" style={{ backgroundColor: '#F4F1F2' }}>
        <Image
          src={vehicle.image}
          alt={vehicle.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Status Badge */}
        {vehicle.status === 'pre-order' && (
          <div className="absolute top-3 left-3">
            <span className="bg-black text-white px-2 py-1 text-xs font-medium rounded">
              Pre-Order
            </span>
          </div>
        )}
      </div>

      {/* Vehicle Details */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-medium text-gray-900 mb-2">
          {vehicle.title}
        </h3>

        {/* Price */}
        <div className="mb-3">
          <div className="text-lg font-semibold text-gray-900">
            Est {formatPrice(vehicle.monthlyFinancing)}/Mo Financing • {formatPrice(vehicle.price)}
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="text-sm text-gray-600 mb-3">
          <div>{vehicle.year} Pre-Owned Vehicle With {vehicle.mileage}</div>
          <div>Located in {vehicle.location}</div>
          <div>{vehicle.range}</div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 text-xs text-gray-700">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
            {vehicle.features.paint}
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
            {vehicle.features.wheels}
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
            {vehicle.features.interior}
          </span>
        </div>
      </div>
    </div>
  );
}