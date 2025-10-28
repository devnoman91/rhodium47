'use client';

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
  publishedAt: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  activeFilters?: { key: string; value: any }[];
}

function extractTopHeadingSpecs(html: string): string {
  if (!html) return '';

  const topHeadingStart = html.indexOf('<div id="top-heading">');
  if (topHeadingStart === -1) return '';

  const topHeadingEnd = html.indexOf('</div>', topHeadingStart);
  if (topHeadingEnd === -1) return '';

  const topHeadingHtml = html.substring(topHeadingStart, topHeadingEnd + 6);
  const tempDiv = typeof document !== 'undefined' ? document.createElement('div') : null;
  if (!tempDiv) return topHeadingHtml.replace(/<[^>]+>/g, '');
  tempDiv.innerHTML = topHeadingHtml;
  return tempDiv.textContent || tempDiv.innerText || '';
}

export default function VehicleCard({ vehicle, activeFilters = [] }: VehicleCardProps) {
  const specsText = extractTopHeadingSpecs(vehicle.descriptionHtml || '');

  // Find LOWEST cash variant price from all cash variants
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

  return (
    <Link href={`/inventory/${vehicle.handle}`} className="h-full overflow-hidden rounded-[10px] border border-[#E0E0E0] group cursor-pointer block">
      {/* Image */}
      <div className="relative w-full pt-[68%] overflow-hidden">
        <Image
          src={vehicle.image}
          alt={vehicle.model}
          fill
          className="w-full h-full object-contain group-hover:scale-110 transition-all ease-in-out duration-400"
        />
      </div>

      {/* Info */}
      <div className="p-[24px]">
        <div className="max-w-[320px]">
          <h3 className="text-[16px] font-[500] font-helvetica text-[#111] mb-1">
            {vehicle.model}
          </h3>
          <p className="text-[14px] font-[600] font-helvetica text-[#111] mb-[8px]">
            Starts from
            ${displayPrice.toLocaleString()}
            {(cashVariants.length > 0 ||
            vehicle.tags?.some(tag =>
              tag.toLowerCase().includes('payment:cash')
            ) ||
            vehicle.title.toLowerCase().includes('cash')) && (
              <span className="ml-2 text-[12px] font-[400] text-[#636363]"></span>
            )}
          </p>

          {/* Active filters summary */}
          {activeFilters.length > 0 && (
            <div className="mt-2">
              <p className="text-[14px] text-[#636363] font-helvetica capitalize leading-[140%] mb-2">
                {activeFilters.map(({ key, value }) => {
                  let displayValue = '';
                  if (Array.isArray(value)) {
                    displayValue = value.join(', ');
                  } else if (typeof value === 'string' && value) {
                    displayValue = value;
                  }
                  return displayValue;
                }).filter(Boolean).join(' • ')}
              </p>
            </div>
          )}

          {specsText && (
            <p className="text-[12px] text-[#636363] mb-[10px] line-clamp-3 font-[400] font-helvetica leading-[150%] capitalize">
              {specsText}
            </p>
          )}

          {/* Vehicle tags */}
          {vehicle.tags && vehicle.tags.length > 0 && (
            <div className="flex flex-wrap gap-x-[16px] gap-y-[10px] mt-[6px]">
              {vehicle.tags.map((tag, idx) => {
                const cleanTag = tag.includes(':') ? tag.split(':')[1] : tag;
                const icons = [
                  <svg key="b1" xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none"><circle cx="6" cy="6" r="6" fill="black" /></svg>,
                  <svg key="g1" xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#C5C5C5"><circle cx="6" cy="6" r="6" /></svg>
                ];
                const icon = icons[idx % icons.length];

                return (
                  <span key={idx} className="flex gap-[5px] items-center text-[#111] text-[14px] font-helvetica font-[400] capitalize">
                    {icon}
                    {cleanTag}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}