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
    <div className="rounded-[10px] border border-[#E0E0E0] bg-[#F4F1F2] overflow-hidden  hover:shadow-md transition-shadow duration-200 cursor-pointer" style={{ backgroundColor: '#F4F1F2' }}>
      {/* Vehicle Image */}
      <div className="aspect-[1/0.68] relative" style={{ backgroundColor: '#F4F1F2' }}>
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
      <div className="p-6">
        {/* Title */}
        <h3 className="text-[#111] font-medium text-[16px] leading-[150%] capitalize">
          {vehicle.title}
        </h3>

        {/* Price */}
        <div className="">
          <div className="text-[#111] font-medium text-[16px] leading-[150%] capitalize">
            Est {formatPrice(vehicle.monthlyFinancing)}/Mo Financing • {formatPrice(vehicle.price)}
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="text-[#636363] font-normal text-[12px] leading-[150%] capitalize mb-[10px]">
          <div>{vehicle.year} Pre-Owned Vehicle With {vehicle.mileage}</div>
          <div>Located in {vehicle.location}</div>
          <div>{vehicle.range}</div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 text-xs text-[#111] font-normal text-[12px] leading-[150%] capitalize">
          <span className="flex items-center gap-1">
            <div className="w-[12px] h-[12px] bg-gray-900 rounded-full"></div>
            {vehicle.features.paint}
          </span>
          <span className="flex items-center gap-1 text-[#111] font-normal text-[12px] leading-[150%] capitalize">
            <div className="w-[12px] h-[12px] bg-[#C5C5C5] rounded-full"></div>
            {vehicle.features.interior}
          </span>
        </div>
      </div>
    </div>
  );
}