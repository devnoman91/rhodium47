'use client'

import React from 'react'
import { motion } from 'framer-motion'

const VehicleDiagram: React.FC = () => {
  return (
    <div className="bg-white py-16 lg:py-24 px-28">
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="bg-black rounded-[20px] p-12 md:p-16 lg:p-24 flex justify-center items-center"
          style={{ width: 'fit-content' }}
        >
          <img
            src="/imagecar.png"
            alt="Vehicle Features Diagram"
            className="object-contain flex-shrink-0"
            style={{ width: '1200px', height: '579px' }}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default VehicleDiagram