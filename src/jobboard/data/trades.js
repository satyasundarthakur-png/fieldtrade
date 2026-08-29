// Same platform idea as the appointment-core app, different underlying object.
// A trade's core unit isn't a "session" — it's a JOB: quote -> schedule -> materials -> complete -> invoice.
// Add a trade by adding an entry here.
//
// `mindset`, `skills`, and `realTools` are drawn from actual research into what
// tradespeople in this archetype are like and what they actually use day to day —
// not invented software categories. See trade-professions-real-profile.md.
//
// `riskTags`, `commonKits`, `requiredTools`, `checklist`, and `quickReference`
// are aimed at making the app trade-native rather than a generic sales CRM:
// tradespeople price risk/complexity and follow safety protocols, not just labor hours.

import { Zap, Wrench, Car, Hammer, Flame, Thermometer, PaintBucket } from "lucide-react";

export const TRADES = {
  electrician: {
    label: "Electrician",
    icon: Zap,
    jobLabel: "Job",
    jobUnit: "point / circuit",
    materialCategories: ["Wiring", "Switches & sockets", "MCBs / DBs", "Conduit", "Fixtures"],
    commonMaterials: [
      { name: "2.5mm Wire (per meter)", unitCost: 18 },
      { name: "16A Switch", unitCost: 45 },
      { name: "MCB Box (single)", unitCost: 320 },
      { name: "Modular socket", unitCost: 85 },
      { name: "PVC conduit pipe (per meter)", unitCost: 25 },
      { name: "LED batten (4ft)", unitCost: 280 },
    ],
    commonKits: [
      {
        name: "2BHK Standard Rewire Kit",
        items: [
          { name: "1.5sqmm Wire Roll (90m)", unitCost: 1400 },
          { name: "2.5sqmm Wire Roll (90m)", unitCost: 1900 },
          { name: "16A Switch", unitCost: 45, qty: 6 },
          { name: "6A Switch", unitCost: 35, qty: 10 },
          { name: "PVC Conduit (per meter)", unitCost: 25, qty: 40 },
        ],
      },
      {
        name: "DB Panel Upgrade Kit",
        items: [
          { name: "63A Isolator", unitCost: 850 },
          { name: "4-Way TPN DB Box", unitCost: 1200 },
          { name: "MCB 6A-32A (single pole)", unitCost: 180, qty: 6 },
          { name: "Busbar", unitCost: 300 },
        ],
      },
    ],
    requiredTools: ["Multimeter", "Insulated pliers", "Wire stripper", "Neon tester"],
    laborPresets: [
      { label: "Per point", amount: 250 },
      { label: "Per circuit", amount: 600 },
      { label: "Diagnostic visit", amount: 300 },
      { label: "Hourly rate", amount: 400 },
    ],
    riskTags: [
      "Old wiring / knob-and-tube",
      "Height / ladder required",
      "Live circuit risk",
      "Concealed conduit routing",
    ],
    checklist: {
      preJob: [
        "Main supply isolated?",
        "Tester verified working?",
        "Correct breaker rating identified?",
      ],
      completion: [
        "Voltage test verified at 230V",
        "All points tested under load",
        "Panel labeled correctly",
      ],
    },
    quickReference: [
      { label: "1.5mm wire", value: "up to ~14A / lighting circuits" },
      { label: "2.5mm wire", value: "up to ~20A / socket circuits" },
      { label: "4.0mm wire", value: "up to ~25A / AC & heavy loads" },
      { label: "6.0mm wire", value: "up to ~32A / DB main feed" },
    ],
    mindset:
      "Safety is the organizing principle of everything — a mistake here can kill someone, not just cost money. That produces methodical, rule-bound caution that's earned, not rigid. Thinks in circuits and systems: cause and effect is immediate and physical.",
    skills: [
      "Wiring diagrams & load calculations",
      "Electrical code compliance",
      "Fault diagnosis",
      "Live vs. isolated circuit work",
      "Smart-home/automation basics",
    ],
    realTools: [
      { name: "Jobber / Housecall Pro", use: "Quoting, scheduling, invoicing" },
      { name: "Vyapar / Khatabook", use: "GST invoicing & bookkeeping" },
      { name: "WhatsApp Business", use: "Client comms & quote sharing" },
      { name: "Google Business Profile", use: "Local discovery" },
    ],
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
    commonMaterials: [
      { name: '0.75" PVC elbow', unitCost: 15 },
      { name: "Teflon tape", unitCost: 10 },
      { name: "CPVC pipe (per meter)", unitCost: 60 },
      { name: 'Ball valve 0.5"', unitCost: 120 },
      { name: "Basin tap", unitCost: 450 },
      { name: "Flexible connector hose", unitCost: 90 },
    ],
    commonKits: [
      {
        name: "Bathroom Fixture Install Kit",
        items: [
          { name: "Basin tap", unitCost: 450 },
          { name: "Flexible connector hose", unitCost: 90, qty: 2 },
          { name: "Teflon tape", unitCost: 10, qty: 3 },
          { name: 'Ball valve 0.5"', unitCost: 120 },
        ],
      },
      {
        name: "Leak Repair Kit",
        items: [
          { name: '0.75" PVC elbow', unitCost: 15, qty: 2 },
          { name: "CPVC pipe (per meter)", unitCost: 60, qty: 3 },
          { name: "Pipe clamp", unitCost: 40, qty: 2 },
          { name: "Solvent cement", unitCost: 90 },
        ],
      },
    ],
    requiredTools: ["Pipe wrench", "Hacksaw", "Plunger", "Pressure gauge"],
    laborPresets: [
      { label: "Per fixture", amount: 300 },
      { label: "Leak repair visit", amount: 350 },
      { label: "Diagnostic visit", amount: 250 },
      { label: "Hourly rate", amount: 400 },
    ],
    riskTags: [
      "Main line pressure issue",
      "Underground digging required",
      "Rusted fitting risk",
      "Ceiling/wall breakage needed",
    ],
    checklist: {
      preJob: [
        "Main water supply shut off?",
        "Existing fittings inspected for corrosion?",
        "Drainage access confirmed?",
      ],
      completion: [
        "Pressure test held for 15 mins",
        "No visible leaks at joints",
        "Water flow verified at fixture",
      ],
    },
    quickReference: [
      { label: '0.5" pipe', value: "basin/tap connections" },
      { label: '0.75" pipe', value: "standard supply lines" },
      { label: '1" pipe', value: "main feed lines" },
      { label: "CPVC vs PVC", value: "CPVC for hot water, PVC for cold/drainage" },
    ],
    mindset:
      "Usually called when something is already going wrong — a leak, a blockage — so there's urgency and calm-under-mess. Practical, unsentimental, comfortable in cramped and awkward spaces. Thinks several steps ahead because plumbing systems are hidden and interconnected.",
    skills: [
      "Pipe-fitting & joining",
      "Leak diagnosis",
      "Water pressure/flow systems",
      "Fixture & parts knowledge",
      "RO/water-heater systems",
    ],
    realTools: [
      { name: "Jobber / Tradify / FieldPulse", use: "Job tracking, quote to invoice" },
      { name: "Vyapar / Khatabook", use: "Bookkeeping" },
      { name: "Urban Company", use: "Client lead generation" },
      { name: "Google Maps", use: "Reaching site addresses" },
    ],
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
    commonMaterials: [
      { name: "Engine oil (per liter)", unitCost: 450 },
      { name: "Oil filter", unitCost: 220 },
      { name: "Air filter", unitCost: 350 },
      { name: "Brake pad set", unitCost: 900 },
      { name: "Spark plug", unitCost: 180 },
      { name: "Coolant (per liter)", unitCost: 300 },
    ],
    commonKits: [
      {
        name: "Standard Full Service Kit",
        items: [
          { name: "Engine oil (per liter)", unitCost: 450, qty: 4 },
          { name: "Oil filter", unitCost: 220 },
          { name: "Air filter", unitCost: 350 },
          { name: "Coolant (per liter)", unitCost: 300, qty: 2 },
        ],
      },
      {
        name: "Brake Job Kit",
        items: [
          { name: "Brake pad set", unitCost: 900 },
          { name: "Brake fluid (per liter)", unitCost: 250 },
          { name: "Brake cleaner spray", unitCost: 180 },
        ],
      },
    ],
    requiredTools: ["OBD scanner", "Socket set", "Torque wrench", "Jack & stands"],
    laborPresets: [
      { label: "Per service item", amount: 200 },
      { label: "Diagnostic check", amount: 300 },
      { label: "Full service labor", amount: 800 },
      { label: "Hourly rate", amount: 350 },
    ],
    riskTags: [
      "Engine won't start (unclear cause)",
      "Under-vehicle lift required",
      "Electrical/battery risk",
      "AC refrigerant handling",
    ],
    checklist: {
      preJob: [
        "Vehicle on stable/level ground?",
        "OBD scan run before disassembly?",
        "Customer complaint confirmed by test drive?",
      ],
      completion: [
        "Test drive completed post-repair",
        "No warning lights on dashboard",
        "Fluid levels topped & checked",
      ],
    },
    quickReference: [
      { label: "Engine oil grade", value: "check owner's manual — commonly 5W-30 / 10W-30" },
      { label: "Brake fluid", value: "DOT 3/DOT 4, replace every ~2 years" },
      { label: "Tyre pressure", value: "check door-jamb sticker, not tyre sidewall max" },
    ],
    mindset:
      "Diagnostic and systems-thinking, closer to a doctor's differential diagnosis than people expect — a symptom rarely points to one obvious cause. Comfortable with early ambiguity, wants certainty before expensive work. Builds strong brand/model pattern memory through repetition.",
    skills: [
      "Engine & drivetrain diagnostics",
      "OBD/diagnostic code reading",
      "Mechanical, electrical & hydraulic repair",
      "Growing EV-specific knowledge",
    ],
    realTools: [
      { name: "Torque / Car Scanner ELM OBD2", use: "Bluetooth OBD diagnostics" },
      { name: "YouTube", use: "Model-specific repair walkthroughs" },
      { name: "Vyapar / Khatabook", use: "Invoicing & part-cost tracking" },
      { name: "JustDial / Google Business Profile", use: "Local discovery" },
    ],
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
    commonMaterials: [
      { name: "18mm plywood (sq. ft.)", unitCost: 110 },
      { name: "Laminate sheet (sq. ft.)", unitCost: 65 },
      { name: "Cabinet hinge", unitCost: 40 },
      { name: "Drawer channel (pair)", unitCost: 180 },
      { name: "Fevicol/adhesive (kg)", unitCost: 220 },
      { name: "Edge banding (per meter)", unitCost: 12 },
    ],
    commonKits: [
      {
        name: "Wardrobe (3-door) Kit",
        items: [
          { name: "18mm plywood (sq. ft.)", unitCost: 110, qty: 40 },
          { name: "Laminate sheet (sq. ft.)", unitCost: 65, qty: 40 },
          { name: "Cabinet hinge", unitCost: 40, qty: 8 },
          { name: "Drawer channel (pair)", unitCost: 180, qty: 2 },
        ],
      },
      {
        name: "Modular Kitchen Cabinet Kit",
        items: [
          { name: "18mm plywood (sq. ft.)", unitCost: 110, qty: 60 },
          { name: "Laminate sheet (sq. ft.)", unitCost: 65, qty: 60 },
          { name: "Cabinet hinge", unitCost: 40, qty: 14 },
          { name: "Handle set", unitCost: 60, qty: 8 },
        ],
      },
    ],
    requiredTools: ["Circular saw", "Drill/driver", "Measuring tape", "Spirit level"],
    laborPresets: [
      { label: "Per piece/unit", amount: 500 },
      { label: "Site visit & measurement", amount: 200 },
      { label: "Installation labor", amount: 800 },
      { label: "Hourly rate", amount: 350 },
    ],
    riskTags: [
      "Uneven wall/floor alignment",
      "Load-bearing modification",
      "On-site cutting (dust/noise)",
      "Old furniture removal needed",
    ],
    checklist: {
      preJob: [
        "Measurements re-verified on-site?",
        "Wall/floor level checked?",
        "Client approved design/material?",
      ],
      completion: [
        "All doors/drawers open & close smoothly",
        "Edges finished, no exposed raw edges",
        "Client walkthrough & sign-off done",
      ],
    },
    quickReference: [
      { label: "18mm ply", value: "cabinets, shutters, load-bearing panels" },
      { label: "MDF", value: "smoother finish, less moisture-resistant than ply" },
      { label: "BWP grade", value: "boiling-water-proof — use in kitchens/bathrooms" },
    ],
    mindset:
      "Precision paired with material intuition — wood behaves differently by grain, moisture, and age, so a good carpenter reads the material as much as executes a plan. Patient with iterative fitting rather than expecting a perfect first cut.",
    skills: [
      "Measurement & joinery",
      "Hand & power tool handling",
      "Material selection (ply/MDF/solid wood)",
      "Modular furniture design",
    ],
    realTools: [
      { name: "SketchUp (free)", use: "Layout sketches for client approval" },
      { name: "WhatsApp Business", use: "Progress photos & sign-off" },
      { name: "Vyapar", use: "Material cost tracking & invoicing" },
      { name: "Pinterest / Houzz", use: "Shared reference with clients" },
    ],
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
    commonMaterials: [
      { name: "MS square pipe (per meter)", unitCost: 140 },
      { name: "Welding rod (per kg)", unitCost: 200 },
      { name: "Grinding disc", unitCost: 60 },
      { name: "Primer (per liter)", unitCost: 250 },
      { name: "SS sheet (sq. ft.)", unitCost: 320 },
      { name: "Hinges (heavy duty)", unitCost: 150 },
    ],
    commonKits: [
      {
        name: "Gate + Grill Fabrication Kit",
        items: [
          { name: "MS square pipe (per meter)", unitCost: 140, qty: 20 },
          { name: "Welding rod (per kg)", unitCost: 200, qty: 3 },
          { name: "Hinges (heavy duty)", unitCost: 150, qty: 2 },
          { name: "Primer (per liter)", unitCost: 250, qty: 2 },
        ],
      },
      {
        name: "Railing Repair Kit",
        items: [
          { name: "MS square pipe (per meter)", unitCost: 140, qty: 6 },
          { name: "Grinding disc", unitCost: 60, qty: 3 },
          { name: "Primer (per liter)", unitCost: 250 },
        ],
      },
    ],
    requiredTools: ["Welding machine", "Angle grinder", "Welding helmet", "Ground clamp"],
    laborPresets: [
      { label: "Per meter/joint", amount: 180 },
      { label: "Site visit", amount: 250 },
      { label: "Fabrication labor", amount: 700 },
      { label: "Hourly rate", amount: 400 },
    ],
    riskTags: [
      "Confined space welding",
      "Working at height",
      "Near flammable materials",
      "Heavy structural load-bearing",
    ],
    checklist: {
      preJob: [
        "Ventilation / fire watch verified?",
        "Ground clamp secured?",
        "Work area cleared of flammables?",
      ],
      completion: [
        "All joints visually inspected",
        "Grinding/finishing completed",
        "Primer coat applied to bare metal",
      ],
    },
    quickReference: [
      { label: "MIG welding", value: "faster, good for thin sheet metal" },
      { label: "TIG welding", value: "precise, best for SS/aluminum" },
      { label: "Arc welding", value: "durable, best for thick structural MS" },
    ],
    mindset:
      "High-consequence precision under physical strain — heat, sparks, fumes make the danger immediate and visible, producing a safety-drilled, checklist-following temperament. Weld quality is personal and craftsman-like; a bad weld is visible and a point of professional pride.",
    skills: [
      "Arc / MIG / TIG welding",
      "Fabrication drawing reading",
      "Material knowledge (MS/SS/aluminum)",
      "Structural load awareness",
    ],
    realTools: [
      { name: "WhatsApp Business", use: "Design references & measurements" },
      { name: "Vyapar / Khatabook", use: "Material + labor invoicing" },
      { name: "IndiaMART / JustDial", use: "B2B & bulk fabrication leads" },
    ],
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
    commonMaterials: [
      { name: "R32 gas refill (per kg)", unitCost: 650 },
      { name: "AC filter (standard)", unitCost: 300 },
      { name: "Copper piping (per meter)", unitCost: 380 },
      { name: "Insulation tape roll", unitCost: 80 },
      { name: "PCB board (universal)", unitCost: 1200 },
      { name: "Stabilizer (AC-rated)", unitCost: 1800 },
    ],
    commonKits: [
      {
        name: "Split AC Installation Kit",
        items: [
          { name: "Copper piping (per meter)", unitCost: 380, qty: 4 },
          { name: "Insulation tape roll", unitCost: 80, qty: 2 },
          { name: "Stabilizer (AC-rated)", unitCost: 1800 },
          { name: "Drain pipe (per meter)", unitCost: 40, qty: 4 },
        ],
      },
      {
        name: "Annual Maintenance Kit",
        items: [
          { name: "AC filter (standard)", unitCost: 300 },
          { name: "Coil cleaning spray", unitCost: 250 },
          { name: "Insulation tape roll", unitCost: 80 },
        ],
      },
    ],
    requiredTools: ["Gauge manifold", "Vacuum pump", "Refrigerant scale", "Leak detector"],
    laborPresets: [
      { label: "Per unit service", amount: 500 },
      { label: "Annual maintenance visit", amount: 400 },
      { label: "Installation labor", amount: 1200 },
      { label: "Hourly rate", amount: 400 },
    ],
    riskTags: [
      "Rooftop / high accessibility",
      "Refrigerant leak diagnostic",
      "Heavy unit lifting",
      "Electrical panel access",
    ],
    checklist: {
      preJob: [
        "Pressure checked before evacuation?",
        "Evacuation pump ready?",
        "Power isolated at unit?",
      ],
      completion: [
        "Pressure test held, no leak detected",
        "Cooling verified at vent",
        "Drain line flow confirmed",
      ],
    },
    quickReference: [
      { label: "R32", value: "newer, more efficient, lower GWP" },
      { label: "R410A", value: "common in older split units" },
      { label: "Standard charge", value: "check nameplate — do not guess by feel" },
    ],
    mindset:
      "Systematic and maintenance-minded — a large share of the work is preventive (annual servicing), so HVAC techs think in service cycles more than reactive trades do. Season-driven workload creates intense summer peaks and slower off-season stretches.",
    skills: [
      "Refrigerant handling & safety",
      "Compressor/coil diagnostics",
      "Ducting & airflow",
      "Smart/inverter AC electronics",
    ],
    realTools: [
      { name: "Jobber-style service tools", use: "Recurring maintenance contracts" },
      { name: "Urban Company", use: "Major lead-generation channel" },
      { name: "Vyapar / Khatabook", use: "Invoicing" },
      { name: "WhatsApp Business", use: "Service reminders & confirmations" },
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
    commonMaterials: [
      { name: "Emulsion paint (per liter)", unitCost: 280 },
      { name: "Primer (per liter)", unitCost: 220 },
      { name: "Wall putty (per kg)", unitCost: 35 },
      { name: "Masking tape roll", unitCost: 45 },
      { name: "Roller set", unitCost: 150 },
      { name: "Sandpaper sheet", unitCost: 15 },
    ],
    commonKits: [
      {
        name: "3BHK Interior Kit",
        items: [
          { name: "Emulsion paint (per liter)", unitCost: 280, qty: 20 },
          { name: "Primer (per liter)", unitCost: 220, qty: 10 },
          { name: "Wall putty (per kg)", unitCost: 35, qty: 40 },
          { name: "Masking tape roll", unitCost: 45, qty: 6 },
        ],
      },
      {
        name: "Touch-Up Kit",
        items: [
          { name: "Emulsion paint (per liter)", unitCost: 280, qty: 2 },
          { name: "Sandpaper sheet", unitCost: 15, qty: 5 },
          { name: "Masking tape roll", unitCost: 45 },
        ],
      },
    ],
    requiredTools: ["Rollers & brushes", "Extension pole", "Drop sheets", "Sandpaper block"],
    laborPresets: [
      { label: "Per sq. ft.", amount: 18 },
      { label: "Site visit & estimate", amount: 150 },
      { label: "Prep labor (per room)", amount: 500 },
      { label: "Hourly rate", amount: 300 },
    ],
    riskTags: [
      "Height / exterior scaffolding",
      "Damp/moisture-affected walls",
      "Furniture protection needed",
      "Strong odor / ventilation limited",
    ],
    checklist: {
      preJob: [
        "Walls cleaned & sanded?",
        "Cracks/putty work completed?",
        "Furniture/flooring covered?",
      ],
      completion: [
        "Two coats applied evenly",
        "No visible brush/roller marks",
        "Masking tape removed cleanly",
      ],
    },
    quickReference: [
      { label: "Coverage", value: "~120-140 sq. ft. per liter (single coat, smooth wall)" },
      { label: "Primer", value: "always on new/bare walls before emulsion" },
      { label: "Drying time", value: "4-6 hrs between coats (varies by humidity)" },
    ],
    mindset:
      "Patience with process and surface prep — the unglamorous prep work (sanding, puttying, masking) determines the visible finish. Estimation-minded: sq. ft. and paint-quantity calculation is a daily core skill, not an afterthought.",
    skills: [
      "Surface preparation",
      "Color & finish knowledge",
      "Quantity/coverage estimation",
      "Texture & decorative finishes",
    ],
    realTools: [
      { name: "Paint brand coverage calculators", use: "Accurate sq. ft. quoting" },
      { name: "WhatsApp Business", use: "Color samples & progress approval" },
      { name: "Vyapar", use: "Invoicing & paint-quantity cost tracking" },
      { name: "Urban Company", use: "Independent lead generation" },
    ],
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
