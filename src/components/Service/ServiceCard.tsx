import React from 'react';

interface ServiceProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  image?: string;
}

export function Service({
  title,
  description,
  price,
  features,
  image
}: ServiceProps) {
  return (
    <div className="flex items-start space-x-5 py-6 px-4 border-b border-gray-100 bg-white hover:bg-gray-50 transition group">
      {image && (
        <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center shadow-sm mr-2">
          <img src={image} alt={title} className="w-12 h-12 object-cover rounded-lg" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-[#0A0F56] transition">{title}</h3>
          <span className="text-base font-semibold text-[#0A0F56] bg-gray-100 px-3 py-1 rounded-lg shadow-sm">{price}</span>
        </div>
        <p className="mt-1 text-sm text-gray-600 leading-relaxed">{description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {features.map((feature, idx) => (
            <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#F0F4FF] text-[#0A0F56] shadow-sm border border-[#E0E3F0]">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 