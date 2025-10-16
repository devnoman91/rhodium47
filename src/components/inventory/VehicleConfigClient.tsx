'use client';

import { useState } from 'react';
import Image from 'next/image';
// style
const performanceStyles  = `
   .performance-section h2{
  color: #111;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: 22px;
text-transform: capitalize;
 margin-bottom:17px;
  }
 .performance-section h3{
margin-bottom:17px;
 }
  h3{
color: #111;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: 22px;
text-transform: capitalize;

 }

 p{
font-size: 10px;
font-style: normal;
font-weight: 400;
line-height: 22px;
text-transform: capitalize;
color:#323232;
  }
h6{
font-size: 10px;
font-style: normal;
font-weight: 400;
line-height: 22px;
text-transform: capitalize;
color:#323232;
}
 .performance-section p{
 font-size: 16px;
 margin-bottom:10px;
 }
.performance-section ul {
  list-style: none; 
  
}

.performance-section li {
  display: flex;
  justify-content:space-between;
  position: relative;
  padding-left: 1.5rem; 
}

.performance-section li::before {
  content: "•";
  color: #000;
  font-size: 1rem;
  margin-right: 0.5rem;
  position:absolute;    left: 0;
}
    `
interface VehicleConfigClientProps {
  product: any;
  topHeadingHtml: string;
  performanceHtml: string;
}

export default function 
VehicleConfigClient({
  product,
  topHeadingHtml,
  performanceHtml
}: VehicleConfigClientProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const selectedVariant = product.variants && product.variants.length > 0
    ? product.variants[selectedVariantIndex]
    : null;

  const selectedVariantPrice = selectedVariant
    ? parseFloat(selectedVariant.price.amount)
    : parseFloat(product.priceRange?.minVariantPrice?.amount || '0');

  return (
    <div className="min-h-screen pt-[100px] pb-[73px]" style={{ backgroundColor: '#F4F1F2' }}>
      <div className='max-w-[1332px] m-auto '>
           {/* Back to Inventory link */}
      <div className="px-12 pb-[10px]">
        <a href="/inventory" className="text-[#747474] font-[400] text-[12px] leading-[110%] tracking-[-0.24px] underline decoration-solid font-helvetica">
          Back to Inventory Page
        </a>
      </div>

        <div className="flex justify-between gap-[35px]">
          {/* Left Sidebar - Vehicle Image */}
          <div className="sticky top-0 h-fit max-w-[922px] w-full">
            {/* Navigation arrows */}
            <button className="absolute left-6 top-1/2 transform-translate-y-1/2 cursor-pointer  border-1 border-black w-[25px] h-[25px] rounded-full flex items-center justify-center hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 8 8" fill="none">
                <path d="M8.00026 3.99953C8.00026 4.08794 7.96514 4.17272 7.90263 4.23524C7.84012 4.29775 7.75533 4.33287 7.66693 4.33287H1.13818L3.56943 6.7637C3.6004 6.79467 3.62497 6.83144 3.64173 6.8719C3.65849 6.91237 3.66711 6.95574 3.66711 6.99953C3.66711 7.04333 3.65849 7.0867 3.64173 7.12717C3.62497 7.16763 3.6004 7.2044 3.56943 7.23537C3.53846 7.26634 3.50169 7.2909 3.46123 7.30767C3.42076 7.32443 3.37739 7.33305 3.3336 7.33305C3.2898 7.33305 3.24643 7.32443 3.20596 7.30767C3.1655 7.2909 3.12873 7.26634 3.09776 7.23537L0.0977622 4.23537C0.06677 4.20441 0.0421837 4.16765 0.025409 4.12718C0.00863422 4.08671 0 4.04334 0 3.99953C0 3.95573 0.00863422 3.91235 0.025409 3.87189C0.0421837 3.83142 0.06677 3.79466 0.0977622 3.7637L3.09776 0.763701C3.16031 0.701154 3.24514 0.666016 3.3336 0.666016C3.42205 0.666016 3.50688 0.701154 3.56943 0.763701C3.63198 0.826248 3.66711 0.91108 3.66711 0.999534C3.66711 1.08799 3.63198 1.17282 3.56943 1.23537L1.13818 3.6662H7.66693C7.75533 3.6662 7.84012 3.70132 7.90263 3.76383C7.96514 3.82634 8.00026 3.91113 8.00026 3.99953Z" fill="black"/>
              </svg>
            </button>

            <div className="mx-auto px-14">
              <Image
                src={product.images[0]?.url || '/images/dynmaicpagecar.png'}
                alt={product.title}
                width={800}
                height={400}
                className="w-full h-auto object-contain"
              />
            </div>

            <button className="absolute right-6 top-1/2 transform -translate-y-1/2 border-1 cursor-pointer   border-black w-[25px] h-[25px] rounded-full flex items-center justify-center hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 8 8" fill="none">
                <path d="M-0.000262181 4.00047C-0.000262181 3.91206 0.0348565 3.82728 0.0973686 3.76476C0.159881 3.70225 0.244666 3.66713 0.333071 3.66713H6.86182L4.43057 1.2363C4.3996 1.20533 4.37503 1.16856 4.35827 1.1281C4.34151 1.08763 4.33289 1.04426 4.33289 1.00047C4.33289 0.956667 4.34151 0.913298 4.35827 0.872834C4.37503 0.832369 4.3996 0.795602 4.43057 0.764632C4.46154 0.733662 4.49831 0.709096 4.53877 0.692335C4.57924 0.675574 4.62261 0.666947 4.6664 0.666947C4.7102 0.666947 4.75357 0.675574 4.79404 0.692335C4.8345 0.709096 4.87127 0.733662 4.90224 0.764632L7.90224 3.76463C7.93323 3.79559 7.95782 3.83235 7.97459 3.87282C7.99137 3.91329 8 3.95666 8 4.00047C8 4.04427 7.99137 4.08765 7.97459 4.12811C7.95782 4.16858 7.93323 4.20534 7.90224 4.2363L4.90224 7.2363C4.83969 7.29885 4.75486 7.33398 4.6664 7.33398C4.57795 7.33398 4.49312 7.29885 4.43057 7.2363C4.36802 7.17375 4.33289 7.08892 4.33289 7.00047C4.33289 6.91201 4.36802 6.82718 4.43057 6.76463L6.86182 4.3338H0.333071C0.244666 4.3338 0.159881 4.29868 0.0973686 4.23617C0.0348565 4.17366 -0.000262181 4.08887 -0.000262181 4.00047Z" fill="black"/>
              </svg>
            </button>
          </div>

          {/* Right Sidebar - Configuration */}
          <div className=" w-full max-w-[366px]">
            <div className="pt-[68px] space-y-6">
              {/* Vehicle Title */}
              <div className="text-center mb-6">
                <h1 className="text-black  font-helvetica text-[40px] not-italic font-bold leading-[110%] tracking-[-0.8px] mb-[28px] text-center">{product.title}</h1>
              </div>

              {/* Top Heading Section (Specs) */}
              <style dangerouslySetInnerHTML={{ __html: performanceStyles }} />
              {topHeadingHtml && (
                <div className="text-black text-center flex justify-between mb-[21px] gap-4 " dangerouslySetInnerHTML={{ __html: topHeadingHtml }} />
              )}

              {/* Variant Tabs */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-8">
                  {/* Tabs */}
                  <div className="flex gap-2 flex-wrap justify-between border-[#D5D7D7] border-b mb-[28px]">
                    {product.variants.map((variant: any, index: number) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariantIndex(index)}
                        className={`cursor-pointer px-6 pb-[17px]  font-helvetica !text-[16px] not-italic font-[500] leading-[180%] transition-colors ${
                          selectedVariantIndex === index
                            ? ' text-[#000]'
                            : ' text-[#858585] hover:text-[#000]'
                        }`}
                      >
                        {variant.title}
                      </button>
                    ))}
                  </div>

                  {/* Selected Variant Info */}
                  {selectedVariant && (
                    <div className="flex justify-between border border-[#000] items-center bg-[#F4F4F4] rounded-[4px] px-[21px] py-[13px]">
                      <div className="text-left">
                        <p className="text-[#747474] font-helvetica text-[12px] not-italic font-normal leading-[140%] mb-1">
                          Standard
                        </p>
                        <p className="text-black font-helvetica !text-[14px] not-italic font-bold leading-[150%] capitalize">
                          {selectedVariant.title}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-black font-helvetica !text-[14px] not-italic font-bold leading-[150%] capitalize">
                          ${selectedVariantPrice.toLocaleString()}
                        </p>
                        {!selectedVariant.availableForSale && (
                          <p className="text-red-500 font-helvetica !text-[14px] not-italic font-normal leading-[140%] mt-1">
                            Out of Stock
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              

              {/* Performance Data Section */}
               <style dangerouslySetInnerHTML={{ __html: performanceStyles }} />
                  {performanceHtml && (
                    <div
                      className="performance-section"
                      dangerouslySetInnerHTML={{ __html: performanceHtml }}
                    />
                  )}

              {/* Order Button */}
              <button className="w-full cursor-pointer text-white text-center font-helvetica text-[16px] not-italic font-bold leading-[150%] rounded-full py-[14px] px-4 bg-black hover:bg-gray-800 transition-colors ">
                  Order with Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
