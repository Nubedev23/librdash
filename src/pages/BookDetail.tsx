import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar, Star, FileText } from 'lucide-react';
import { useBooks } from '../hooks/useBooks';
import { mockSessions } from '../data/mockBooks';
import type { ReadingStatus } from '../types';

const statusLabel: Record<ReadingStatus, string> = {
  'reading': 'Leyendo',
  'completed': 'Completado',
  'want-to-read': 'Quiero leer',
};

const statusColor: Record<ReadingStatus, string> = {
  'reading': 'bg-blue-600',
  'completed': 'bg-green-600',
  'want-to-read': 'bg-slate-600',
};

export function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books } = useBooks();

  const book = books.find(b => b.id === id);

  if (!book) {
    return (
      <div className='p-8 text-center'>
        <p className='text-slate-400'>Libro no encontrado.</p>
        <button onClick={() => navigate('/library')}
          className='mt-4 text-blue-400 hover:underline'>
          Volver a la biblioteca
        </button>
      </div>
    );
  }

  const sessions = mockSessions.filter(s => s.bookId === book.id);
  const pagesRead = sessions.reduce((acc, s) => acc + s.pagesRead, 0);
  const progress = Math.min(Math.round((pagesRead / book.totalPages) * 100), 100);

  return (
    <div className='p-8 space-y-8 max-w-3xl'>
      {/* Volver */}
      <button onClick={() => navigate(-1)}
        className='flex items-center gap-2 text-slate-400 hover:text-white transition-colors'>
        <ArrowLeft size={16} />
        Volver
      </button>

      {/* Header */}
      <div className='flex gap-6'>
        <img src={book.coverUrl} alt={book.title}
          className='w-32 h-48 object-cover rounded-lg shadow-lg' />
        <div className='flex-1 space-y-3'>
          <div>
            <h1 className='text-2xl font-bold text-white'>{book.title}</h1>
            <p className='text-slate-400 mt-1'>{book.author}</p>
          </div>
          <span className={`inline-block px-3 py-1 rounded-full text-xs text-white ${statusColor[book.status]}`}>
            {statusLabel[book.status]}
          </span>
          {/* Estrellas */}
          <div className='flex gap-1'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16}
                className={i < book.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'} />
            ))}
          </div>
          <p className='text-sm text-slate-400'>Género: {book.genre}</p>
        </div>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-3 gap-4'>
        <div className='bg-slate-900 border border-slate-800 rounded-xl p-4'>
          <div className='flex items-center gap-2 text-slate-400 text-sm mb-1'>
            <FileText size={14} /> Páginas
          </div>
          <p className='text-xl font-bold text-white'>{book.totalPages}</p>
        </div>
        <div className='bg-slate-900 border border-slate-800 rounded-xl p-4'>
          <div className='flex items-center gap-2 text-slate-400 text-sm mb-1'>
            <BookOpen size={14} /> Progreso
          </div>
          <p className='text-xl font-bold text-white'>{progress}%</p>
        </div>
        <div className='bg-slate-900 border border-slate-800 rounded-xl p-4'>
          <div className='flex items-center gap-2 text-slate-400 text-sm mb-1'>
            <Calendar size={14} /> Inicio
          </div>
          <p className='text-xl font-bold text-white'>{book.startDate}</p>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className='bg-slate-900 border border-slate-800 rounded-xl p-5'>
        <div className='flex justify-between text-sm text-slate-400 mb-2'>
          <span>{pagesRead} páginas leídas</span>
          <span>{book.totalPages} total</span>
        </div>
        <div className='w-full bg-slate-700 rounded-full h-2'>
          <div className='bg-blue-500 h-2 rounded-full transition-all'
            style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Notas */}
      {book.notes && (
        <div className='bg-slate-900 border border-slate-800 rounded-xl p-5'>
          <h2 className='text-sm font-semibold text-slate-400 mb-2'>Notas</h2>
          <p className='text-white text-sm leading-relaxed'>{book.notes}</p>
        </div>
      )}
    </div>
  );
}