import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, BarChart3, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SearchModal } from '../ui/SearchModal';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/library', label: 'Biblioteca', icon: BookOpen },
  { to: '/stats', label: 'Estadísticas', icon: BarChart3 },
];

export function Sidebar() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <aside className='w-64 h-screen bg-slate-900 border-r border-slate-800
                        flex flex-col sticky top-0'>
        <div className='p-6 border-b border-slate-800'>
          <h1 className='text-xl font-bold text-blue-400'>BookDash</h1>
          <p className='text-xs text-slate-500 mt-1'>Tu biblioteca personal</p>
        </div>

        <nav className='flex-1 p-4 space-y-1'>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) => cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              )}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className='p-4 border-t border-slate-800'>
          <button
            onClick={() => setModalOpen(true)}
            className='w-full flex items-center gap-2 px-3 py-2.5
                       bg-blue-600 hover:bg-blue-700 text-white text-sm
                       rounded-lg transition-colors'>
            <Plus size={16} />
            Agregar libro
          </button>
        </div>
      </aside>

      <SearchModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}