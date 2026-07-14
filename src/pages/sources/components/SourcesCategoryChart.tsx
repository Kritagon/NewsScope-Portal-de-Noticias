import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { NewsSource } from '@/types/news';

const COLORS = [
  'oklch(var(--accent-500))',
  'oklch(var(--primary-500))',
  'oklch(var(--secondary-500))',
  'oklch(var(--accent-600))',
  'oklch(var(--primary-400))',
  'oklch(var(--secondary-600))',
  'oklch(var(--accent-400))',
];

interface SourcesCategoryChartProps {
  sources: NewsSource[];
}

function buildCategoryData(sources: NewsSource[]) {
  const counts: Record<string, number> = {};
  sources.forEach((s) => {
    const cat = s.category || 'unknown';
    counts[cat] = (counts[cat] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }))
    .sort((a, b) => b.value - a.value);
}

export default function SourcesCategoryChart({ sources }: SourcesCategoryChartProps) {
  const data = buildCategoryData(sources);

  if (data.length === 0) return null;

  return (
    <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
      <h3 className="text-base font-heading font-semibold text-foreground-900 mb-4 flex items-center gap-2">
        <i className="ri-pie-chart-line text-accent-600"></i>
        Fuentes por categoría
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={110}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'oklch(var(--background-50))',
              border: '1px solid oklch(var(--background-200) / 0.7)',
              borderRadius: '8px',
              fontSize: '13px',
            }}
            formatter={(value: number) => [`${value} fuentes`, '']}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            formatter={(value: string) => (
              <span style={{ color: 'oklch(var(--foreground-700))', fontSize: '13px' }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}