interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
}

export function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <div className='bg-slate-900 border border-slate-800 rounded-xl p-5'>
      <div className='flex items-center justify-between mb-3'>
        <p className='text-sm text-slate-400'>{label}</p>
        <div className='text-blue-400'>{icon}</div>
      </div>
      <p className='text-3xl font-bold text-white'>{value}</p>
      {trend && (
        <p className='text-xs text-emerald-400 mt-1'>{trend}</p>
      )}
    </div>
  );
}
