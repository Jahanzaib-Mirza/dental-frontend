import { DoctorCard } from './DoctorCard';

const doctors = [
  {
    name: 'Dr. Ayesha Rahman',
    specialty: 'Orthodontist',
    time: '10:00am - 2:00pm',
    date: 'May 20, 2025',
    description: 'Expert in braces, aligners, and correcting dental irregularities. Passionate about creating beautiful smiles for all ages.',
    avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
    gender: 'Female',
    age: 38,
    experience: 12,
  },
  {
    name: 'Dr. Imran Chowdhury',
    specialty: 'Endodontist',
    time: '11:00am - 3:00pm',
    date: 'May 21, 2025',
    description: 'Specialist in root canal treatments and dental pain management. Dedicated to saving natural teeth with advanced techniques.',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    gender: 'Male',
    age: 45,
    experience: 18,
  },
  {
    name: 'Dr. Nusrat Jahan',
    specialty: 'Pediatric Dentist',
    time: '9:00am - 1:00pm',
    date: 'May 22, 2025',
    description: 'Gentle and caring dentist for children. Focused on preventive care and making dental visits fun and stress-free.',
    avatar: 'https://randomuser.me/api/portraits/women/13.jpg',
    gender: 'Female',
    age: 33,
    experience: 8,
  },
  {
    name: 'Dr. Asif Rahman',
    specialty: 'Oral Surgeon',
    time: '2:00pm - 6:00pm',
    date: 'May 23, 2025',
    description: 'Performs wisdom tooth extractions, dental implants, and oral surgeries with precision and care.',
    avatar: 'https://randomuser.me/api/portraits/men/14.jpg',
    gender: 'Male',
    age: 41,
    experience: 15,
  },
  {
    name: 'Dr. Farzana Karim',
    specialty: 'General Dentist',
    time: '8:00am - 12:00pm',
    date: 'May 24, 2025',
    description: 'Provides comprehensive dental care including checkups, fillings, and preventive treatments for the whole family.',
    avatar: 'https://randomuser.me/api/portraits/women/15.jpg',
    gender: 'Female',
    age: 36,
    experience: 10,
  },
];

export function DoctorList() {
  return (
    <div>
      {doctors.map((doctor, idx) => (
        <DoctorCard key={idx} {...doctor} />
      ))}
    </div>
  );
} 