interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  onEdit: () => void;
  onDelete: () => void;
}

export function ServiceCard({ title, description, price, features, onEdit, onDelete }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="p-4">
        {/* Header with title and actions */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-base font-semibold text-[#0A0F56] truncate">{title}</h3>
            <div className="text-xs font-medium text-[#0A0F56] opacity-75 mt-1">
              {price}
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={onEdit}
              className="text-blue-600 hover:bg-blue-50 p-1 rounded"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button 
              onClick={onDelete}
              className="text-red-600 hover:bg-red-50 p-1 rounded"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <p className="text-gray-600 text-xs mb-3 line-clamp-2">{description}</p>
        
        {/* Features */}
        <div className="grid grid-cols-2 gap-1">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center text-xs text-gray-600">
              <svg className="w-3 h-3 text-[#0A0F56] mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="truncate">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 