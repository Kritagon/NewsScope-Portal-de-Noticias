interface KPICardProps {
  icon: string;
  label: string;
  value: string | number;
  sub?: string;
}

export default function KPICard({ icon, label, value, sub }: KPICardProps) {
  return (
    <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 md:p-5 transition-all duration-300 hover:border-accent-200/50 hover:translate-y-[-2px]">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-100">
          <i className={`${icon} text-accent-600 text-lg`}></i>
        </div>
      </div>
      <p className="text-2xl md:text-3xl font-bold text-foreground-900 font-heading">{value}</p>
      <p className="text-sm text-foreground-600 mt-1">{label}</p>
      {sub && <p className="text-xs text-foreground-500 mt-0.5">{sub}</p>}
    </div>
  );
}