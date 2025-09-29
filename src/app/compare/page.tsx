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
      <div className="bg-[#F4F1F2] py-16 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-6xl font-medium text-black mb-6 tracking-tight">Compare Models</h1>
          <p className="text-xl text-gray-800 mb-10 max-w-4xl mx-auto leading-relaxed">
            Discover Which Tesla Models Meet Your Needs By Answering Questions<br />
            About Your Budget, Driving Habits And Lifestyle.
          </p>
          <button className="bg-black text-white px-12 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors text-lg">
            Help Me Choose
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Model Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {selectedModels.map((model, index) => (
            <motion.div
              key={`${model.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className=" rounded-lg overflow-hidden"
            >
              {/* Model Dropdown */}
              <div className="p-6 pb-4">
                <div className="relative">
                  <select
                    value={selectedDropdownOptions[index]?.id || ''}
                    onChange={(e) => handleDropdownChange(index, e.target.value)}
                    className="w-full appearance-none bg-transparent border-none text-xl font-medium focus:outline-none cursor-pointer pr-8"
                  >
                    {modelOptions.map((option) => (
                      <option key={option.id} value={option.id}>
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
                <p className="text-sm text-gray-600 mt-1">
                  {selectedDropdownOptions[index]?.subtitle || 'Model Y Long Range RWD'}
                </p>
              </div>

              {/* Vehicle Image */}
              <div className="px-6 pb-6">
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-64 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/vehicle.png'
                  }}
                />
              </div>

              {/* Model Info */}
              <div className="px-6 pb-6">
                <h3 className="text-2xl font-medium text-black mb-2">{model.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{model.tagline}</p>
                <p className="text-sm text-gray-900 mb-6">
                  From ${model.startingPrice.toLocaleString()}<sup>1</sup> • Est. lease ${model.leasePrice.toLocaleString()}/mo
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-black text-white py-3 px-6 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                    Build
                  </button>
                  <button className="flex-1 border border-gray-300 text-black py-3 px-6 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                    Shop Inventory
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add Model Card */}
          <div className="flex items-center justify-center  rounded-lg h-32">
            <button
              onClick={addModel}
              className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
            >
              + Add Model
            </button>
          </div>
        </div>

        {/* At a glance Section */}
        <div className=" rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-medium text-black mb-8">
            At a glance <sup className="text-lg">2</sup>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left Column - R1S Quad */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-black mb-2">{selectedModels[0]?.motorConfig}</h4>
                <p className="text-sm text-gray-600">{selectedModels[0]?.motorConfig.includes('Quad') ? '2 in front, 2 in back' : '1 in front, 2 in back'}</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[0]?.range.split(' ')[0]} mi <span className="text-sm font-normal text-gray-600">({selectedModels[0]?.range.match(/\(([^)]+)\)/)?.[1]})</span></h4>
                <p className="text-sm text-gray-600">Max battery</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[0]?.acceleration}</h4>
                <p className="text-sm text-gray-600">0-60 mph</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[0]?.horsepower}</h4>
                <p className="text-sm text-gray-600">Horsepower</p>
              </div>
            </div>

            {/* Right Column - R1S Tri */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-black mb-2">{selectedModels[1]?.motorConfig}</h4>
                <p className="text-sm text-gray-600">{selectedModels[1]?.motorConfig.includes('Quad') ? '2 in front, 2 in back' : '1 in front, 2 in back'}</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[1]?.range.split(' ')[0]} mi <span className="text-sm font-normal text-gray-600">({selectedModels[1]?.range.match(/\(([^)]+)\)/)?.[1]})</span></h4>
                <p className="text-sm text-gray-600">Max battery</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[1]?.acceleration}</h4>
                <p className="text-sm text-gray-600">0-60 mph</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[1]?.horsepower}</h4>
                <p className="text-sm text-gray-600">Horsepower</p>
              </div>
            </div>
          </div>
        </div>

        {/* Design Section */}
        <div className=" rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-medium text-black mb-8">Design</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left Column - R1S Quad */}
            <div className="space-y-8">
              {/* Paint */}
              <div>
                <h4 className="text-lg font-medium text-black mb-4">Paint</h4>
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
                <h4 className="text-lg font-medium text-black mb-4">Wheels and tires</h4>
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
                <h4 className="text-lg font-medium text-black mb-4">Interior</h4>
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
                <h4 className="text-lg font-medium text-black mb-4">Accents and badging</h4>
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
                <h4 className="text-lg font-medium text-black mb-4">Paint</h4>
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
                <h4 className="text-lg font-medium text-black mb-4">Wheels and tires</h4>
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
                <h4 className="text-lg font-medium text-black mb-4">Interior</h4>
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
                <h4 className="text-lg font-medium text-black mb-4">Accents and badging</h4>
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
        <div className=" rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-medium text-black mb-8">
            Performance <sup className="text-lg">2</sup>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left Column - R1S Quad */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-black mb-2">{selectedModels[0]?.motorConfig}</h4>
                <p className="text-sm text-gray-600">{selectedModels[0]?.motorConfig.includes('Quad') ? '2 in front, 2 in back' : '1 in front, 2 in back'}</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[0]?.range.split(' ')[0]} mi <span className="text-sm font-normal text-gray-600">({selectedModels[0]?.range.match(/\(([^)]+)\)/)?.[1]})</span></h4>
                <p className="text-sm text-gray-600">Max battery</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[0]?.acceleration}</h4>
                <p className="text-sm text-gray-600">0-60 mph</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[0]?.horsepower}</h4>
                <p className="text-sm text-gray-600">Horsepower</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[0]?.torque}</h4>
                <p className="text-sm text-gray-600">Torque</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[0]?.towing}</h4>
                <p className="text-sm text-gray-600">Towing</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[0]?.payload}</h4>
                <p className="text-sm text-gray-600">Payload</p>
              </div>

              {/* Drive modes */}
              <div>
                <h4 className="text-lg font-medium text-black mb-4">Drive modes <sup className="text-sm">3</sup></h4>
                <div className="flex gap-3 flex-wrap">
                  {selectedModels[0]?.driveModes.map((mode, idx) => (
                    <div key={idx} className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs">🚗</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - R1S Tri */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-black mb-2">{selectedModels[1]?.motorConfig}</h4>
                <p className="text-sm text-gray-600">{selectedModels[1]?.motorConfig.includes('Quad') ? '2 in front, 2 in back' : '1 in front, 2 in back'}</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[1]?.range.split(' ')[0]} mi <span className="text-sm font-normal text-gray-600">({selectedModels[1]?.range.match(/\(([^)]+)\)/)?.[1]})</span></h4>
                <p className="text-sm text-gray-600">Max battery</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[1]?.acceleration}</h4>
                <p className="text-sm text-gray-600">0-60 mph</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[1]?.horsepower}</h4>
                <p className="text-sm text-gray-600">Horsepower</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[1]?.torque}</h4>
                <p className="text-sm text-gray-600">Torque</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[1]?.towing}</h4>
                <p className="text-sm text-gray-600">Towing</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[1]?.payload}</h4>
                <p className="text-sm text-gray-600">Payload</p>
              </div>

              {/* Drive modes */}
              <div>
                <h4 className="text-lg font-medium text-black mb-4">Drive modes <sup className="text-sm">3</sup></h4>
                <div className="flex gap-3 flex-wrap">
                  {selectedModels[1]?.driveModes.map((mode, idx) => (
                    <div key={idx} className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs">🚗</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dimensions Section */}
        <div className=" rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-medium text-black mb-8">Dimensions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left Column - R1S Quad */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[0]?.dimensions.widthWithMirrors}</h4>
                <p className="text-sm text-gray-600">Width (with mirrors)</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[0]?.dimensions.widthMirrorsFolded}</h4>
                <p className="text-sm text-gray-600">Width (with mirrors folded)</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[0]?.dimensions.maxHeight}</h4>
                <p className="text-sm text-gray-600">Max height</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[0]?.dimensions.minHeight}</h4>
                <p className="text-sm text-gray-600">Min height</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[0]?.dimensions.length}</h4>
                <p className="text-sm text-gray-600">Length</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[0]?.dimensions.maxGroundClearance}</h4>
                <p className="text-sm text-gray-600">Max ground clearance</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[0]?.dimensions.maxApproachAngle}</h4>
                <p className="text-sm text-gray-600">Max approach angle</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[0]?.dimensions.maxDepartureAngle}</h4>
                <p className="text-sm text-gray-600">Max departure angle</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[0]?.dimensions.wheelbase}</h4>
                <p className="text-sm text-gray-600">Wheelbase</p>
              </div>
            </div>

            {/* Right Column - R1S Tri */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[1]?.dimensions.widthWithMirrors}</h4>
                <p className="text-sm text-gray-600">Width (with mirrors)</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[1]?.dimensions.widthMirrorsFolded}</h4>
                <p className="text-sm text-gray-600">Width (with mirrors folded)</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[1]?.dimensions.maxHeight}</h4>
                <p className="text-sm text-gray-600">Max height</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[1]?.dimensions.minHeight}</h4>
                <p className="text-sm text-gray-600">Min height</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[1]?.dimensions.length}</h4>
                <p className="text-sm text-gray-600">Length</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[1]?.dimensions.maxGroundClearance}</h4>
                <p className="text-sm text-gray-600">Max ground clearance</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[1]?.dimensions.maxApproachAngle}</h4>
                <p className="text-sm text-gray-600">Max approach angle</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[1]?.dimensions.maxDepartureAngle}</h4>
                <p className="text-sm text-gray-600">Max departure angle</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[1]?.dimensions.wheelbase}</h4>
                <p className="text-sm text-gray-600">Wheelbase</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cargo and Capacity Section */}
        <div className=" rounded-lg p-8">
          <h2 className="text-3xl font-medium text-black mb-8">Cargo and Capacity</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left Column - R1S Quad */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[0]?.cargoCapacity.seating}</h4>
                <p className="text-sm text-gray-600">Capacity</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[0]?.cargoCapacity.cargoVolumeSecondRow}</h4>
                <p className="text-sm text-gray-600">Cargo volume (second row folded)</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[0]?.cargoCapacity.cargoVolumeThirdRowFolded}</h4>
                <p className="text-sm text-gray-600">Cargo volume (third row folded)</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[0]?.cargoCapacity.cargoVolumeThirdRowUp}</h4>
                <p className="text-sm text-gray-600">Cargo volume (third row up)</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[0]?.cargoCapacity.totalInteriorStorage}</h4>
                <p className="text-sm text-gray-600">Total interior storage</p>
              </div>
            </div>

            {/* Right Column - R1S Tri */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[1]?.cargoCapacity.seating}</h4>
                <p className="text-sm text-gray-600">Capacity</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[1]?.cargoCapacity.cargoVolumeSecondRow}</h4>
                <p className="text-sm text-gray-600">Cargo volume (second row folded)</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[1]?.cargoCapacity.cargoVolumeThirdRowFolded}</h4>
                <p className="text-sm text-gray-600">Cargo volume (third row folded)</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[1]?.cargoCapacity.cargoVolumeThirdRowUp}</h4>
                <p className="text-sm text-gray-600">Cargo volume (third row up)</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-1">{selectedModels[1]?.cargoCapacity.totalInteriorStorage}</h4>
                <p className="text-sm text-gray-600">Total interior storage</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}