import { icons } from "../../assets";
import Icon from "../Icons";

const navLinks = [
  { label: 'Dashboard', icon: 'bar_chart' },
  { label: 'Doctor Appointment', icon: 'calender_add' },
  { label: 'Lab Appointment', icon: 'vase' },
  { label: 'Patients List', icon: 'users' },
  { divider: true },
  // { label: 'Clinic IP', icon: 'home' },
  { label: 'Billing', icon: 'document_chart' },
  { label: 'Account', icon: 'user' },
  { divider: true },
  { label: 'Settings', icon: 'settings' },
  { label: 'Log Out', icon: 'logout' },
];

interface MenuItemProps {
  icon: keyof typeof icons;
  text: string;
}

export function Sidebar() {
  return (
    <aside className="w-74 bg-gray-50 h-screen flex border-r border-gray-200 justify-center">
      {/* Sidebar Title */}
      <div className="bg-white w-64 h-screen rounded-lg mt-5 drop-shadow-md p-4">
        <div className="flex items-center justify-center w-full pb-6">
          <span className="text-2xl font-bold text-primary flex items-center gap-2">
            {/* You can add a logo here if you want */}
            Medic
          </span>
        </div>

        <div className="bg-gray-100 h-0.5 w-full mb-6"></div>
        {/* Menu Items */}
        <nav className="flex-1 flex flex-col gap-1">
          {navLinks.map((link, idx) => {
            if (link.divider) {
              return <div key={idx} className="bg-gray-100 h-0.5 w-full my-3"></div>;
            } else if (link.icon && link.label) {
              return (
                <MenuItem key={link.label} icon={link.icon as keyof typeof icons} text={link.label} />
              );
            } else {
              return null;
            }
          })}
        </nav>
      </div>
    </aside>
  );
}

function MenuItem({ icon, text }: MenuItemProps) {
  return (
    <div
      className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer text-gray-700 text-[15px] font-medium hover:bg-blue-50 transition-all duration-200"
    >
      <Icon name={icon} width="w-5" height="h-5" />
      <span>{text}</span>
    </div>
  );
}