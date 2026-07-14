import type { ComparisonResult } from '@/types/news';
import { formatDateLabel } from '@/services/trendsAnalyzer';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const DONUT_COLORS = ['oklch(var(--primary-500))', 'oklch(var(--accent-500))'];

interface CompareChartsProps {
  result: ComparisonResult | null;
  loading: boolean;
  topicA: string;
  topicB: string;
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-background-100 rounded-2xl border border-background-200/70 p-5">
      <h4 className="text-sm font-semibold text-foreground-800 mb-4 flex items-center gap-2">
        <i className="ri-bar-chart-grouped-line text-accent-500 text-base"></i>
        {title}
      </h4>
      {children}
    </div>
  );
}

function SkeletonChart({ height }: { height: string }) {
  return (
    <div className={`${height} skeleton-shimmer rounded-lg`} />
  );
}

export default function CompareCharts({ result, loading, topicA, topicB }: CompareChartsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Evolución diaria"><SkeletonChart height="h-72" /></ChartCard>
        <ChartCard title="Comparación de fuentes"><SkeletonChart height="h-72" /></ChartCard>
        <ChartCard title="Participación total"><SkeletonChart height="h-64" /></ChartCard>
        <ChartCard title="Tabla comparativa"><SkeletonChart height="h-64" /></ChartCard>
      </div>
    );
  }

  if (!result) return null;

  // Build merged daily data
  const allDates = new Set<string>();
  result.topicA.byDay.forEach((d) => allDates.add(d.date));
  result.topicB.byDay.forEach((d) => allDates.add(d.date));

  const dayMapA: Record<string, number> = {};
  const dayMapB: Record<string, number> = {};
  result.topicA.byDay.forEach((d) => { dayMapA[d.date] = d.count; });
  result.topicB.byDay.forEach((d) => { dayMapB[d.date] = d.count; });

  const mergedDays = Array.from(allDates)
    .sort()
    .map((date) => ({
      date,
      label: formatDateLabel(date),
      [topicA]: dayMapA[date] || 0,
      [topicB]: dayMapB[date] || 0,
    }));

  // Build merged source data
  const allSources = new Set<string>();
  const topA = result.topicA.bySource.slice(0, 8);
  const topB = result.topicB.bySource.slice(0, 8);
  topA.forEach((s) => allSources.add(s.source));
  topB.forEach((s) => allSources.add(s.source));

  const sourceMapA: Record<string, number> = {};
  const sourceMapB: Record<string, number> = {};
  result.topicA.bySource.forEach((s) => { sourceMapA[s.source] = s.count; });
  result.topicB.bySource.forEach((s) => { sourceMapB[s.source] = s.count; });

  const mergedSources = Array.from(allSources)
    .map((source) => ({
      source: source.length > 18 ? source.slice(0, 18) + '...' : source,
      fullSource: source,
      [topicA]: sourceMapA[source] || 0,
      [topicB]: sourceMapB[source] || 0,
    }))
    .sort((a, b) => (b[topicA] + b[topicB]) - (a[topicA] + a[topicB]))
    .slice(0, 12);

  // Donut data
  const donutData = [
    { name: topicA, value: result.topicA.totalNews },
    { name: topicB, value: result.topicB.totalNews },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Evolution - Overlaid Lines */}
      <ChartCard title="Evolución diaria">
        {mergedDays.length === 0 ? (
          <p className="text-sm text-foreground-500 py-8 text-center">Sin datos disponibles</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mergedDays} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--background-200) / 0.6)" />
              <XAxis dataKey="label" tick={{ fontSize: 10, fill: 'oklch(var(--foreground-600))' }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: 'oklch(var(--foreground-600))' }} axisLine={false} tickLine={false} width={30} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'oklch(var(--background-50))',
                  border: '1px solid oklch(var(--background-200) / 0.7)',
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: 'oklch(var(--foreground-900))',
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: '12px', color: 'oklch(var(--foreground-600))' }}
              />
              <Line type="monotone" dataKey={topicA} stroke="oklch(var(--primary-500))" strokeWidth={2.5} dot={{ r: 3, fill: 'oklch(var(--primary-500))' }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey={topicB} stroke="oklch(var(--accent-500))" strokeWidth={2.5} dot={{ r: 3, fill: 'oklch(var(--accent-500))' }} activeDot={{ r: 5 }} strokeDasharray="6 3" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      {/* Sources Comparison - Grouped Bars */}
      <ChartCard title="Comparación de fuentes principales">
        {mergedSources.length === 0 ? (
          <p className="text-sm text-foreground-500 py-8 text-center">Sin datos disponibles</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mergedSources} layout="vertical" margin={{ top: 5, right: 20, left: 110, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--background-200) / 0.6)" horizontal={false} />
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: 'oklch(var(--foreground-600))' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="source" tick={{ fontSize: 10, fill: 'oklch(var(--foreground-600))' }} axisLine={false} tickLine={false} width={105} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'oklch(var(--background-50))',
                  border: '1px solid oklch(var(--background-200) / 0.7)',
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: 'oklch(var(--foreground-900))',
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: '12px', color: 'oklch(var(--foreground-600))' }}
              />
              <Bar dataKey={topicA} fill="oklch(var(--primary-500))" radius={[0, 2, 2, 0]} barSize={10} />
              <Bar dataKey={topicB} fill="oklch(var(--accent-500))" radius={[0, 2, 2, 0]} barSize={10} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      {/* Participation Donut */}
      <ChartCard title="Participación sobre el total de noticias">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={donutData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={105}
              paddingAngle={4}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name.length > 15 ? name.slice(0, 15) + '...' : name} ${(percent * 100).toFixed(0)}%`}
              labelLine={true}
            >
              {donutData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={DONUT_COLORS[index % DONUT_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'oklch(var(--background-50))',
                border: '1px solid oklch(var(--background-200) / 0.7)',
                borderRadius: '8px',
                fontSize: '13px',
                color: 'oklch(var(--foreground-900))',
              }}
              formatter={(value: number) => [`${value} noticias`]}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Source Table */}
      <ChartCard title="Tabla comparativa de fuentes">
        <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-background-100">
              <tr className="border-b border-background-200/70">
                <th className="text-left py-2 px-2 font-semibold text-foreground-600 uppercase text-[10px]">Fuente</th>
                <th className="text-center py-2 px-2 font-semibold text-primary-600 uppercase text-[10px]">{topicA.length > 10 ? topicA.slice(0, 10) + '...' : topicA}</th>
                <th className="text-center py-2 px-2 font-semibold text-accent-600 uppercase text-[10px]">{topicB.length > 10 ? topicB.slice(0, 10) + '...' : topicB}</th>
              </tr>
            </thead>
            <tbody>
              {mergedSources.map((row, i) => (
                <tr key={i} className="border-b border-background-200/40 hover:bg-background-50 transition-colors">
                  <td className="py-2 px-2 text-foreground-700 truncate max-w-[120px]" title={row.fullSource}>{row.source}</td>
                  <td className="py-2 px-2 text-center text-foreground-800 font-medium">{row[topicA] || '-'}</td>
                  <td className="py-2 px-2 text-center text-foreground-800 font-medium">{row[topicB] || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}