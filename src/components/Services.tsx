import React, { useState } from "react";
import { Service } from "../types";
import { Shield, Sparkles, Check, ChevronRight } from "lucide-react";

interface ServicesProps {
  services: Service[];
  onSelectService: (serviceCategory: string) => void;
}

export default function Services({ services, onSelectService }: ServicesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Shields / الكل" },
    { id: "tint", label: "Window Tint / عازل حراري" },
    { id: "ppf", label: "Paint Protection / حماية الطلاء" },
    { id: "ceramic", label: "Ceramic / سيراميك" },
    { id: "wrap", label: "Wrapping / تجليد سيارات" },
    { id: "detailing", label: "Detailing / تلميع" }
  ];

  const filteredServices = selectedCategory === "all" 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  return (
    <section id="services" className="py-24 bg-neutral-950 border-b border-neutral-900 text-white relative">
      
      {/* Decorative Radial Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-red-600/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-red-500 font-mono text-xs uppercase tracking-[0.25em] font-semibold flex items-center justify-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            <span>Titanium Elite Services</span>
          </span>
          <h2 className="text-3xl md:text-5xl font-serif italic font-extrabold tracking-tight">
            Our Shielding Treatments
          </h2>
          <p className="text-neutral-400 font-sans max-w-xl mx-auto text-sm md:text-base">
            Engineered with microscopic resilience to protect, glaze, and insulate. 
            All treatments are applied in our state-of-the-art dust-controlled Doha cleanroom.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-neutral-900 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/15"
                  : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-850 hover:border-neutral-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dynamic Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <div 
              key={service.id}
              className="group relative flex flex-col h-full rounded-xl bg-neutral-900/45 border border-neutral-850 hover:border-neutral-800 transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 overflow-hidden"
            >
              
              {/* Card Header Media */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={service.imageUrl} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Glass Tint Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-90" />
                
                {/* Premium Price Tag */}
                <span className="absolute top-4 right-4 px-3 py-1 bg-neutral-950/90 border border-neutral-800 text-[10px] font-mono text-neutral-300 rounded font-bold uppercase">
                  {service.priceRange}
                </span>

                {/* Arabic mini tag floating */}
                <span className="absolute bottom-3 left-4 text-xs font-medium text-neutral-300 bg-neutral-950/60 px-2 py-0.5 rounded backdrop-blur-sm">
                  خدمة فاخرة
                </span>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                
                {/* Title & Desc */}
                <div className="space-y-4">
                  
                  {/* English Title */}
                  <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-red-500 transition-colors">
                    {service.title}
                  </h3>
                  
                  {/* Arabic Title */}
                  <h4 className="text-md font-bold text-neutral-300 text-right font-sans" style={{ direction: "rtl" }}>
                    {service.titleAr}
                  </h4>

                  {/* English Desc */}
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed line-clamp-3">
                    {service.description}
                  </p>

                  {/* Arabic Desc */}
                  <p className="text-xs text-neutral-500 font-sans leading-relaxed line-clamp-3 text-right" style={{ direction: "rtl" }}>
                    {service.descriptionAr}
                  </p>

                </div>

                {/* Tech Specs Panel */}
                <div className="space-y-2 border-t border-b border-neutral-900 py-4">
                  {service.specs.map((spec, specIdx) => (
                    <div key={specIdx} className="flex justify-between items-center text-[11px] font-mono">
                      <span className="text-neutral-500 uppercase tracking-wider">{spec.label}</span>
                      <span className="text-neutral-300 font-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Booking Button */}
                <button
                  onClick={() => onSelectService(service.category)}
                  className="w-full bg-neutral-950 hover:bg-red-600 border border-neutral-800 hover:border-red-600 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 text-neutral-300 hover:text-white cursor-pointer group/btn"
                >
                  <span>Request Custom Quote</span>
                  <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>

              </div>

            </div>
          ))}

          {filteredServices.length === 0 && (
            <div className="col-span-full py-12 text-center bg-neutral-900/30 border border-neutral-850 rounded-xl">
              <p className="text-neutral-500 font-mono text-sm">No services listed in this category yet.</p>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
