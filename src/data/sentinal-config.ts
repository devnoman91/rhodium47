// Sentinal vehicle configuration data extracted from the design
export const sentinalConfiguration = {
  model: 'Sentinal',
  specs: {
    range: '410mi',
    topSpeed: '130mph',
    acceleration: '3.1sec'
  },
  pricing: {
    cash: 84500,
    lease: 410,
    finance: 410
  },
  driveType: 'All-Wheel Drive',
  paint: {
    selected: 'Stealth Grey',
    options: [
      { name: 'Stealth Grey', color: '#2C2C2C', selected: true },
      { name: 'Pearl White', color: '#F8F8FF', selected: false },
      { name: 'Solid Black', color: '#000000', selected: false },
      { name: 'Midnight Silver', color: '#708090', selected: false },
      { name: 'Red Multi-Coat', color: '#DC143C', selected: false }
    ]
  },
  luxePackage: {
    title: 'Luxe Package',
    features: [
      {
        title: 'Full Self-Driving (Supervised)',
        description: 'Your car will be able to drive itself almost anywhere with minimal driver intervention.',
        icon: '/images/self-driving-icon.png'
      },
      {
        title: 'Four Year Premium Service',
        description: 'Your car will be able to drive itself almost anywhere with minimal driver intervention.',
        icon: '/images/premium-service-icon.png'
      },
      {
        title: 'Supercharging',
        description: 'Your car will be able to drive itself almost anywhere with minimal driver intervention.',
        icon: '/images/supercharging-icon.png'
      },
      {
        title: 'Premium Connectivity',
        description: 'Your car will be able to drive itself almost anywhere with minimal driver intervention.',
        icon: '/images/premium-connectivity-icon.png'
      }
    ]
  },
  wheels: {
    title: "19' Magnetite Wheels",
    options: [
      {
        name: 'All-Season Tires',
        description: 'Range 295 mi - EPA Est. - 4.03mi',
        selected: true
      },
      {
        name: 'Performance Tires',
        description: 'Range 270 mi - EPA Est. - 4.25mi',
        selected: false
      }
    ]
  },
  interior: {
    title: 'All Black Interior',
    options: [
      { name: 'All Black', selected: true },
      { name: 'Black and White', selected: false }
    ]
  },
  steeringWheel: {
    title: 'Steering Wheel',
    selected: 'Standard'
  },
  selfDriving: {
    title: 'Full Self-Driving (Supervised)',
    description: 'Your car will be able to drive itself almost anywhere with minimal driver intervention. Currently enabled features require active driver supervision and do not make the vehicle autonomous. The activation and use of these features are dependent on achieving reliability far in excess of human drivers as demonstrated by billions of miles of experience, as well as regulatory approval, which may take longer in some jurisdictions.',
    price: 8000,
    selected: false
  },
  accessories: [
    { name: 'Sunshade', price: 105 },
    { name: 'Key FOB', price: 175 },
    { name: 'All-Weather Rear Cargo Liner Set', price: 200 },
    { name: 'All-Weather Interior Liners', price: 225 }
  ],
  pricingDetails: {
    estPurchasePrice: 96630,
    orderFee: 250,
    dueToday: 250,
    nonRefundableOrderFee: true
  },
  deliveryZip: {
    placeholder: 'Enter Delivery ZIP'
  }
};