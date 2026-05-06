import type { Book } from '../../types';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const statusLabels = {
  'completed': 'Leído',
  'reading': 'Leyendo',
  'want-to-read': 'Pendiente',
};

const statusColors = {
  'completed': 'bg-emerald-900 text-emerald-400',
  'reading': 'bg-blue-900 text-blue-400',
  'want-to-read': 'bg-slate-800 text-slate-400',
};

export function BookCard({ book }: { book: Book }) {
  return (
    <Link to={`/book/${book.id}`}
      className='bg-slate-900 border border-slate-800 rounded-xl
                 overflow-hidden hover:border-slate-600 transition-colors block'>
      {/* Portada */}
      <div className='aspect-[2/3] bg-slate-800 overflow-hidden'>
        <img
          src={book.coverUrl}
          alt={book.title}
          className='w-full h-full object-cover'
          onError={(e) => { e.currentTarget.src = '/placeholder-book.png'; }}
        />
      </div>

      {/* Info */}
      <div className='p-4 space-y-2'>
        <p className='font-semibold text-white text-sm leading-tight
                      line-clamp-2'>{book.title}</p>
        <p className='text-xs text-slate-400'>{book.author}</p>

        <div className='flex items-center justify-between'>
          <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[book.status]}`}>
            {statusLabels[book.status]}
          </span>
          <div className='flex items-center gap-0.5'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={10}
                className={i < book.rating ? 'text-amber-400' : 'text-slate-700'}
                fill={i < book.rating ? 'currentColor' : 'none'}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}