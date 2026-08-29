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

import {
  Zap,
  Wrench,
  Car,
  Hammer,
  Flame,
  Thermometer,
  PaintBucket,
  Layers,
  Scissors,
  Sprout,
  KeyRound,
  Cog,
  Bug,
  Home,
  Video,
} from "lucide-react";

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
    subdivisions: [
      {
        category: "Distribution & Panels",
        items: ["DB Panel Upgrade", "3-Phase Load Balancing", "Main Isolator Replacement"],
      },
      {
        category: "Wiring & Points",
        items: ["Full Conduit Rewiring", "Inverter Hookup", "Light & Power Point Installation"],
      },
      {
        category: "Diagnostics & Testing",
        items: ["Short Circuit Tracing", "Earth Leakage Diagnostic", "Voltage Drop Analysis"],
      },
    ],
    skillGroups: [
      {
        category: "Execution & Wiring",
        skills: ["Conduit routing", "DB panel dressing", "Inverter setup", "Short-circuit repair"],
      },
    ],
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
    subdivisions: [
      {
        category: "Concealed Lines",
        items: [
          "Hydrostatic Pressure Testing",
          "Leak Location & Patching",
          "Drain Line Unclogging",
        ],
      },
      {
        category: "Fixtures & Valves",
        items: ["CPVC/PPR Pipe Fitting", "Pressure Pump Installation", "Sanitaryware Mounting"],
      },
    ],
    skillGroups: [
      {
        category: "Diagnostics & Testing",
        skills: ["Hydrostatic pressure testing", "Concealed leak detection", "Pipe sizing"],
      },
      {
        category: "Execution & Fitting",
        skills: ["Sanitary slope alignment", "Thread sealing", "Fixture installation"],
      },
    ],
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
    subdivisions: [
      {
        category: "Engine & Drivetrain",
        items: ["Full Service", "Timing Belt Replacement", "Engine Diagnostic Check"],
      },
      {
        category: "Brakes & Suspension",
        items: ["Brake Pad Replacement", "Suspension Overhaul", "Wheel Alignment"],
      },
      {
        category: "Electrical & AC",
        items: ["Battery/Alternator Check", "AC Gas Refill", "Wiring Fault Diagnosis"],
      },
    ],
    skillGroups: [
      {
        category: "Diagnostics",
        skills: ["OBD-II scanning", "Compression test", "Brake thickness inspection"],
      },
      {
        category: "Repair & Fitment",
        skills: ["Brake pad replacement", "Suspension overhaul", "Timing belt alignment"],
      },
    ],
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
    subdivisions: [
      {
        category: "Storage & Modular",
        items: ["Wardrobe (3-door)", "Modular Kitchen Cabinets", "Shoe/Storage Unit"],
      },
      {
        category: "Furniture & Fixtures",
        items: ["Study Table + Shelving", "TV Unit", "Bed with Storage"],
      },
      {
        category: "Repair & Fit",
        items: ["Hinge/Drawer Repair", "Door Alignment Fix", "Laminate Re-pressing"],
      },
    ],
    skillGroups: [
      {
        category: "Precision & Prep",
        skills: ["Wood moisture verification", "Surface levelling", "Material yield optimization"],
      },
      {
        category: "Joinery & Assembly",
        skills: ["Carcass joinery", "Hardware/hinge alignment", "Laminate pressing"],
      },
    ],
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
    subdivisions: [
      {
        category: "Structural & Frames",
        items: ["Shed Frame Welding", "Heavy I-Beam Fabrication", "Truss Assembly"],
      },
      {
        category: "Architectural & Ornamental",
        items: ["Staircase Railing", "Gate + Grill Fabrication", "Window Grille Fitment"],
      },
      {
        category: "Repair & Reinforcement",
        items: ["Hinge & Latch Patching", "Cracked Joint Welding", "Rust Cut-Out & Plate Weld"],
      },
    ],
    skillGroups: [
      {
        category: "Weld Execution",
        skills: ["Weld penetration control (MIG/TIG/Stick)", "Joint preparation/beveling"],
      },
      {
        category: "Structural & Finish",
        skills: ["Structural load alignment", "Grinding finishing", "Distortion control"],
      },
    ],
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
    subdivisions: [
      {
        category: "Installation",
        items: ["Split AC Installation", "Ducting Setup", "Multi-Unit Commercial Install"],
      },
      {
        category: "Service & Maintenance",
        items: ["Annual Maintenance", "Gas Refill & Leak Check", "Filter/Coil Cleaning"],
      },
      {
        category: "Repair",
        items: ["Compressor Replacement", "PCB/Electronics Fault", "No-Cooling Diagnostic"],
      },
    ],
    skillGroups: [
      {
        category: "Diagnostics",
        skills: ["Refrigerant leak isolation", "Compressor amp draw analysis", "Airflow balancing"],
      },
      {
        category: "Service & Install",
        skills: ["Vacuum pump evacuation", "Coil cleaning", "Ducting fitment"],
      },
    ],
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
    subdivisions: [
      {
        category: "Interior",
        items: ["Full House Interior", "Single Room Repaint", "Ceiling/Texture Work"],
      },
      {
        category: "Exterior",
        items: ["Full Exterior Repaint", "Waterproof Coating", "Boundary Wall Painting"],
      },
      {
        category: "Touch-Up & Repair",
        items: ["Damp Patch Repair", "Office Touch-Up", "Crack Filling & Repaint"],
      },
    ],
    skillGroups: [
      {
        category: "Surface Prep",
        skills: ["Wall dampness testing", "Putty/primer surface prep"],
      },
      {
        category: "Application & Finish",
        skills: ["Spray/roller coverage optimization", "Color matching", "Texture finishing"],
      },
    ],
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
  mason: {
    label: "Mason",
    icon: Layers,
    jobLabel: "Job",
    jobUnit: "sq. ft. / cu. ft.",
    materialCategories: ["Cement", "Bricks/blocks", "Sand", "Aggregate", "Steel/rebar"],
    commonMaterials: [
      { name: "Cement bag (50kg)", unitCost: 420 },
      { name: "Red bricks (per 1000)", unitCost: 7500 },
      { name: "River sand (per cu. ft.)", unitCost: 55 },
      { name: "Aggregate/jelly (per cu. ft.)", unitCost: 60 },
      { name: "TMT rebar (per kg)", unitCost: 68 },
      { name: "Waterproofing compound (per kg)", unitCost: 90 },
    ],
    commonKits: [
      {
        name: "Boundary Wall Kit",
        items: [
          { name: "Cement bag (50kg)", unitCost: 420, qty: 15 },
          { name: "Red bricks (per 1000)", unitCost: 7500, qty: 2 },
          { name: "River sand (per cu. ft.)", unitCost: 55, qty: 40 },
          { name: "TMT rebar (per kg)", unitCost: 68, qty: 30 },
        ],
      },
      {
        name: "Plastering Kit",
        items: [
          { name: "Cement bag (50kg)", unitCost: 420, qty: 6 },
          { name: "River sand (per cu. ft.)", unitCost: 55, qty: 20 },
        ],
      },
    ],
    requiredTools: ["Trowel", "Spirit level", "Plumb bob", "Mixing tub"],
    laborPresets: [
      { label: "Per sq. ft.", amount: 45 },
      { label: "Site visit & estimate", amount: 200 },
      { label: "Foundation labor (per day)", amount: 900 },
      { label: "Hourly rate", amount: 300 },
    ],
    riskTags: [
      "Foundation/structural work",
      "Working at height",
      "Wet weather delay risk",
      "Heavy material handling",
    ],
    checklist: {
      preJob: [
        "Site marked & leveled?",
        "Material delivery confirmed?",
        "Foundation depth checked?",
      ],
      completion: [
        "Wall/surface plumb verified",
        "Curing schedule communicated to client",
        "Debris cleared from site",
      ],
    },
    quickReference: [
      { label: "Cement:sand ratio", value: "1:6 for plastering, 1:4 for brickwork" },
      { label: "Curing time", value: "minimum 7 days, ideally 14" },
      { label: "Brick wall (9 inch)", value: "load-bearing; 4.5 inch is partition-only" },
    ],
    mindset:
      "Physical precision at scale — masonry work is slow to undo once cement sets, so a mason double-checks level and alignment before committing. Comfortable with heavy labor and outdoor conditions; weather-aware since rain affects curing and site work directly.",
    subdivisions: [
      {
        category: "Structural",
        items: ["Foundation Laying", "Boundary Wall Construction", "RCC Column/Beam Work"],
      },
      {
        category: "Finishing",
        items: ["Wall Plastering", "Tile/Flooring Base Prep", "Waterproofing"],
      },
      {
        category: "Repair",
        items: ["Crack Repair", "Damp Wall Treatment", "Plaster Patch-Up"],
      },
    ],
    skillGroups: [
      {
        category: "Structural Work",
        skills: ["Foundation laying", "Brick/block laying", "RCC work"],
      },
      {
        category: "Finishing",
        skills: ["Plastering", "Waterproofing", "Leveling & alignment"],
      },
    ],
    skills: [
      "Bricklaying & block work",
      "Plastering & finishing",
      "Reading structural drawings",
      "Concrete mixing ratios",
    ],
    realTools: [
      { name: "Vyapar / Khatabook", use: "Material cost tracking & invoicing" },
      { name: "WhatsApp Business", use: "Progress photos & client updates" },
      { name: "IndiaMART / JustDial", use: "Material supplier sourcing" },
    ],
    sampleJobs: [
      { title: "Boundary wall construction", client: "R. Naidu", address: "Miyapur" },
      { title: "Bathroom waterproofing", client: "S. Kumar", address: "Kompally" },
      { title: "Plastering — 2BHK", client: "Green Meadows Apts", address: "Nizampet" },
    ],
  },
  tailor: {
    label: "Tailor",
    icon: Scissors,
    jobLabel: "Order",
    jobUnit: "piece / garment",
    materialCategories: ["Fabric", "Lining", "Thread", "Buttons/zippers", "Interfacing"],
    commonMaterials: [
      { name: "Cotton fabric (per meter)", unitCost: 180 },
      { name: "Lining fabric (per meter)", unitCost: 90 },
      { name: "Thread spool", unitCost: 25 },
      { name: "Zipper (standard)", unitCost: 30 },
      { name: "Buttons (set of 6)", unitCost: 40 },
      { name: "Interfacing (per meter)", unitCost: 60 },
    ],
    commonKits: [
      {
        name: "Blouse Stitching Kit",
        items: [
          { name: "Lining fabric (per meter)", unitCost: 90, qty: 1 },
          { name: "Thread spool", unitCost: 25, qty: 2 },
          { name: "Hooks & eyes (set)", unitCost: 20 },
        ],
      },
      {
        name: "Alteration Kit",
        items: [
          { name: "Thread spool", unitCost: 25 },
          { name: "Zipper (standard)", unitCost: 30 },
        ],
      },
    ],
    requiredTools: ["Sewing machine", "Measuring tape", "Fabric scissors", "Iron"],
    laborPresets: [
      { label: "Per garment", amount: 350 },
      { label: "Alteration", amount: 150 },
      { label: "Trial fitting visit", amount: 100 },
      { label: "Rush order surcharge", amount: 200 },
    ],
    riskTags: [
      "Custom fit — multiple trials needed",
      "Delicate/expensive fabric",
      "Tight delivery deadline",
      "Embroidery/embellishment work",
    ],
    checklist: {
      preJob: [
        "Measurements taken & confirmed?",
        "Fabric quantity sufficient?",
        "Design/style confirmed with client?",
      ],
      completion: [
        "Trial fitting done",
        "All seams & finishing checked",
        "Final press/ironing complete",
      ],
    },
    quickReference: [
      { label: "Blouse fabric", value: "~1 meter + 0.5m lining, standard size" },
      { label: "Shirt fabric", value: "~2.25 meters for standard size" },
      { label: "Alteration turnaround", value: "same-day possible for simple hem/take-in" },
    ],
    mindset:
      "Precision with a human body as the constraint — unlike carpentry, the material (fabric) and the fit target (a person) both vary, so a tailor holds two moving references at once. Values repeat customers and reputation for fit; word-of-mouth is the whole business model.",
    subdivisions: [
      {
        category: "New Stitching",
        items: ["Blouse Stitching", "Shirt/Kurta Stitching", "Suit/Blazer Tailoring"],
      },
      {
        category: "Alterations",
        items: ["Hemming & Resizing", "Zip/Button Replacement", "Fit Adjustment"],
      },
      {
        category: "Custom Work",
        items: ["Embroidery Addition", "Bridal/Occasion Wear", "Uniform Batch Order"],
      },
    ],
    skillGroups: [
      {
        category: "Construction",
        skills: ["Pattern making", "Cutting", "Machine stitching"],
      },
      {
        category: "Fit & Finish",
        skills: ["Fitting adjustment", "Hand-finishing", "Pressing"],
      },
    ],
    skills: [
      "Pattern drafting & cutting",
      "Machine & hand stitching",
      "Fit adjustment",
      "Fabric behavior knowledge",
    ],
    realTools: [
      { name: "WhatsApp Business", use: "Measurements, design refs, fitting photos" },
      { name: "Vyapar", use: "Order tracking & invoicing" },
      { name: "Pinterest / Instagram", use: "Design reference sharing with clients" },
    ],
    sampleJobs: [
      { title: "Bridal blouse — hand embroidery", client: "N. Reddy", address: "Own shop" },
      { title: "School uniform batch (30 pcs)", client: "St. Mary's School", address: "Own shop" },
      { title: "Suit alteration", client: "A. Sharma", address: "Own shop" },
    ],
  },
  gardener: {
    label: "Gardener",
    icon: Sprout,
    jobLabel: "Job",
    jobUnit: "sq. ft. / visit",
    materialCategories: [
      "Soil/manure",
      "Plants/saplings",
      "Fertilizer",
      "Mulch",
      "Irrigation parts",
    ],
    commonMaterials: [
      { name: "Organic manure (per bag)", unitCost: 150 },
      { name: "Potting soil mix (per bag)", unitCost: 120 },
      { name: "NPK fertilizer (per kg)", unitCost: 80 },
      { name: "Flowering saplings (each)", unitCost: 60 },
      { name: "Drip irrigation line (per meter)", unitCost: 25 },
      { name: "Mulch (per bag)", unitCost: 100 },
    ],
    commonKits: [
      {
        name: "Garden Setup Kit",
        items: [
          { name: "Potting soil mix (per bag)", unitCost: 120, qty: 10 },
          { name: "Organic manure (per bag)", unitCost: 150, qty: 5 },
          { name: "Flowering saplings (each)", unitCost: 60, qty: 15 },
        ],
      },
      {
        name: "Monthly Maintenance Kit",
        items: [
          { name: "NPK fertilizer (per kg)", unitCost: 80, qty: 2 },
          { name: "Organic manure (per bag)", unitCost: 150, qty: 2 },
        ],
      },
    ],
    requiredTools: ["Pruning shears", "Spade/trowel", "Hose/watering can", "Lawn mower"],
    laborPresets: [
      { label: "Per visit (maintenance)", amount: 400 },
      { label: "Garden setup (per sq. ft.)", amount: 25 },
      { label: "Lawn mowing", amount: 300 },
      { label: "Monthly contract", amount: 1500 },
    ],
    riskTags: [
      "Pest/disease infestation",
      "Large tree pruning (height)",
      "Water access limited",
      "Seasonal planting window",
    ],
    checklist: {
      preJob: [
        "Soil condition checked?",
        "Sunlight/shade pattern assessed?",
        "Client's plant preferences confirmed?",
      ],
      completion: [
        "All plants watered post-install",
        "Debris/trimmings cleared",
        "Care instructions given to client",
      ],
    },
    quickReference: [
      {
        label: "Watering frequency",
        value: "most potted plants: every 2-3 days, adjust for season",
      },
      { label: "Fertilizing", value: "every 4-6 weeks during growing season" },
      { label: "Best planting time", value: "monsoon/early winter for most Indian ornamentals" },
    ],
    mindset:
      "Patient and seasonal-cycle-aware — unlike most trades, results aren't immediate; a gardener plans around growth time and weather rather than same-day completion. Genuine care for living things shows up as a real point of pride distinct from purely mechanical trades.",
    subdivisions: [
      {
        category: "Setup",
        items: ["New Garden Landscaping", "Balcony/Terrace Garden Setup", "Lawn Installation"],
      },
      {
        category: "Maintenance",
        items: ["Monthly Garden Maintenance", "Lawn Mowing", "Pruning & Trimming"],
      },
      {
        category: "Specialized",
        items: ["Pest/Disease Treatment", "Irrigation System Setup", "Vertical Garden Install"],
      },
    ],
    skillGroups: [
      {
        category: "Planting & Setup",
        skills: ["Soil preparation", "Plant selection", "Irrigation layout"],
      },
      {
        category: "Maintenance",
        skills: ["Pruning", "Pest identification", "Fertilizing schedule"],
      },
    ],
    skills: [
      "Plant & soil knowledge",
      "Seasonal planting timing",
      "Pruning technique",
      "Basic irrigation setup",
    ],
    realTools: [
      { name: "WhatsApp Business", use: "Before/after photos, care reminders" },
      { name: "Urban Company", use: "Client lead generation" },
      { name: "Vyapar", use: "Monthly contract invoicing" },
    ],
    sampleJobs: [
      { title: "Terrace garden setup", client: "K. Rao", address: "Kondapur" },
      {
        title: "Monthly maintenance — society lawn",
        client: "Palm Meadows",
        address: "Gachibowli",
      },
      { title: "Pest treatment — rose plants", client: "M. Devi", address: "Miyapur" },
    ],
  },
  locksmith: {
    label: "Locksmith",
    icon: KeyRound,
    jobLabel: "Job",
    jobUnit: "lock / unit",
    materialCategories: [
      "Locks/cylinders",
      "Keys/blanks",
      "Deadbolts",
      "Digital lock units",
      "Hinges",
    ],
    commonMaterials: [
      { name: "Standard cylinder lock", unitCost: 350 },
      { name: "Key blank (each)", unitCost: 20 },
      { name: "Deadbolt lock", unitCost: 600 },
      { name: "Digital/smart lock", unitCost: 4500 },
      { name: "Door hinge (heavy)", unitCost: 90 },
      { name: "Padlock (medium)", unitCost: 250 },
    ],
    commonKits: [
      {
        name: "Main Door Lock Upgrade Kit",
        items: [
          { name: "Deadbolt lock", unitCost: 600 },
          { name: "Standard cylinder lock", unitCost: 350 },
          { name: "Key blank (each)", unitCost: 20, qty: 4 },
        ],
      },
      {
        name: "Smart Lock Install Kit",
        items: [
          { name: "Digital/smart lock", unitCost: 4500 },
          { name: "Door hinge (heavy)", unitCost: 90, qty: 2 },
        ],
      },
    ],
    requiredTools: ["Lock pick set", "Key cutting machine", "Drill", "Tension wrench"],
    laborPresets: [
      { label: "Lockout service", amount: 400 },
      { label: "Lock replacement", amount: 300 },
      { label: "Key duplication (per key)", amount: 50 },
      { label: "Smart lock installation", amount: 800 },
    ],
    riskTags: [
      "Emergency lockout (urgency)",
      "High-security lock system",
      "Damaged/jammed mechanism",
      "Client identity verification needed",
    ],
    checklist: {
      preJob: [
        "Client identity/ownership verified?",
        "Lock type/brand identified?",
        "Tools matched to lock type?",
      ],
      completion: [
        "Lock operates smoothly both directions",
        "All keys tested & handed over",
        "Client shown how to operate (if smart lock)",
      ],
    },
    quickReference: [
      { label: "Pin tumbler locks", value: "most common residential — 5-6 pins standard" },
      { label: "Smart lock battery life", value: "typically 6-12 months, check on install" },
      { label: "Master keying", value: "requires professional keying, not DIY duplication" },
    ],
    mindset:
      "Trust-critical work — a locksmith is being let into the literal security of someone's home, so identity verification and discretion matter as much as technical skill. Calm under pressure since many calls are emergency lockouts with an anxious client waiting.",
    subdivisions: [
      {
        category: "Emergency",
        items: ["Lockout Service", "Broken Key Extraction", "Jammed Lock Repair"],
      },
      {
        category: "Installation",
        items: ["New Lock Installation", "Smart Lock Setup", "Multi-Point Lock System"],
      },
      {
        category: "Duplication & Security",
        items: ["Key Duplication", "Master Key System Setup", "Security Upgrade Consultation"],
      },
    ],
    skillGroups: [
      {
        category: "Mechanical",
        skills: ["Lock picking", "Key cutting", "Cylinder rekeying"],
      },
      {
        category: "Digital & Security",
        skills: ["Smart lock setup", "Master key systems", "Access control basics"],
      },
    ],
    skills: [
      "Lock mechanisms (mechanical & digital)",
      "Key cutting & duplication",
      "Emergency entry techniques",
      "Security system basics",
    ],
    realTools: [
      { name: "WhatsApp Business", use: "Emergency call coordination" },
      {
        name: "JustDial / Google Business Profile",
        use: "Emergency lead generation — high search intent",
      },
      { name: "Vyapar", use: "Invoicing" },
    ],
    sampleJobs: [
      { title: "Emergency lockout — main door", client: "P. Reddy", address: "Ameerpet" },
      { title: "Smart lock installation", client: "R. Iyer", address: "Kokapet" },
      { title: "Master key system — office", client: "TechPark Offices", address: "HITEC City" },
    ],
  },
  applianceRepair: {
    label: "Appliance Repair",
    icon: Cog,
    jobLabel: "Job",
    jobUnit: "unit / repair",
    materialCategories: [
      "Motors/compressors",
      "PCB boards",
      "Belts/hoses",
      "Heating elements",
      "Seals/gaskets",
    ],
    commonMaterials: [
      { name: "Washing machine motor", unitCost: 1800 },
      { name: "PCB board (universal)", unitCost: 1200 },
      { name: "Drum belt", unitCost: 250 },
      { name: "Water inlet hose", unitCost: 300 },
      { name: "Heating element (geyser)", unitCost: 650 },
      { name: "Door seal/gasket", unitCost: 400 },
    ],
    commonKits: [
      {
        name: "Washing Machine Repair Kit",
        items: [
          { name: "Drum belt", unitCost: 250 },
          { name: "Door seal/gasket", unitCost: 400 },
          { name: "Water inlet hose", unitCost: 300 },
        ],
      },
      {
        name: "Geyser Service Kit",
        items: [
          { name: "Heating element (geyser)", unitCost: 650 },
          { name: "Thermostat", unitCost: 350 },
        ],
      },
    ],
    requiredTools: [
      "Multimeter",
      "Screwdriver set",
      "Circuit tester",
      "Refrigerant gauge (for fridges)",
    ],
    laborPresets: [
      { label: "Diagnostic visit", amount: 250 },
      { label: "Per repair item", amount: 400 },
      { label: "Installation labor", amount: 500 },
      { label: "Annual maintenance", amount: 350 },
    ],
    riskTags: [
      "Electrical shock risk (live unit)",
      "Refrigerant handling (fridge/AC-adjacent)",
      "Heavy appliance moving",
      "Water damage risk (washing machine/geyser)",
    ],
    checklist: {
      preJob: [
        "Power/water supply isolated?",
        "Appliance model & fault confirmed?",
        "Warranty status checked?",
      ],
      completion: [
        "Full cycle test run completed",
        "No leaks or unusual noise",
        "Client shown basic troubleshooting",
      ],
    },
    quickReference: [
      { label: "Common WM fault", value: "drum not spinning — usually belt or motor" },
      { label: "Geyser element life", value: "typically 2-3 years, replace if heating slow" },
      { label: "PCB faults", value: "often shown via error codes — check manual first" },
    ],
    mindset:
      "Diagnostic-first like a mechanic, but working inside people's homes on daily-use items — a broken washing machine or fridge disrupts a household immediately, so response speed matters as much as fix quality. Comfortable with a wide range of brands and mechanisms.",
    subdivisions: [
      {
        category: "Washing Machine",
        items: ["Not Spinning/Draining", "Water Leakage", "Motor/PCB Replacement"],
      },
      {
        category: "Refrigerator & AC-adjacent",
        items: ["Not Cooling Diagnostic", "Compressor Issue", "Gas Refill"],
      },
      {
        category: "Water Heater & Misc",
        items: ["Geyser Not Heating", "Microwave Repair", "Annual Maintenance Visit"],
      },
    ],
    skillGroups: [
      {
        category: "Diagnostics",
        skills: ["Fault code reading", "Multimeter testing", "Component isolation"],
      },
      {
        category: "Repair",
        skills: ["Motor/PCB replacement", "Seal & hose replacement", "Reassembly & testing"],
      },
    ],
    skills: [
      "Multi-brand appliance diagnostics",
      "Electrical & mechanical repair",
      "PCB/electronics troubleshooting",
      "Customer communication under time pressure",
    ],
    realTools: [
      { name: "YouTube", use: "Model-specific repair walkthroughs" },
      { name: "Urban Company", use: "Major lead-generation channel" },
      { name: "Vyapar / Khatabook", use: "Invoicing & parts tracking" },
    ],
    sampleJobs: [
      { title: "Washing machine not spinning", client: "D. Rao", address: "Kukatpally" },
      { title: "Geyser heating element replacement", client: "S. Iyer", address: "Begumpet" },
      { title: "Refrigerator not cooling", client: "A. Menon", address: "Madhapur" },
    ],
  },
  pestControl: {
    label: "Pest Control",
    icon: Bug,
    jobLabel: "Job",
    jobUnit: "sq. ft. / treatment",
    materialCategories: ["Pesticides", "Gel baits", "Fumigation chemicals", "PPE", "Traps"],
    commonMaterials: [
      { name: "General pesticide spray (per liter)", unitCost: 350 },
      { name: "Cockroach gel bait (tube)", unitCost: 220 },
      { name: "Termite treatment chemical (per liter)", unitCost: 600 },
      { name: "Rodent traps (each)", unitCost: 80 },
      { name: "Fumigation tablets (pack)", unitCost: 450 },
      { name: "PPE kit (per job)", unitCost: 150 },
    ],
    commonKits: [
      {
        name: "General Pest Treatment Kit",
        items: [
          { name: "General pesticide spray (per liter)", unitCost: 350, qty: 2 },
          { name: "Cockroach gel bait (tube)", unitCost: 220, qty: 3 },
          { name: "PPE kit (per job)", unitCost: 150 },
        ],
      },
      {
        name: "Termite Treatment Kit",
        items: [
          { name: "Termite treatment chemical (per liter)", unitCost: 600, qty: 4 },
          { name: "PPE kit (per job)", unitCost: 150 },
        ],
      },
    ],
    requiredTools: ["Sprayer pump", "Fumigation equipment", "PPE/mask", "Bait gun"],
    laborPresets: [
      { label: "Per sq. ft. treatment", amount: 3 },
      { label: "Standard visit", amount: 500 },
      { label: "Termite treatment (per day)", amount: 1200 },
      { label: "Follow-up visit", amount: 300 },
    ],
    riskTags: [
      "Chemical exposure risk",
      "Occupied premises during treatment",
      "Ventilation-sensitive area",
      "Children/pets on site",
    ],
    checklist: {
      preJob: [
        "Area cleared of food/utensils?",
        "Occupants informed of chemical use?",
        "Ventilation checked?",
      ],
      completion: [
        "Treated area ventilated before re-entry",
        "Client given re-entry time & safety notes",
        "Follow-up visit scheduled if needed",
      ],
    },
    quickReference: [
      { label: "Re-entry time", value: "typically 2-4 hours after spray treatment" },
      { label: "Termite treatment", value: "usually needs a follow-up check at 30-90 days" },
      { label: "Cockroach gel", value: "works over 1-2 weeks, don't spray over gel spots" },
    ],
    mindset:
      "Safety-conscious around chemical exposure — working in occupied homes with children and pets present means constant awareness of what's safe to use where. Methodical about coverage since missed spots mean the problem returns and the client loses trust.",
    subdivisions: [
      {
        category: "General Pest",
        items: ["Cockroach Treatment", "Ant/Insect Control", "Bed Bug Treatment"],
      },
      {
        category: "Termite & Wood",
        items: ["Termite Treatment", "Pre-Construction Anti-Termite", "Wood Borer Treatment"],
      },
      {
        category: "Rodent & Specialized",
        items: ["Rodent Control", "Mosquito Fogging", "Annual Maintenance Contract"],
      },
    ],
    skillGroups: [
      {
        category: "Assessment",
        skills: ["Infestation identification", "Chemical selection", "Coverage planning"],
      },
      {
        category: "Application",
        skills: ["Spray application", "Fumigation", "Bait placement"],
      },
    ],
    skills: [
      "Pest identification & behavior",
      "Chemical safety & dosage",
      "Application technique",
      "Regulatory compliance",
    ],
    realTools: [
      { name: "Urban Company", use: "Major lead-generation channel" },
      { name: "WhatsApp Business", use: "Before/after photos, scheduling" },
      { name: "Vyapar / Khatabook", use: "Invoicing & AMC tracking" },
    ],
    sampleJobs: [
      { title: "Cockroach treatment — 2BHK", client: "V. Prasad", address: "Uppal" },
      { title: "Termite treatment — new construction", client: "R. Builders", address: "Kompally" },
      { title: "Annual pest AMC — office", client: "TechPark Offices", address: "HITEC City" },
    ],
  },
  roofer: {
    label: "Roofer",
    icon: Home,
    jobLabel: "Job",
    jobUnit: "sq. ft.",
    materialCategories: [
      "Waterproofing membrane",
      "Roofing sheets",
      "Sealant",
      "Insulation",
      "Flashing",
    ],
    commonMaterials: [
      { name: "Waterproofing membrane (sq. ft.)", unitCost: 45 },
      { name: "APP membrane roll", unitCost: 3200 },
      { name: "Roofing sealant (per kg)", unitCost: 180 },
      { name: "GI roofing sheet (sq. ft.)", unitCost: 65 },
      { name: "Insulation sheet (sq. ft.)", unitCost: 35 },
      { name: "Flashing strip (per meter)", unitCost: 90 },
    ],
    commonKits: [
      {
        name: "Terrace Waterproofing Kit",
        items: [
          { name: "Waterproofing membrane (sq. ft.)", unitCost: 45, qty: 500 },
          { name: "Roofing sealant (per kg)", unitCost: 180, qty: 10 },
        ],
      },
      {
        name: "Roof Sheet Installation Kit",
        items: [
          { name: "GI roofing sheet (sq. ft.)", unitCost: 65, qty: 200 },
          { name: "Flashing strip (per meter)", unitCost: 90, qty: 15 },
        ],
      },
    ],
    requiredTools: ["Heat gun/torch", "Roller", "Safety harness", "Measuring tape"],
    laborPresets: [
      { label: "Per sq. ft.", amount: 25 },
      { label: "Site inspection & estimate", amount: 300 },
      { label: "Leak repair visit", amount: 500 },
      { label: "Hourly rate", amount: 350 },
    ],
    riskTags: [
      "Working at height (fall risk)",
      "Heat/torch application",
      "Weather-dependent (rain delay)",
      "Existing structural damage",
    ],
    checklist: {
      preJob: [
        "Safety harness/anchor points set up?",
        "Roof surface cleared & inspected?",
        "Weather forecast checked?",
      ],
      completion: [
        "Membrane fully sealed, no gaps",
        "Water ponding test done",
        "Client shown warranty/maintenance terms",
      ],
    },
    quickReference: [
      {
        label: "Waterproofing warranty",
        value: "typically 5-10 years depending on membrane grade",
      },
      { label: "Best application weather", value: "dry, above 15°C, avoid monsoon season" },
      { label: "Ponding test", value: "flood test for 24-48 hrs before declaring complete" },
    ],
    mindset:
      "Height-aware and weather-dependent — every job is scheduled around rain forecasts, and personal safety at height is a constant background concern, not an occasional one. Takes pride in leak-free results since failure shows up months later as someone else's water damage.",
    subdivisions: [
      {
        category: "Waterproofing",
        items: [
          "Terrace Waterproofing",
          "Bathroom/Wet Area Waterproofing",
          "Basement Waterproofing",
        ],
      },
      {
        category: "Roofing Installation",
        items: ["GI Sheet Roofing", "Roof Insulation", "Skylight Installation"],
      },
      {
        category: "Repair",
        items: ["Leak Detection & Repair", "Membrane Patch-Up", "Flashing Repair"],
      },
    ],
    skillGroups: [
      {
        category: "Waterproofing",
        skills: ["Membrane application", "Leak diagnosis", "Ponding test"],
      },
      {
        category: "Structural",
        skills: ["Sheet installation", "Flashing & sealing", "Insulation fitting"],
      },
    ],
    skills: [
      "Waterproofing membrane application",
      "Leak diagnosis & tracing",
      "Working safely at height",
      "Weather-dependent scheduling",
    ],
    realTools: [
      { name: "WhatsApp Business", use: "Before/after photos, weather-based rescheduling" },
      { name: "Vyapar", use: "Invoicing & warranty tracking" },
      { name: "JustDial / IndiaMART", use: "Lead generation for larger contracts" },
    ],
    sampleJobs: [
      {
        title: "Terrace waterproofing — 1200 sq. ft.",
        client: "Lakeview Society",
        address: "Nallagandla",
      },
      { title: "Bathroom leak repair", client: "K. Sharma", address: "Kondapur" },
      { title: "GI sheet roofing — shed", client: "R. Industries", address: "Shamshabad" },
    ],
  },
  cctvInstaller: {
    label: "CCTV Installer",
    icon: Video,
    jobLabel: "Job",
    jobUnit: "camera / point",
    materialCategories: ["Cameras", "DVR/NVR", "Cabling", "Power supply", "Storage"],
    commonMaterials: [
      { name: "Dome camera (2MP)", unitCost: 1400 },
      { name: "Bullet camera (2MP)", unitCost: 1600 },
      { name: "4-channel DVR", unitCost: 3200 },
      { name: "Coaxial cable (per meter)", unitCost: 18 },
      { name: "Power adapter (12V)", unitCost: 250 },
      { name: "Hard disk (1TB, surveillance)", unitCost: 3500 },
    ],
    commonKits: [
      {
        name: "4-Camera Home Setup Kit",
        items: [
          { name: "Dome camera (2MP)", unitCost: 1400, qty: 4 },
          { name: "4-channel DVR", unitCost: 3200 },
          { name: "Hard disk (1TB, surveillance)", unitCost: 3500 },
          { name: "Coaxial cable (per meter)", unitCost: 18, qty: 60 },
        ],
      },
      {
        name: "Single Camera Add-On Kit",
        items: [
          { name: "Bullet camera (2MP)", unitCost: 1600 },
          { name: "Coaxial cable (per meter)", unitCost: 18, qty: 15 },
          { name: "Power adapter (12V)", unitCost: 250 },
        ],
      },
    ],
    requiredTools: ["Drill", "Cable tester", "Crimping tool", "Ladder"],
    laborPresets: [
      { label: "Per camera installation", amount: 500 },
      { label: "Site survey & estimate", amount: 300 },
      { label: "System configuration", amount: 600 },
      { label: "Annual maintenance visit", amount: 400 },
    ],
    riskTags: [
      "Working at height (exterior mounting)",
      "Long cable runs through walls",
      "Client Wi-Fi/network dependency",
      "Existing wiring conflicts",
    ],
    checklist: {
      preJob: [
        "Camera placement confirmed with client?",
        "Cable routing planned?",
        "Power source identified per camera?",
      ],
      completion: [
        "All cameras tested for clear feed",
        "Night vision verified",
        "Client shown mobile app access & playback",
      ],
    },
    quickReference: [
      { label: "2MP vs 4MP", value: "4MP for entry points/faces, 2MP sufficient for general area" },
      { label: "Storage estimate", value: "1TB ≈ 15-20 days for 4 cameras at standard quality" },
      {
        label: "Cable run limit",
        value: "coaxial: ~300m max before signal loss; use NVR/IP beyond that",
      },
    ],
    mindset:
      "Systems-integration mindset — cameras, cabling, storage, and the client's home network all have to work together, so troubleshooting often means figuring out which layer failed. Privacy-conscious since camera placement decisions affect neighbors and family members, not just the client.",
    subdivisions: [
      {
        category: "New Installation",
        items: [
          "Home CCTV Setup (4-8 cameras)",
          "Shop/Office Setup",
          "Perimeter/Gate Camera Install",
        ],
      },
      {
        category: "Upgrade & Expansion",
        items: ["Add Additional Cameras", "Analog to IP Upgrade", "Storage/DVR Upgrade"],
      },
      {
        category: "Service",
        items: ["System Not Recording Fix", "Remote Access Setup", "Annual Maintenance Visit"],
      },
    ],
    skillGroups: [
      {
        category: "Installation",
        skills: ["Camera mounting & angling", "Cable routing", "Power setup"],
      },
      {
        category: "Configuration",
        skills: ["DVR/NVR setup", "Network/remote access config", "Storage management"],
      },
    ],
    skills: [
      "Camera & DVR/NVR installation",
      "Cable routing & termination",
      "Network configuration basics",
      "Remote access/mobile app setup",
    ],
    realTools: [
      { name: "WhatsApp Business", use: "Site photos, remote troubleshooting" },
      { name: "Urban Company / JustDial", use: "Lead generation" },
      { name: "Vyapar", use: "Invoicing & AMC contracts" },
    ],
    sampleJobs: [
      { title: "4-camera home setup", client: "N. Verma", address: "Kokapet" },
      { title: "Shop CCTV installation", client: "Sri Ganesh Stores", address: "Ameerpet" },
      { title: "System not recording — troubleshoot", client: "P. Rao", address: "Miyapur" },
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
  "mason",
  "tailor",
  "gardener",
  "locksmith",
  "applianceRepair",
  "pestControl",
  "roofer",
  "cctvInstaller",
];

export const STAGES = ["quoted", "scheduled", "in-progress", "invoiced"];
export const STAGE_LABEL = {
  quoted: "Quoted",
  scheduled: "Scheduled",
  "in-progress": "In Progress",
  invoiced: "Invoiced",
};
