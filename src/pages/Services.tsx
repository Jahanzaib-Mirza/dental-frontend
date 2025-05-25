import { Service } from '../components/Service/ServiceCard';
import { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { AddServiceModal } from '../components/Service/AddServiceModal';
import type { ServiceFormData } from '../components/Service/AddServiceModal';

const services = [
  {
    id: 1,
    title: "General Dentistry",
    description: "Comprehensive dental care including cleanings, fillings, and preventive treatments.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000&auto=format&fit=crop",
    price: "From $75",
    features: ["Check-ups", "Cleaning", "Fillings", "X-Rays"]
  },
  {
    id: 2,
    title: "Cosmetic Dentistry",
    description: "Transform your smile with teeth whitening, veneers, and smile makeovers.",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1000&auto=format&fit=crop",
    price: "From $299",
    features: ["Whitening", "Veneers", "Bonding", "Design"]
  },
  {
    id: 3,
    title: "Orthodontics",
    description: "Straighten your teeth and correct bite issues with modern treatments.",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=1000&auto=format&fit=crop",
    price: "From $2,500",
    features: ["Braces", "Aligners", "Retainers", "Care"]
  },
  {
    id: 4,
    title: "Dental Implants",
    description: "Replace missing teeth with permanent, natural-looking dental implants.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop",
    price: "From $3,000",
    features: ["Implants", "Bridges", "3D Plan", "Support"]
  },
  {
    id: 5,
    title: "Emergency Care",
    description: "24/7 emergency dental services for immediate relief and urgent care.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop",
    price: "From $150",
    features: ["24/7 Care", "Relief", "Repairs", "Support"]
  },
  {
    id: 6,
    title: "Pediatric Care",
    description: "Specialized dental care for children in a friendly environment.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000&auto=format&fit=crop",
    price: "From $85",
    features: ["Kid Care", "Prevention", "Fluoride", "Sealants"]
  },
  {
    id: 7,
    title: "Root Canal",
    description: "Advanced endodontic treatment to save damaged or infected teeth.",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1000&auto=format&fit=crop",
    price: "From $800",
    features: ["Treatment", "Cleaning", "Filling", "Recovery"]
  },
  {
    id: 8,
    title: "Teeth Grinding",
    description: "Solutions for bruxism including night guards and TMJ treatment.",
    image: "https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?q=80&w=1000&auto=format&fit=crop",
    price: "From $250",
    features: ["Guards", "TMJ Care", "Relief", "Prevention"]
  },
  {
    id: 9,
    title: "Laser Dentistry",
    description: "Modern laser treatments for precise and comfortable dental procedures.",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=1000&auto=format&fit=crop",
    price: "From $400",
    features: ["Precision", "Comfort", "Fast Care", "Modern"]
  },
  {
    id: 10,
    title: "Gum Treatment",
    description: "Periodontal care for healthy gums and overall oral health.",
    image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?q=80&w=1000&auto=format&fit=crop",
    price: "From $200",
    features: ["Deep Clean", "Surgery", "Scaling", "Maintenance"]
  },
  {
    id: 11,
    title: "Sedation",
    description: "Comfortable dental care with various sedation options available.",
    image: "https://images.unsplash.com/photo-1616391182219-e080b4d1043a?q=80&w=1000&auto=format&fit=crop",
    price: "From $350",
    features: ["Comfort", "Monitoring", "Safe Care", "Recovery"]
  },
  {
    id: 12,
    title: "Digital Scanning",
    description: "Advanced 3D digital impressions for precise dental work.",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=1000&auto=format&fit=crop",
    price: "From $175",
    features: ["3D Scan", "Precision", "No Molds", "Quick"]
  },
  {
    id: 13,
    title: "Smile Design",
    description: "Custom smile makeover planning using digital technology.",
    image: "https://images.unsplash.com/photo-1581524729797-1bd56c3c0607?q=80&w=1000&auto=format&fit=crop",
    price: "From $500",
    features: ["Planning", "Preview", "Custom", "Perfect"]
  },
  {
    id: 14,
    title: "Sleep Apnea",
    description: "Dental solutions for sleep apnea and snoring problems.",
    image: "https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?q=80&w=1000&auto=format&fit=crop",
    price: "From $950",
    features: ["Diagnosis", "Device", "Follow-up", "Relief"]
  },
  {
    id: 15,
    title: "Sports Guards",
    description: "Custom-fitted mouth guards for athletes and sports protection.",
    image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1000&auto=format&fit=crop",
    price: "From $125",
    features: ["Custom Fit", "Comfort", "Protection", "Durable"]
  }
];

export default function Services() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [serviceList, setServiceList] = useState(services);

  const handleAddButtonClick = () => {
    setIsAddModalOpen(true);
  };

  const handleAddServiceSubmit = (serviceData: ServiceFormData) => {
    const newService = {
      id: serviceList.length + 1,
      title: serviceData.name,
      description: serviceData.description,
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000&auto=format&fit=crop",
      price: serviceData.price,
      features: serviceData.features
    };

    // Add the new service to the list
    setServiceList([...serviceList, newService]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl sm:text-3xl font-bold text-[#0A0F56]">Services</h2>
          <p className="text-gray-500 text-md">
            Manage all dental services and treatments
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleAddButtonClick}
            className="bg-gradient-to-r from-[#0A0F56] to-[#232a7c] text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center hover:from-[#232a7c] hover:to-[#0A0F56] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <FaPlus className="mr-2 text-base" />
            Add Service
          </button>
        </div>
      </div>

      {/* Services List */}
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {serviceList.map((service) => (
            <Service
              key={service.id}
              title={service.title}
              description={service.description}
              price={service.price}
              features={service.features}
              image={service.image}
            />
          ))}
        </div>
      </div>

      {/* Add Service Modal */}
      <AddServiceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddServiceSubmit}
      />
    </div>
  );
} 