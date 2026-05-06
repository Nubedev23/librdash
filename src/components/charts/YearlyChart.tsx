import Plot from 'react-plotly.js';
import type { ReadingSession } from '../../types';

interface YearlyChartProps {
  sessions: ReadingSession[];
  year?: number;
}

export function YearlyChart({ sessions, year = new Date().getFullYear() }: YearlyChartProps) {
  const yearSessions = sessions.filter(s => s.date.startsWith(String(year)));

  const months = ['Ene','Feb','Mar','Abr','May','Jun',
                   'Jul','Ago','Sep','Oct','Nov','Dic'];

  const pagesByMonth = months.map((_, i) => {
    const month = String(i + 1).padStart(2, '0');
    return yearSessions
      .filter(s => s.date.startsWith(`${year}-${month}`))
      .reduce((acc, s) => acc + s.pagesRead, 0);
  });

  return (
    <div className='bg-slate-900 border border-slate-800 rounded-xl p-5'>
      <h2 className='text-lg font-semibold text-white mb-4'>
        Páginas por mes — {year}
      </h2>
      <Plot
        data={[{
          type: 'scatter',
          mode: 'lines+markers',
          x: months,
          y: pagesByMonth,
          line: { color: '#22c55e', width: 2 },
          marker: { color: '#22c55e', size: 6 },
          fill: 'tozeroy',
          fillcolor: 'rgba(34,197,94,0.1)',
        }]}
        layout={{
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: { color: '#94a3b8' },
          xaxis: { gridcolor: '#1e293b' },
          yaxis: { gridcolor: '#1e293b' },
          margin: { t: 10, r: 10, b: 40, l: 50 },
          height: 280,
        }}
        config={{ displayModeBar: false, responsive: true }}
        style={{ width: '100%' }}
      />
    </div>
  );
}

