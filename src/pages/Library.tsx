import { Search } from 'lucide-react';
import { BookCard } from '../components/ui/BookCard';
import { useBooks } from '../hooks/useBooks';

const statusOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'completed', label: 'Leídos' },
  { value: 'reading', label: 'Leyendo' },
  { value: 'want-to-read', label: 'Pendientes' },
];

export function Library() {
  const { filteredBooks, filter, search, setFilter, setSearch } = useBooks();

  return (
    <div className='p-8 space-y-6'>
        <h1 className='text-2xl font-bold text-white'>Biblioteca</h1>

        {/* Barra de filtros */}
        <div className='flex gap-4'>
            <div className='relative flex-1 max-w-sm'>
                <Search size={16} className='absolute left-3 top-1/2
                                                -translate-y-1/2 text-slate-400' />
                <input
                    type='text'
                    placeholder='Buscar libros...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700
                            rounded-lg text-sm text-white placeholder-slate-500
                            focus:outline-none focus:border-blue-500'/>
            </div>

            <div className='flex gap-2'>
                {statusOptions.map(opt => (
                    <button key={opt.value}
                        onClick={() => setFilter(opt.value as any)}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors ${filter === opt.value
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}>
                            {opt.label}
                    </button>
                ))}
            </div>
        </div>

        {/* Grid de libros */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4'>
            {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
            ))}
        </div>
    </div>
  );
}
