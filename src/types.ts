export interface Service {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  category: "tint" | "ppf" | "ceramic" | "wrap" | "detailing";
  specs: {
    label: string;
    value: string;
  }[];
  priceRange: string;
  imageUrl: string;
}

export interface Project {
  id: string;
  vehicleName: string;
  serviceCategory: "tint" | "ppf" | "ceramic" | "wrap" | "detailing";
  serviceName: string;
  description: string;
  imageUrl: string;
  year: number;
  featured: boolean;
}

export interface Inquiry {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  vehicleModel: string;
  serviceCategory: string;
  message: string;
  date: string;
  status: "pending" | "contacted" | "archived";
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  vehicle: string;
  source: "Google" | "Instagram";
}
