'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { sentinalConfiguration } from '@/data/sentinal-config';
import Image from 'next/image';

interface VehicleConfigPageProps {
  params: {
    slug: string;
  };
}

export default function VehicleConfigPage({ params }: VehicleConfigPageProps) {
  if (params.slug !== 'sentinal') {
    notFound();
  }

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
    <div className="min-h-screen" style={{ backgroundColor: '#F4F1F2' }}>
      {/* Back to Inventory link */}
      <div className="px-6 py-4">
        <a href="/" className="text-sm text-black hover:text-black">
          Back to Inventory Page
        </a>
      </div>

      <div className="flex">
        {/* Left Sidebar - Vehicle Image */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {/* Navigation arrows */}
          <button className="absolute left-6 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="max-w-2xl mx-auto px-12">
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
          <div className="px-12 py-6 space-y-6">
            {/* Vehicle Title and Specs */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-black mb-3">{config.model}</h1>
              <div className="flex justify-center space-x-6 text-sm text-black mb-4">
                <div>
                  <div className="font-medium">{config.specs.range}</div>
                  <div className="text-xs">Range (EPA est.)</div>
                </div>
                <div>
                  <div className="font-medium">{config.specs.topSpeed}</div>
                  <div className="text-xs">Top Speed</div>
                </div>
                <div>
                  <div className="font-medium">{config.specs.acceleration}</div>
                  <div className="text-xs">0-60 mph</div>
                </div>
              </div>

              {/* Pricing Options */}
              <div className="flex justify-center space-x-4 text-sm mb-6">
                <div className="text-center px-4 py-2 bg-gray-100 rounded">
                  <div className="text-black">Cash</div>
                </div>
                <div className="text-center px-4 py-2">
                  <div className="text-black">Lease</div>
                </div>
                <div className="text-center px-4 py-2">
                  <div className="text-black">Finance</div>
                </div>
              </div>
            </div>

            {/* Drive Type */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-black">{config.driveType}</div>
                  <div className="text-sm text-black">Paint</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-black">${config.pricing.cash.toLocaleString()}</div>
                  <div className="text-sm text-black">${config.pricing.lease}/mo</div>
                </div>
              </div>
            </div>

            {/* View & Compare Features */}
            <div className="text-center">
              <button className="text-black underline text-sm mb-2">View & Compare Features</button>
              <div className="text-xs text-black">
                Includes $500 of est. incentives<br/>
                $2,000 est. 5 year gas savings of $8,500
              </div>
            </div>

            {/* Est Range */}
            <div className="bg-gray-100 p-3 rounded text-center">
              <span className="text-sm text-black">Est Range</span>
            </div>

            {/* Luxe Package */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-black">Luxe Package</h3>
                <span className="text-sm text-black">Included</span>
              </div>

              <div className="space-y-3">
                {config.luxePackage.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex-shrink-0 flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-sm"></div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-black">{feature.title}</div>
                      <div className="text-xs text-black mt-1">{feature.description}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button className="text-sm text-black underline">View Terms</button>
              </div>
            </div>

            {/* Paint Colors */}
            <div className="space-y-4">
              <h3 className="font-medium text-black">{config.paint.selected}</h3>
              <div className="flex justify-center space-x-3">
                {config.paint.options.map((color) => (
                  <button
                    key={color.name}
                    className={`relative w-10 h-10 rounded-full border-3 ${
                      color.selected ? 'border-red-500' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.color }}
                  >
                    {color.selected && (
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Wheels */}
            <div className="space-y-4">
              <h3 className="font-medium text-black">{config.wheels.title}</h3>
              <div className="flex justify-center space-x-4">
                {config.wheels.options.map((wheel, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-12 h-12 rounded-full border-3 mx-auto mb-2 ${
                      wheel.selected ? 'border-gray-800 bg-gray-800' : 'border-gray-300 bg-gray-100'
                    }`}></div>
                    <div className="text-xs text-black">{wheel.name}</div>
                    <div className="text-xs text-black">{wheel.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interior */}
            <div className="space-y-4">
              <h3 className="font-medium text-black">{config.interior.title}</h3>
              <div className="flex justify-center space-x-4">
                {config.interior.options.map((interior, index) => (
                  <button key={index} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full border-3 mb-1 ${
                      interior.selected ? 'border-gray-800 bg-gray-800' : 'border-gray-300 bg-gray-100'
                    }`}></div>
                    <div className="text-xs text-black">{interior.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Steering Wheel */}
            <div className="space-y-4">
              <h3 className="font-medium text-black">{config.steeringWheel.title}</h3>
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Full Self-Driving */}
            <div className="space-y-3">
              <h3 className="font-medium text-black">{config.selfDriving.title}</h3>
              <p className="text-xs text-black leading-relaxed">{config.selfDriving.description}</p>
            </div>

            {/* Accessories */}
            <div className="space-y-3">
              <h3 className="font-medium text-black">Accessories</h3>
              <div className="space-y-2">
                {config.accessories.map((accessory) => (
                  <div
                    key={accessory.name}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id={accessory.name}
                        checked={selectedAccessories.includes(accessory.name)}
                        onChange={() => toggleAccessory(accessory.name)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <label htmlFor={accessory.name} className="text-sm font-medium text-black">
                        {accessory.name}
                      </label>
                    </div>
                    <span className="text-sm font-semibold text-black">${accessory.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enter Delivery ZIP */}
            <div className="space-y-3">
              <h3 className="font-medium text-black">Enter Delivery ZIP</h3>
              <input
                type="text"
                placeholder={config.deliveryZip.placeholder}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
              />
            </div>

            {/* Pricing Details */}
            <div className="border-t border-gray-200 pt-4">
              <button className="text-sm text-black underline mb-4">Hide Pricing Details</button>

              <div className="space-y-2 text-sm text-black">
                <div className="flex justify-between">
                  <span>Est. Purchase Price - All-Wheel Drive</span>
                  <span>$84,500</span>
                </div>
                <div className="flex justify-between">
                  <span>Stealth Grey Paint</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between">
                  <span>19" Magnetite Wheels</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between">
                  <span>All Black Interior with Piano Gloss</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between">
                  <span>Steering Wheel</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between">
                  <span>Four-Year Premium Service</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between">
                  <span>Full Self-Driving (Supervised)</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between">
                  <span>Free Supercharging</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between">
                  <span>Premium Connectivity</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between">
                  <span>Vehicle Price</span>
                  <span>$84,500</span>
                </div>
                <div className="flex justify-between">
                  <span>Destination Fee</span>
                  <span>$1,390</span>
                </div>
                <div className="flex justify-between">
                  <span>Order Fee</span>
                  <span>$250</span>
                </div>
              </div>

              <hr className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-black">
                  <span>Est. Purchase Price</span>
                  <span>$96,630</span>
                </div>
                <div className="flex justify-between text-sm text-black">
                  <span>New York Incentive</span>
                  <span>-$500</span>
                </div>
                <div className="flex justify-between text-sm text-black">
                  <span>Est. Price After Savings</span>
                  <span>$96,130</span>
                </div>
              </div>

              <hr className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between font-semibold text-black">
                  <span>Est. Purchase Price</span>
                  <span>$96,630</span>
                </div>
                <div className="text-xs text-black">Includes Destination and Order Fee</div>

                <div className="flex justify-between font-semibold mt-4 text-black">
                  <span>Due Today</span>
                  <span>$250</span>
                </div>
                <div className="text-xs text-black">Non-refundable Order Fee</div>

              </div>

              <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors mt-6">
                Order with Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}