import React, { useState, useEffect } from "react";
import { Service, Project, Inquiry, Testimonial } from "./types";
import { 
  INITIAL_SERVICES, 
  INITIAL_PROJECTS, 
  INITIAL_TESTIMONIALS 
} from "./data";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PPFHealingDemo from "./components/PPFHealingDemo";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import ContactForm from "./components/ContactForm";
import AdminPanel from "./components/AdminPanel";
import { 
  Star, Shield, Sparkles, MessageSquare, ShieldCheck, 
  Lock, Settings, ArrowUp, Instagram, Linkedin, MapPin, ExternalLink 
} from "lucide-react";

export default function App() {
  // CMS Core States (Loaded from LocalStorage or seeded with initial luxury data)
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // UI Flow States
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [selectedServiceCategory, setSelectedServiceCategory] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Initialize and Seed LocalStorage Database
  useEffect(() => {
    // 1. Services
    const storedServices = localStorage.getItem("titanium_services");
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    } else {
      localStorage.setItem("titanium_services", JSON.stringify(INITIAL_SERVICES));
      setServices(INITIAL_SERVICES);
    }

    // 2. Projects
    const storedProjects = localStorage.getItem("titanium_projects");
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    } else {
      localStorage.setItem("titanium_projects", JSON.stringify(INITIAL_PROJECTS));
      setProjects(INITIAL_PROJECTS);
    }

    // 3. Testimonials
    const storedTestimonials = localStorage.getItem("titanium_testimonials");
    if (storedTestimonials) {
      setTestimonials(JSON.parse(storedTestimonials));
    } else {
      localStorage.setItem("titanium_testimonials", JSON.stringify(INITIAL_TESTIMONIALS));
      setTestimonials(INITIAL_TESTIMONIALS);
    }

    // 4. Admin Auth Session
    const storedAuth = localStorage.getItem("titanium_admin_auth");
    if (storedAuth === "true") {
      setIsAdminLoggedIn(true);
    }

    // 5. Inquiries (Seeded with realistic customer bookings)
    const storedInquiries = localStorage.getItem("titanium_inquiries");
    if (storedInquiries) {
      setInquiries(JSON.parse(storedInquiries));
    } else {
      const initialInquiries: Inquiry[] = [
        {
          id: "iq-1",
          customerName: "Fahad Al-Marri",
          phone: "+974 5511 2233",
          email: "fahad.almarri@qatar.io",
          vehicleModel: "Land Cruiser LC300 VXR (2026)",
          serviceCategory: "ppf",
          message: "Looking for a full matte self-healing PPF wrap. Please advise on prices and calendar availability.",
          date: "2026-07-08 14:32",
          status: "pending"
        },
        {
          id: "iq-2",
          customerName: "Nasser Al-Kwari",
          phone: "+974 6600 9988",
          email: "nasser@alkwari.com",
          vehicleModel: "Porsche 911 GT3 RS",
          serviceCategory: "tint",
          message: "Need the premium nano-ceramic tint on all windows. Please schedule for this Thursday.",
          date: "2026-07-09 09:15",
          status: "contacted"
        }
      ];
      localStorage.setItem("titanium_inquiries", JSON.stringify(initialInquiries));
      setInquiries(initialInquiries);
    }

    // Scroll listener for "Back to top" button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update Services in state & DB
  const handleUpdateServices = (newServices: Service[]) => {
    setServices(newServices);
    localStorage.setItem("titanium_services", JSON.stringify(newServices));
  };

  // Update Projects in state & DB
  const handleUpdateProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem("titanium_projects", JSON.stringify(newProjects));
  };

  // Update Inquiries in state & DB
  const handleUpdateInquiries = (newInquiries: Inquiry[]) => {
    setInquiries(newInquiries);
    localStorage.setItem("titanium_inquiries", JSON.stringify(newInquiries));
  };

  // Handle new submission from public contact form
  const handleAddInquiry = (newInq: Omit<Inquiry, "id" | "date" | "status">) => {
    const formattedDate = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const fullInquiry: Inquiry = {
      id: "iq-" + Date.now(),
      ...newInq,
      date: formattedDate,
      status: "pending"
    };
    const updated = [fullInquiry, ...inquiries];
    setInquiries(updated);
    localStorage.setItem("titanium_inquiries", JSON.stringify(updated));
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem("titanium_admin_auth", "true");
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("titanium_admin_auth");
  };

  const handleSelectServiceFromGrid = (category: string) => {
    setSelectedServiceCategory(category);
    // Smooth scroll to contact/booking form
    const bookingEl = document.getElementById("booking");
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-neutral-950 min-h-screen text-white font-sans selection:bg-red-600 selection:text-white">
      
      {/* 1. Header Navigation */}
      <Navbar 
        onOpenAdmin={() => setIsAdminOpen(true)} 
        isAdminLoggedIn={isAdminLoggedIn}
        onLogoutAdmin={handleAdminLogout}
      />

      {/* 2. Breathtaking Hero Section with Heat Simulator */}
      <Hero />

      {/* 3. Interactive PPF Self-Healing Simulation Playground */}
      <PPFHealingDemo />

      {/* 4. Modular Services Grid (CRUD updateable) */}
      <Services 
        services={services} 
        onSelectService={handleSelectServiceFromGrid} 
      />

      {/* 5. Filterable Photo Gallery (CRUD updateable) */}
      <Gallery projects={projects} />

      {/* 6. Premium Bento Reviews / Testimonials Section */}
      <section id="testimonials" className="py-24 bg-neutral-950 border-b border-neutral-900 text-white relative">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-neutral-600/[0.02] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-red-500 font-mono text-xs uppercase tracking-[0.25em] font-semibold flex items-center justify-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span>Verified Patron Satisfaction</span>
            </span>
            <h2 className="text-3xl md:text-5xl font-serif italic font-extrabold tracking-tight">
              Doha Elite Feedbacks
            </h2>
            <p className="text-neutral-400 font-sans max-w-xl mx-auto text-sm md:text-base">
              Discover why collectors, business executives, and car enthusiasts in Qatar trust the Titanium shield.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <div 
                key={t.id}
                className="p-6 rounded-2xl bg-neutral-900 border border-neutral-850 hover:border-neutral-800 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1 text-red-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-sm text-neutral-300 font-sans leading-relaxed italic">
                    "{t.comment}"
                  </p>

                </div>

                <div className="flex items-center justify-between border-t border-neutral-900 pt-4 mt-6">
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <p className="text-[10px] text-neutral-500 font-mono mt-0.5">{t.vehicle}</p>
                  </div>
                  
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 bg-neutral-950 px-2 py-1 rounded border border-neutral-850">
                    {t.source}
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Booking & Maps Showroom Coordinates */}
      <ContactForm 
        selectedServiceCategory={selectedServiceCategory}
        onAddInquiry={handleAddInquiry}
      />

      {/* 8. Fully Functional Administrative CMS Dashboard */}
      <AdminPanel 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        services={services}
        projects={projects}
        inquiries={inquiries}
        onUpdateServices={handleUpdateServices}
        onUpdateProjects={handleUpdateProjects}
        onUpdateInquiries={handleUpdateInquiries}
        onLoginSuccess={handleAdminLogin}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* 9. Elite Corporate Footer */}
      <footer className="bg-neutral-950 py-16 text-neutral-500 text-xs border-t border-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 border-b border-neutral-900 pb-10">
            
            {/* Logo display */}
            <div className="space-y-3 text-center md:text-left select-none">
              <span className="font-serif italic font-extrabold text-2xl tracking-wide text-white flex items-center justify-center md:justify-start">
                Titanium
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 ml-0.5" />
              </span>
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400">
                Premium Car Care Qatar
              </p>
              <div className="text-right font-sans font-bold text-neutral-300 pt-1 text-sm tracking-wider">
                تيتانيوم قطر
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-6 font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              <a href="#services" className="hover:text-white transition-colors">Treatments</a>
              <a href="#interactive-demos" className="hover:text-white transition-colors">PPF Tech</a>
              <a href="#gallery" className="hover:text-white transition-colors">Showcase</a>
              <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
              <a href="#booking" className="hover:text-white transition-colors">Book Now</a>
            </div>

            {/* Social connections */}
            <div className="flex items-center space-x-4">
              <a 
                href="https://www.linkedin.com/company/titanium-qatar/?originalSubdomain=qa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-neutral-900 border border-neutral-850 hover:border-neutral-700 hover:text-white transition-all cursor-pointer"
                title="Titanium Qatar LinkedIn"
              >
                <Linkedin size={14} />
              </a>
              <a 
                href="https://www.instagram.com/titaniumqatar?igsh=YjIzcWEwMzl3YXY4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-neutral-900 border border-neutral-850 hover:border-neutral-700 hover:text-white transition-all cursor-pointer"
                title="Titanium Qatar Instagram"
              >
                <Instagram size={14} />
              </a>
              <a 
                href="https://share.google/rGfGPi6tqoYKmS178" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-neutral-900 border border-neutral-850 hover:border-neutral-700 hover:text-white transition-all cursor-pointer"
                title="Doha Showroom on Maps"
              >
                <MapPin size={14} />
              </a>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-neutral-600 gap-4">
            <div>
              © 2026 Titanium Qatar. All rights reserved. Salwa Road Showroom, Doha.
            </div>

            <div className="flex items-center space-x-4">
              {/* Easy Admin Doorway */}
              <button 
                onClick={() => setIsAdminOpen(true)}
                className="flex items-center space-x-1 px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 hover:text-neutral-300 transition-colors border border-neutral-850 cursor-pointer"
              >
                <Lock size={10} />
                <span>Client CMS Portal</span>
              </button>
              
              <span className="text-[9px] uppercase">DOHA • QATAR</span>
            </div>
          </div>

        </div>
      </footer>

      {/* 10. Back to top button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all transform hover:scale-110 active:scale-95 cursor-pointer"
          title="Back to Top"
        >
          <ArrowUp size={16} />
        </button>
      )}

    </div>
  );
}
