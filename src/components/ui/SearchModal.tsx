import { useState, useEffect } from 'react';
import { Search, X, Plus, Loader2 } from 'lucide-react';
import { useSearch } from '../../hooks/useSearch';
import { useBooks } from '../../hooks/useBooks';
import { mapGoogleBook } from '../../lib/api';
import type { Book } from '../../types';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const { results, loading, error, search } = useSearch();
  const { addBook, books } = useBooks();

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && query.trim().length > 2) {
            search(query);
        }
    };

  if (!open) return null;

  const handleAdd = (gb: any) => {
    const already = books.find(b => b.id === gb.id);
    if (already) return;
    const book = mapGoogleBook(gb) as Book;
    addBook(book);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-start justify-center pt-20'
      onClick={onClose}>
      <div className='absolute inset-0 bg-black/60 backdrop-blur-sm' />

      <div className='relative bg-slate-900 border border-slate-700 rounded-2xl
                      w-full max-w-xl shadow-2xl'
        onClick={e => e.stopPropagation()}>

        {/* Input */}
        <div className='flex items-center gap-3 p-4 border-b border-slate-800'>
          <Search size={18} className='text-slate-400 shrink-0' />
          <input
            autoFocus
            type='text'
            placeholder='Buscar en Google Books...(Enter para buscar)'
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className='flex-1 bg-transparent text-white placeholder-slate-500
                       outline-none text-sm'
          />
          <button onClick={onClose}>
            <X size={18} className='text-slate-400 hover:text-white transition-colors' />
          </button>
        </div>

        {/* Resultados */}
        <div className='max-h-96 overflow-y-auto'>
          {loading && (
            <div className='flex items-center justify-center p-8'>
              <Loader2 size={24} className='text-blue-400 animate-spin' />
            </div>
          )}

          {error && (
            <p className='text-red-400 text-sm text-center p-6'>{error}</p>
          )}

          {!loading && results.length === 0 && query.length > 2 && (
            <p className='text-slate-500 text-sm text-center p-6'>
              No se encontraron resultados
            </p>
          )}

          {!loading && query.length <= 2 && (
            <p className='text-slate-500 text-sm text-center p-6'>
              Escribe al menos 3 caracteres para buscar
            </p>
          )}

          {results.map(gb => {
            const already = books.find(b => b.id === gb.id);
            return (
              <div key={gb.id}
                className='flex items-center gap-3 p-3 hover:bg-slate-800
                           transition-colors border-b border-slate-800/50 last:border-0'>
                {/* Portada */}
                <img
                  src={gb.volumeInfo.imageLinks?.thumbnail || ''}
                  alt={gb.volumeInfo.title}
                  className='w-10 h-14 object-cover rounded shrink-0 bg-slate-700'
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
                {/* Info */}
                <div className='flex-1 min-w-0'>
                  <p className='text-white text-sm font-medium truncate'>
                    {gb.volumeInfo.title}
                  </p>
                  <p className='text-slate-400 text-xs truncate'>
                    {gb.volumeInfo.authors?.[0] || 'Desconocido'}
                  </p>
                  <p className='text-slate-600 text-xs'>
                    {gb.volumeInfo.pageCount ? `${gb.volumeInfo.pageCount} páginas` : ''}
                  </p>
                </div>
                {/* Botón */}
                <button
                  onClick={() => handleAdd(gb)}
                  disabled={!!already}
                  className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg
                             text-xs transition-colors ${already
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                  <Plus size={12} />
                  {already ? 'Agregado' : 'Agregar'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}