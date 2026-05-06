import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { ReadingSession } from '../../types';

interface PagesChartProps {
  sessions: ReadingSession[];
}

export function PagesChart({ sessions }: PagesChartProps) {
  const byDate = sessions.reduce((acc, s) => {
    acc[s.date] = (acc[s.date] || 0) + s.pagesRead;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.keys(byDate).sort().map(date => ({
    date,
    páginas: byDate[date],
  }));

  return (
    <div className='bg-slate-900 border border-slate-800 rounded-xl p-5'>
      <h2 className='text-lg font-semibold text-white mb-4'>
        Páginas leídas por día
      </h2>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data} margin={{ top: 10, right: 10, bottom: 60, left: 0 }}>
          <CartesianGrid strokeDasharray='3 3' stroke='#1e293b' />
          <XAxis dataKey='date' stroke='#94a3b8' tick={{ fontSize: 12 }} angle={-45} textAnchor='end' />
          <YAxis stroke='#94a3b8' tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#3b82f6' }}
          />
          <Bar dataKey='páginas' fill='#3b82f6' radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}