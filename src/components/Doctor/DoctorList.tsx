import { DoctorCard } from './DoctorCard';

const doctors = [
  {
    name: 'Dr. Ratul Ahamed',
    specialty: 'Heart Specialist',
    time: '9.30am - 01.00am BST',
    date: 'Jun 24, 2021',
    description: 'Infectious Diseases Hub aims to provide up-to-date, essential research and on aspects of microbiology, virology, and parasitology.',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
  },
  {
    name: 'Dr. Mohon khan',
    specialty: 'Heart Specialist',
    time: '9.30am - 01.00am BST',
    date: 'Jun 24, 2021',
    description: 'Infectious Diseases Hub aims to provide up-to-date, essential research and on aspects of microbiology, virology, and parasitology.',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
  },
  {
    name: 'Dr. Asad Ahamed',
    specialty: 'Heart Specialist',
    time: '9.30am - 01.00am BST',
    date: 'Jun 24, 2021',
    description: 'Infectious Diseases Hub aims to provide up-to-date, essential research and on aspects of microbiology, virology, and parasitology.',
    avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
  },
  {
    name: 'Dr. Ratul Ahamed',
    specialty: 'Heart Specialist',
    time: '9.30am - 01.00am BST',
    date: 'Jun 24, 2021',
    description: 'Infectious Diseases Hub aims to provide up-to-date, essential research and on aspects of microbiology, virology, and parasitology.',
    avatar: 'https://randomuser.me/api/portraits/men/14.jpg',
  },
  {
    name: 'Dr. Emon Ahamed',
    specialty: 'Heart Specialist',
    time: '9.30am - 01.00am BST',
    date: 'Jun 24, 2021',
    description: 'Infectious Diseases Hub aims to provide up-to-date, essential research and on aspects of microbiology, virology, and parasitology.',
    avatar: 'https://randomuser.me/api/portraits/women/15.jpg',
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