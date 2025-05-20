interface DoctorCardProps {
  name: string;
  specialty: string;
  time: string;
  date: string;
  description: string;
  avatar: string;
  experience: number;
  gender: string;
  age: number;
}

export function DoctorCard({ 
  name, 
  specialty, 
  time, 
  date, 
  description, 
  avatar,
  experience,
  gender,
  age 
}: DoctorCardProps) {
  return (
    <div className="flex items-center bg-white rounded-lg shadow-sm p-3 mb-3">
      <img src={avatar} alt={name} className="w-16 h-16 rounded-full mr-5" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-900 text-lg">{name}</div>
            <div className="text-xs text-indigo-700 font-medium mb-1">{specialty}</div>
            <div className="text-xs text-gray-500">{time} <span className="mx-1">•</span> {date}</div>
            <div className="text-xs text-gray-500 mt-1">
              {description}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {gender} • {age} years • {experience} years experience
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <button className="bg-blue-900 text-white px-4 py-1 rounded text-sm font-medium hover:bg-[#0A0F56] transition">View Appointments</button>
            <button className="border border-[#0A0F56] text-[#0A0F56] px-4 py-1 rounded text-sm font-medium hover:bg-indigo-50 transition">View Doctor Details</button>
          </div>
        </div>
      </div>
    </div>
  );
} 