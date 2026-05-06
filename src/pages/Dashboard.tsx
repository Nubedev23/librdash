import { BookOpen, TrendingUp, FileText, Flame } from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { PagesChart } from '../components/charts/PagesChart';
import { useBooks } from '../hooks/useBooks';
import { useStats } from '../hooks/useStats';
import { mockSessions } from '../data/mockBooks';

export function Dashboard() {
  const { books } = useBooks();
  const stats = useStats(books, mockSessions);

  return (
    <div className='p-8 space-y-8'>
      <div>
        <h1 className='text-2xl font-bold text-white'>Dashboard</h1>
        <p className='text-slate-400 mt-1'>Tu resumen de lectura</p>
      </div>
      {/* Grid de tarjetas */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        <StatCard
          label='Libros leídos'
          value={stats.totalBooks}
          icon={<BookOpen size={20} />}
        />
        <StatCard
          label='Este año'
          value={stats.booksThisYear}
          icon={<TrendingUp size={20} />}
        />
        <StatCard
          label='Páginas totales'
          value={stats.totalPages.toLocaleString()}
          icon={<FileText size={20} />}
        />
        <StatCard
          label='Género favorito'
          value={stats.favoriteGenre}
          icon={<Flame size={20} />}
        />
      </div>

      {/* Gráfico principal */}
      <PagesChart sessions={mockSessions} />
    </div>
  );
}
