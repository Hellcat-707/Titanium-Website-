import { Service, Project, Testimonial } from "./types";

export const INITIAL_SERVICES: Service[] = [
  {
    id: "s1",
    title: "Premium Nano-Ceramic Window Tinting",
    titleAr: "عازل حراري نانو سيراميك ممتاز",
    description: "Engineered for Qatar's extreme summer. Blocks up to 98% of infrared heat and 99% of harmful UV rays. Optical clarity with zero signal interference.",
    descriptionAr: "مصمم خصيصاً لمواجهة حرارة الصيف الشديدة في قطر. يحجب ما يصل إلى 98٪ من الأشعة تحت الحمراء و 99٪ من الأشعة فوق البنفسجية الضارة. وضوح بصري تام دون أي تداخل في إشارات الجوال أو نظام الملاحة.",
    category: "tint",
    specs: [
      { label: "Heat Rejection (IRR)", value: "Up to 98%" },
      { label: "UV Protection", value: "99.9%" },
      { label: "Thickness", value: "2.0 Mil" },
      { label: "Warranty", value: "Lifetime Limited" }
    ],
    priceRange: "QAR 1,200 - QAR 2,800",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "s2",
    title: "Self-Healing Paint Protection Film (PPF)",
    titleAr: "أفلام حماية الطلاء ذاتية المعالجة (PPF)",
    description: "An ultra-tough, high-gloss polyurethane barrier that shields your vehicle's paint from stone chips, sandstorms, road debris, and micro-scratches. Features instant self-healing.",
    descriptionAr: "درع بولي يوريثان فائق القوة وعالي اللمعان يحمي طلاء سيارتك من الحصى المتطاير، العواصف الرملية، ومخلفات الطريق والخدوش الدقيقة. يتميز بخاصية المعالجة الذاتية الفورية بالحرارة.",
    category: "ppf",
    specs: [
      { label: "Film Thickness", value: "8.5 Mils / 215 Microns" },
      { label: "Self-Healing", value: "Instant (Heat Activated)" },
      { label: "Clarity Index", value: "99.4% Ultra-Clear" },
      { label: "Warranty", value: "10 Years" }
    ],
    priceRange: "QAR 8,000 - QAR 16,000",
    imageUrl: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "s3",
    title: "9H Ultra Nano-Ceramic Coating",
    titleAr: "نانو سيراميك فائق الصلابة 9H",
    description: "Forms a permanent covalent bond with the factory paintwork, delivering a dramatic, high-gloss glass-like finish, extreme hydrophobic properties, and chemical resistance.",
    descriptionAr: "يشكل طبقة حماية صلبة ترتبط كيميائياً بطلاء المصنع، لتمنح سيارتك لمعاناً زجاجياً فائقاً، وخصائص مقاومة عالية جداً للماء والأوساخ وعوامل التجوية الكيميائية.",
    category: "ceramic",
    specs: [
      { label: "Hardness Grade", value: "9H Permanent Bond" },
      { label: "Gloss Improvement", value: "+45% Depth Enhancement" },
      { label: "Hydrophobic Angle", value: "115° Water Beading" },
      { label: "Warranty", value: "5 Years" }
    ],
    priceRange: "QAR 2,500 - QAR 5,500",
    imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "s4",
    title: "Exotic Full Vinyl Wrapping",
    titleAr: "تجليد وتغيير لون السيارة بالكامل",
    description: "Transform the aesthetic of your vehicle with our premium cast vinyl wrap options. Available in premium matte, satin, metallic, gloss, chrome, and color-shifting finishes.",
    descriptionAr: "غيّر مظهر سيارتك بالكامل مع خيارات التجليد الفاخرة لدينا. متوفر بتشطيبات ممتازة تشمل المطفي (المات)، الساتان، المعدني، اللامع، الكروم، وتغيير الألوان الديناميكي.",
    category: "wrap",
    specs: [
      { label: "Wrap Quality", value: "Cast Dual-Layer Vinyl" },
      { label: "Available Finishes", value: "150+ Color Options" },
      { label: "Removability", value: "Safe for Original Paint" },
      { label: "Warranty", value: "3 Years Workmanship" }
    ],
    priceRange: "QAR 6,500 - QAR 14,000",
    imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "s5",
    title: "Signature Stage-3 Detailing & Correction",
    titleAr: "تلميع وتصحيح طلاء متكامل (المرحلة الثالثة)",
    description: "Multi-stage paint correction to eliminate swirl marks, water spots, oxidation, and scratches. Followed by a deep interior detailing, leather conditioning, and steam sanitation.",
    descriptionAr: "عملية تصحيح طلاء متعددة المراحل لإزالة الدوائر والخدوش السطحية، بقع الماء، الأكسدة، والبهتان. يتبعها تنظيف عميق للمقصورة الداخلية، ترطيب الجلد الفاخر وتطهير بالبخار.",
    category: "detailing",
    specs: [
      { label: "Paint Leveling", value: "95%+ Scratch Removal" },
      { label: "Sanitization", value: "120°C Steam Treatment" },
      { label: "Interior Shield", value: "UV Leather & Fabric Guard" },
      { label: "Time Required", value: "24 - 48 Hours" }
    ],
    priceRange: "QAR 1,500 - QAR 3,500",
    imageUrl: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=800"
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "p1",
    vehicleName: "Porsche 911 GT3 RS",
    serviceCategory: "ppf",
    serviceName: "Full Self-Healing PPF & 9H Coating",
    description: "Complete seamless custom-cut premium matte PPF protection with ceramic hydrophobic top coat.",
    imageUrl: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800",
    year: 2025,
    featured: true
  },
  {
    id: "p2",
    vehicleName: "Toyota Land Cruiser LC300",
    serviceCategory: "tint",
    serviceName: "Full Window Thermal Insulation Tinting (98% IRR)",
    description: "Maximum heat rejection film installed on all windows and windshield to beat Doha's intense sun.",
    imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
    year: 2026,
    featured: true
  },
  {
    id: "p3",
    vehicleName: "Mercedes-Benz G63 AMG",
    serviceCategory: "wrap",
    serviceName: "Satin Titanium Grey Wrap & Gloss Black Accents",
    description: "Complete luxury color transformation using premium dual-cast satin vinyl wrap.",
    imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800",
    year: 2025,
    featured: true
  },
  {
    id: "p4",
    vehicleName: "Lamborghini Urus",
    serviceCategory: "ceramic",
    serviceName: "9H Dual Layer Ceramic Coating & Interior Detail",
    description: "Exquisite paint correction and double layer ceramic coating for an absolute mirror shine.",
    imageUrl: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=800",
    year: 2025,
    featured: false
  },
  {
    id: "p5",
    vehicleName: "Nissan Patrol Nismo",
    serviceCategory: "ppf",
    serviceName: "Frontal Kit PPF & Premium Thermal Tinting",
    description: "High impact protection film on front bumper, hood, side mirrors, and executive window tint.",
    imageUrl: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=800",
    year: 2026,
    featured: false
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Hamad Al-Thani",
    rating: 5,
    comment: "The absolute best place in Qatar for car tinting. I got their Premium Thermal Tint on my Land Cruiser, and the difference in temperature inside the car during midday is incredible. Amazing customer service at Salwa Road showroom!",
    vehicle: "Toyota Land Cruiser",
    source: "Google"
  },
  {
    id: "t2",
    name: "Sarah Jenkins",
    rating: 5,
    comment: "Flawless PPF installation on my Porsche. They pay extreme attention to detail—tucking all edges perfectly. It looks completely invisible. Fully recommend Titanium Qatar!",
    vehicle: "Porsche Macan GTS",
    source: "Google"
  },
  {
    id: "t3",
    name: "Faisal Al-Marri",
    rating: 5,
    comment: "Excellent ceramic coating and interior deep detailing. My car looks brand new, and water just slides right off. Transparent pricing and professional team. The CMS-based online catalog is super easy to browse.",
    vehicle: "Mercedes-Benz S-Class",
    source: "Instagram"
  }
];
