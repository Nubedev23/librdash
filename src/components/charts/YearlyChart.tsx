import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { ReadingSession } from '../../types';

interface YearlyChartProps {
  sessions: ReadingSession[];
  year?: number;
}

export function YearlyChart({ sessions, year = new Date().getFullYear() }: YearlyChartProps) {
  const months = ['Ene','Feb','Mar','Abr','May','Jun',
                   'Jul','Ago','Sep','Oct','Nov','Dic'];

  const data = months.map((mes, i) => {
    const month = String(i + 1).padStart(2, '0');
    const páginas = sessions
      .filter(s => s.date.startsWith(`${year}-${month}`))
      .reduce((acc, s) => acc + s.pagesRead, 0);
    return { mes, páginas };
  });

  return (
    <div className='bg-slate-900 border border-slate-800 rounded-xl p-5'>
      <h2 className='text-lg font-semibold text-white mb-4'>
        Páginas por mes — {year}
      </h2>
      <ResponsiveContainer width='100%' height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id='colorPages' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#22c55e' stopOpacity={0.3} />
              <stop offset='95%' stopColor='#22c55e' stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray='3 3' stroke='#1e293b' />
          <XAxis dataKey='mes' stroke='#94a3b8' tick={{ fontSize: 12 }} />
          <YAxis stroke='#94a3b8' tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#22c55e' }}
          />
          <Area type='monotone' dataKey='páginas' stroke='#22c55e'
                strokeWidth={2} fill='url(#colorPages)' />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

