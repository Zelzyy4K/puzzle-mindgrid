import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, CalendarDays, BrainCircuit, LineChart, History, Settings, User } from 'lucide-react';

const navItems = [
  { path: '/play', label: 'PLAY', icon: LayoutGrid },
  { path: '/daily', label: 'DAILY', icon: CalendarDays },
  { path: '/puzzles', label: 'PUZZLES', icon: BrainCircuit },
  { path: '/progress', label: 'PROGRESS', icon: LineChart },
  { path: '/history', label: 'HISTORY', icon: History },
];

export default function Navigation() {
  return (
    <nav className="fixed left-0 top-0 h-full w-[240px] bg-surface border-r border-border p-6 flex flex-col justify-between hidden md:flex">
      <div>
        <h1 className="text-2xl font-bold tracking-tighter mb-12 text-primary">MINDGRID</h1>
        <div className="space-y-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 text-sm font-medium transition-colors ${
                  isActive ? 'text-accent' : 'text-secondary hover:text-primary'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <NavLink to="/settings" className="flex items-center gap-3 text-sm font-medium text-secondary hover:text-primary">
          <Settings size={18} /> SETTINGS
        </NavLink>
        <NavLink to="/profile" className="flex items-center gap-3 text-sm font-medium text-secondary hover:text-primary">
          <User size={18} /> PROFILE
        </NavLink>
      </div>
    </nav>
  );
}
