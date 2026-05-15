import { YearlyChart } from '../components/charts/YearlyChart';
import { useBooks } from '../hooks/useBooks';
import { useStats } from '../hooks/useStats';
import { useSessions } from '../hooks/useSessions';

export function Stats() {
  const { books } = useBooks();
  const { sessions } = useSessions();
  const stats = useStats(books, sessions);

  return (
    <div className='p-8 space-y-8'>
      <div>
        <h1 className='text-2xl font-bold text-white'>Estadísticas</h1>
        <p className='text-slate-400 mt-1'>Tu progreso de lectura</p>
      </div>

      <YearlyChart sessions={sessions} />

      <div className='grid grid-cols-2 gap-4'>
        <div className='bg-slate-900 border border-slate-800 rounded-xl p-5'>
          <p className='text-slate-400 text-sm'>Género favorito</p>
          <p className='text-2xl font-bold text-white mt-1'>{stats.favoriteGenre}</p>
        </div>
        <div className='bg-slate-900 border border-slate-800 rounded-xl p-5'>
          <p className='text-slate-400 text-sm'>Libros este año</p>
          <p className='text-2xl font-bold text-white mt-1'>{stats.booksThisYear}</p>
        </div>
      </div>
    </div>
  );
}