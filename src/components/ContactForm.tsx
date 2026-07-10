import React, { useState, FormEvent, useEffect } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle2, MessageSquare, Clock } from "lucide-react";
import { Inquiry } from "../types";

interface ContactFormProps {
  selectedServiceCategory: string; // preselected category if any
  onAddInquiry: (inquiry: Omit<Inquiry, "id" | "date" | "status">) => void;
}

export default function ContactForm({ selectedServiceCategory, onAddInquiry }: ContactFormProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    vehicleModel: "",
    serviceCategory: "tint",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState("");

  // Sync preselected category if user triggered it from services
  useEffect(() => {
    if (selectedServiceCategory) {
      setFormData(prev => ({
        ...prev,
        serviceCategory: selectedServiceCategory
      }));
    }
  }, [selectedServiceCategory]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone || !formData.vehicleModel) {
      alert("Please fill in your Name, Phone, and Vehicle Model.");
      return;
    }

    // Call callback to store in parent state / localStorage CMS database
    onAddInquiry(formData);

    // Create random luxury reference code
    const randomRef = "TQ-" + Math.floor(1000 + Math.random() * 9000);
    setRefNumber(randomRef);
    setSubmitted(true);

    // Reset form
    setFormData({
      customerName: "",
      phone: "",
      email: "",
      vehicleModel: "",
      serviceCategory: "tint",
      message: ""
    });
  };

  return (
    <section id="booking" className="py-24 bg-neutral-950 text-white relative border-b border-neutral-900">
      
      {/* Dynamic Background Light */}
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-red-600/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Showroom Info & Maps & WhatsApp Quick Action */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-red-500 font-mono text-xs uppercase tracking-[0.25em] font-semibold flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                <span>Visit Our Doha Showrooms</span>
              </span>
              <h2 className="text-3xl md:text-4xl font-serif italic font-extrabold tracking-tight">
                Doha Head Office
              </h2>
              <p className="text-neutral-400 font-sans text-sm leading-relaxed">
                Experience luxury shielding up-close. Visit our primary showroom on Salwa Road, featuring fully air-conditioned cleanrooms, digital laser-cut software, and premium diagnostic heat-lamps.
              </p>
            </div>

            {/* Structured Contact Data Card */}
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-850 space-y-6">
              
              {/* Location details */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-red-500">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Showroom Location</h4>
                  <p className="text-sm font-semibold text-white mt-1">Salwa Road, Doha, Qatar</p>
                  <p className="text-xs text-neutral-500 mt-0.5">Near Al Jazeera Petrol Station</p>
                  <a 
                    href="https://share.google/rGfGPi6tqoYKmS178" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-red-400 hover:text-red-300 font-semibold mt-2 inline-flex items-center space-x-1 underline"
                  >
                    <span>Navigate on Google Maps</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>

              {/* Showroom Hours */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-400">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Opening Hours</h4>
                  <p className="text-sm font-semibold text-white mt-1">Saturday – Thursday</p>
                  <p className="text-xs text-neutral-500 mt-0.5">9:00 AM – 1:00 PM | 4:00 PM – 9:00 PM</p>
                  <p className="text-[10px] text-red-500 font-semibold mt-1">Friday: Closed</p>
                </div>
              </div>

              {/* Call Details */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-400">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Phone lines</h4>
                  <p className="text-sm font-bold text-white mt-1">+974 4444 8888</p>
                  <p className="text-xs text-neutral-500 mt-0.5">Showroom Booking Hotline</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-400">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Email</h4>
                  <p className="text-sm font-semibold text-white mt-1">info@titaniumqatar.com</p>
                </div>
              </div>

            </div>

            {/* Instant WhatsApp Quick Booking Widget (Extremely popular in Qatar!) */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/20 to-neutral-900 border border-emerald-900/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3 text-center sm:text-left">
                <div className="p-2.5 bg-emerald-600/10 text-emerald-400 rounded-full border border-emerald-800/40">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Book directly on WhatsApp</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Response time: &lt; 5 minutes</p>
                </div>
              </div>
              <a
                href="https://wa.me/97444448888?text=Hello%20Titanium%20Qatar,%20I'm%20interested%20in%20tinting/PPF%20for%20my%20car."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-900/20 transition-all cursor-pointer inline-flex items-center space-x-1.5"
              >
                <span>Chat Now</span>
                <span>💬</span>
              </a>
            </div>

          </div>

          {/* Right Column: Dynamic Booking Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-2xl bg-neutral-900 border border-neutral-850 shadow-xl relative overflow-hidden">
              
              <div className="absolute top-0 right-0 p-4 flex space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Submit Booking Inquiry</h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Provide details below. Our luxury service representative will contact you shortly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Your Full Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.customerName}
                        onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                        placeholder="e.g. Hamad Al-Thani"
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-600 hover:border-neutral-700 px-4 py-3 rounded-lg text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Qatar Contact Phone *
                      </label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="e.g. +974 5555 1234"
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-600 hover:border-neutral-700 px-4 py-3 rounded-lg text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="e.g. client@qatar.com"
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-600 hover:border-neutral-700 px-4 py-3 rounded-lg text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Vehicle model */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Vehicle Brand & Model *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.vehicleModel}
                        onChange={(e) => setFormData({...formData, vehicleModel: e.target.value})}
                        placeholder="e.g. Land Cruiser LC300 / Porsche GT3"
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-600 hover:border-neutral-700 px-4 py-3 rounded-lg text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Service Category */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Desired Treatment / Service Category
                    </label>
                    <select 
                      value={formData.serviceCategory}
                      onChange={(e) => setFormData({...formData, serviceCategory: e.target.value})}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-600 hover:border-neutral-700 px-4 py-3 rounded-lg text-sm text-neutral-300 focus:outline-none transition-colors"
                    >
                      <option value="tint">Nano-Ceramic Window Tinting (عازل حراري)</option>
                      <option value="ppf">Self-Healing Paint Protection (PPF)</option>
                      <option value="ceramic">Nano-Ceramic Paint Coating (طلاء نانو)</option>
                      <option value="wrap">Premium Full Vinyl Wrap (تجليد وتغيير لون)</option>
                      <option value="detailing">Executive Polishing & Interior Detailing</option>
                    </select>
                  </div>

                  {/* Messages */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Specific Requirements or Questions
                    </label>
                    <textarea 
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Specify your preferred date, shade level, or custom details here..."
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-600 hover:border-neutral-700 px-4 py-3 rounded-lg text-sm text-white focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submission */}
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg shadow-red-600/10 cursor-pointer"
                  >
                    <Send size={16} />
                    <span>Send Secure Request</span>
                  </button>

                </form>
              ) : (
                // Thank you block
                <div className="text-center py-12 space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 bg-emerald-950/40 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-800/40">
                    <CheckCircle2 size={36} className="animate-bounce" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Inquiry Received</h3>
                    <p className="text-neutral-400 font-sans text-sm max-w-md mx-auto">
                      Thank you for choosing Titanium Qatar. Your premium appointment inquiry has been registered securely.
                    </p>
                  </div>

                  {/* Ref panel */}
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-900 max-w-sm mx-auto font-mono text-xs">
                    <div className="text-neutral-500 uppercase tracking-widest">BOOKING REFERENCE:</div>
                    <div className="text-lg font-bold text-white mt-1 tracking-wider">{refNumber}</div>
                  </div>

                  <div className="text-xs text-neutral-500 font-sans max-w-md mx-auto pt-2">
                    Our luxury client supervisor will review your requested treatment for the <strong className="text-white">Porsche/SUV</strong> and call you at <strong className="text-white">your provided number</strong> within 15 minutes to coordinate timeslots.
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-white border border-neutral-800 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Submit another request
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
