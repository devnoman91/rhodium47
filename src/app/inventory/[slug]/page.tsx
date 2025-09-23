'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { sentinalConfiguration } from '@/data/sentinal-config';
import Image from 'next/image';

interface VehicleConfigPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function VehicleConfigContent() {
  const config = sentinalConfiguration;

  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [selectedSelfDriving, setSelectedSelfDriving] = useState(false);

  const calculateTotalPrice = () => {
    let total = config.pricing.cash;
    if (selectedSelfDriving) {
      total += config.selfDriving.price;
    }
    selectedAccessories.forEach(accessoryName => {
      const accessory = config.accessories.find(a => a.name === accessoryName);
      if (accessory) total += accessory.price;
    });
    return total;
  };

  const toggleAccessory = (accessoryName: string) => {
    setSelectedAccessories(prev =>
      prev.includes(accessoryName)
        ? prev.filter(a => a !== accessoryName)
        : [...prev, accessoryName]
    );
  };

  return (
    <div className="min-h-screen pt-[100px]" style={{ backgroundColor: '#F4F1F2' }}>
      {/* Back to Inventory link */}
      <div className="px-12 py-4">
        <a href="/" className="text-sm text-black hover:text-black text-[#747474] font-helvetica text-[12px] not-italic font-normal leading-[110%] tracking-[-0.24px] underline underline-offset-auto decoration-solid">
          Back to Inventory Page
        </a>
      </div>

      <div className="grid grid-cols-[69%_30%] justify-between px-12">
        {/* Left Sidebar - Vehicle Image */}
        <div className="sticky top-0 h-fit">
          {/* Navigation arrows */}
          <button className="absolute left-6 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="mx-auto px-14">
            <Image
              src="/images/dynmaicpagecar.png"
              alt={config.model}
              width={800}
              height={400}
              className="w-full h-auto object-contain"
            />
          </div>

          <button className="absolute right-6 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Right Sidebar - Configuration */}
        <div className=" w-[500px] ">
          <div className="px-4 py-14 space-y-6">
            {/* Vehicle Title and Specs */}
            <div className="text-center">
              <h1 className="text-black mb-[28px] text-center font-helvetica text-[40px] not-italic font-bold leading-[110%] tracking-[-0.8px]">{config.model}</h1>
              <div className="flex justify-center space-x-6 text-sm text-black mb-[20px]">
                <div>
                  <div className="text-[#111111] text-center font-helvetica text-[20px] not-italic font-medium leading-[18px] capitalize mb-[4px]">{config.specs.range}</div>
                  <div className="text-[#111111] font-helvetica text-[10px] not-italic font-medium leading-[18px] capitalize ">Range (EPA est.)</div>
                </div>
                <div>
                  <div className="text-[#111111] text-center font-helvetica text-[20px] not-italic font-medium leading-[18px] capitalize mb-[4px]">{config.specs.topSpeed}</div>
                  <div className="text-[#111111] font-helvetica text-[10px] not-italic font-medium leading-[18px] capitalize ">Top Speed</div>
                </div>
                <div>
                  <div className="text-[#111111] text-center font-helvetica text-[20px] not-italic font-medium leading-[18px] capitalize mb-[4px]">{config.specs.acceleration}</div>
                  <div className="text-[#111111] font-helvetica text-[10px] not-italic font-medium leading-[18px] capitalize ">0-60 mph</div>
                </div>
              </div>

              {/* Pricing Options */}
              <div className="flex justify-center space-x-4 mb-6 pb-4 border-b border-[#D5D7D7]">
                <div className="text-center px-4 py-2 bg-gray-100 rounded">
                  <div className="text-[#111111] text-center font-helvetica text-[16px] not-italic font-medium leading-[180%] capitalize">Cash</div>
                </div>
                <div className="text-center px-4 py-2">
                  <div className="text-[#111111] text-center font-helvetica text-[16px] not-italic font-medium leading-[180%] capitalize">Lease</div>
                </div>
                <div className="text-center px-4 py-2">
                  <div className="text-[#111111] text-center font-helvetica text-[16px] not-italic font-medium leading-[180%] capitalize">Finance</div>
                </div>
              </div>
            </div>

            {/* Drive Type */}
            <div className="rounded border border-black bg-[#F4F4F4] px-[20px] py-[12px] mb-[15px] cursor-pointer">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-black font-helvetica text-[14px] not-italic font-medium leading-[150%] capitalize ">{config.driveType}</div>
                </div>
                <div className="text-right">
                  <div className="text-black font-helvetica text-[14px] not-italic font-bold leading-[150%] capitalize ">${config.pricing.cash.toLocaleString()}</div>
                </div>
              </div>
            </div>
            <div className="rounded border border-black bg-[#F4F1F2] px-[20px] py-[12px] mb-[15px] cursor-pointer">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-black font-helvetica text-[14px] not-italic font-medium leading-[150%] capitalize ">Paint</div>
                </div>
                <div className="text-right">
                  <div className="text-black font-helvetica text-[14px] not-italic font-bold leading-[150%] capitalize ">${config.pricing.lease}/mo</div>
                </div>
              </div>
            </div>
            <div className="rounded  bg-[#FFF] px-[20px] py-[12px] mb-[15px] cursor-pointer">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-black font-helvetica text-[14px] not-italic font-medium leading-[150%] capitalize">View & Compare Feature</div>
                </div>
                <div className="text-right">
                  <div className="text-black font-helvetica text-[14px] not-italic font-bold leading-[150%] capitalize "><svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
                    <path d="M6.07106 4.82927L1.82806 9.07227L0.414063 7.65727L3.24306 4.82927L0.414063 2.00127L1.82806 0.586266L6.07106 4.82927Z" fill="black"/>
                  </svg></div>
                </div>
              </div>
            </div>

            {/* View & Compare Features */}
            <div className="mb-[20px]">
              <div className="text-[#747474] font-helvetica text-[12px] not-italic font-normal leading-[140%] tracking-[-0.24px] mb-[10px]">
                Includes $500 of est. incentives
              </div>
              <div className="text-[#747474] font-helvetica text-[12px] not-italic font-normal leading-[140%] tracking-[-0.24px]">
                $2,000 est. 5 year gas savings of $8,500
              </div>
            </div>

            {/* Edit Savings */}
            <span className="mb-[50px] block text-black font-helvetica text-[12px] not-italic font-normal leading-[110%] tracking-[-0.24px] underline decoration-solid underline-offset-auto">Edit Savings</span>

            {/* Luxe Package */}
            <div className="space-y-4 mb-0">
              <div className="text-center">
                <span className="text-[#111] text-center font-helvetica text-[10px] not-italic font-medium leading-[22px] capitalize ">Included</span>
                <h3 className="text-[#111] font-helvetica text-[20px] not-italic font-medium leading-[22px] capitalize mb-[20px]">Luxe Package</h3>
              </div>

              <div className="space-y-3 rounded border border-[#E1E1E1] bg-[#F4F1F2] py-[26px] px-[18px] mb-[30px]">
                {config.luxePackage.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex-shrink-0 flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-sm"></div>
                    </div>
                    <div className="flex-1">
                      <div className="text-black font-helvetica text-[12px] not-italic font-normal leading-[140%] tracking-[-0.24px]">{feature.title}</div>
                      <div className="text-[#727272] font-helvetica text-[12px] not-italic font-normal leading-[140%] tracking-[-0.24px]">{feature.description}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button className="text-black cursor-pointer mb-[40px] font-helvetica text-[12px] not-italic font-normal leading-[110%] tracking-[-0.24px] underline decoration-solid underline-offset-auto">View Terms</button>
              </div>
            </div>

            {/* Paint Colors */}
            <div className="space-y-4 text-center">
              <span className="text-[#111] font-helvetica text-[10px] not-italic font-medium leading-[22px] capitalize ">Included</span>
              <h3 className="text-center text-[#111] font-helvetica text-[20px] not-italic font-medium leading-[22px] capitalize mb-[20px]">{config.paint.selected}</h3>
              <div className="flex justify-center mb-[20px] space-x-4">
                {config.paint.options.map((color) => (
                  <button
                    key={color.name}
                    className={`relative w-10 h-10 rounded-full  ${
                      color.selected ? 'border-black' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.color }}
                    aria-pressed={color.selected}
                  >
                    {color.selected && (
                      <span className="absolute inset-0 rounded-full  pointer-events-none"></span>
                    )}
                  </button>
                ))}
              </div>

            </div>

            {/* Wheels */}
            <div className="space-y-4 text-center">
              <span className="text-[#111] font-helvetica text-[10px] not-italic font-medium leading-[22px] capitalize ">Included</span>
              <h3 className="text-center text-[#111] font-helvetica text-[20px] not-italic font-medium leading-[22px] capitalize max-w-[150px] mx-auto mb-[20px]">{config.wheels.title}</h3>
              <div className="flex justify-center space-x-4">
                {config.wheels.options.map((wheel, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-10 h-10 rounded-full border-3 mx-auto mb-4 ${
                      wheel.selected ? 'border-gray-800 bg-gray-800' : 'border-gray-300 bg-gray-100'
                    }`}></div>
                    <div className="text-black text-center font-helvetica text-[12px] not-italic font-normal leading-[140%] tracking-[-0.24px]">{wheel.name}</div>
                    <div className="text-black text-center font-helvetica text-[12px] not-italic font-normal leading-[140%] tracking-[-0.24px]">{wheel.description}</div>
                    <div className="text-black text-center font-helvetica text-[12px] not-italic font-normal leading-[140%] tracking-[-0.24px]">{wheel.speedText}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interior */}
            <div className="space-y-4 text-center">
              <span className="text-[#111] font-helvetica text-[10px] not-italic font-medium leading-[22px] capitalize ">Included</span>
              <h3 className="text-center text-[#111] font-helvetica text-[20px] not-italic font-medium leading-[22px] capitalize mb-[20px]">{config.interior.title}</h3>
              <div className="flex justify-center space-x-4">
                {config.interior.options.map((interior, index) => (
                  <button key={index} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full  mb-1 ${
                      interior.selected ? 'border-gray-800 bg-gray-800' : 'border-gray-300 bg-gray-100'
                    }`}></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Steering Wheel */}
            <div className="space-y-4 text-center">
              <span className="text-[#111] font-helvetica text-[10px] not-italic font-medium leading-[22px] capitalize ">Included</span>
              <h3 className="text-center text-[#111] font-helvetica text-[20px] not-italic font-medium leading-[22px] capitalize mb-[20px]">{config.steeringWheel.title}</h3>
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Full Self-Driving */}
            <div className="space-y-3 text-center mb-[28px]">
               <span className="text-[#111] font-helvetica text-[10px] not-italic font-medium leading-[22px] capitalize ">Included</span>
              <h3 className="text-center text-[#111] font-helvetica text-[20px] not-italic font-medium leading-[22px] capitalize mb-[20px] max-w-[150px] mx-auto mb-[20px]">{config.selfDriving.title}</h3>
              <p className="text-black text-center font-helvetica text-[12px] not-italic font-normal leading-[140%] tracking-[-0.24px] ">{config.selfDriving.description}</p>
            </div>

            {/* Accessories */}
            <div className="space-y-3 mb-[40px]">
              <h3 className="text-center text-[#111] font-helvetica text-[20px] not-italic font-medium leading-[22px] capitalize mb-[20px]">Accessories</h3>
              <div className="space-y-2">
                {config.accessories.map((accessory) => (
                  <div
                    key={accessory.name}
                    className="flex items-center cursor-pointer justify-between py-4 px-[18px] rounded border border-black bg-white border border-[#ddd] rounded-lg hover:bg-gray-50 rounded"
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id={accessory.name}
                        checked={selectedAccessories.includes(accessory.name)}
                        onChange={() => toggleAccessory(accessory.name)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 cursor-pointer "
                      />
                      <label htmlFor={accessory.name} className="text-[#747474] font-helvetica text-[12px] not-italic font-normal leading-[140%] tracking-[-0.24px]">
                        {accessory.name}
                      </label>
                    </div>
                    <span className="text-[#747474] font-helvetica text-[12px] not-italic font-normal leading-[140%] tracking-[-0.24px]">${accessory.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enter Delivery ZIP */}
            <div className="space-y-3 mb-[10px]">
              <h3 className="text-center text-[#111] font-helvetica text-[20px] not-italic font-medium leading-[22px] capitalize mb-[20px]">Enter Delivery ZIP</h3>
              <input
                type="text"
                placeholder={config.deliveryZip.placeholder}
                className="rounded border border-black bg-white w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black text-[#7C7979] font-helvetica text-[14px] not-italic font-medium leading-[150%] capitalize"
              />
            </div>

            {/* Pricing Details */}
            <div className="pt-2">
              <button className="text-sm text-black underline mb-[24px]">Hide Pricing Details</button>

              <div className="space-y-2 text-sm text-black">
                <div className="flex justify-between ">
                  <span>Est. Purchase Price - All-Wheel Drive</span>
                  <span>$84,500</span>
                </div>
                <div className="flex justify-between ">
                  <span>Stealth Grey Paint</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between ">
                  <span>19" Magnetite Wheels</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between ">
                  <span>All Black Interior with Piano Gloss</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between ">
                  <span>Steering Wheel</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between ">
                  <span>Four-Year Premium Service</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between ">
                  <span>Full Self-Driving (Supervised)</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between ">
                  <span>Free Supercharging</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between ">
                  <span>Premium Connectivity</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between ">
                  <span>Vehicle Price</span>
                  <span>$84,500</span>
                </div>
                <div className="flex justify-between ">
                  <span>Destination Fee</span>
                  <span>$1,390</span>
                </div>
                <div className="flex justify-between ">
                  <span>Order Fee</span>
                  <span>$250</span>
                </div>
              </div>

              <hr className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-[#323232] font-helvetica text-[12px] not-italic font-normal leading-[18px]">
                  <span>Est. Purchase Price</span>
                  <span>$96,630</span>
                </div>
                <div className="flex justify-between text-[#323232] font-helvetica text-[12px] not-italic font-normal leading-[18px]">
                  <span>New York Incentive</span>
                  <span>-$500</span>
                </div>
                <div className="flex justify-between text-[#323232] font-helvetica text-[12px] not-italic font-normal leading-[18px]">
                  <span>Est. Price After Savings</span>
                  <span>$96,130</span>
                </div>
              </div>

              <hr className="my-4" />

              <div className="space-y-2">
                <span className="text-black font-helvetica text-[12px] not-italic font-normal leading-[110%] tracking-[-0.24px] underline mb-[10px] block">Edit Savings</span>
                <div className="flex justify-between text-[#111] font-helvetica text-[18px] not-italic font-medium leading-[22px] capitalize">
                  <span>Est. Purchase Price</span>
                  <span>$96,630</span>
                </div>
                <div className="text-[#323232] font-helvetica text-[12px] not-italic font-normal leading-[18px]">Includes Destination and Order Fee</div>

                <div className="flex justify-between text-[#111] font-helvetica text-[18px] not-italic font-medium leading-[22px] capitalize">
                  <span>Due Today</span>
                  <span>$250</span>
                </div>
                <div className="text-[#323232] font-helvetica text-[12px] not-italic font-normal leading-[18px]">Non-refundable Order Fee</div>

              </div>

<button className="w-full cursor-pointer text-white text-center font-helvetica text-[16px] not-italic font-bold leading-[150%] rounded-full py-[14px] px-4 bg-black hover:bg-gray-800 transition-colors mt-6">
  Order with Card
</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function VehicleConfigPage({ params }: VehicleConfigPageProps) {
  const resolvedParams = await params;

  if (resolvedParams.slug !== 'sentinal') {
    notFound();
  }

  return <VehicleConfigContent />;
}