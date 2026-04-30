import { ShieldCheck, Droplets, Home, Waves, Sparkles, Wind } from "lucide-react";

const services = [
  { title:"Roof Soft Wash",    short:"Remove moss, algae and black streaks safely — no pressure, no shingle damage.",    desc:"Biodegradable solution kills growth at the root for lasting results. Safe on asphalt, cedar, metal and tile.",           icon:ShieldCheck, price:"From $349",    duration:"2–4 hrs",  image:"/roof-cleaning.jpg",  popular:true  },
  { title:"Gutter Cleaning",   short:"Clear blocked gutters before overflow damages fascia, siding and foundations.",     desc:"Full scoop-out, downspout flush and visual inspection included. Great for seasonal property maintenance.",           icon:Droplets,    price:"From $149",    duration:"1–2 hrs",  image:"/image-2.jpg",        popular:false },
  { title:"House Washing",     short:"Restore siding, trim and soffits with a gentle, thorough soft wash.",              desc:"Safe for vinyl, Hardie board, stucco and painted surfaces. Removes dirt, mildew and algae cleanly.",               icon:Home,        price:"From $299",    duration:"2–3 hrs",  image:"/image-1.jpg",        popular:false },
  { title:"Pressure Washing",  short:"Deep-clean driveways, patios and hard surfaces to a like-new finish.",             desc:"Powerful cleaning for concrete, brick and pavers. Cuts through stains, marks and grime fast.",                      icon:Waves,       price:"From $199",    duration:"1–3 hrs",  image:"/floor.jpg",          popular:false },
  { title:"Window Cleaning",   short:"Crystal-clear, streak-free exterior windows that refresh the whole property.",     desc:"Pure-water fed-pole system for spotless results up to 3 storeys. Includes frames, sills and screens.",             icon:Sparkles,    price:"From $179",    duration:"1–2 hrs",  image:"/window-cleaning.jpg", popular:false },
  { title:"Maintenance Plans", short:"Scheduled seasonal care — roof, gutters and surfaces in one recurring bundle.",    desc:"Priority scheduling, locked pricing and no annual contracts. Ideal for homeowners and strata.",                      icon:Wind,        price:"From $499/yr", duration:"Ongoing",  image:"/pipe-cleaning.jpg",  popular:false },
];

export default services;
