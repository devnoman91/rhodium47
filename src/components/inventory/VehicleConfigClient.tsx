'use client';

import { useState } from 'react';
import Image from 'next/image';
import { directCheckout } from '@/app/inventory/[slug]/actions';

const performanceStyles = `
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.performance-section h2 {
  color: #111;
  font-size: 20px;
  font-weight: 600;
  line-height: 22px;
  text-transform: capitalize;
  margin-bottom: 17px;
}
.performance-section h3 {
  margin-bottom: 17px;
}
h3 {
  color: #111;
  font-size: 20px;
  font-weight: 600;
  line-height: 22px;
  text-transform: capitalize;
}
p, h6 {
  font-size: 10px;
  font-weight: 400;
  line-height: 22px;
  text-transform: capitalize;
  color: #323232;
}
.performance-section p {
  font-size: 16px;
  margin-bottom: 10px;
}
.performance-section ul {
  list-style: none;
}
.performance-section li {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding-left: 1.5rem;
}
.performance-section li::before {
  content: "•";
  color: #000;
  font-size: 1rem;
  margin-right: 0.5rem;
  position: absolute;
  left: 0;
}
`;

interface VehicleConfigClientProps {
  product: any;
  dueTodayProduct?: any;
  topHeadingHtml: string;
  performanceHtml: string;
}

export default function VehicleConfigClient({
  product,
  dueTodayProduct,
  topHeadingHtml,
  performanceHtml,
}: VehicleConfigClientProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = product.images || [];
  const totalImages = images.length;

  const selectedVariant =
    product.variants && product.variants.length > 0
      ? product.variants[selectedVariantIndex]
      : null;

  const selectedVariantPrice = selectedVariant
    ? parseFloat(selectedVariant.price.amount)
    : parseFloat(product.priceRange?.minVariantPrice?.amount || '0');

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  const handleDirectCheckout = async () => {
    if (!selectedVariant || !selectedVariant.availableForSale) {
      setError('This variant is not available for sale');
      return;
    }
    setIsCheckingOut(true);
    setError(null);
    try {
      const result = await directCheckout(selectedVariant.id, selectedVariant.title);
      if (result.success && result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      } else {
        setError(result.error || 'Failed to start checkout');
        setIsCheckingOut(false);
      }
    } catch {
      setError('An unexpected error occurred');
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen pt-[100px]  pb-[73px]" style={{ backgroundColor: '#F4F1F2' }}>
      <div className="max-w-[1600px]  mx-auto">
        {/* Learn More */}
        <div className="px-6 sm:px-12 pb-[10px] text-center sm:text-left">
          <a
            href={`/product-detail/${product.handle}`}
            className="text-[#747474] font-[400] text-[12px] underline"
          >
            Learn more
          </a>
        </div>

        {/* Responsive Layout */}
        <div className="flex flex-col lg:flex-row justify-between gap-[35px] relative px-6 sm:px-12">
          {/* LEFT - Images */}
          <div className="w-full lg:max-w-[1100px] lg:sticky lg:top-[138px] h-fit mb-10 lg:mb-0">
            <div className="relative mb-4">
              {/* Image nav arrows */}
              {totalImages > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 border border-black w-[25px] h-[25px] rounded-full flex items-center justify-center bg-white/70 hover:bg-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 8 8" fill="none">
                      <path d="M8 4a.333.333 0 0 1-.333.333H1.14L3.57 6.764A.332.332 0 1 1 3.097 7.236L.098 4.236A.333.333 0 0 1 .098 3.764L3.097.764a.333.333 0 1 1 .472.472L1.14 3.667h6.528A.333.333 0 0 1 8 4Z" fill="black"/>
                    </svg>
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 border border-black w-[25px] h-[25px] rounded-full flex items-center justify-center bg-white/70 hover:bg-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 8 8" fill="none">
                      <path d="M0 4a.333.333 0 0 1 .333-.333h6.528L4.43 1.236A.333.333 0 1 1 4.903.764l3 3a.333.333 0 0 1 0 .472l-3 3a.333.333 0 1 1-.472-.472l2.431-2.431H.333A.333.333 0 0 1 0 4Z" fill="black"/>
                    </svg>
                  </button>
                </>
              )}

              {/* Main image */}
              <div className="mx-auto px-4 sm:px-14">
                <Image
                  src={images[currentImageIndex]?.url || '/images/dynmaicpagecar.png'}
                  alt={product.title}
                  width={800}
                  height={400}
                  className="w-full h-auto object-contain rounded-[6px]"
                />
              </div>
            </div>

            {/* Thumbnails */}
            {totalImages > 1 && (
              <div className="px-4 sm:px-14">
                <div className="flex gap-3 overflow-x-auto scrollbar-hide justify-center lg:justify-start">
                  {images.map((image: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      onMouseEnter={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 border-2 rounded-md overflow-hidden transition-all ${
                        currentImageIndex === index
                          ? 'border-black'
                          : 'border-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <Image
                        src={image.url || '/images/dynmaicpagecar.png'}
                        alt={`${product.title} - ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT - Details */}
          <div className="w-full   pr-0 lg:pr-[20px] text-center lg:text-left">
            <div className="pt-0 lg:pt-[68px] space-y-6">
              {/* Title */}
              <h1 className="text-black font-helvetica text-[32px] sm:text-[40px] font-bold leading-[110%] tracking-[-0.8px] mb-[28px]">
                {product.title}
              </h1>

              {/* Top heading HTML */}
              <style dangerouslySetInnerHTML={{ __html: performanceStyles }} />
              {topHeadingHtml && (
                <div
                  className="text-black text-center flex flex-col gap-4 mb-[21px]"
                  dangerouslySetInnerHTML={{ __html: topHeadingHtml }}
                />
              )}

              {/* Variants */}
              {product.variants?.length > 0 && (
                <div className="mb-8">
                  <div className="flex flex-wrap justify-center lg:justify-between border-b border-[#D5D7D7] mb-[28px]">
                    {product.variants.map((variant: any, index: number) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariantIndex(index)}
                        className={`cursor-pointer px-4 sm:px-6 pb-[17px] font-helvetica text-[16px] font-[500] ${
                          selectedVariantIndex === index
                            ? 'text-[#000] border-b border-[#000]'
                            : 'text-[#858585] hover:text-[#000]'
                        }`}
                      >
                        {variant.title}
                      </button>
                    ))}
                  </div>

                  {selectedVariant && (
                    <div className="flex justify-between items-center border border-[#000] bg-[#F4F4F4] rounded-[4px] px-[21px] py-[13px]">
                      <div className="text-left">
                        <p className="text-[#747474] text-[12px] mb-1">Standard</p>
                        <p className="text-black text-[14px] font-bold capitalize">
                          {selectedVariant.title}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-black text-[14px] font-bold capitalize">
                          ${selectedVariantPrice.toLocaleString()}
                        </p>
                        {!selectedVariant.availableForSale && (
                          <p className="text-red-500 text-[14px] mt-1">Out of Stock</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Performance */}
              {performanceHtml && (
                <div
                  className="performance-section text-left"
                  dangerouslySetInnerHTML={{ __html: performanceHtml }}
                />
              )}

              {/* Error */}
              {error && (
                <div className="text-red-500 text-center text-[14px] p-3 bg-red-50 rounded-md">
                  {error}
                </div>
              )}

              {/* Due Today */}
              {dueTodayProduct && (
                <div className="mt-1 pt-4 border-t border-gray-200">
                  <div className="p-4 flex justify-between">
                    <div>
                      <p className="text-[#111] text-[18px] font-medium">
                        {dueTodayProduct.title || 'Security Deposit Package'}
                      </p>
                      {dueTodayProduct.variants?.[0] && (
                        <p className="text-[#323232] text-[12px]">
                          {dueTodayProduct.variants[0].title}
                        </p>
                      )}
                    </div>
                    {dueTodayProduct.priceRange?.minVariantPrice && (
                      <p className="text-[#111] text-[18px] font-medium">
                        ${parseFloat(dueTodayProduct.priceRange.minVariantPrice.amount).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Order Button */}
              <button
                onClick={handleDirectCheckout}
                disabled={isCheckingOut || !selectedVariant?.availableForSale}
                className="relative overflow-hidden w-full max-w-[360px] mx-auto cursor-pointer text-white text-center font-helvetica text-[16px] font-bold rounded-full py-[14px] px-4 bg-black border border-transparent group transition disabled:bg-gray-400"
              >
                <span className="absolute inset-0 bg-white translate-x-full transition-transform duration-500 rounded-full group-hover:translate-x-0" />
                <span className="relative z-10 group-hover:text-black">
                  {isCheckingOut
                    ? 'Processing...'
                    : selectedVariant
                    ? `Order Now - ${selectedVariant.title}`
                    : 'Order with Card'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
