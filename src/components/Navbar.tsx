import React, { useState } from "react";
import { Settings, Menu, X, Lock } from "lucide-react";

interface NavbarProps {
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  onLogoutAdmin: () => void;
}

export default function Navbar({ onOpenAdmin, isAdminLoggedIn, onLogoutAdmin }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/85 backdrop-blur-md border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Typographic Logo Replicating the Brand Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="flex flex-col items-start leading-none select-none">
              <span className="font-serif italic font-extrabold text-2xl tracking-wide text-white flex items-center">
                Titanium
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 ml-0.5 animate-pulse" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.35em] text-neutral-400 mt-1 uppercase">
                Q A T A R
              </span>
            </div>
            
            <div className="h-8 w-[1px] bg-neutral-800 hidden sm:block" />
            
            {/* Arabic Script Logo matching brand image */}
            <div className="hidden sm:flex flex-col items-start leading-none select-none">
              <span className="font-bold text-lg text-white tracking-wider flex items-center" style={{ fontFamily: "sans-serif" }}>
                تـيـتـانـيـوم
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-600 ml-0.5" />
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("services")} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer">
              Services
            </button>
            <button onClick={() => scrollToSection("interactive-demos")} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer">
              Interactive Demos
            </button>
            <button onClick={() => scrollToSection("gallery")} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer">
              Portfolio
            </button>
            <button onClick={() => scrollToSection("testimonials")} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer">
              Reviews
            </button>
            <button onClick={() => scrollToSection("booking")} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer">
              Showrooms
            </button>

            <div className="h-5 w-[1px] bg-neutral-800" />

            {/* CMS / Admin Login button */}
            {isAdminLoggedIn ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-red-600/10 text-red-400 text-xs font-semibold hover:bg-red-600/20 transition-colors border border-red-900/50 cursor-pointer"
                >
                  <Settings size={14} className="animate-spin" />
                  <span>CMS Dashboard</span>
                </button>
                <button
                  onClick={onLogoutAdmin}
                  className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors underline cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdmin}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-neutral-900 text-neutral-400 hover:text-white text-xs font-medium transition-colors border border-neutral-800 hover:border-neutral-700 cursor-pointer"
              >
                <Lock size={12} />
                <span>Client CMS</span>
              </button>
            )}

            <button
              onClick={() => scrollToSection("booking")}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-600/10 cursor-pointer"
            >
              Book Consultation
            </button>
          </nav>

          {/* Mobile Menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {isAdminLoggedIn && (
              <button
                onClick={onOpenAdmin}
                className="p-1.5 rounded-md bg-red-600/15 text-red-400 border border-red-900/50"
              >
                <Settings size={16} />
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-neutral-400 hover:text-white focus:outline-none cursor-pointer"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-neutral-900 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <button
              onClick={() => scrollToSection("services")}
              className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-neutral-300 hover:text-white hover:bg-neutral-900"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("interactive-demos")}
              className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-neutral-300 hover:text-white hover:bg-neutral-900"
            >
              Interactive Demos
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-neutral-300 hover:text-white hover:bg-neutral-900"
            >
              Portfolio Gallery
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-neutral-300 hover:text-white hover:bg-neutral-900"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection("booking")}
              className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-neutral-300 hover:text-white hover:bg-neutral-900"
            >
              Showrooms & Booking
            </button>
            
            <div className="h-[1px] bg-neutral-900 my-2" />

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenAdmin();
              }}
              className="flex w-full items-center space-x-2 px-3 py-3 rounded-md text-base font-medium text-neutral-300 hover:text-white hover:bg-neutral-900"
            >
              <Lock size={16} />
              <span>{isAdminLoggedIn ? "CMS Dashboard" : "Admin CMS Login"}</span>
            </button>

            <div className="pt-2 px-3">
              <button
                onClick={() => scrollToSection("booking")}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 rounded-md font-semibold text-base shadow-md"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
