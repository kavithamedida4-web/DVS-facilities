export interface SubService {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  image: string;
  features: string[];
}

export interface WhyChooseItem {
  title: string;
  description: string;
  iconName: string;
}

export interface ServiceWhyChoose {
  tagline: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  imageBadge: string;
  points: WhyChooseItem[];
}

export interface ServiceGalleryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  objectPosition?: string;
}

export interface ServiceTestimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  subtitle: string;
  heroHeadline: string;
  heroHighlight: string;
  heroDescription: string;
  heroImage: string;
  heroVideo?: string;
  heroImagePosition?: string;
  heroDarkText?: boolean;
  badge: string;
  heroTagline?: string;
  heroStats?: { value: string; label: string }[];
  overview: string;
  keyBenefits: string[];
  subsections: SubService[];
  whyChooseUs?: ServiceWhyChoose;
  gallery?: ServiceGalleryItem[];
  testimonialSubtitle?: string;
  testimonials?: ServiceTestimonial[];
}

export const MAIN_SERVICES: ServiceDetail[] = [
  {
    slug: "facility-management",
    title: "Facilities Management",
    subtitle: "End-to-End Operational Excellence & Maintenance",
    badge: "Service 01",
    heroTagline: "DVS INTEGRATED FACILITY MANAGEMENT",
    heroHeadline: "Complete",
    heroHighlight: "Facility Operations",
    heroDescription: "Housekeeping, electrical, plumbing, and preventative maintenance for commercial and residential premises.",
    heroImage: "/images/hero-facility-mgmt-team.jpg",
    heroVideo: "/videos/facility-management-clean.mp4",
    heroImagePosition: "object-[82%_top] sm:object-[78%_top]",
    heroStats: [
      { value: "24/7", label: "SUPPORT" },
      { value: "150+", label: "PREMISES" },
      { value: "60 MIN", label: "RESPONSE" },
      { value: "5★", label: "RATED" }
    ],
    overview: "DVS Facilities provides comprehensive on-site facility operations designed for commercial buildings, corporate offices, industrial hubs, and residential communities. Our verified and trained Indian technical staff handle every operational aspect seamlessly.",
    keyBenefits: [
      "Verified Indian Staff",
      "60-Min Emergency Response",
      "Preventive Maintenance",
      "Safety Compliant"
    ],
    subsections: [
      {
        id: "housekeeping",
        name: "Housekeeping",
        shortDesc: "Routine and daily high-standard cleaning and sanitation for offices, communities, and commercial spaces.",
        fullDesc: "Our disciplined housekeeping staff maintain impeccable cleanliness across floors, lobbies, washrooms, and common zones using professional non-toxic consumables.",
        iconName: "Sparkles",
        image: "/images/scope-housekeeping-clean.jpg",
        features: [
          "Daily floor mopping & surface wiping",
          "Continuous washroom hygiene management",
          "Waste segregation and timely disposal",
          "Polite, verified, and uniformed personnel"
        ]
      },
      {
        id: "electrical",
        name: "Electrical Maintenance",
        shortDesc: "Certified technicians for electrical system upkeep, panel maintenance, and fault resolution.",
        fullDesc: "Expert Indian electrical engineers and technicians managing LT/HT panels, UPS power backups, lighting systems, circuit breakers, and preventative load testing.",
        iconName: "Zap",
        image: "/images/facility-management.jpg",
        features: [
          "Periodic panel & distribution box audits",
          "Wiring checks & surge protection setup",
          "Lighting fixture replacement & LED upgrades",
          "Quick breakdown fault detection & repair"
        ]
      },
      {
        id: "garden",
        name: "Garden & Landscaping",
        shortDesc: "Professional garden maintenance, plant nurturing, trimming, and green zone preservation.",
        fullDesc: "Dedicated horticultural caretakers ensuring vibrant green lawns, healthy potted plants, pest control, timely pruning, and automatic drip irrigation management.",
        iconName: "Trees",
        image: "/images/gardening.jpg",
        features: [
          "Daily watering and soil enrichment",
          "Lawn mowing, hedge trimming & weeding",
          "Organic fertilizer & pesticide management",
          "Indoor plant styling and seasonal care"
        ]
      },
      {
        id: "plumber",
        name: "Plumber & Water Solutions",
        shortDesc: "Expert plumbing services for pipelines, leakages, motor pumps, and sanitary fixtures.",
        fullDesc: "Skilled plumbing technicians providing prompt leakage resolution, drainage unblocking, overhead tank cleaning, motor pump servicing, and sanitary fittings maintenance.",
        iconName: "Wrench",
        image: "/images/plumbing.jpg",
        features: [
          "Leak detection & rapid pipe repair",
          "Drain unclogging and sewage line flow check",
          "Overhead & underground sump tank sanitation",
          "Sanitary fixture repairs (taps, flush, valves)"
        ]
      }
    ],
    whyChooseUs: {
      tagline: "Facility Management Excellence",
      title: "Why Trust DVS for",
      highlight: "Facilities Management?",
      description: "Dedicated supervisors, zero absenteeism backup, and certified multi-skilled technicians for seamless commercial and residential premises.",
      image: "/images/indian-service-supervisor.jpg",
      imageBadge: "60-MIN BREAKDOWN SLA",
      points: [
        {
          title: "60-Min Emergency Breakdown SLA",
          description: "Rapid on-site response for power trips, pipeline bursts, and technical failures.",
          iconName: "Zap"
        },
        {
          title: "Certified Multi-Skilled Technicians",
          description: "Licensed electricians, experienced plumbers, and trained Indian facility personnel.",
          iconName: "Wrench"
        },
        {
          title: "Daily Supervised Shift Checklists",
          description: "On-site supervisors review DG set logs, pump status, and hygiene sign-offs daily.",
          iconName: "ClipboardCheck"
        },
        {
          title: "Zero Absenteeism Reliever Guarantee",
          description: "Standby reliever staff deployed immediately if any regular worker takes leave.",
          iconName: "Users"
        }
      ]
    },
    gallery: [
      {
        id: "fm-1",
        title: "Integrated Facility Support Team",
        subtitle: "Fully equipped standby operations team and supervisors ensuring zero downtime across client sites.",
        image: "/images/facility-management.jpg",
        objectPosition: "object-[center_20%]"
      },
      {
        id: "fm-2",
        title: "Commercial Daily Housekeeping",
        subtitle: "Uniformed crew maintaining dust-free lobbies, workspaces, and spotless common areas with daily checklists.",
        image: "/images/scope-housekeeping-clean.jpg",
        objectPosition: "object-[45%_10%]"
      },
      {
        id: "fm-3",
        title: "Dedicated On-Site Facility Supervisor",
        subtitle: "Rigorous shift supervision, digital attendance tracking, and immediate escalation management.",
        image: "/images/indian-service-supervisor.jpg",
        objectPosition: "object-[center_top]"
      },
      {
        id: "fm-4",
        title: "Certified Electrical Panel Inspection",
        subtitle: "Licensed Indian electricians handling LT/HT distribution panels, circuit breakers, and load audits.",
        image: "/images/about-electrician.jpg",
        objectPosition: "object-[center_12%]"
      },
      {
        id: "fm-5",
        title: "Landscape & Horticulture Upkeep",
        subtitle: "Professional gardening, lawn mowing, hedge trimming, and green perimeter preservation.",
        image: "/images/gardening.jpg",
        objectPosition: "object-[68%_15%]"
      },
      {
        id: "fm-6",
        title: "Plumbing & Water Infrastructure",
        subtitle: "Preventative pump testing, pipe leak repairs, overhead tank level monitoring, and drainage audits.",
        image: "/images/plumbing.jpg",
        objectPosition: "object-[center_20%]"
      }
    ],
    testimonialSubtitle: "Trusted by tech parks, gated communities, and industrial complexes for seamless daily operations.",
    testimonials: [
      {
        id: "fm-rev-1",
        name: "Rajeshwar G.",
        role: "Facility Director, Apex Tech Parks",
        rating: 5,
        quote: "DVS Facilities handles our entire 8-acre IT park maintenance flawlessly. From daily electrical panel inspections and DG set maintenance to plumbing upkeep, their multi-skilled technicians ensure zero operational downtime. The 60-minute emergency response SLA is genuinely honoured."
      },
      {
        id: "fm-rev-2",
        name: "Kiran K.",
        role: "Secretary, Maple Town Community",
        rating: 5,
        quote: "Managing 450 residential apartments requires seamless facility coordination. DVS deployed certified electricians, plumbers, and dedicated gardeners within 48 hours. Our water distribution motors and landscaped gardens are in top condition, and their on-site supervisor oversees daily checklists diligently."
      },
      {
        id: "fm-rev-3",
        name: "Sandhya Y.",
        role: "Administration Head, Cyber Gateway Towers",
        rating: 5,
        quote: "What sets DVS apart is their zero-absenteeism reliever guarantee. If an electrician or plumber takes sudden leave, a fully trained substitute is already on-site before the shift starts. Our facility audit scores improved significantly after onboarding their team."
      },
      {
        id: "fm-rev-4",
        name: "Vikramaditya Rao",
        role: "Operations VP, Sunrise Corporate Hub",
        rating: 5,
        quote: "Preventative maintenance done right. Their technical team identified critical electrical panel overloads and minor plumbing seepage before they escalated into costly disruptions. The transparent SLA reporting and weekly supervisor audits give us total peace of mind."
      }
    ]
  },
  {
    slug: "security-services",
    title: "Security Services",
    subtitle: "Trained & Vigilant Security Guard Supply",
    badge: "Service 02",
    heroTagline: "DVS SECURITY & PROTECTION SERVICES",
    heroHeadline: "Trusted",
    heroHighlight: "Security Force",
    heroDescription: "Disciplined, police-verified security guards and 24/7 perimeter protection for gated communities and corporate spaces.",
    heroImage: "/images/hero-security-clean.jpg",
    heroVideo: "/videos/security-services-clean.mp4",
    heroImagePosition: "object-[80%_top] sm:object-[78%_top]",
    heroStats: [
      { value: "100%", label: "VERIFIED" },
      { value: "24/7", label: "PATROL" },
      { value: "365", label: "DAYS" },
      { value: "5★", label: "RATED" }
    ],
    overview: "Security is the bedrock of any seamless facility. DVS Facilities supplies thoroughly vetted, alert, and courteous security guards, lady guards, gate supervisors, and patrol teams trained in emergency response and surveillance protocols.",
    keyBenefits: [
      "100% Police-Verified Guards",
      "Fire Safety & First Aid Trained",
      "24/7 Centralized Patrolling",
      "Visitor & Access Control"
    ],
    subsections: [
      {
        id: "security-supply",
        name: "Security Guard Supply",
        shortDesc: "Supply of disciplined uniformed guards for stationary watch and perimeter protection.",
        fullDesc: "Providing smart, punctual, and attentive security personnel for main gates, reception desks, parking lots, and entry points.",
        iconName: "ShieldCheck",
        image: "/images/scope-security-guard-supply.jpg",
        features: [
          "24/7 shift rotation & biometric attendance",
          "Visitor badge issuance & register management",
          "Vehicle entry-exit logging and inspection"
        ]
      },
      {
        id: "corporate-security",
        name: "Corporate & Tech Park Security",
        shortDesc: "Specialized security protocol for IT parks, commercial offices, and banks.",
        fullDesc: "Professional front-desk security officers capable of managing access cards, escorting VIP guests, monitoring CCTV feeds, and handling multi-tenant premises.",
        iconName: "Building2",
        image: "/images/scope-corporate-security-clean.jpg",
        features: [
          "Access card verification and turnstile control",
          "Asset movement recording & gate passes",
          "CCTV room monitoring & incident logging"
        ]
      },
      {
        id: "residential-security",
        name: "Residential & Society Security",
        shortDesc: "Safe, friendly, and watchful security solutions for apartments and gated communities.",
        fullDesc: "Community-focused guards trained in society management apps (MyGate, NoBroker), delivery verification, and round-the-clock perimeter vigilance.",
        iconName: "Home",
        image: "/images/scope-residential-security.jpg",
        features: [
          "Delivery & courier staff verification",
          "Children safety watch in playground zones",
          "Speed check & traffic flow inside society"
        ]
      }
    ],
    whyChooseUs: {
      tagline: "Vigilant Guard Force",
      title: "Why Trust DVS for",
      highlight: "Security Guarding?",
      description: "Police-verified guards, digital gate logging, and round-the-clock ex-military field supervision for ironclad perimeter safety.",
      image: "/images/scope-security-guard-supply.jpg",
      imageBadge: "100% POLICE VERIFIED",
      points: [
        {
          title: "100% Police-Verified & Vetted Staff",
          description: "Rigorous background checks, biometric documentation, and verified Indian records.",
          iconName: "ShieldCheck"
        },
        {
          title: "Smart Gate & Visitor Access Control",
          description: "Proficient with visitor management apps, vehicle inspections, and gate-pass protocols.",
          iconName: "Building2"
        },
        {
          title: "24/7 Ex-Military Night Patrolling",
          description: "Field officers conduct surprise vigilance rounds and alert checks across all shifts.",
          iconName: "Clock"
        },
        {
          title: "Fire Safety & Emergency Response",
          description: "Trained in fire extinguisher operation, first-aid basics, and emergency evacuation.",
          iconName: "CheckCircle2"
        }
      ]
    },
    gallery: [
      {
        id: "sec-1",
        title: "Uniformed Manned Guarding Force",
        subtitle: "Police-verified and background-checked guards maintaining round-the-clock vigilant stationary watch.",
        image: "/images/security-services.jpg",
        objectPosition: "object-[center_25%]"
      },
      {
        id: "sec-2",
        title: "Perimeter Checkpoint & Gate Surveillance",
        subtitle: "Sharp perimeter checks, boom barrier operation, and material gate-pass verification protocols.",
        image: "/images/scope-guard-solo.jpg",
        objectPosition: "object-[center_top]"
      },
      {
        id: "sec-3",
        title: "Corporate & Tech Park Front Officers",
        subtitle: "Courteous, ex-defense trained officers managing lobby reception, turnstiles, and CCTV control rooms.",
        image: "/images/scope-corporate-security-officer.jpg",
        objectPosition: "object-[center_top]"
      },
      {
        id: "sec-4",
        title: "Smart Visitor & Entry Gate Management",
        subtitle: "Biometric and app-based visitor verification, vehicle entry logs, and strict access authorization.",
        image: "/images/scope-security-guard-supply.jpg",
        objectPosition: "object-[center_top]"
      },
      {
        id: "sec-5",
        title: "Gated Community & Society Patrols",
        subtitle: "Active internal patrolling, delivery personnel screening, and child safety vigilance in residential zones.",
        image: "/images/scope-residential-security.jpg",
        objectPosition: "object-[center_top]"
      },
      {
        id: "sec-6",
        title: "Night Vigilance & Patrolling Supervisor",
        subtitle: "Senior field officers conducting surprise night audits, alertness checks, and emergency drill readiness.",
        image: "/images/hero-security-clean.jpg",
        objectPosition: "object-[center_20%]"
      }
    ],
    testimonialSubtitle: "Trusted by tech parks, residential societies, and commercial enterprises for 24/7 vigilant protection.",
    testimonials: [
      {
        id: "sec-rev-1",
        name: "Major Arvind Nair (Retd.)",
        role: "Chief Security Officer, Prestige Meridian Towers",
        rating: 5,
        quote: "Deploying 30+ security personnel across multiple entry gates and basement levels was executed flawlessly by DVS. Their guards are 100% police-verified, impeccably uniformed, and highly trained in access control, boom barrier management, and emergency fire safety protocols."
      },
      {
        id: "sec-rev-2",
        name: "Kavita Sundaram",
        role: "President, Oakridge Grand Gated Community",
        rating: 5,
        quote: "Resident safety is our top priority, and DVS security guards have exceeded our expectations. They handle society visitor management apps with ease, strictly verify delivery personnel, and maintain vigilant night patrols. The ex-military supervisor conducts surprise checks every week."
      },
      {
        id: "sec-rev-3",
        name: "Murali Manohar",
        role: "Head of Corporate Infrastructure, FinTech Heights",
        rating: 5,
        quote: "DVS corporate security officers strike the perfect balance between strict perimeter vigilance and polite visitor hospitality at our reception turnstiles. Their incident escalation protocol is swift, and digital visitor logs are maintained with zero discrepancies."
      },
      {
        id: "sec-rev-4",
        name: "Col. Pradeep Vardhan",
        role: "GM - Facilities & Safety, Vantage Logistics SEZ",
        rating: 5,
        quote: "Around-the-clock perimeter surveillance across our 15-acre warehouse zone has been airtight. DVS guards manage heavy vehicle dispatch, driver alcohol screening, and material gate-pass authorization with military precision and unwavering discipline."
      }
    ]
  },
  {
    slug: "deep-cleaning",
    title: "Deep Cleaning Services",
    subtitle: "Specialized Thorough Sanitization & Floor Restoration",
    badge: "Service 03",
    heroTagline: "DVS COMMERCIAL & RESIDENTIAL SANITIZATION",
    heroHeadline: "Intensive",
    heroHighlight: "Deep Cleaning",
    heroDescription: "Specialized rotary scrubbing, steam sanitization, and deep stain removal for spotless homes and offices.",
    heroImage: "/images/hero-deep-clean-clean.jpg",
    heroVideo: "/videos/deep-cleaning-clean.mp4",
    heroImagePosition: "object-[80%_top] sm:object-[78%_top]",
    heroStats: [
      { value: "100%", label: "ECO-SAFE" },
      { value: "HEPA", label: "MACHINES" },
      { value: "99.9%", label: "SANITIZED" },
      { value: "5★", label: "RATED" }
    ],
    overview: "Ordinary surface cleaning misses embedded dirt, oil buildup, scale deposits, and allergens. DVS Facilities deep cleaning teams bring heavy-duty equipment and eco-safe solutions to transform your living and work spaces to brand new condition.",
    keyBenefits: [
      "Single-Disc Rotary Floor Scrubbers",
      "99.9% Germ & Grease Eradication",
      "Eco-Safe Non-Toxic Consumables",
      "Safe on Marble, Granite & Tiles"
    ],
    subsections: [
      {
        id: "kitchen-cleaning",
        name: "Kitchen Deep Cleaning",
        shortDesc: "Degreasing exhaust fans, chimney exteriors, slab tiles, cabinets, and appliances.",
        fullDesc: "Total eradication of hardened oil layers, spice stains, and grease from stove tops, tile joints, backsplashes, and storage shelves.",
        iconName: "ChefHat",
        image: "/images/deep-cleaning.jpg",
        features: [
          "Exhaust fan & chimney exterior degreasing",
          "Gas stove burner & platform intensive scrub",
          "Kitchen tile wall grout restoration",
          "Under-sink disinfection & odor neutralization"
        ]
      },
      {
        id: "toilet-cleaning",
        name: "Toilet & Bathroom Deep Cleaning",
        shortDesc: "Hard water scale removal, ceramic tile descaling, commode sanitization, and chrome shine.",
        fullDesc: "Complete hygienic restoration of bathrooms removing stubborn yellow stains, soap scum, limescale on taps/showers, and deep grout cleaning.",
        iconName: "Bath",
        image: "/images/floor-cleaning.jpg",
        features: [
          "Commode & urinal acid-free descaling",
          "Hard water stain removal on glass partitions",
          "Shower head, faucet, and drain line cleaning",
          "Anti-bacterial steaming and fragrant mist"
        ]
      },
      {
        id: "cupboard-cleaning",
        name: "Cupboards & Wardrobe Cleaning",
        shortDesc: "Dusting, vacuuming, and wiping inside-out of wardrobes, lofts, and modular cabinets.",
        fullDesc: "Eliminates dust mites, moisture mold, and cobwebs from wardrobe interiors, drawer tracks, shelf corners, and overhead lofts.",
        iconName: "Layers",
        image: "/images/deep-cleaning.jpg",
        features: [
          "Interior vacuuming of shelves and tracks",
          "Mild disinfectant wipe down of laminate & veneer",
          "Hinge oiling & handle polish",
          "Mold prevention treatment"
        ]
      },
      {
        id: "room-cleaning",
        name: "Room & Wall Cobweb Cleaning",
        shortDesc: "Ceiling fan dust removal, switchboard wipes, doors, skirting, and all-room vacuuming.",
        fullDesc: "Thorough end-to-end cleaning of bedrooms, living halls, balconies, ceiling fans, AC filters, window tracks, and door frames.",
        iconName: "BedDouble",
        image: "/images/hero-main.jpg",
        features: [
          "High ceiling cobweb removal with telescopic tools",
          "Ceiling fan blades and light fixture cleaning",
          "Door frames, skirtings, and switches sanitization",
          "Full room HEPA filter vacuuming"
        ]
      },
      {
        id: "floor-scrubbing",
        name: "Floor Scrubbing & Polishing",
        shortDesc: "Single-disc machine scrubbing for tiles, marble, granite, and epoxy floors.",
        fullDesc: "Heavy-duty rotary floor machine scrubbing that lifts years of grime from grout lines and restores the natural luster of tile, marble, and granite floors.",
        iconName: "SquareDot",
        image: "/images/floor-cleaning.jpg",
        features: [
          "Rotary disc machine deep scrubbing",
          "Tile grout line dirt extraction",
          "Marble buffing and shine revival",
          "Wet vacuum slurry extraction & dry polish"
        ]
      },
      {
        id: "glass-cleaning",
        name: "Glass & Window Cleaning",
        shortDesc: "Streak-free crystal clear cleaning of windows, mirrors, glass partitions, and railings.",
        fullDesc: "Professional rubber squeegee and anti-static glass cleaning for windows, sliding glass doors, balcony glass railings, and office glass cabins.",
        iconName: "Maximize",
        image: "/images/deep-cleaning.jpg",
        features: [
          "Streak-free glass squeegee wipe down",
          "Window sliding channel & track vacuuming",
          "Balcony glass railing stain removal",
          "Mirror & interior partition buffing"
        ]
      }
    ],
    whyChooseUs: {
      tagline: "Industrial Grade Deep Hygiene",
      title: "Why Trust DVS for",
      highlight: "Deep Cleaning Services?",
      description: "Single-disc rotary scrubbing, certified hospital-grade chemicals, and hard-water scale extraction for spotless restoration.",
      image: "/images/hero-deep-clean-clean.jpg",
      imageBadge: "ROTARY MACHINE SCRUBBING",
      points: [
        {
          title: "Single-Disc Rotary Floor Scrubbers",
          description: "Heavy-duty machines lift decades-old grime, grout dirt, and stains without tile damage.",
          iconName: "Sparkles"
        },
        {
          title: "Hospital-Grade MSDS Consumables",
          description: "Safe, non-toxic, eco-certified chemicals formulated for granite, marble, and ceramics.",
          iconName: "ShieldCheck"
        },
        {
          title: "Tough Scale & Oil Grease Eradication",
          description: "Specialized hard-water descaling for bathrooms and high-temp degreasing for kitchens.",
          iconName: "Wrench"
        },
        {
          title: "Spotless Supervisor Handover Guarantee",
          description: "Detailed area sign-off with customer re-scrub assurance before our team leaves.",
          iconName: "ClipboardCheck"
        }
      ]
    },
    gallery: [
      {
        id: "dc-1",
        title: "Pre-Occupancy & Corporate Deep Cleaning",
        subtitle: "Comprehensive end-to-end commercial cleanup with HEPA vacuuming and high-reach glass wiping.",
        image: "/images/hero-deep-clean-clean.jpg",
        objectPosition: "object-[center_25%]"
      },
      {
        id: "dc-2",
        title: "Quality Supervisor Sign-Off & Handover",
        subtitle: "Detailed 50-point inspection checklist verified with client before service completion.",
        image: "/images/about-supervisor.jpg",
        objectPosition: "object-[center_top]"
      },
      {
        id: "dc-3",
        title: "Kitchen & Washroom Intensive Sanitization",
        subtitle: "High-grade descaling, tile grime removal, and germicidal disinfection of sanitary fixtures.",
        image: "/images/deep-cleaning.jpg",
        objectPosition: "object-[center_top]"
      },
      {
        id: "dc-4",
        title: "Heavy-Duty Rotary Floor Scrubbing",
        subtitle: "Single-disc industrial scrubbers restoring marble gloss, descaling hard water deposits, and deep-grouting.",
        image: "/images/floor-cleaning.jpg",
        objectPosition: "object-[center_top]"
      },
      {
        id: "dc-5",
        title: "High-Traffic Carpet & Upholstery Care",
        subtitle: "Deep extraction shampooing, stain neutralization, and rapid-dry sanitization for office seating.",
        image: "/images/scope-housekeeping-clean.jpg",
        objectPosition: "object-[45%_top]"
      },
      {
        id: "dc-6",
        title: "Certified MSDS Chemicals & Modern Machinery",
        subtitle: "Hospital-grade, non-hazardous cleaning chemicals paired with heavy-duty commercial equipment.",
        image: "/images/housekeeping-materials.jpg",
        objectPosition: "object-[center_25%]"
      }
    ],
    testimonialSubtitle: "Trusted by corporate offices, healthcare facilities, and premier residences for intensive sanitization.",
    testimonials: [
      {
        id: "dc-rev-1",
        name: "Dr. Archana Reddy",
        role: "Medical Superintendent, CareLife Specialty Clinic",
        rating: 5,
        quote: "We hired DVS for hospital-grade deep sanitization prior to our NABH inspection. Their team used certified MSDS-compliant disinfectants and rotary scrubbers to restore our clinic floors, OT corridors, and consultation rooms to spotless, sterile perfection."
      },
      {
        id: "dc-rev-2",
        name: "Suresh Nambiar",
        role: "General Manager, Grand Boulevard Hotel & Banquets",
        rating: 5,
        quote: "The kitchen degreasing and tile restoration was remarkable. Months of stubborn exhaust grease and hard-water bathroom scaling were completely eradicated in a single night shift. Their supervisor performed a rigorous 50-point checklist inspection before handover."
      },
      {
        id: "dc-rev-3",
        name: "Meenakshi Krishnan",
        role: "Homeowner, Palm Meadows Villas",
        rating: 5,
        quote: "Booked DVS for pre-occupancy deep cleaning of our 4-BHK duplex villa. From single-disc marble buffing and window track vacuuming to cupboard sanitization and ceiling fan dusting, every nook and corner looked brand new. Extremely courteous and hardworking crew!"
      },
      {
        id: "dc-rev-4",
        name: "Anand R. Verma",
        role: "Admin & Workplace Head, CloudScale Solutions",
        rating: 5,
        quote: "Following extensive office renovation, our 12,000 sq.ft workspace was covered in fine plaster dust and grime. DVS deployed industrial HEPA vacuums and floor buffers over the weekend. On Monday morning, the office was pristine, fresh-smelling, and ready for operations."
      }
    ]
  }
];

export const PRODUCT_HOUSEKEEPING_MATERIALS = {
  slug: "housekeeping-materials",
  title: "Housekeeping Material Supply",
  badge: "Product Supply",
  heroHeadline: "Premium Quality",
  heroHighlight: "Housekeeping Materials",
  heroDescription: "Wholesale & retail direct supply of industrial cleaning chemicals, heavy-duty microfiber cloths, mops, sanitizers, and restroom consumables across India.",
  heroImage: "/images/product-hero-bg.jpg",
  categories: [
    {
      name: "Cleaning Chemicals",
      items: [
        {
          id: "chm-1",
          name: "Hospital Grade Multi-Surface Floor Disinfectant (5 Litres)",
          price: 650,
          original_price: 850,
          description: "Anti-bacterial disinfectant concentrate effective against 99.9% pathogens. Ideal for marble, granite, epoxy floors, corridors, and high-traffic healthcare environments.",
          short_description: "Concentrated 5L floor disinfectant for commercial facilities",
          sku: "DVS-CHM-001",
          stock_status: "in_stock",
          image_url: "https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "chm-2",
          name: "Heavy Duty Kitchen Degreaser & Chimney Cleaner (5 Litres)",
          price: 820,
          original_price: 1100,
          description: "Industrial-strength alkaline degreaser that penetrates burnt grease, commercial stove oils, exhaust hoods, and food processing prep tables without corrosive fumes.",
          short_description: "Heavy duty kitchen oil & grease remover concentrate",
          sku: "DVS-CHM-002",
          stock_status: "in_stock",
          image_url: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "chm-3",
          name: "Streak-Free Glass, Mirror & Facade Solution (5 Litres)",
          price: 480,
          original_price: 650,
          description: "Fast-evaporating window and mirror cleaner with anti-static formulation. Eliminates finger smudges, dust build-up, and water spots on glass partitions and counters.",
          short_description: "Crystal-clear streak-free glass & mirror cleaner",
          sku: "DVS-CHM-003",
          stock_status: "in_stock",
          image_url: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "chm-4",
          name: "Toilet Bowl Descaler & Hard Water Scale Remover (5 Litres)",
          price: 560,
          original_price: 750,
          description: "Thickened clinging acid descaling gel that dissolves tough hard water stains, lime scale, and rust rings from ceramic commodes and urinals with zero scrubbing strain.",
          short_description: "Powerful limescale & hard water stain remover",
          sku: "DVS-CHM-004",
          stock_status: "in_stock",
          image_url: "https://images.unsplash.com/photo-1585421514785-3a05cf52f5ee?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      name: "Cleaning Tools",
      items: [
        {
          id: "tls-1",
          name: "Color Coded Premium Microfiber Towels (Pack of 12 - 380 GSM)",
          price: 590,
          original_price: 799,
          description: "Lint-free, scratch-proof plush microfiber cloths categorized for pantry (blue), washroom (red), glass (green), and workstations (yellow) to prevent cross-contamination.",
          short_description: "12-pack 380 GSM multi-color microfiber cloths",
          sku: "DVS-TLS-001",
          stock_status: "in_stock",
          image_url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "tls-2",
          name: "Industrial Kentucky Wet Mop with Aluminum Ergonomic Handle",
          price: 420,
          original_price: 550,
          description: "400g looped-end cotton yarn wet mop head with heavy-duty quick-release clamp and lightweight anodized aluminum telescopic pole for corporate and hospital corridors.",
          short_description: "Commercial heavy-duty wet mop with lock clamp",
          sku: "DVS-TLS-002",
          stock_status: "in_stock",
          image_url: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "tls-3",
          name: "Double Rubber Floor & Window Squeegee Wiper (55 cm)",
          price: 380,
          original_price: 499,
          description: "Durable reinforced metal frame with high-density twin foam rubber blades. Instantly dries wet bathroom floors, basement spillages, and glass walls.",
          short_description: "55cm heavy-duty rubber floor squeegee wiper",
          sku: "DVS-TLS-003",
          stock_status: "in_stock",
          image_url: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "tls-4",
          name: "High-Reach Telescopic Cobweb Duster & Extension Pole (3 Metres)",
          price: 890,
          original_price: 1200,
          description: "Electrostatic flagged-bristle dome duster with 3-section lockable aluminum telescopic rod. Effortlessly reaches high false ceilings, HVAC duct grilles, and chandeliers.",
          short_description: "3-meter extendable high ceiling cobweb duster",
          sku: "DVS-TLS-004",
          stock_status: "in_stock",
          image_url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      name: "Cleaning Machines",
      items: [
        {
          id: "mch-1",
          name: "Heavy-Duty Single Disc Floor Scrubber & Polisher (17 Inch / 1.5 HP)",
          price: 48500,
          original_price: 56000,
          description: "All-metal planetary steel gear transmission, safety handle switch, and 1200W high-torque motor. Ideal for diamond marble polishing, crystallization, and granite restoration.",
          short_description: "Commercial 17-inch floor scrubber, buffer & polisher",
          sku: "DVS-MCH-001",
          stock_status: "in_stock",
          image_url: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "mch-2",
          name: "Industrial Wet & Dry Vacuum Cleaner (60 Litres Twin Motor)",
          price: 18900,
          original_price: 23500,
          description: "Dual 2000W copper-wound suction turbines, stainless steel collection barrel, washable HEPA filter, and full accessory set for post-construction cleanup and carpet cleaning.",
          short_description: "60L dual-motor heavy industrial wet & dry vacuum",
          sku: "DVS-MCH-002",
          stock_status: "in_stock",
          image_url: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "mch-3",
          name: "Commercial High-Pressure Washer Water Jet (160 Bar)",
          price: 24500,
          original_price: 29900,
          description: "Induction motor pressure washer with forged brass pump, 10m high-tensile steel braided hose, and auto-stop trigger gun for building exterior facades, parking lots, and fleet washing.",
          short_description: "160 Bar commercial induction high-pressure jet cleaner",
          sku: "DVS-MCH-003",
          stock_status: "in_stock",
          image_url: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "mch-4",
          name: "Walk-Behind Automatic Battery Floor Scrubber Dryer (50 Litres)",
          price: 145000,
          original_price: 175000,
          description: "Industrial cordless battery-powered automatic scrubber dryer that simultaneously scrubs, washes, and vacuum-dries supermarket aisles, airport lounges, and warehouse corridors.",
          short_description: "Battery powered 50L walk-behind floor scrubber dryer",
          sku: "DVS-MCH-004",
          stock_status: "in_stock",
          image_url: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      name: "Housekeeping Consumables",
      items: [
        {
          id: "cns-1",
          name: "2-Ply Virgin Pulp Toilet Paper Jumbo Rolls (Box of 12 Rolls)",
          price: 840,
          original_price: 1050,
          description: "100% virgin wood pulp, ultra-soft, fast-dissolving septic-safe 2-ply jumbo rolls designed for commercial high-traffic corporate washrooms and hospitality suites.",
          short_description: "Pack of 12 jumbo toilet paper rolls for commercial restrooms",
          sku: "DVS-CNS-001",
          stock_status: "in_stock",
          image_url: "https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "cns-2",
          name: "Absorbent C-Fold & M-Fold Hand Paper Towels (2400 Sheets Carton)",
          price: 720,
          original_price: 950,
          description: "High wet-strength embossed virgin paper towels that dry hands in one pull. Fits all standard wall-mounted commercial restroom dispensers.",
          short_description: "Carton of 2400 premium absorbent paper hand towels",
          sku: "DVS-CNS-002",
          stock_status: "in_stock",
          image_url: "https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "cns-3",
          name: "Moisturizing Antibacterial Liquid Hand Wash (5 Litres Can)",
          price: 450,
          original_price: 600,
          description: "Skin-friendly pH 5.5 balanced moisturizing liquid soap enriched with vitamin E and aloe vera. Leaves a pleasant refreshing aroma in executive restrooms.",
          short_description: "Gentle moisturizing antibacterial hand wash refill can",
          sku: "DVS-CNS-003",
          stock_status: "in_stock",
          image_url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "cns-4",
          name: "Enzyme Anti-Splash Urinal Fragrance Screen Mats (Pack of 10)",
          price: 650,
          original_price: 850,
          description: "30-day continuous fragrance deodorizer mat with active enzymatic bacteria that eliminate drain odors and prevent urinal splashing, keeping floors clean.",
          short_description: "10-pack anti-splash deodorizing urinal screen mats",
          sku: "DVS-CNS-004",
          stock_status: "in_stock",
          image_url: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      name: "Housekeeping Equipment",
      items: [
        {
          id: "eqp-1",
          name: "Commercial 3-Tier Multi-Function Janitor Housekeeping Cart",
          price: 7800,
          original_price: 9500,
          description: "Reinforced structural foam trolley with 3 heavy-duty storage shelves, side mop holders, smooth non-marking caster wheels, and a 120-litre zippered yellow vinyl waste bag.",
          short_description: "3-shelf heavy duty commercial janitor service trolley",
          sku: "DVS-EQP-001",
          stock_status: "in_stock",
          image_url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "eqp-2",
          name: "Double Bucket Down-Press Wringer Mop Trolley (36 Litres)",
          price: 3400,
          original_price: 4200,
          description: "Dual clean and dirty water bucket partition with heavy-duty ergonomic steel down-press wringer mechanism and 360-degree silent swivel wheels for janitorial teams.",
          short_description: "36L dual-bucket mopping trolley with down-press wringer",
          sku: "DVS-EQP-002",
          stock_status: "in_stock",
          image_url: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "eqp-3",
          name: "High-Visibility 'Caution Wet Floor' Folding Signboards (Set of 4)",
          price: 1100,
          original_price: 1450,
          description: "OSHA-compliant bright fluorescent yellow A-frame warning boards with bilingual text and universal slipping icon. Folds flat for compact transport.",
          short_description: "Set of 4 heavy-duty hazard caution safety signboards",
          sku: "DVS-EQP-003",
          stock_status: "in_stock",
          image_url: "https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "eqp-4",
          name: "Brushed Stainless Steel Soft-Close Pedal Dustbin (30 Litres)",
          price: 2200,
          original_price: 2800,
          description: "Fingerprint-resistant commercial SS-304 sanitary dustbin with robust foot pedal, silent hydraulic lid damper, and removable inner plastic bin with bag tuck opening.",
          short_description: "30L brushed stainless steel hands-free pedal bin",
          sku: "DVS-EQP-004",
          stock_status: "in_stock",
          image_url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80"
        }
      ]
    }
  ]
};

export const COMPANY_STATS = [
  { value: "500+", label: "Trained Indian Staff", icon: "Users" },
  { value: "99%", label: "Client Satisfaction", icon: "ThumbsUp" },
  { value: "150+", label: "Corporate & Residential Sites", icon: "Building" },
  { value: "24/7", label: "Dedicated Support & Supervision", icon: "Clock" }
];

export const STEP_PROCESS = [
  {
    step: "01",
    title: "Share Requirement",
    desc: "Call us or submit the simple form with your facility, security, or cleaning needs."
  },
  {
    step: "02",
    title: "Quick Assessment & Quote",
    desc: "Our supervisor assesses the site and provides an honest, transparent customized proposal."
  },
  {
    step: "03",
    title: "Deployment of Trained Staff",
    desc: "Background-verified, uniformed staff deployed with required materials and equipment."
  },
  {
    step: "04",
    title: "100% Quality Assurance",
    desc: "Continuous supervision, periodic audit checklists, and instant issue escalation handling."
  }
];

export const TESTIMONIALS = [
  {
    name: "Rajesh Sharma",
    role: "Facility Director, Apex Tech Parks",
    quote: "DVS Facilities provides outstanding housekeeping and electrical maintenance. Their staff is always on time, polite, and thoroughly professional.",
    rating: 5,
    location: "Bangalore"
  },
  {
    name: "Sunita Deshmukh",
    role: "Secretary, Green Meadows Society",
    quote: "We hired their security guard supply and deep cleaning service. The team is disciplined and the kitchen and washroom deep cleaning was spectacular!",
    rating: 5,
    location: "Pune"
  },
  {
    name: "Anand Verma",
    role: "Admin Head, Global Logistics Ltd",
    quote: "Their housekeeping material supply is top quality and very cost effective. Delivered on time every single month without fail.",
    rating: 5,
    location: "Hyderabad"
  }
];

export const TEAM_MEMBERS = [
  {
    name: "Rajesh Kumar",
    role: "Operations & Facility Head",
    exp: "12+ Years Experience",
    image: "/images/team-1.jpg"
  },
  {
    name: "Priya Sundaram",
    role: "Quality & Housekeeping Lead",
    exp: "8+ Years Experience",
    image: "/images/about-supervisor.jpg"
  },
  {
    name: "Vikram Singh",
    role: "Chief Security Officer",
    exp: "15+ Years Ex-Defense",
    image: "/images/security-services.jpg"
  }
];
