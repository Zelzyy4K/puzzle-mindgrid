import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, CalendarDays, BrainCircuit, LineChart, User } from 'lucide-react';

const mobileNavItems = [
  { path: '/play', label: 'PLAY', icon: LayoutGrid },
  { path: '/daily', label: 'DAILY', icon: CalendarDays },
  { path: '/puzzles', label: 'PUZZLES', icon: BrainCircuit },
  { path: '/progress', label: 'PROGRESS', icon: LineChart },
  { path: '/profile', label: 'PROFILE', icon: User },
];

export default function MobileNavigation() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-surface border-t border-border flex justify-around py-3 md:hidden z-50">
      {mobileNavItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-xs font-medium transition-colors ${
              isActive ? 'text-accent' : 'text-secondary hover:text-primary'
            }`
          }
        >
          <item.icon size={20} />
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}
