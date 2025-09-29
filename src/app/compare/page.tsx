'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { rhodiumModels, modelOptions, RhodiumModel } from '@/data/teslaModels'

export default function ComparePage() {
  const [selectedModels, setSelectedModels] = useState<RhodiumModel[]>([rhodiumModels[0], rhodiumModels[1]])
  const [selectedDropdownOptions, setSelectedDropdownOptions] = useState([modelOptions[0], modelOptions[1]])

  const handleDropdownChange = (index: number, optionId: string) => {
    const newOption = modelOptions.find(o => o.id === optionId)
    if (newOption) {
      const newSelectedOptions = [...selectedDropdownOptions]
      newSelectedOptions[index] = newOption
      setSelectedDropdownOptions(newSelectedOptions)
    }
  }

  const addModel = () => {
    // This would add a third model if implemented
    console.log('Add model functionality')
  }

  return (
    <div className="min-h-screen bg-[#F4F1F2] font-helvetica">
      {/* Header Section */}
      <div className="bg-[#F4F1F2] py-16 text-center pt-[120px]">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-black text-center font-medium text-[64px] leading-[110%] tracking-[-1.28px] font-helvetica mb-[25px]">Compare Models</h1>
          <p className="text-[#111] text-center font-medium text-[24px] leading-[150%] capitalize font-helvetica mb-[30px]">
            Discover Which Tesla Models Meet Your Needs By Answering Questions<br />
            About Your Budget, Driving Habits And Lifestyle.
          </p>
          <button className="bg-black cursor-pointer rounded-full  hover:bg-gray-800 transition-colors p-3 max-w-[372px] w-full text-white text-center font-bold text-[16px] leading-[150%] font-helvetica">
            Help Me Choose
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Model Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px]  mb-[120px]">
          {selectedModels.map((model, index) => (
            <motion.div
              key={`${model.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className=" rounded-lg overflow-hidden"
            >
              {/* Model Dropdown */}
              <div className="bg-white px-5 py-2 rounded-[4px]">
                <div className="relative">
                  <select
                    value={selectedDropdownOptions[index]?.id || ''}
                    onChange={(e) => handleDropdownChange(index, e.target.value)}
                    className="w-full appearance-none bg-transparent border-none text-black font-medium text-[20px] leading-[160%] capitalize font-helvetica  focus:outline-none cursor-pointer pr-8"
                  >
                    {modelOptions.map((option) => (
                      <option key={option.id} value={option.id} className="">
                        {option.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <p className="text-black font-normal text-[14px] leading-[160%] capitalize font-helvetica ">
                  {selectedDropdownOptions[index]?.subtitle || 'Model Y Long Range RWD'}
                </p>
              </div>

              {/* Vehicle Image */}
              <div className="mt-[14px] mb-[30px]">
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/vehicle.png'
                  }}
                />
              </div>

              {/* Model Info */}
              <div className="">
                <h3 className="text-black font-normal text-[23.063px] leading-[24px] tracking-[-0.48px] font-helvetica mb-[12px]">{model.name}</h3>
                <p className="text-black font-normal text-[16px] leading-[18px] tracking-[-0.48px] font-helvetica mb-[12px]">{model.tagline}</p>
                <p className="text-black font-normal text-[16px] leading-[18px] tracking-[-0.48px] font-helvetica mb-[20px]">
                  From ${model.startingPrice.toLocaleString()}<sup>1</sup> • Est. lease ${model.leasePrice.toLocaleString()}/mo
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="text-white cursor-pointer max-w-[112px] w-full rounded-full text-center font-normal text-[14px] py-[12px] px-[20px] leading-[16px] tracking-[-0.14px] font-helvetica bg-[black] hover:bg-gray-800 transition-colors">
                    Build
                  </button>
                  <button className="cursor-pointer border border-[#000] text-black max-w-[150px] w-full rounded-full text-center font-normal text-[14px] py-[12px] px-[20px] leading-[16px] tracking-[-0.14px] font-helvetica hover:text-[#fff] hover:bg-black transition-colors">
                    Shop Inventory
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add Model Card */}
          <div className="flex items-start justify-start  rounded-lg pt-[20px]">
            <button
              onClick={addModel}
              className="text-black font-extrabold text-[14px] leading-[15.4px] cursor-pointer tracking-[-0.28px] underline underline-offset-auto font-helvetica"
            >
              + Add Model
            </button>
          </div>
        </div>

        {/* At a glance Section */}
        <div className="mt-[60px] rounded-lg">
          <h2 className="pl-5 text-black font-normal text-[35.156px] leading-[36px] tracking-[-0.72px] font-helvetica pb-5 border-b border-[#D1D1D1]">
            At a glance <sup className="text-lg">2</sup>
          </h2>

          <div className="pl-5 pl-5 grid grid-cols-1 md:grid-cols-2 gap-16 mt-[30px]">
            {/* Left Column - R1S Quad */}
            <div className="space-y-6">
              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.motorConfig}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">{selectedModels[0]?.motorConfig.includes('Quad') ? '2 in front, 2 in back' : '1 in front, 2 in back'}</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.range.split(' ')[0]} mi <span className="text-sm font-normal text-gray-600">({selectedModels[0]?.range.match(/\(([^)]+)\)/)?.[1]})</span></h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Max battery</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.acceleration}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">0-60 mph</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.horsepower}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Horsepower</p>
              </div>
            </div>

            {/* Right Column - R1S Tri */}
            <div className="space-y-6">
              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.motorConfig}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">{selectedModels[1]?.motorConfig.includes('Quad') ? '2 in front, 2 in back' : '1 in front, 2 in back'}</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.range.split(' ')[0]} mi <span className="text-sm font-normal text-gray-600">({selectedModels[1]?.range.match(/\(([^)]+)\)/)?.[1]})</span></h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Max battery</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.acceleration}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">0-60 mph</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.horsepower}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Horsepower</p>
              </div>
            </div>
          </div>
        </div>

        {/* Design Section */}
        <div className="mt-[60px] rounded-lg">
          <h2 className="pl-5 text-black font-normal text-[35.156px] leading-[36px] tracking-[-0.72px] font-helvetica pb-5 border-b border-[#D1D1D1]">Design</h2>

          <div className="pl-5 grid grid-cols-1 md:grid-cols-2 gap-16 mt-[30px]">
            {/* Left Column - R1S Quad */}
            <div className="space-y-8">
              {/* Paint */}
              <div>
                <h4 className="text-black font-normal text-[20px] leading-[22px] tracking-[-0.2px] font-helvetica mb-[16px]">Paint</h4>
                <div className="flex gap-3 flex-wrap">
                  {selectedModels[0]?.design.paint.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Wheels and tires */}
              <div>
                <h4 className="text-black font-normal text-[20px] leading-[22px] tracking-[-0.2px] font-helvetica mb-[16px]">Wheels and tires</h4>
                <div className="flex gap-3">
                  {selectedModels[0]?.design.wheels.map((_, idx) => (
                    <div key={idx} className="w-8 h-8 rounded-full bg-black border-2 border-gray-300 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full border border-gray-400"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interior */}
              <div>
                <h4 className="text-black font-normal text-[20px] leading-[22px] tracking-[-0.2px] font-helvetica mb-[16px]">Interior</h4>
                <div className="flex gap-3">
                  {selectedModels[0]?.design.interior.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Accents and badging */}
              <div>
                <h4 className="text-black font-normal text-[20px] leading-[22px] tracking-[-0.2px] font-helvetica mb-[16px]">Accents and badging</h4>
                <div className="flex gap-3">
                  {selectedModels[0]?.design.accents.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - R1S Tri */}
            <div className="space-y-8">
              {/* Paint */}
              <div>
                <h4 className="text-black font-normal text-[20px] leading-[22px] tracking-[-0.2px] font-helvetica mb-[16px]">Paint</h4>
                <div className="flex gap-3 flex-wrap">
                  {selectedModels[1]?.design.paint.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Wheels and tires */}
              <div>
                <h4 className="text-black font-normal text-[20px] leading-[22px] tracking-[-0.2px] font-helvetica mb-[16px]">Wheels and tires</h4>
                <div className="flex gap-3">
                  {selectedModels[1]?.design.wheels.map((_, idx) => (
                    <div key={idx} className="w-8 h-8 rounded-full bg-black border-2 border-gray-300 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full border border-gray-400"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interior */}
              <div>
                <h4 className="text-black font-normal text-[20px] leading-[22px] tracking-[-0.2px] font-helvetica mb-[16px]">Interior</h4>
                <div className="flex gap-3">
                  {selectedModels[1]?.design.interior.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Accents and badging */}
              <div>
                <h4 className="text-black font-normal text-[20px] leading-[22px] tracking-[-0.2px] font-helvetica mb-[16px]">Accents and badging</h4>
                <div className="flex gap-3">
                  {selectedModels[1]?.design.accents.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Section */}
        <div className="mt-[60px] rounded-lg">
          <h2 className="pl-5 text-black font-normal text-[35.156px] leading-[36px] tracking-[-0.72px] font-helvetica pb-5 border-b border-[#D1D1D1]">
            Performance <sup className="text-lg">2</sup>
          </h2>

          <div className="pl-5 grid grid-cols-1 md:grid-cols-2 gap-16 mt-[30px]">
            {/* Left Column - R1S Quad */}
            <div className="space-y-6">
              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.motorConfig}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">{selectedModels[0]?.motorConfig.includes('Quad') ? '2 in front, 2 in back' : '1 in front, 2 in back'}</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.range.split(' ')[0]} mi <span className="text-sm font-normal text-gray-600">({selectedModels[0]?.range.match(/\(([^)]+)\)/)?.[1]})</span></h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Max battery</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.acceleration}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">0-60 mph</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.horsepower}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Horsepower</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.torque}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Torque</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.towing}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Towing</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.payload}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Payload</p>
              </div>

              {/* Drive modes */}
              <div>
                <h4 className="text-black font-normal text-[20px] leading-[22px] tracking-[-0.2px] font-helvetica mb-[16px]">Drive modes <sup className="text-sm">3</sup></h4>
                <div className="flex gap-3 flex-wrap">
                  {selectedModels[0]?.driveModes.map((mode, idx) => (
                    <div key={idx} className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6373 17.0137V21.8414H11.3516V17.0137H12.6373Z" fill="black"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6373 9.72363V14.5012H11.3516V9.72363H12.6373Z" fill="black"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6412 2.1582V7.43494H11.3555V2.1582H12.6412Z" fill="black"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.8789 2.15918H18.182L21.4163 21.7898H20.1132L16.8789 2.15918Z" fill="black"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.81626 2.15918H7.11929L3.88507 21.7898H2.58203L5.81626 2.15918Z" fill="black"/>
                      </svg></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - R1S Tri */}
            <div className="space-y-6">
              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.motorConfig}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">{selectedModels[1]?.motorConfig.includes('Quad') ? '2 in front, 2 in back' : '1 in front, 2 in back'}</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.range.split(' ')[0]} mi <span className="text-sm font-normal text-gray-600">({selectedModels[1]?.range.match(/\(([^)]+)\)/)?.[1]})</span></h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Max battery</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.acceleration}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">0-60 mph</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.horsepower}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Horsepower</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.torque}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Torque</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.towing}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Towing</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.payload}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Payload</p>
              </div>

              {/* Drive modes */}
              <div>
                <h4 className="text-black font-normal text-[20px] leading-[22px] tracking-[-0.2px] font-helvetica mb-[16px]">Drive modes <sup className="text-sm">3</sup></h4>
                <div className="flex gap-3 flex-wrap">
                  {selectedModels[1]?.driveModes.map((mode, idx) => (
                    <div key={idx} className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1541 2.26529C13.103 2.61664 13.3464 2.94287 13.6977 2.99395C15.2008 3.2125 16.6275 3.7961 17.8528 4.69371C19.0782 5.59126 20.0649 6.77549 20.7266 8.1427C21.3883 9.50995 21.7048 11.0185 21.6485 12.5364C21.5922 14.0543 21.1647 15.5352 20.4035 16.8496C20.2256 17.1569 20.3304 17.5502 20.6377 17.7281C20.9449 17.906 21.3382 17.8012 21.5161 17.494C22.3826 15.9977 22.8692 14.3119 22.9333 12.584C22.9975 10.8562 22.6372 9.139 21.8839 7.5826C21.1307 6.02626 20.0074 4.67824 18.6126 3.65647C17.2178 2.63473 15.5938 1.9704 13.8827 1.72162C13.5314 1.67053 13.2052 1.91395 13.1541 2.26529ZM7.78494 9.79022C7.75987 9.436 7.4525 9.16922 7.09833 9.19427C5.85792 9.28202 4.64289 9.58907 3.50967 10.1011C3.18612 10.2473 3.04235 10.6281 3.18854 10.9516C3.33473 11.2752 3.71553 11.4189 4.03907 11.2727C5.03377 10.8233 6.10027 10.5538 7.18906 10.4768C7.54323 10.4517 7.81002 10.1443 7.78494 9.79022ZM4.41816 5.78228C6.44797 4.51409 8.88555 4.06915 11.2325 4.53847C13.5795 5.00776 15.6585 6.35587 17.0445 8.30717C17.2501 8.5966 17.1821 8.99792 16.8927 9.2035C16.6032 9.40907 16.2019 9.34112 15.9963 9.0517C14.8001 7.36769 13.0059 6.20425 10.9804 5.79921C8.95492 5.39416 6.85122 5.77816 5.09943 6.87269C4.79833 7.06079 4.40173 6.96921 4.2136 6.66814C4.02548 6.36702 4.11706 5.97042 4.41816 5.78228ZM9.4539 14.4419C10.1414 13.7744 11.0792 13.3635 12.1131 13.3635C12.2637 13.3635 12.4122 13.3722 12.5582 13.3892L12.7154 14.848L12.3389 15.5008C12.2651 15.491 12.1897 15.4859 12.1132 15.4859C11.9113 15.4859 11.7176 15.5212 11.538 15.586L10.8928 14.8701L10.7525 14.7144L10.5473 14.6713L9.4539 14.4419ZM13.8961 13.8046C14.8952 14.3332 15.6314 15.2922 15.8579 16.4347L14.518 17.0355L13.7817 16.8794C13.7324 16.6052 13.6172 16.3539 13.4531 16.1425L13.9339 15.3087L14.0387 15.1271L14.0162 14.9186L13.8961 13.8046ZM15.8749 17.8361C15.7604 18.4986 15.4752 19.1026 15.0661 19.6012C14.6364 19.7855 14.1909 19.9978 13.7274 20.2329L12.9953 19.4255L12.9164 18.6747C13.156 18.5455 13.3609 18.3604 13.5138 18.1369L14.4564 18.3367L14.6615 18.3802L14.8528 18.2944L15.8749 17.8361ZM9.52215 19.9853C10.1199 20.5379 10.8947 20.9018 11.752 20.9822C11.9779 20.9551 12.2267 20.8967 12.5055 20.7994L11.9017 20.1335L11.7606 19.9779L11.7386 19.7689L11.6377 18.8091C11.3735 18.7321 11.136 18.5925 10.9422 18.4074L10.2507 18.7157L9.52215 19.9853ZM7.35127 19.0209C7.13064 18.4502 7.00966 17.8298 7.00966 17.1813C7.00966 14.3627 9.29452 12.0778 12.1131 12.0778C14.9317 12.0778 17.2166 14.3627 17.2166 17.1813C17.2166 17.8151 17.101 18.4219 16.8899 18.9819C17.0314 18.9495 17.1712 18.9219 17.3095 18.8994C17.5826 18.8549 17.8497 18.8303 18.1114 18.8268C18.2549 18.3026 18.3315 17.7506 18.3315 17.1809C18.3315 13.7465 15.5474 10.9624 12.1131 10.9624C8.67877 10.9624 5.89469 13.7465 5.89469 17.1809C5.89469 17.8085 5.98764 18.4143 6.16057 18.9855C6.57226 18.9601 6.97417 18.9698 7.35127 19.0209ZM8.68432 18.8621L9.23985 17.8939L9.34425 17.7121L9.53572 17.6267L10.4185 17.2331C10.418 17.2159 10.4178 17.1986 10.4178 17.1813C10.4178 16.9187 10.4775 16.6699 10.5841 16.448L10.0781 15.8866L8.64375 15.5857C8.4201 16.0712 8.29537 16.6116 8.29537 17.1813C8.29537 17.7844 8.43525 18.3549 8.68432 18.8621ZM4.87476 19.1675C4.70149 18.5347 4.60898 17.8686 4.60898 17.1809C4.60898 13.0364 7.96872 9.67667 12.1131 9.67667C16.2575 9.67667 19.6172 13.0364 19.6172 17.1809C19.6172 17.8079 19.5403 18.4169 19.3955 18.9991C19.8571 19.136 20.3032 19.357 20.738 19.6719C21.2128 19.9776 21.5413 20.1869 21.8096 20.3338V21.7473C21.7364 21.7206 21.6626 21.691 21.5877 21.658C21.1457 21.4637 20.6698 21.1572 20.0338 20.7477L20.0266 20.7431L20.0108 20.7329L19.9956 20.7218C19.2415 20.1713 18.4691 20.0132 17.5161 20.1684C16.522 20.3302 15.3422 20.8319 13.8244 21.63L13.8181 21.6334L13.8116 21.6366C12.602 22.2385 11.5903 22.4218 10.6355 22.1888L10.6109 22.1828L10.5907 22.1761C10.5582 22.1656 10.5257 22.1551 10.4934 22.144L10.484 22.1409C9.60795 21.8396 8.81572 21.3341 8.17282 20.666C7.84117 20.3781 7.09546 20.1713 5.95404 20.2929C4.91436 20.4037 3.66328 20.778 2.37891 21.4605V20.0236C3.23572 19.6221 4.08141 19.3383 4.87476 19.1675Z" fill="black"/>
                      </svg></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dimensions Section */}
        <div className="mt-[60px] rounded-lg">
          <h2 className="pl-5 text-black font-normal text-[35.156px] leading-[36px] tracking-[-0.72px] font-helvetica pb-5 border-b border-[#D1D1D1]">Dimensions</h2>

          <div className="pl-5 grid grid-cols-1 md:grid-cols-2 gap-16 mt-[30px]">
            {/* Left Column - R1S Quad */}
            <div className="space-y-6">
              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.dimensions.widthWithMirrors}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Width (with mirrors)</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.dimensions.widthMirrorsFolded}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Width (with mirrors folded)</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.dimensions.maxHeight}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Max height</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.dimensions.minHeight}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Min height</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.dimensions.length}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Length</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.dimensions.maxGroundClearance}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Max ground clearance</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.dimensions.maxApproachAngle}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Max approach angle</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.dimensions.maxDepartureAngle}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Max departure angle</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.dimensions.wheelbase}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Wheelbase</p>
              </div>
            </div>

            {/* Right Column - R1S Tri */}
            <div className="space-y-6">
              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.dimensions.widthWithMirrors}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Width (with mirrors)</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.dimensions.widthMirrorsFolded}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Width (with mirrors folded)</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.dimensions.maxHeight}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Max height</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.dimensions.minHeight}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Min height</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.dimensions.length}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Length</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.dimensions.maxGroundClearance}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Max ground clearance</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.dimensions.maxApproachAngle}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Max approach angle</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.dimensions.maxDepartureAngle}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Max departure angle</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.dimensions.wheelbase}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Wheelbase</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cargo and Capacity Section */}
        <div className=" mt-[60px]">
          <h2 className="pl-5 text-black font-normal text-[35.156px] leading-[36px] tracking-[-0.72px] font-helvetica pb-5 border-b border-[#D1D1D1]">Cargo and Capacity</h2>

          <div className="pl-5 grid grid-cols-1 md:grid-cols-2 gap-16 mt-[30px]">
            {/* Left Column - R1S Quad */}
            <div className="space-y-6">
              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.cargoCapacity.seating}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Capacity</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.cargoCapacity.cargoVolumeSecondRow}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Cargo volume (second row folded)</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.cargoCapacity.cargoVolumeThirdRowFolded}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Cargo volume (third row folded)</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.cargoCapacity.cargoVolumeThirdRowUp}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Cargo volume (third row up)</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[0]?.cargoCapacity.totalInteriorStorage}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Total interior storage</p>
              </div>
            </div>

            {/* Right Column - R1S Tri */}
            <div className="space-y-6">
              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.cargoCapacity.seating}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Capacity</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.cargoCapacity.cargoVolumeSecondRow}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Cargo volume (second row folded)</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.cargoCapacity.cargoVolumeThirdRowFolded}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Cargo volume (third row folded)</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.cargoCapacity.cargoVolumeThirdRowUp}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Cargo volume (third row up)</p>
              </div>

              <div>
                <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">{selectedModels[1]?.cargoCapacity.totalInteriorStorage}</h4>
                <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">Total interior storage</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="list-decimal pl-5 rounded-lg mt-[60px]">
          <li className="text-[#606060] font-normal text-[11.813px] leading-[16px] tracking-[-0.12px] font-helvetica mb-[5px]">Prices shown do not include all applicable taxes and fees.</li>
          <li className="text-[#606060] font-normal text-[11.813px] leading-[16px] tracking-[-0.12px] font-helvetica">Actual vehicle capability will depend on selected options and trim. Est. 0-60 mph acceleration numbers for Tri and Quad motor configurations are based on a configuration with 22" road wheels and tires and require use of Launch mode. Launch mode  should not be used on public roads. Torque, horsepower, and acceleration timing estimates vary based on battery, tire, drive modes, vehicle load and weather. All range estimates are based on a configuration with 22” wheels and tires. Official EPA  values are noted — some range estimates are preliminary estimates based on the EPA test cycle and are not official EPA values. The EPA estimates range through a series of standardized lab tests that mimic real world conditions. Factors including tires, drive modes, HVAC settings and accessories can all have an impact on range.</li>
        </ul>
      </div>
    </div>
  )
}