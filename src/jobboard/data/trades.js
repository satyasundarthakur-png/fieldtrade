// Same platform idea as the appointment-core app, different underlying object.
// A trade's core unit isn't a "session" — it's a JOB: quote -> schedule -> materials -> complete -> invoice.
// Add a trade by adding an entry here.

import { Zap, Wrench, Car, Hammer, Flame, Thermometer, PaintBucket } from "lucide-react";

export const TRADES = {
  electrician: {
    label: "Electrician",
    icon: Zap,
    jobLabel: "Job",
    jobUnit: "point / circuit",
    materialCategories: ["Wiring", "Switches & sockets", "MCBs / DBs", "Conduit", "Fixtures"],
    sampleJobs: [
      { title: "Rewire — 2BHK flat", client: "R. Nair", address: "Banjara Hills" },
      { title: "DB panel upgrade", client: "Sunrise Apartments", address: "Gachibowli" },
      { title: "Ceiling fan + light points (4)", client: "A. Reddy", address: "Jubilee Hills" },
    ],
  },
  plumber: {
    label: "Plumber",
    icon: Wrench,
    jobLabel: "Job",
    jobUnit: "fixture / line",
    materialCategories: ["Pipes (CPVC/PVC)", "Fittings", "Taps & faucets", "Valves", "Sealant"],
    sampleJobs: [
      { title: "Bathroom pipeline leak repair", client: "M. Iyer", address: "Kondapur" },
      { title: "New kitchen sink install", client: "Green Valley Apts", address: "Madhapur" },
      { title: "Overhead tank line replacement", client: "S. Rao", address: "Kukatpally" },
    ],
  },
  mechanic: {
    label: "Mechanic",
    icon: Car,
    jobLabel: "Vehicle Job",
    jobUnit: "service item",
    materialCategories: ["Engine parts", "Filters & fluids", "Brakes", "Electricals", "Tyres"],
    sampleJobs: [
      { title: "Full service — Swift VDI", client: "K. Prasad", address: "Own garage" },
      { title: "Brake pad replacement", client: "D. Sharma", address: "Own garage" },
      { title: "AC gas top-up + check", client: "N. Joshi", address: "Own garage" },
    ],
  },
  carpenter: {
    label: "Carpenter",
    icon: Hammer,
    jobLabel: "Job",
    jobUnit: "piece / unit",
    materialCategories: ["Plywood/MDF", "Laminate", "Hardware", "Adhesive", "Finish/polish"],
    sampleJobs: [
      { title: "Wardrobe — 3 door", client: "P. Verma", address: "Miyapur" },
      { title: "Modular kitchen cabinets", client: "V. Singh", address: "Kompally" },
      { title: "Study table + shelving", client: "T. Kapoor", address: "Alwal" },
    ],
  },
  welder: {
    label: "Welder",
    icon: Flame,
    jobLabel: "Job",
    jobUnit: "meter / joint",
    materialCategories: ["MS/SS sheet", "Rods/electrodes", "Gas", "Grinding discs", "Paint/primer"],
    sampleJobs: [
      { title: "Gate + grill fabrication", client: "F. Khan", address: "Uppal" },
      { title: "Staircase railing repair", client: "Lakeview Society", address: "Nallagandla" },
      { title: "Shed frame welding", client: "R. Iyer", address: "Shamshabad" },
    ],
  },
  hvac: {
    label: "HVAC Tech",
    icon: Thermometer,
    jobLabel: "Job",
    jobUnit: "unit",
    materialCategories: [
      "Refrigerant",
      "Filters",
      "Copper piping",
      "Compressor parts",
      "Insulation",
    ],
    sampleJobs: [
      { title: "AC installation — 2 split units", client: "A. Bose", address: "Begumpet" },
      { title: "Annual maintenance — office", client: "TechPark Offices", address: "HITEC City" },
      { title: "Compressor replacement", client: "K. Malhotra", address: "Secunderabad" },
    ],
  },
  painter: {
    label: "Painter",
    icon: PaintBucket,
    jobLabel: "Job",
    jobUnit: "sq. ft.",
    materialCategories: ["Emulsion paint", "Primer", "Putty", "Brushes/rollers", "Masking/tape"],
    sampleJobs: [
      { title: "Full house interior — 3BHK", client: "I. Chatterjee", address: "Manikonda" },
      { title: "Exterior repaint", client: "Sunshine Villas", address: "Bachupally" },
      { title: "Office touch-up painting", client: "S. Das", address: "Ameerpet" },
    ],
  },
};

export const TRADE_ORDER = [
  "electrician",
  "plumber",
  "mechanic",
  "carpenter",
  "welder",
  "hvac",
  "painter",
];

export const STAGES = ["quoted", "scheduled", "in-progress", "invoiced"];
export const STAGE_LABEL = {
  quoted: "Quoted",
  scheduled: "Scheduled",
  "in-progress": "In Progress",
  invoiced: "Invoiced",
};
