'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
const criticalInlineStyles = `

    h2{
    font-size: 24px;
  font-style: normal;
  font-weight: 500;
    margin-bottom: 15px;
  }
  h3{
    font-size: 18px;
  font-style: normal;
  font-weight: 500;
    margin-bottom: 15px;
  }
  p {
   color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;
 margin-bottom: 6px;
  }
 #perfomance-data li,
.performance li{
display:flex;
justify-content:space-between;
gap:10px;
}
#perfomance-data h2,
.performance h2,
#perfomance-data h3,
.performance h3{
border-bottom:1px solid;
    width: fit-content;
    margin-bottom: 20px;
    margin-top: 20px;
}
`
interface ProductDescriptionSections {
  topHeading: string;
  performanceData: string;
}

interface ComparisonProduct {
  id: string
  handle: string
  title: string
  image: string
  price: number
  leasePrice?: number
  tagline?: string
  descriptionHtml?: string
  specs: {
    motorConfig?: string
    range?: string
    acceleration?: string
    horsepower?: string
    torque?: string
    towing?: string
    payload?: string
  }
  design?: {
    paint?: string[]
    wheels?: number
    interior?: string[]
    accents?: string[]
  }
  dimensions?: {
    [key: string]: string
  }
  cargoCapacity?: {
    [key: string]: string
  }
  driveModes?: string[]
  parsedDescription?: ProductDescriptionSections
}

interface CompareClientProps {
  products: ComparisonProduct[]
}

export default function CompareClient({ products }: CompareClientProps) {
  const searchParams = useSearchParams()
  // Filter out products with "Due Today" in title
  const [allProducts] = useState<ComparisonProduct[]>(
    products.filter(product => !product.title.toLowerCase().includes('due today'))
  )
  const [selectedProducts, setSelectedProducts] = useState<ComparisonProduct[]>([])
  const [showProductSelector, setShowProductSelector] = useState(false)
  const [showMore, setShowMore] = useState(false);

  // Parse description HTML for each product
  const parseDescriptionHtml = (html: string): ProductDescriptionSections => {
    let topHeading = '';
    let performanceData = '';

    // Extract content from <div id="top-heading">...</div> (with nested divs)
    const topHeadingStart = html.indexOf('<div id="top-heading">');
    if (topHeadingStart !== -1) {
      const searchStart = topHeadingStart + '<div id="top-heading">'.length;
      let depth = 1;
      let pos = searchStart;

      while (pos < html.length && depth > 0) {
        const nextOpen = html.indexOf('<div', pos);
        const nextClose = html.indexOf('</div>', pos);

        if (nextClose === -1) break;

        if (nextOpen !== -1 && nextOpen < nextClose) {
          depth++;
          pos = nextOpen + 4;
        } else {
          depth--;
          if (depth === 0) {
            topHeading = html.substring(searchStart, nextClose);
            break;
          }
          pos = nextClose + 6;
        }
      }
    }

    // Extract content from <div id="perfomance-data">...</div> (with nested elements)
    const perfomanceStart = html.indexOf('<div id="perfomance-data">');
    if (perfomanceStart !== -1) {
      const searchStart = perfomanceStart + '<div id="perfomance-data">'.length;
      let depth = 1;
      let pos = searchStart;

      while (pos < html.length && depth > 0) {
        const nextOpen = html.indexOf('<div', pos);
        const nextClose = html.indexOf('</div>', pos);

        if (nextClose === -1) break;

        if (nextOpen !== -1 && nextOpen < nextClose) {
          depth++;
          pos = nextOpen + 4;
        } else {
          depth--;
          if (depth === 0) {
            performanceData = html.substring(searchStart, nextClose);
            break;
          }
          pos = nextClose + 6;
        }
      }
    }

    return {
      topHeading,
      performanceData
    };
  };

  // Initialize selected products from URL or defaults
  useEffect(() => {
    const productHandles = searchParams?.get('products')?.split(',') ?? []
    if (productHandles.length > 0) {
      const selected = allProducts.map(p => ({
        ...p,
        parsedDescription: p.descriptionHtml ? parseDescriptionHtml(p.descriptionHtml) : undefined
      })).filter(p =>
        productHandles.includes(p.handle)
      ).slice(0, 3)
      setSelectedProducts(selected.length > 0 ? selected : allProducts.slice(0, 2).map(p => ({
        ...p,
        parsedDescription: p.descriptionHtml ? parseDescriptionHtml(p.descriptionHtml) : undefined
      })))
    } else {
      setSelectedProducts(allProducts.slice(0, 2).map(p => ({
        ...p,
        parsedDescription: p.descriptionHtml ? parseDescriptionHtml(p.descriptionHtml) : undefined
      })))
    }
  }, [searchParams, allProducts])

  // Update URL when products change
  useEffect(() => {
    if (selectedProducts.length > 0) {
      const handles = selectedProducts.map(p => p.handle).join(',')
      const newUrl = `/compare?products=${handles}`
      window.history.replaceState({}, '', newUrl)
    }
  }, [selectedProducts])

  const handleProductChange = (index: number, handle: string) => {
    const newProduct = allProducts.find(p => p.handle === handle)
    if (newProduct) {
      const newSelected = [...selectedProducts]
      newSelected[index] = {
        ...newProduct,
        parsedDescription: newProduct.descriptionHtml ? parseDescriptionHtml(newProduct.descriptionHtml) : undefined
      }
      setSelectedProducts(newSelected)
    }
  }

  const toggleProductSelector = () => {
    setShowProductSelector(!showProductSelector)
  }

  const addProductFromList = (product: ComparisonProduct) => {
    if (selectedProducts.length < 3 && !selectedProducts.find(sp => sp.id === product.id)) {
      const updatedProduct = {
        ...product,
        parsedDescription: product.descriptionHtml ? parseDescriptionHtml(product.descriptionHtml) : undefined
      };
      setSelectedProducts([...selectedProducts, updatedProduct])
      setShowProductSelector(false)
    }
  }

  const getAvailableProducts = () => {
    return allProducts.filter(p => !selectedProducts.find(sp => sp.id === p.id))
  }

  const removeProduct = (index: number) => {
    if (selectedProducts.length > 2) {
      const newSelected = selectedProducts.filter((_, i) => i !== index)
      setSelectedProducts(newSelected)
    }
  }

  if (selectedProducts.length === 0) {
    return <div className="min-h-screen bg-[#F4F1F2] flex items-center justify-center">
      <p className="text-black text-[20px] font-helvetica">Loading comparison...</p>
    </div>
  }

  return (
   
    <div className="max-w-[1336px] mx-auto px-[20px] pb-[30px]">
       <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
      {/* Model Cards Section */}
      <div className={`grid grid-cols-1 ${selectedProducts.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-3'} gap-[32px] mb-[70px]`}>
        {selectedProducts.map((product, index) => (
          <motion.div
            key={`${product.id}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg overflow-hidden relative"
          >
            {/* Remove button for 3rd product */}
            {selectedProducts.length > 2 && index === selectedProducts.length - 1 && (
              <button
                onClick={() => removeProduct(index)}
                className="absolute top-2 right-2 z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition-colors"
                title="Remove"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4L12 12" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            )}

            {/* Model Dropdown */}
            <div className="bg-white py-2 rounded-[4px] max-w-[370px]">
              <div className="relative">
                <select
                  value={product.handle}
                  onChange={(e) => handleProductChange(index, e.target.value)}
                  className="w-full appearance-none bg-transparent border-none text-black font-medium text-[15px] md:text-[18px] leading-[160%] md:pl-[21px] pr-[30px] pl-[10px]  capitalize font-helvetica focus:outline-none cursor-pointer "
                >
                  {allProducts.map((p) => (
                    <option key={p.id} value={p.handle}>
                      {p.title}
                    </option>
                  ))}
                </select>
                <div className="absolute right-[15px] top-[6px]  pointer-events-none">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <p className="text-black md:pl-[21px] pr-[30px] pl-[10px] font-normal text-[11px] md:text-[13px] leading-[160%] capitalize font-helvetica">
                {product.tagline || 'Premium Armored Vehicle'}
              </p>
            </div>

            {/* Vehicle Image */}
            <div className="mt-[14px] md:mb-[45px] mb-[15px]">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-[257px] object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/vehicle.png'
                }}
              />
            </div>

            {/* Model Info */}
            <div>
              <h3 className="text-black font-normal text-[23.063px] leading-[24px] tracking-[-0.48px] font-helvetica mb-[12px]">
                {product.title}
              </h3>
              <p className="text-black font-normal text-[16px] leading-[18px] tracking-[-0.48px] font-helvetica mb-[5px]">
                {product.tagline}
              </p>
              {/* <p className="text-black font-normal text-[16px] leading-[18px] tracking-[-0.48px] font-helvetica mb-[20px]">
                Starts from ${product.price.toLocaleString()}<sup>1</sup>
                {product.leasePrice && ` • Est. lease ${product.leasePrice.toLocaleString()}/mo`}
              </p> */}

              {/* Action Buttons */}
              <div className="flex gap-2 flex-wrap">
                {/* Build Button (black → white hover) */}
                      <Link href={`/inventory/${product.handle}`}
                    className="relative overflow-hidden flex justify-center items-center 
                              text-white cursor-pointer min-w-[112px] w-fit rounded-full text-center font-normal text-[14px]
                              py-[11px] px-[20px] leading-[16px] tracking-[-0.14px] font-helvetica !bg-[#560100] 
                              border border-transparent group focus:outline-none transition-all"
                  >
                    {/* sliding overlay */}
                    <span
                      className="absolute inset-0 bg-white  translate-x-full
                                transition-transform duration-500 ease-in-out rounded-full
                                group-hover:translate-x-0"
                    />
                    {/* text */}
                    <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-black">
                      Build
                    </span>
                  </Link>

                  {/* Inventory Button (white → black hover) */}
                  <Link
                    href={'/inventory'}
                    className="relative overflow-hidden flex justify-center items-center 
                              cursor-pointer border border-[#000] text-black max-w-[136px] w-full rounded-full text-center 
                              font-normal text-[14px] py-[11px] px-[20px] leading-[16px] tracking-[-0.14px] font-helvetica 
                              group focus:outline-none transition-all"
                  >
                    {/* sliding overlay */}
                    <span
                      className="absolute inset-0 !bg-[#560100] translate-x-full
                                transition-transform duration-500 ease-in-out rounded-full
                                group-hover:translate-x-0"
                    />
                    {/* text */}
                    <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-white">
                      Inventory
                    </span>
                  </Link>

                  {/* Learn More Button (white → black hover) */}
                  <Link
                    href={`/product-detail/${product.handle}`}
                    className="relative overflow-hidden flex justify-center items-center 
                              cursor-pointer border border-[#000] text-black max-w-[136px] w-full rounded-full text-center 
                              font-normal text-[14px] py-[11px] px-[20px] leading-[16px] tracking-[-0.14px] font-helvetica 
                              group focus:outline-none transition-all"
                  >
                    {/* sliding overlay */}
                    <span
                      className="absolute inset-0 !bg-[#560100] translate-x-full
                                transition-transform duration-500 ease-in-out rounded-full
                                group-hover:translate-x-0"
                    />
                    {/* text */}
                    <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-white">
                      Learn More
                    </span>
                  </Link>

              </div>
            </div>
          </motion.div>
        ))}

        {/* Add Model Card */}
        {selectedProducts.length < 3 && (
          <div className="flex items-start justify-start rounded-lg pt-[20px] relative">
            <button
              onClick={toggleProductSelector}
              disabled={allProducts.length <= selectedProducts.length}
              className="text-black font-extrabold text-[14px] leading-[15.4px] cursor-pointer tracking-[-0.28px] underline underline-offset-auto font-helvetica disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + Add Model
            </button>

            {/* Product Selector Dropdown */}
            {showProductSelector && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40 bg-black bg-opacity-20"
                  onClick={() => setShowProductSelector(false)}>

                {/* Dropdown */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-0 bottom-[-12%] m-auto h-fit right-0 left-0 z-50 bg-white rounded-lg shadow-2xl border border-gray-200 w-[350px] max-h-[500px] overflow-y-auto"
                  style={{ minWidth: '350px' }}
                >
                  <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-black font-helvetica text-[18px] font-semibold">
                          Select a Model to Compare
                        </h3>
                        <p className="text-gray-600 text-[12px] mt-1">
                          {getAvailableProducts().length} models available
                        </p>
                      </div>
                      <button
                        onClick={() => setShowProductSelector(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="p-2">
                    {getAvailableProducts().length === 0 ? (
                      <div className="text-center py-8 text-gray-500 font-helvetica text-[14px]">
                        No more models available
                      </div>
                    ) : (
                      getAvailableProducts().map((product) => (
                        <button
                          key={product.id}
                          onClick={(e) => {
                            e.stopPropagation()
                            addProductFromList(product)
                          }}
                          className="w-full hover:bg-gray-50 rounded-lg p-3 transition-colors flex items-center gap-3 mb-2 group border border-transparent hover:border-gray-200"
                        >
                          <div className="w-[80px] h-[60px] flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/vehicle.png'
                              }}
                            />
                          </div>

                          <div className="flex-1 text-left">
                            <h4 className="text-black font-helvetica text-[14px] font-semibold mb-1 group-hover:text-gray-700">
                              {product.title}
                            </h4>
                            <p className="text-gray-600 text-[12px] font-helvetica line-clamp-1">
                              {product.tagline || 'Premium Armored Vehicle'}
                            </p>
                            <p className="text-black text-[13px] font-helvetica font-medium mt-1">
                              From ${product.price.toLocaleString()}
                            </p>
                          </div>

                          <div className="flex-shrink-0 text-gray-400 group-hover:text-black transition-colors">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </motion.div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* At a glance Section */}
      {selectedProducts.length > 0 && (
        <ComparisonSection title="At a glance" hasSuper>
          <div className={`md:pl-5 grid grid-cols-1 md:grid-cols-${selectedProducts.length} gap-16 mt-[30px]`}>
            {selectedProducts.map((product, index) => (
              <div key={index} className="space-y-6">
                {product.specs.motorConfig && (
                  <ComparisonRow
                    label="Motor Configuration"
                    value={product.specs.motorConfig}
                  />
                )}
                {product.specs.range && (
                  <ComparisonRow
                    label="Max Range"
                    value={product.specs.range}
                  />
                )}
                {product.specs.acceleration && (
                  <ComparisonRow
                    label="0-60 mph"
                    value={product.specs.acceleration}
                  />
                )}
                {product.specs.horsepower && (
                  <ComparisonRow
                    label="Horsepower"
                    value={product.specs.horsepower}
                  />
                )}
              </div>
            ))}
          </div>
        </ComparisonSection>
      )}

      {/* Performance Section - Render parsed description content */}
      {selectedProducts.length > 0 && selectedProducts.some(p => p.parsedDescription?.performanceData) && (
        <ComparisonSection title="Performance" hasSuper>
          <div className={`md:pl-5 grid grid-cols-1 md:grid-cols-${selectedProducts.length} gap-16 mt-[30px]`}>
            {selectedProducts.map((product, index) => (
              <div 
                key={index} 
                className="space-y-6 performance"
                dangerouslySetInnerHTML={{ __html: product.parsedDescription?.performanceData || '' }}
              />
            ))}
          </div>
        </ComparisonSection>
      )}
      
      {/* See More Toggle - ye yahan add karein */}
      <div className="md:pl-5 my-5">
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-black font-medium text-[24px] underline"
        >
          {showMore ? 'See Less -' : 'See More +'}
        </button>
      </div>

      
{showMore && (
  <>
      {/* Top Specifications Section - Render parsed top heading content */}
      {selectedProducts.length > 0 && selectedProducts.some(p => p.parsedDescription?.topHeading) && (
        <ComparisonSection title="Top Specifications ">
          <div className={`md:pl-5 pb-[50px] grid grid-cols-1 md:grid-cols-${selectedProducts.length} gap-16 mt-[30px]`}>
            {selectedProducts.map((product, index) => (
              <div 
                key={index} 
                className="space-y-6"
                dangerouslySetInnerHTML={{ __html: product.parsedDescription?.topHeading || '' }}
              />
            ))}
          </div>
        </ComparisonSection>
      )}

      {/* Dimensions Section */}
      {selectedProducts.length > 0 && selectedProducts.some(p => p.dimensions && Object.keys(p.dimensions).length > 0) && (
        <ComparisonSection title="Dimensions">
          <div className={`md:pl-5 grid grid-cols-1 md:grid-cols-${selectedProducts.length} gap-16 mt-[30px]`}>
            {selectedProducts.map((product, index) => (
              <div key={index} className="space-y-6">
                {product.dimensions && Object.entries(product.dimensions).map(([key, value]) => (
                  <ComparisonRow
                    key={key}
                    label={formatLabel(key)}
                    value={value}
                  />
                ))}
              </div>
            ))}
          </div>
        </ComparisonSection>
      )}
      </>
    )}
    </div>
  )
}

// Helper Components
interface ComparisonSectionProps {
  title: string
  hasSuper?: boolean
  children: React.ReactNode
}

function ComparisonSection({ title, hasSuper, children }: ComparisonSectionProps) {
  return (
    <div className="mt-[40px] rounded-lg max-w-[877px] ">
      <h2 className="pl-5 text-black font-normal text-[35.156px] leading-[36px] tracking-[-0.72px] font-helvetica pb-[15px] border-b border-[#D1D1D1] max-w-[877px]">
        {title} {hasSuper && <sup className="text-lg">2</sup>}
      </h2>
      {children}
    </div>
  )
}

interface ComparisonRowProps {
  label: string
  value: string
}

function ComparisonRow({ label, value }: ComparisonRowProps) {
  return (
    <div>
      <h4 className="text-black font-normal text-[19.375px] leading-[22px] tracking-[-0.2px] font-helvetica">
        {value}
      </h4>
      <p className="text-black font-normal text-[15.5px] leading-[24px] tracking-[-0.16px] font-helvetica">
        {label}
      </p>
    </div>
  )
}

function formatLabel(key: string): string {
  // Convert camelCase to Title Case with spaces
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim()
}


