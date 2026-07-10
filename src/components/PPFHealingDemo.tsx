import React, { useState, useRef, MouseEvent, TouchEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Flame, ShieldAlert, CheckCircle, RefreshCw } from "lucide-react";

interface Scratch {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export default function PPFHealingDemo() {
  const [scratches, setScratches] = useState<Scratch[]>([
    { id: 1, startX: 40, startY: 60, endX: 280, endY: 75 },
    { id: 2, startX: 60, startY: 110, endX: 320, endY: 90 },
    { id: 3, startX: 120, startY: 160, endX: 380, endY: 145 },
  ]);
  const [isScratching, setIsScratching] = useState(false);
  const [isHealing, setIsHealing] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [healingProgress, setHealingProgress] = useState(0); // 0 to 100
  const panelRef = useRef<HTMLDivElement>(null);

  // Track the current path coordinates for drawing active scratch
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const getCoordinates = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
    if (!panelRef.current) return null;
    const rect = panelRef.current.getBoundingClientRect();
    
    // Check if it's a touch event
    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const handleStart = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
    if (isHealing) return;
    const coords = getCoordinates(e);
    if (!coords) return;
    setIsScratching(true);
    lastPos.current = coords;
  };

  const handleMove = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
    if (!isScratching || !lastPos.current || isHealing) return;
    const coords = getCoordinates(e);
    if (!coords) return;

    // To prevent generating too many scratches, only add if moved sufficiently
    const dist = Math.hypot(coords.x - lastPos.current.x, coords.y - lastPos.current.y);
    if (dist > 15) {
      const newScratch: Scratch = {
        id: Date.now() + Math.random(),
        startX: lastPos.current.x,
        startY: lastPos.current.y,
        endX: coords.x,
        endY: coords.y,
      };
      setScratches((prev) => [...prev, newScratch]);
      lastPos.current = coords;
    }
  };

  const handleEnd = () => {
    setIsScratching(false);
    lastPos.current = null;
  };

  // Simulate self-healing process triggered by thermal expansion (sun or hot water)
  const triggerSelfHealing = () => {
    if (scratches.length === 0 || isHealing) return;
    setIsHealing(true);
    setHealingProgress(0);

    const duration = 2500; // 2.5 seconds
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = Math.min((currentStep / steps) * 100, 100);
      setHealingProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setScratches([]);
        setIsHealing(false);
        setHealingProgress(0);
        setShowSparkle(true);
        setTimeout(() => setShowSparkle(false), 2000);
      }
    }, intervalTime);
  };

  const resetScratches = () => {
    setScratches([
      { id: 1, startX: 50, startY: 80, endX: 250, endY: 90 },
      { id: 2, startX: 80, startY: 130, endX: 340, endY: 110 },
      { id: 3, startX: 150, startY: 170, endX: 420, endY: 150 },
    ]);
    setShowSparkle(false);
  };

  return (
    <section id="interactive-demos" className="py-20 bg-neutral-950 border-b border-neutral-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-red-500 font-mono text-xs uppercase tracking-[0.25em] font-semibold flex items-center justify-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span>Aerospace Polyurethane Technology</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-serif italic font-extrabold tracking-tight">
            Self-Healing Paint Protection
          </h2>
          <p className="text-neutral-400 font-sans max-w-xl mx-auto text-sm md:text-base">
            Titanium PPF shields your luxury car from Doha's intense road grit. Watch how minor scratches vanish instantly under heat!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Interactive Playground Canvas */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Interactive Car Panel Card */}
            <div className="w-full max-w-xl relative">
              <span className="absolute -top-3 left-6 px-3 py-1 bg-neutral-900 border border-neutral-800 text-[10px] font-mono rounded text-neutral-400 z-10 uppercase tracking-widest">
                Interactive Panel: Drag cursor to scratch
              </span>

              <div 
                ref={panelRef}
                onMouseDown={handleStart}
                onMouseMove={handleMove}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onTouchStart={handleStart}
                onTouchMove={handleMove}
                onTouchEnd={handleEnd}
                className={`relative w-full h-72 rounded-2xl bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 overflow-hidden shadow-2xl border border-neutral-800 cursor-crosshair select-none flex items-center justify-center transition-all duration-300 ${
                  isHealing ? "border-red-900/40 shadow-red-900/10" : "hover:border-neutral-700"
                }`}
              >
                
                {/* Simulated Glossy Car Finish Polish Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
                <div className="absolute -left-32 top-0 bottom-0 w-48 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-pulse pointer-events-none" />

                {/* Simulated Car Side Fender Vector Lines */}
                <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M-20,100 C150,120 300,60 550,110" fill="none" stroke="white" strokeWidth="2" />
                  <path d="M-20,180 C180,190 320,140 550,170" fill="none" stroke="white" strokeWidth="1" />
                  <path d="M150,0 C170,120 120,200 220,300" fill="none" stroke="white" strokeWidth="1" />
                </svg>

                {/* Sparkle Success Animation */}
                <AnimatePresence>
                  {showSparkle && (
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1.1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-950/20 backdrop-blur-[1px] pointer-events-none z-20"
                    >
                      <Sparkles className="w-16 h-16 text-emerald-400 animate-spin-slow" />
                      <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider font-bold mt-2">
                        Paint Restored perfectly!
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Thermal Healing Red Heat Ray Effect */}
                <AnimatePresence>
                  {isHealing && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-b from-red-600/30 to-amber-600/10 pointer-events-none flex flex-col justify-end p-4 z-10"
                    >
                      <div className="w-full flex justify-between items-center text-xs font-mono text-red-400">
                        <span className="flex items-center space-x-1.5">
                          <Flame size={12} className="animate-bounce" />
                          <span>ACTIVATING THERMAL HEALING...</span>
                        </span>
                        <span>{Math.round(healingProgress)}%</span>
                      </div>
                      <div className="w-full h-1 bg-neutral-900 rounded-full mt-1.5 overflow-hidden">
                        <motion.div 
                          className="h-full bg-red-600" 
                          style={{ width: `${healingProgress}%` }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Scratch Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                  {scratches.map((scr) => {
                    // During healing, make lines fade out individually based on progress
                    const opacity = isHealing ? Math.max(0, 1 - (healingProgress / 100)) : 0.85;
                    // Slightly rough jagged paths for scratches
                    const midX = (scr.startX + scr.endX) / 2 + (Math.random() * 3 - 1.5);
                    const midY = (scr.startY + scr.endY) / 2 + (Math.random() * 4 - 2);

                    return (
                      <g key={scr.id} style={{ transition: "opacity 0.2s" }}>
                        {/* Shadow scratch to look realistic on metallic paint */}
                        <path
                          d={`M ${scr.startX} ${scr.startY} Q ${midX} ${midY} ${scr.endX} ${scr.endY}`}
                          fill="none"
                          stroke="#1a1a1a"
                          strokeWidth="2.5"
                          opacity={opacity * 0.5}
                        />
                        {/* Real white core scratch */}
                        <path
                          d={`M ${scr.startX} ${scr.startY} Q ${midX} ${midY} ${scr.endX} ${scr.endY}`}
                          fill="none"
                          stroke="#e5e5e5"
                          strokeWidth="1.2"
                          opacity={opacity}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Empty State Instructions */}
                {scratches.length === 0 && !showSparkle && !isHealing && (
                  <div className="text-center p-6 pointer-events-none">
                    <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                    <p className="font-mono text-sm text-neutral-300">PPF Panel is Pristine</p>
                    <p className="text-xs text-neutral-500 mt-1">Click & drag your mouse here to test scratches</p>
                  </div>
                )}

                {/* Standard Scratched State instructions */}
                {scratches.length > 0 && !isHealing && (
                  <div className="absolute bottom-4 left-4 bg-neutral-950/80 border border-neutral-800 px-3 py-1.5 rounded-lg pointer-events-none z-10 flex items-center space-x-2 text-xs font-mono">
                    <ShieldAlert size={14} className="text-amber-500" />
                    <span className="text-amber-400 font-semibold">{scratches.length} Surface Scratches Detected</span>
                  </div>
                )}

              </div>
            </div>

            {/* Simulated Heat / Reset Controls */}
            <div className="flex space-x-4 mt-6 w-full max-w-xl">
              <button
                disabled={scratches.length === 0 || isHealing}
                onClick={triggerSelfHealing}
                className="flex-1 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 disabled:from-neutral-900 disabled:to-neutral-900 disabled:text-neutral-600 border border-transparent disabled:border-neutral-850 py-3.5 px-6 rounded-lg text-sm font-bold flex items-center justify-center space-x-2 shadow-lg shadow-red-600/10 cursor-pointer disabled:cursor-not-allowed transition-all"
              >
                <Flame size={16} />
                <span>Apply Thermal Heat (Self-Heal)</span>
              </button>

              <button
                onClick={resetScratches}
                disabled={isHealing}
                className="px-5 py-3.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-400 hover:text-white rounded-lg text-sm transition-colors flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                title="Reset Panel Damage"
              >
                <RefreshCw size={14} />
                <span>Reset Panel</span>
              </button>
            </div>

          </div>

          {/* Right Side: Informative Copy with Specs */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-white font-serif italic">
              How Self-Healing Works
            </h3>
            
            <p className="text-neutral-400 font-sans leading-relaxed text-sm md:text-base">
              Traditional car wraps and factory clear coats get permanently ruined by swirling sandstorms and micro-gravel. 
              Our premium <strong className="text-white">Titanium PPF</strong> features an elastomeric, thermosetting topcoat formulation that retains structural memory.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Elastomeric Memory Layer</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    When scratched, the top coat compresses but does not break. It waits for thermal activation to expand back to standard flatness.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Solar Heat Triggered</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    No heat gun required! Leaving your car under Doha's direct sunshine for just 15 minutes naturally triggers the self-healing process.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-white">10-Year Anti-Yellowing Shield</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Specifically chemically stabilized against UV-induced discoloration, keeping white cars stark white and dark cars deep and glassy.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-850 flex items-center justify-between text-xs font-mono">
              <div className="text-neutral-400">FILM THICKNESS:</div>
              <div className="text-white font-bold">8.5 MILS (AEROSPACE GRADE)</div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
