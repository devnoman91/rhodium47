export interface VehicleInventory {
  id: string;
  model: string;
  title: string;
  price: number;
  monthlyFinancing: number;
  year: number;
  mileage: string;
  location: string;
  range: string;
  image: string;
  features: {
    paint: string;
    wheels: string;
    interior: string;
    seats: number;
  };
  status: 'new' | 'pre-order';
  trim: string;
  additionalOptions: string[];
}

export const inventoryData: VehicleInventory[] = [
  {
    id: '1',
    model: 'Sentinel',
    title: 'Long Range All-Wheel Drive',
    price: 525900,
    monthlyFinancing: 405,
    year: 2021,
    mileage: '100,295 Mi',
    location: 'Fountain',
    range: '265 Mi Range (Est.)',
    image: '/images/vehicle.png',
    features: {
      paint: "Pearl 19' Wheels",
      wheels: "19' Wheels",
      interior: 'Interior 5 Seats',
      seats: 5
    },
    status: 'new',
    trim: 'Long Range',
    additionalOptions: ['Autopilot', 'Premium Interior']
  },
  {
    id: '2',
    model: 'Sentinel',
    title: 'Long Range All-Wheel Drive',
    price: 525900,
    monthlyFinancing: 405,
    year: 2021,
    mileage: '100,295 Mi',
    location: 'Fountain',
    range: '265 Mi Range (Est.)',
    image: '/images/vehicle.png',
    features: {
      paint: "Pearl 19' Wheels",
      wheels: "19' Wheels",
      interior: 'Interior 5 Seats',
      seats: 5
    },
    status: 'new',
    trim: 'Long Range',
    additionalOptions: ['Autopilot', 'Enhanced Autopilot']
  },
  {
    id: '3',
    model: 'Sentinel',
    title: 'Long Range All-Wheel Drive',
    price: 525900,
    monthlyFinancing: 405,
    year: 2021,
    mileage: '100,295 Mi',
    location: 'Fountain',
    range: '265 Mi Range (Est.)',
    image: '/images/vehicle.png',
    features: {
      paint: "Pearl 19' Wheels",
      wheels: "19' Wheels",
      interior: 'Interior 5 Seats',
      seats: 5
    },
    status: 'pre-order',
    trim: 'Long Range',
    additionalOptions: ['Premium Connectivity']
  },
  {
    id: '4',
    model: 'Guardian',
    title: 'Long Range All-Wheel Drive',
    price: 525900,
    monthlyFinancing: 405,
    year: 2021,
    mileage: '100,295 Mi',
    location: 'Fountain',
    range: '265 Mi Range (Est.)',
    image: '/images/vehicle.png',
    features: {
      paint: "Pearl 19' Wheels",
      wheels: "19' Wheels",
      interior: 'Interior 5 Seats',
      seats: 5
    },
    status: 'new',
    trim: 'Long Range',
    additionalOptions: ['Autopilot', 'Premium Interior', 'Enhanced Autopilot']
  }
];

export const filterOptions = {
  models: ['Sentinel', 'Guardian', 'Fortress', 'Phantom', 'Custom Builds'],
  paymentTypes: ['Cash', 'Lease', 'Finance'],
  priceRange: {
    min: 750,
    max: 1050
  },
  trims: ['Long Range', 'Performance', 'Standard Range'],
  mileageYears: ['2020', '2021', '2022', '2023', '2024'],
  paintOptions: ['Pearl White', 'Solid Black', 'Midnight Silver', 'Deep Blue', 'Red Multi-Coat'],
  wheelOptions: ["18' Aero Wheels", "19' Sport Wheels", "20' Performance Wheels"],
  interiorOptions: ['All Black', 'Black and White', 'Cream'],
  seatLayouts: ['5 Seats', '7 Seats'],
  additionalOptions: [
    'Autopilot',
    'Enhanced Autopilot',
    'Full Self-Driving',
    'Premium Interior',
    'Premium Connectivity',
    'Heated Seats',
    'Premium Audio'
  ]
};