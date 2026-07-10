import React, { useState } from "react";
import { Project } from "../types";
import { Sliders, Camera, Eye, ExternalLink } from "lucide-react";

interface GalleryProps {
  projects: Project[];
}

export default function Gallery({ projects }: GalleryProps) {
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Works" },
    { id: "ppf", label: "PPF Protection" },
    { id: "tint", label: "Heat Insulation Tint" },
    { id: "ceramic", label: "Ceramic Glazing" },
    { id: "wrap", label: "Vinyl Wrapping" },
    { id: "detailing", label: "Deep Detailing" }
  ];

  const filteredProjects = filterCategory === "all"
    ? projects
    : projects.filter(p => p.serviceCategory === filterCategory);

  return (
    <section id="gallery" className="py-24 bg-neutral-950 border-b border-neutral-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 text-center md:text-left">
            <span className="text-red-500 font-mono text-xs uppercase tracking-[0.25em] font-semibold flex items-center justify-center md:justify-start space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span>Titanium Work Showcase</span>
            </span>
            <h2 className="text-3xl md:text-5xl font-serif italic font-extrabold tracking-tight">
              Elite Vehicle Gallery
            </h2>
            <p className="text-neutral-400 font-sans max-w-xl text-sm md:text-base">
              A premium archive of supercars, luxury SUVs, and exotic models treated and protected at Titanium Qatar. Filter our craftsmanship below.
            </p>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3 py-1.5 rounded-md text-[11px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  filterCategory === cat.id
                    ? "bg-neutral-100 text-neutral-950 font-bold"
                    : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-850 hover:border-neutral-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with Hover Effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-neutral-900 border border-neutral-850 shadow-lg hover:border-neutral-700 transition-all duration-300"
            >
              {/* Image */}
              <img 
                src={project.imageUrl} 
                alt={project.vehicleName} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Tint overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Tag for service category */}
              <span className="absolute top-4 left-4 px-2.5 py-1 bg-red-600 text-white font-mono text-[9px] uppercase tracking-wider rounded font-bold shadow-md z-10">
                {project.serviceCategory}
              </span>

              {/* Content Panel */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-10 space-y-2">
                <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest flex items-center space-x-1.5">
                  <span>{project.serviceName}</span>
                  <span className="w-1 h-1 rounded-full bg-neutral-700" />
                  <span>{project.year}</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-red-500 transition-colors">
                  {project.vehicleName}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2 font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                  {project.description}
                </p>
                <div className="pt-2 flex items-center text-[10px] font-mono text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <span className="mr-1">VIEW DETAILED SPECS</span>
                  <ExternalLink size={10} />
                </div>
              </div>

              {/* Subtle hover grid outline overlay */}
              <div className="absolute inset-0 border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl m-2" />
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-full py-20 text-center bg-neutral-900/10 border border-neutral-900 rounded-xl flex flex-col items-center justify-center space-y-2">
              <Camera className="w-12 h-12 text-neutral-700" />
              <p className="font-mono text-neutral-500 text-sm">No vehicles uploaded to this showcase category yet.</p>
              <p className="text-xs text-neutral-600 font-sans">Updates can be performed instantly via the CMS admin panel.</p>
            </div>
          )}
        </div>

        {/* Mini CTA inside Gallery */}
        <div className="mt-16 text-center">
          <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
            Want to see your vehicle featured here?
          </p>
          <button 
            onClick={() => {
              const el = document.getElementById("booking");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="text-white hover:text-red-500 font-bold font-sans text-sm mt-2 transition-colors cursor-pointer inline-flex items-center space-x-1"
          >
            <span>Schedule your vehicle booking today</span>
            <span>→</span>
          </button>
        </div>

      </div>
    </section>
  );
}
