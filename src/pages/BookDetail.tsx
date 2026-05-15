import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Calendar, Star, FileText, Trash2, Save } from 'lucide-react';
import { useBooks } from '../hooks/useBooks';
import type { ReadingStatus } from '../types';
import { useSessions } from '../hooks/useSessions';

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
  const { books, deleteBook, updateBook } = useBooks();
  const { addSession } = useSessions();
  const book = books.find(b => b.id === id);

  // Estados locales para la edición
  const [rating, setRating] = useState(0);
  const [pagesRead, setPagesRead] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Cargar datos del libro al estado local cuando el libro esté disponible
  useEffect(() => {
    if (book) {
      setRating(book.rating || 0);
      // Si no tienes un campo pagesRead en tu DB aún, podemos usar 0 por defecto
      setPagesRead(book.pagesRead || 0); 
      setStartDate(book.startDate || '');
      setFinishDate(book.finishDate || '');
      setNotes(book.notes || '');
    }
  }, [book]);

  if (!book) {
    return (
      <div className='p-8 text-center'>
        <p className='text-slate-400'>Libro no encontrado.</p>
        <button onClick={() => navigate('/library')} className='mt-4 text-blue-400 hover:underline'>
          Volver a la biblioteca
        </button>
      </div>
    );
  }

  // Cálculo de progreso basado en el estado local
  const progress = Math.min(Math.round((pagesRead / book.totalPages) * 100), 100);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Calcular páginas nuevas leídas en esta sesión
      const pagesNewlyRead = pagesRead - (book.pagesRead || 0);

      await updateBook(book.id, {
        rating,
        pagesRead,
        startDate,
        finishDate,
        notes,
        status: pagesRead >= book.totalPages 
          ? 'completed' 
          : pagesRead > 0 
            ? 'reading' 
            : book.status
      });

      // Solo crear sesión si realmente leyó páginas nuevas hoy
      if (pagesNewlyRead > 0) {
        await addSession({
          bookId: book.id,
          date: new Date().toISOString().split('T')[0], // 'YYYY-MM-DD'
          pagesRead: pagesNewlyRead,
        });
      }

      alert('¡Cambios guardados!');
    } catch (error) {
      console.error(error);
      alert('Error al guardar');
    } finally {
      setIsSaving(false);
    }
};

  const onDelete = async () => {
    if (confirm(`¿Seguro que quieres eliminar "${book.title}"?`)) {
      await deleteBook(book.id);
      navigate('/library');
    }
  };

  return (
    <div className='p-8 space-y-8 max-w-3xl'>
      {/* Header Navegación */}
      <div className='flex items-center justify-between'>
        <button onClick={() => navigate(-1)} className='flex items-center gap-2 text-slate-400 hover:text-white transition-colors'>
          <ArrowLeft size={16} /> Volver
        </button>
        <div className='flex gap-4'>
          <button onClick={handleSave} disabled={isSaving}
            className='flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50'>
            <Save size={16} /> {isSaving ? 'Guardando...' : 'Guardar cambios'}
          </button>
          <button onClick={onDelete} className='flex items-center gap-2 text-red-500/70 hover:text-red-500 transition-colors text-sm font-medium'>
            <Trash2 size={16} /> Eliminar
          </button>
        </div>
      </div>

      {/* Info Principal */}
      <div className='flex gap-6'>
        <img src={book.coverUrl} alt={book.title} className='w-32 h-48 object-cover rounded-lg shadow-lg' />
        <div className='flex-1 space-y-4'>
          <div>
            <h1 className='text-2xl font-bold text-white'>{book.title}</h1>
            <p className='text-slate-400'>{book.author}</p>
          </div>
          
          <div className='flex items-center gap-4'>
            <span className={`px-3 py-1 rounded-full text-xs text-white ${statusColor[book.status]}`}>
              {statusLabel[book.status]}
            </span>
            {/* Sistema de Estrellas Editable */}
            <div className='flex gap-1'>
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)}>
                  <Star size={20}
                    className={star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'} 
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Inputs de Progreso y Fechas */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Sección Progreso */}
        <div className='bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-sm font-semibold text-slate-400 flex items-center gap-2'>
              <BookOpen size={16} /> Lectura
            </h2>
            <span className='text-blue-400 font-bold'>{progress}%</span>
          </div>
          
          <div className='space-y-2'>
            <label className='text-xs text-slate-500'>Páginas leídas</label>
            <div className='flex items-center gap-3'>
              <input 
                type="number"
                value={pagesRead}
                min={0}
                max={book.totalPages}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  const clampedValue = Math.max(0, Math.min(val, book.totalPages));
                  setPagesRead(clampedValue);
                }}
                className='bg-slate-800 border border-slate-700 rounded px-3 py-1 text-white w-24' />
              <span className='text-slate-500 text-sm'>de {book.totalPages}</span>
            </div>
          </div>

          <div className='w-full bg-slate-800 rounded-full h-2'>
            <div className='bg-blue-500 h-2 rounded-full transition-all' style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Sección Fechas */}
        <div className='bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4'>
          <h2 className='text-sm font-semibold text-slate-400 flex items-center gap-2'>
            <Calendar size={16} /> Cronología
          </h2>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-1'>
              <label className='text-[10px] uppercase text-slate-500 font-bold'>Inicio</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                className='bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white w-full' />
            </div>
            <div className='space-y-1'>
              <label className='text-[10px] uppercase text-slate-500 font-bold'>Fin</label>
              <input type="date" value={finishDate} onChange={(e) => setFinishDate(e.target.value)}
                className='bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white w-full' />
            </div>
          </div>
        </div>
      </div>

      {/* Cuadro de Reseña (Tipo Twitter) */}
      <div className='bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3'>
        <div className='flex justify-between items-center'>
          <h2 className='text-sm font-semibold text-slate-400 flex items-center gap-2'>
            <FileText size={16} /> Reseña Personal
          </h2>
          <span className={`text-[10px] ${notes.length > 250 ? 'text-orange-400' : 'text-slate-500'}`}>
            {notes.length} / 280
          </span>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value.slice(0, 280))} // Límite de 280 caracteres
          placeholder="¿Qué te pareció este libro? (Escribe una reseña corta...)"
          className='w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 min-h-[100px] resize-none'
        />
      </div>
    </div>
  );
}