export interface RhodiumModel {
  id: string;
  name: string;
  tagline: string;
  image: string;
  startingPrice: number;
  leasePrice: number;
  priceUnit: string;
  motorConfig: string;
  range: string;
  acceleration: string;
  horsepower: string;
  torque: string;
  towing: string;
  payload: string;
  design: {
    paint: string[];
    wheels: string[];
    interior: string[];
    accents: string[];
  };
  driveModes: string[];
  dimensions: {
    widthWithMirrors: string;
    widthMirrorsFolded: string;
    maxHeight: string;
    minHeight: string;
    length: string;
    maxGroundClearance: string;
    maxApproachAngle: string;
    maxDepartureAngle: string;
    wheelbase: string;
  };
  cargoCapacity: {
    seating: string;
    cargoVolumeSecondRow: string;
    cargoVolumeThirdRowFolded: string;
    cargoVolumeThirdRowUp: string;
    totalInteriorStorage: string;
  };
}

export const rhodiumModels: RhodiumModel[] = [
  {
    id: "r1s-quad",
    name: "R1S Quad",
    tagline: "Engineered for extremes, on-road and off.",
    image: "/images/rhodium-r1s-quad.png",
    startingPrice: 121990,
    leasePrice: 1799,
    priceUnit: "USD",
    motorConfig: "Quad-Motor AWD",
    range: "374 mi (EPA est.)",
    acceleration: "2.6 sec",
    horsepower: "1,025 hp",
    torque: "1,198 lb-ft",
    towing: "7,700 lb",
    payload: "1,724 lb",
    design: {
      paint: ["#9CA3AF", "#F3F4F6", "#374151", "#111827", "#1E40AF", "#000000", "#6B7280", "#7F1D1D"],
      wheels: ["wheel-1", "wheel-2", "wheel-3", "wheel-4"],
      interior: ["#374151", "#F3F4F6", "#92400E"],
      accents: ["#000000"]
    },
    driveModes: ["rock", "sand", "snow", "sport", "conserve", "tow", "all-purpose", "off-road"],
    dimensions: {
      widthWithMirrors: "88.4 in",
      widthMirrorsFolded: "82.0 in",
      maxHeight: "77.3 in",
      minHeight: "71.8 in",
      length: "200.8 in",
      maxGroundClearance: "14.7 in",
      maxApproachAngle: "35.8°",
      maxDepartureAngle: "34.4°",
      wheelbase: "121.1 in"
    },
    cargoCapacity: {
      seating: "7 seats",
      cargoVolumeSecondRow: "90.7 cu ft",
      cargoVolumeThirdRowFolded: "48.6 cu ft",
      cargoVolumeThirdRowUp: "17.6 cu ft",
      totalInteriorStorage: "105.8 cu ft"
    }
  },
  {
    id: "r1s-tri",
    name: "R1S Tri",
    tagline: "Elevated design for all your adventures.",
    image: "/images/rhodium-r1s-tri.png",
    startingPrice: 106990,
    leasePrice: 1299,
    priceUnit: "USD",
    motorConfig: "Tri-Motor AWD",
    range: "371 mi (EPA est.)",
    acceleration: "2.9 sec",
    horsepower: "850 hp",
    torque: "1,103 lb-ft",
    towing: "7,700 lb",
    payload: "1,702 lb",
    design: {
      paint: ["#9CA3AF", "#F3F4F6", "#374151", "#111827", "#1E40AF", "#000000", "#6B7280", "#7F1D1D"],
      wheels: ["wheel-1", "wheel-2", "wheel-3", "wheel-4", "wheel-5"],
      interior: ["#374151", "#F3F4F6", "#92400E"],
      accents: ["#000000"]
    },
    driveModes: ["rock", "sand", "snow", "sport", "conserve", "tow", "all-purpose", "off-road"],
    dimensions: {
      widthWithMirrors: "88.4 in",
      widthMirrorsFolded: "82.0 in",
      maxHeight: "77.3 in",
      minHeight: "71.8 in",
      length: "200.8 in",
      maxGroundClearance: "14.7 in",
      maxApproachAngle: "35.8°",
      maxDepartureAngle: "34.4°",
      wheelbase: "121.1 in"
    },
    cargoCapacity: {
      seating: "7 seats",
      cargoVolumeSecondRow: "90.7 cu ft",
      cargoVolumeThirdRowFolded: "48.6 cu ft",
      cargoVolumeThirdRowUp: "17.6 cu ft",
      totalInteriorStorage: "105.8 cu ft"
    }
  }
];

// Available model options for dropdowns
export const modelOptions = [
  { id: "model-y", name: "Model Y", subtitle: "Model Y Long Range RWD" },
  { id: "model-3", name: "Model 3", subtitle: "Model 3 Long Range RWD" }
];