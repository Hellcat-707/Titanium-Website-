import React, { useState } from "react";
import { motion } from "motion/react";
import { Flame, Shield, Sun, Thermometer, Sliders, ChevronRight } from "lucide-react";

export default function Hero() {
  const [tintLevel, setTintLevel] = useState(50); // percentage of tint (0 to 100)
  const [solarIntensity, setSolarIntensity] = useState(85); // Doha heat solar intensity in %

  // Calculate simulated interior temperature based on solar intensity and tint level
  // Without tint: temp rises quickly. With premium tint: temp remains well controlled
  const calculateTemperature = (intensity: number, tint: number) => {
    const baseTemp = 24; // AC baseline temperature in Celsius
    const heatGainFactor = intensity * 0.45; // Max heat gain from sun
    const tintEfficiency = 1 - (tint / 100) * 0.88; // 88% maximum reduction of heat gain
    return Math.round(baseTemp + heatGainFactor * tintEfficiency);
  };

  const simulatedTemp = calculateTemperature(solarIntensity, tintLevel);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center bg-neutral-950 text-white overflow-hidden py-12 md:py-20 border-b border-neutral-900">
      
      {/* Dynamic Ambient Background Lights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-neutral-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Thin Technical Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f12_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f12_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Copy & CTAs */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            
            {/* Elite Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono tracking-wider text-neutral-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              <span>TITANIUM PREMIUM GLOBAL • QATAR DIVISION</span>
            </motion.div>

            {/* Bilingual Striking Heading */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-serif italic font-extrabold tracking-tight leading-[1.1] text-white"
              >
                Survive The Heat.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-neutral-300 to-red-600">
                  Protect Your Asset.
                </span>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-2xl sm:text-3xl font-bold text-neutral-400 font-sans tracking-wide pt-1"
                style={{ direction: "rtl" }}
              >
                تيتانيوم قطر – عازل حراري وحماية فائقة
              </motion.h2>
            </div>

            {/* Explanatory Body */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-neutral-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              Engineered with high-tech metallic and nano-ceramic crystal matrices. 
              Our products deliver up to <strong className="text-white">98% Infrared heat rejection</strong>, preventing interior baking while safeguarding paint against sandstorms and road chips on Doha streets.
            </motion.p>

            {/* Interactive Stats Panel */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-900 backdrop-blur-sm max-w-md mx-auto lg:mx-0 text-left font-mono"
            >
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white flex items-baseline">
                  98%
                  <span className="text-xs text-red-500 ml-0.5">★</span>
                </div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-1">Heat Block</div>
              </div>
              <div className="border-l border-neutral-800 pl-4">
                <div className="text-xl sm:text-2xl font-bold text-white">10Y</div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-1">PPF Warranty</div>
              </div>
              <div className="border-l border-neutral-800 pl-4">
                <div className="text-xl sm:text-2xl font-bold text-white">9H+</div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-1">Ceramic Grit</div>
              </div>
            </motion.div>

            {/* Dynamic Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            >
              <button 
                onClick={() => {
                  const el = document.getElementById("booking");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="px-8 py-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-red-600/20 cursor-pointer text-sm"
              >
                Instant Price Estimate
              </button>
              
              <button 
                onClick={() => {
                  const el = document.getElementById("services");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="px-8 py-4 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white font-bold transition-all cursor-pointer text-sm flex items-center justify-center space-x-2"
              >
                <span>Explore Services</span>
                <ChevronRight size={16} />
              </button>
            </motion.div>

          </div>

          {/* Right Column: Premium Interactive Climate Simulator & Tint Slider */}
          <div className="lg:col-span-6">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl shadow-neutral-950/80"
            >
              
              {/* Decorative Tech Accents */}
              <div className="absolute top-0 right-0 p-3 flex space-x-1.5 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              </div>

              {/* Header */}
              <div className="border-b border-neutral-800 pb-4 mb-6">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Sliders size={18} className="text-red-500" />
                  <span>Doha Climate Shield Simulator</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Adjust inputs below to simulate how Titanium Thermal Film mitigates solar heat.
                </p>
              </div>

              {/* Graphic Simulator Panel */}
              <div className="relative h-44 rounded-xl bg-neutral-950 overflow-hidden border border-neutral-850 p-4 mb-6 flex flex-col justify-between">
                
                {/* Sunlight simulation representation */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{ 
                    background: `linear-gradient(to right, rgba(239, 68, 68, ${solarIntensity / 250}) 0%, transparent 100%)` 
                  }}
                />

                {/* Simulated Glass Overlay (Darkens with tint level) */}
                <div 
                  className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none border-l border-dashed border-neutral-700/50 transition-all duration-300 flex items-center justify-center text-xs font-mono text-neutral-400"
                  style={{
                    backgroundColor: `rgba(15, 15, 15, ${0.1 + (tintLevel / 100) * 0.78})`
                  }}
                >
                  <div className="rotate-90 sm:rotate-0 tracking-wider">
                    {tintLevel === 0 ? "NO TINT" : `TITANIUM TINT: ${tintLevel}%`}
                  </div>
                </div>

                {/* Visual Indicators */}
                <div className="flex justify-between items-start z-10">
                  <div className="flex items-center space-x-2">
                    <Sun className={`w-5 h-5 ${solarIntensity > 70 ? 'text-amber-500 animate-spin-slow' : 'text-yellow-600'}`} />
                    <div className="font-mono text-xs">
                      <div className="text-neutral-400 text-[9px] uppercase tracking-wider">Solar Radiation</div>
                      <div className="text-white font-bold">{solarIntensity}% Intensity</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Thermometer className={`w-5 h-5 ${simulatedTemp > 45 ? 'text-red-500 animate-bounce' : 'text-emerald-500'}`} />
                    <div className="font-mono text-xs text-right">
                      <div className="text-neutral-400 text-[9px] uppercase tracking-wider">Cabin Temp</div>
                      <div className={`font-bold text-base ${simulatedTemp > 45 ? 'text-red-400' : 'text-emerald-400'}`}>
                        {simulatedTemp}°C
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vehicle graphic mockup (Clean Vector styled with Tailwind) */}
                <div className="w-full flex justify-center items-end relative h-16 pointer-events-none z-10">
                  <div className="w-48 h-8 bg-neutral-900 border border-neutral-800 rounded-t-lg relative flex items-center justify-around">
                    {/* Windshield */}
                    <div 
                      className="absolute right-2 top-1 w-16 h-4 bg-neutral-950 border border-neutral-800 rounded-tr-md transition-all duration-300" 
                      style={{ backgroundColor: `rgba(20,20,20,${0.2 + (tintLevel / 100) * 0.75})` }}
                    />
                    {/* Side window */}
                    <div 
                      className="absolute left-6 top-1 w-14 h-4 bg-neutral-950 border border-neutral-800 rounded-tl-sm transition-all duration-300"
                      style={{ backgroundColor: `rgba(20,20,20,${0.2 + (tintLevel / 100) * 0.75})` }}
                    />
                    <div className="text-[8px] text-neutral-500 font-mono">SUV COUPE</div>
                  </div>
                </div>

                {/* Heat Shield status text */}
                <div className="flex justify-between items-center z-10 border-t border-neutral-900 pt-2 text-[10px] font-mono text-neutral-400">
                  <span>Status: {simulatedTemp > 48 ? "BAKING" : simulatedTemp > 35 ? "WARM" : "OPTIMAL CALM"}</span>
                  <span className="text-red-500 font-bold">
                    {tintLevel > 60 ? "★ Maximum Heat Shielding Active" : "🛡️ Partial Protection"}
                  </span>
                </div>

              </div>

              {/* Interactive Controls */}
              <div className="space-y-5">
                
                {/* Control 1: Tint Level Slider */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-neutral-300 uppercase tracking-wider flex items-center space-x-1">
                      <Shield className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Titanium Ceramic Shade (VLT)</span>
                    </span>
                    <span className="text-white font-bold">{tintLevel}% (Darkness)</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={tintLevel} 
                    onChange={(e) => setTintLevel(Number(e.target.value))}
                    className="w-full h-1.5 bg-neutral-850 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="flex justify-between text-[9px] text-neutral-500 font-mono mt-1">
                    <span>0% (Clear Factory Glass)</span>
                    <span>50% (Standard)</span>
                    <span>100% (Limousine Dark 98% Heat Block)</span>
                  </div>
                </div>

                {/* Control 2: Solar Exposure Slider */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-neutral-300 uppercase tracking-wider flex items-center space-x-1">
                      <Flame className="w-3.5 h-3.5 text-red-500" />
                      <span>Doha Sun Solar Intensity</span>
                    </span>
                    <span className="text-red-400 font-bold">{solarIntensity}% Peak</span>
                  </div>
                  <input 
                    type="range" 
                    min="20" 
                    max="100" 
                    value={solarIntensity} 
                    onChange={(e) => setSolarIntensity(Number(e.target.value))}
                    className="w-full h-1.5 bg-neutral-850 rounded-lg appearance-none cursor-pointer accent-neutral-400"
                  />
                  <div className="flex justify-between text-[9px] text-neutral-500 font-mono mt-1">
                    <span>Winter Shade (20%)</span>
                    <span>Summer Heat (80%)</span>
                    <span>Extreme Desert Noon (100%)</span>
                  </div>
                </div>

                {/* Simulation Summary Statement */}
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-900 text-xs text-neutral-400 font-sans leading-relaxed">
                  <span className="text-white font-semibold">Scientific Result:</span> At{" "}
                  <span className="text-red-400 font-bold">{solarIntensity}%</span> solar radiation, 
                  applying Titanium's <span className="text-white font-bold">{tintLevel}% Film</span> prevents cabin temperature from reaching{" "}
                  <span className="text-red-400 line-through">
                    {calculateTemperature(solarIntensity, 0)}°C
                  </span>{" "}
                  and safely limits it to{" "}
                  <span className="text-emerald-400 font-bold">{simulatedTemp}°C</span>, saving{" "}
                  <span className="text-white font-semibold">{Math.round((1 - simulatedTemp / calculateTemperature(solarIntensity, 0)) * 100)}%</span> AC workload.
                </div>

              </div>

            </motion.div>
          </div>

        </div>
      </div>
      
    </section>
  );
}
