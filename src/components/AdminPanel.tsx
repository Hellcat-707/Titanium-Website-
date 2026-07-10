import React, { useState } from "react";
import { Service, Project, Inquiry } from "../types";
import { 
  Lock, Unlock, Settings, MessageSquare, Briefcase, FolderPlus, 
  Trash2, Plus, Edit3, Check, X, CheckCircle, HelpCircle, Eye 
} from "lucide-react";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  projects: Project[];
  inquiries: Inquiry[];
  onUpdateServices: (services: Service[]) => void;
  onUpdateProjects: (projects: Project[]) => void;
  onUpdateInquiries: (inquiries: Inquiry[]) => void;
  onLoginSuccess: () => void;
  isAdminLoggedIn: boolean;
}

export default function AdminPanel({
  isOpen,
  onClose,
  services,
  projects,
  inquiries,
  onUpdateServices,
  onUpdateProjects,
  onUpdateInquiries,
  onLoginSuccess,
  isAdminLoggedIn
}: AdminPanelProps) {
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"inquiries" | "services" | "projects">("inquiries");

  // State for Service Editing Modal / Form
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState<Omit<Service, "id">>({
    title: "",
    titleAr: "",
    description: "",
    descriptionAr: "",
    category: "tint",
    specs: [
      { label: "Specification A", value: "Value" },
      { label: "Specification B", value: "Value" }
    ],
    priceRange: "QAR 1,000",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"
  });

  // State for Project Editing / Creating
  const [projectForm, setProjectForm] = useState<Omit<Project, "id">>({
    vehicleName: "",
    serviceCategory: "ppf",
    serviceName: "",
    description: "",
    imageUrl: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800",
    year: 2026,
    featured: false
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "titanium2026" || passcode === "admin") {
      onLoginSuccess();
      setLoginError("");
    } else {
      setLoginError("Invalid passcode. Use 'titanium2026' or 'admin' to enter.");
    }
  };

  const handleStatusChange = (inquiryId: string, newStatus: "pending" | "contacted" | "archived") => {
    const updated = inquiries.map(inq => 
      inq.id === inquiryId ? { ...inq, status: newStatus } : inq
    );
    onUpdateInquiries(updated);
  };

  const handleDeleteInquiry = (inquiryId: string) => {
    if (window.confirm("Are you sure you want to delete this customer inquiry?")) {
      const filtered = inquiries.filter(inq => inq.id !== inquiryId);
      onUpdateInquiries(filtered);
    }
  };

  // Add/Edit Service Actions
  const handleServiceFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingServiceId) {
      // Edit existing
      const updated = services.map(s => 
        s.id === editingServiceId ? { ...s, ...serviceForm } : s
      );
      onUpdateServices(updated);
      setEditingServiceId(null);
    } else {
      // Create new
      const newService: Service = {
        id: "s" + Date.now(),
        ...serviceForm
      };
      onUpdateServices([...services, newService]);
    }
    // reset form
    resetServiceForm();
  };

  const resetServiceForm = () => {
    setEditingServiceId(null);
    setServiceForm({
      title: "",
      titleAr: "",
      description: "",
      descriptionAr: "",
      category: "tint",
      specs: [
        { label: "Specification A", value: "Value" },
        { label: "Specification B", value: "Value" }
      ],
      priceRange: "QAR 1,000",
      imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"
    });
  };

  const startEditService = (service: Service) => {
    setEditingServiceId(service.id);
    setServiceForm({
      title: service.title,
      titleAr: service.titleAr,
      description: service.description,
      descriptionAr: service.descriptionAr,
      category: service.category,
      specs: service.specs,
      priceRange: service.priceRange,
      imageUrl: service.imageUrl
    });
  };

  const handleDeleteService = (serviceId: string) => {
    if (window.confirm("Are you sure you want to delete this service? This will remove it from the public homepage.")) {
      const filtered = services.filter(s => s.id !== serviceId);
      onUpdateServices(filtered);
    }
  };

  // Add/Edit Project Actions
  const handleProjectFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      id: "p" + Date.now(),
      ...projectForm
    };
    onUpdateProjects([newProject, ...projects]);
    // reset
    setProjectForm({
      vehicleName: "",
      serviceCategory: "ppf",
      serviceName: "",
      description: "",
      imageUrl: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800",
      year: 2026,
      featured: false
    });
    alert("Project successfully added to the high-res gallery!");
  };

  const handleDeleteProject = (projectId: string) => {
    if (window.confirm("Are you sure you want to delete this project? This will remove it from the gallery.")) {
      const filtered = projects.filter(p => p.id !== projectId);
      onUpdateProjects(filtered);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex" role="dialog" aria-modal="true">
      
      {/* Dimmed backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity" 
      />

      {/* Slide-over core panel container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-4xl bg-neutral-950 border-l border-neutral-850 shadow-2xl flex flex-col h-full text-white">
          
          {/* Header */}
          <div className="px-6 py-6 border-b border-neutral-900 flex justify-between items-center bg-neutral-900/40">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded bg-red-600/10 text-red-500">
                <Settings size={20} className="animate-spin-slow" />
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight text-white">Titanium Qatar Client CMS</h2>
                <p className="text-xs text-neutral-400">Content Management Engine & Lead Console</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Core Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {!isAdminLoggedIn ? (
              // LOCKED / Passcode Verification View
              <div className="max-w-md mx-auto my-16 p-8 rounded-2xl bg-neutral-900 border border-neutral-850 space-y-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-red-600/10 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-900/30">
                    <Lock size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Verification Required</h3>
                  <p className="text-xs text-neutral-400">
                    Enter your administrative passcode to manage services, view inquiries, and modify showcase galleries.
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Passcode
                    </label>
                    <input 
                      type="password" 
                      required
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-600 px-4 py-3 rounded-lg text-sm text-white focus:outline-none tracking-widest text-center"
                    />
                  </div>

                  {loginError && (
                    <p className="text-xs text-red-400 font-semibold text-center">{loginError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Authenticate Console
                  </button>
                </form>

                {/* Helpful Developer Hint */}
                <div className="p-3.5 rounded bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-neutral-400 flex items-start space-x-2">
                  <HelpCircle size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Preview Tip:</strong> Use the passcode <code className="text-white px-1 py-0.5 bg-neutral-900 rounded font-bold border border-neutral-850">titanium2026</code> or <code className="text-white px-1 py-0.5 bg-neutral-900 rounded font-bold border border-neutral-850">admin</code> to log in and inspect the fully functional CMS.
                  </span>
                </div>
              </div>
            ) : (
              // UNLOCKED / Authenticated CMS Panel Dashboard
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                
                {/* CMS Tab Switcher */}
                <div className="flex border-b border-neutral-900 pb-1 gap-2">
                  <button
                    onClick={() => setActiveTab("inquiries")}
                    className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                      activeTab === "inquiries"
                        ? "border-red-600 text-white font-bold"
                        : "border-transparent text-neutral-400 hover:text-white"
                    }`}
                  >
                    Inquiries ({inquiries.length})
                  </button>

                  <button
                    onClick={() => setActiveTab("services")}
                    className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                      activeTab === "services"
                        ? "border-red-600 text-white font-bold"
                        : "border-transparent text-neutral-400 hover:text-white"
                    }`}
                  >
                    Manage Services ({services.length})
                  </button>

                  <button
                    onClick={() => setActiveTab("projects")}
                    className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                      activeTab === "projects"
                        ? "border-red-600 text-white font-bold"
                        : "border-transparent text-neutral-400 hover:text-white"
                    }`}
                  >
                    Showcase Gallery ({projects.length})
                  </button>
                </div>

                {/* TAB 1: CUSTOMER INQUIRIES CONSOLE */}
                {activeTab === "inquiries" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-base font-bold text-white flex items-center space-x-2">
                          <MessageSquare size={16} className="text-red-500" />
                          <span>Incoming Booking Inquiries</span>
                        </h3>
                        <p className="text-xs text-neutral-400">Leads generated securely from the client-side booking form.</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {inquiries.map((inq) => (
                        <div 
                          key={inq.id}
                          className={`p-5 rounded-xl bg-neutral-900 border border-neutral-850 flex flex-col md:flex-row md:items-start md:justify-between gap-6 transition-colors ${
                            inq.status === "pending" ? "border-l-4 border-l-red-600" : inq.status === "contacted" ? "border-l-4 border-l-emerald-600" : "opacity-60"
                          }`}
                        >
                          {/* Left: Lead Detail */}
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center space-x-3">
                              <span className="font-bold text-sm text-white">{inq.customerName}</span>
                              <span className="text-[10px] font-mono bg-neutral-950 px-2.5 py-0.5 rounded text-neutral-400 border border-neutral-800">
                                {inq.serviceCategory.toUpperCase()}
                              </span>
                              <span className="text-[10px] text-neutral-500">{inq.date}</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-neutral-400">
                              <div>📱 Phone: <strong className="text-white">{inq.phone}</strong></div>
                              {inq.email && <div>✉ Email: <strong className="text-white">{inq.email}</strong></div>}
                              <div className="sm:col-span-2">🚗 Vehicle Model: <strong className="text-red-400">{inq.vehicleModel}</strong></div>
                            </div>

                            {inq.message && (
                              <div className="p-3 rounded bg-neutral-950 border border-neutral-900 text-xs font-sans text-neutral-300 leading-relaxed italic">
                                "{inq.message}"
                              </div>
                            )}
                          </div>

                          {/* Right: Actions */}
                          <div className="flex md:flex-col gap-2 flex-wrap items-center">
                            
                            {inq.status === "pending" && (
                              <button
                                onClick={() => handleStatusChange(inq.id, "contacted")}
                                className="px-3 py-1.5 rounded bg-emerald-600/10 hover:bg-emerald-600 text-emerald-400 hover:text-white text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer border border-emerald-900/50"
                              >
                                Mark Contacted
                              </button>
                            )}

                            {inq.status !== "archived" ? (
                              <button
                                onClick={() => handleStatusChange(inq.id, "archived")}
                                className="px-3 py-1.5 rounded bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-white text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer border border-neutral-900"
                              >
                                Archive Lead
                              </button>
                            ) : (
                              <button
                                onClick={() => handleStatusChange(inq.id, "pending")}
                                className="px-3 py-1.5 rounded bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-white text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer border border-neutral-900"
                              >
                                Restore Lead
                              </button>
                            )}

                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="p-1.5 rounded bg-neutral-950 hover:bg-red-600/10 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer border border-neutral-900"
                              title="Delete inquiry"
                            >
                              <Trash2 size={14} />
                            </button>

                          </div>
                        </div>
                      ))}

                      {inquiries.length === 0 && (
                        <div className="p-12 text-center bg-neutral-900/20 border border-neutral-900 rounded-xl">
                          <p className="font-mono text-neutral-500 text-sm">No client inquiries received yet.</p>
                          <p className="text-xs text-neutral-600 mt-1">Submit the contact form on the home screen to see leads populate here in real-time!</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 2: MANAGE SERVICES */}
                {activeTab === "services" && (
                  <div className="space-y-8">
                    
                    {/* Add/Edit Form */}
                    <form onSubmit={handleServiceFormSubmit} className="p-6 rounded-xl bg-neutral-900 border border-neutral-850 space-y-6">
                      <div className="flex justify-between items-center border-b border-neutral-850 pb-3">
                        <h4 className="text-sm font-mono uppercase tracking-widest text-red-500 font-bold">
                          {editingServiceId ? "✏ Edit Service Shape" : "➕ Add New Service"}
                        </h4>
                        {editingServiceId && (
                          <button 
                            type="button" 
                            onClick={resetServiceForm}
                            className="text-xs text-neutral-400 hover:text-white"
                          >
                            Cancel Edit
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Title EN */}
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                            Service Title (English) *
                          </label>
                          <input 
                            type="text" 
                            required
                            value={serviceForm.title}
                            onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                            className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-600 px-3 py-2 rounded text-xs text-white focus:outline-none"
                            placeholder="e.g. Matte Paint Shielding"
                          />
                        </div>

                        {/* Title AR */}
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                            Service Title (Arabic) *
                          </label>
                          <input 
                            type="text" 
                            required
                            value={serviceForm.titleAr}
                            onChange={(e) => setServiceForm({ ...serviceForm, titleAr: e.target.value })}
                            className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-600 px-3 py-2 rounded text-xs text-white focus:outline-none text-right"
                            placeholder="حماية طلاء مطفية"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Desc EN */}
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                            Description (English) *
                          </label>
                          <textarea 
                            rows={3}
                            required
                            value={serviceForm.description}
                            onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                            className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-600 px-3 py-2 rounded text-xs text-white focus:outline-none resize-none"
                            placeholder="English marketing text..."
                          />
                        </div>

                        {/* Desc AR */}
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                            Description (Arabic) *
                          </label>
                          <textarea 
                            rows={3}
                            required
                            value={serviceForm.descriptionAr}
                            onChange={(e) => setServiceForm({ ...serviceForm, descriptionAr: e.target.value })}
                            className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-600 px-3 py-2 rounded text-xs text-white focus:outline-none resize-none text-right"
                            placeholder="الوصف باللغة العربية..."
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {/* Category */}
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                            Category Tab
                          </label>
                          <select
                            value={serviceForm.category}
                            onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value as any })}
                            className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-600 px-3 py-2 rounded text-xs text-white focus:outline-none"
                          >
                            <option value="tint">Window Tinting</option>
                            <option value="ppf">PPF</option>
                            <option value="ceramic">Ceramic</option>
                            <option value="wrap">Wrapping</option>
                            <option value="detailing">Detailing</option>
                          </select>
                        </div>

                        {/* Price Range */}
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                            Price Range QAR
                          </label>
                          <input 
                            type="text" 
                            required
                            value={serviceForm.priceRange}
                            onChange={(e) => setServiceForm({ ...serviceForm, priceRange: e.target.value })}
                            className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-600 px-3 py-2 rounded text-xs text-white focus:outline-none"
                            placeholder="e.g. QAR 3,500 - 6,000"
                          />
                        </div>

                        {/* Image URL */}
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                            Unsplash Image URL
                          </label>
                          <input 
                            type="text" 
                            required
                            value={serviceForm.imageUrl}
                            onChange={(e) => setServiceForm({ ...serviceForm, imageUrl: e.target.value })}
                            className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-600 px-3 py-2 rounded text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        {editingServiceId ? "Save Service Changes" : "Publish Service to Live App"}
                      </button>
                    </form>

                    {/* Active Services List */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                        Active Showroom Treatments ({services.length})
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {services.map((s) => (
                          <div key={s.id} className="p-4 rounded-lg bg-neutral-900 border border-neutral-850 flex items-start justify-between gap-4">
                            <div className="space-y-1">
                              <div className="text-xs font-mono text-red-500 font-bold uppercase">{s.category}</div>
                              <h5 className="font-bold text-sm text-white line-clamp-1">{s.title}</h5>
                              <p className="text-[11px] text-neutral-500">{s.priceRange}</p>
                            </div>

                            <div className="flex space-x-1 flex-shrink-0">
                              <button
                                onClick={() => startEditService(s)}
                                className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                                title="Edit"
                              >
                                <Edit3 size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteService(s.id)}
                                className="p-1.5 rounded hover:bg-red-600/10 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* TAB 3: MANAGE PORTFOLIO PROJECTS */}
                {activeTab === "projects" && (
                  <div className="space-y-8">
                    
                    {/* Add Project Form */}
                    <form onSubmit={handleProjectFormSubmit} className="p-6 rounded-xl bg-neutral-900 border border-neutral-850 space-y-6">
                      <h4 className="text-sm font-mono uppercase tracking-widest text-red-500 font-bold border-b border-neutral-850 pb-3">
                        ➕ Add Vehicle to High-Res Portfolio
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Vehicle model */}
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                            Vehicle Name *
                          </label>
                          <input 
                            type="text" 
                            required
                            value={projectForm.vehicleName}
                            onChange={(e) => setProjectForm({ ...projectForm, vehicleName: e.target.value })}
                            className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-600 px-3 py-2 rounded text-xs text-white focus:outline-none"
                            placeholder="e.g. Range Rover Autobiography"
                          />
                        </div>

                        {/* Treatment Name */}
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                            Treatment Applied *
                          </label>
                          <input 
                            type="text" 
                            required
                            value={projectForm.serviceName}
                            onChange={(e) => setProjectForm({ ...projectForm, serviceName: e.target.value })}
                            className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-600 px-3 py-2 rounded text-xs text-white focus:outline-none"
                            placeholder="e.g. Matte Ceramic PPF Full Shield"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {/* Category */}
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                            Service Category
                          </label>
                          <select
                            value={projectForm.serviceCategory}
                            onChange={(e) => setProjectForm({ ...projectForm, serviceCategory: e.target.value as any })}
                            className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-600 px-3 py-2 rounded text-xs text-white focus:outline-none"
                          >
                            <option value="ppf">Paint Protection (PPF)</option>
                            <option value="tint">Window Tinting</option>
                            <option value="ceramic">Ceramic Coating</option>
                            <option value="wrap">Vinyl Wrapping</option>
                            <option value="detailing">Detailing</option>
                          </select>
                        </div>

                        {/* Model Year */}
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                            Vehicle Year
                          </label>
                          <input 
                            type="number" 
                            required
                            value={projectForm.year}
                            onChange={(e) => setProjectForm({ ...projectForm, year: Number(e.target.value) })}
                            className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-600 px-3 py-2 rounded text-xs text-white focus:outline-none"
                            placeholder="2026"
                          />
                        </div>

                        {/* Image selection template */}
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                            Image Asset Sample
                          </label>
                          <select
                            value={projectForm.imageUrl}
                            onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                            className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-600 px-3 py-2 rounded text-xs text-white focus:outline-none"
                          >
                            <option value="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800">Porsche GT3 (Black/PPF)</option>
                            <option value="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800">Land Cruiser (SUV/Dirt)</option>
                            <option value="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800">Mercedes G63 (Satin Black)</option>
                            <option value="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=800">Lamborghini Urus (Metallic)</option>
                            <option value="https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=800">Nissan Patrol (Red Sport)</option>
                          </select>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                          Project Description (English)
                        </label>
                        <input 
                          type="text" 
                          required
                          value={projectForm.description}
                          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-600 px-3 py-2 rounded text-xs text-white focus:outline-none"
                          placeholder="Brief description of the protective craftsmanship..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Publish Vehicle Project
                      </button>
                    </form>

                    {/* Active gallery list */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                        Gallery Showroom Items ({projects.length})
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {projects.map((p) => (
                          <div key={p.id} className="p-3 rounded-lg bg-neutral-900 border border-neutral-850 flex items-center justify-between gap-4">
                            <div className="flex items-center space-x-3 overflow-hidden">
                              <img src={p.imageUrl} alt={p.vehicleName} className="w-12 h-12 rounded object-cover flex-shrink-0" referrerPolicy="no-referrer" />
                              <div className="overflow-hidden">
                                <h5 className="font-bold text-sm text-white truncate">{p.vehicleName}</h5>
                                <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">{p.serviceCategory}</p>
                              </div>
                            </div>

                            <button
                              onClick={() => handleDeleteProject(p.id)}
                              className="p-1.5 rounded hover:bg-red-600/10 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer border border-neutral-850"
                              title="Delete project"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

              </div>
            )}

          </div>

          {/* Footer inside CMS */}
          <div className="px-6 py-4 border-t border-neutral-900 bg-neutral-950 text-right text-[10px] font-mono text-neutral-500">
            Titanium Qatar DB Engine V1.1.0 • Client Secured Workspace
          </div>

        </div>
      </div>

    </div>
  );
}
