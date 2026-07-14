import type { TrendMetrics } from '@/types/news';
import { formatDateLabel, formatHourLabel } from '@/services/trendsAnalyzer';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const DONUT_COLORS = ['#f97316', '#e11d48', '#8b5cf6', '#06b6d4', '#22c55e', '#f59e0b', '#3b82f6', '#ec4899', '#14b8a6', '#a855f7'];

interface TrendsChartsProps {
  metrics: TrendMetrics | null;
  loading: boolean;
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-background-100 rounded-2xl border border-background-200/70 p-5">
      <h4 className="text-sm font-semibold text-foreground-800 mb-4 flex items-center gap-2">
        <i className="ri-line-chart-line text-primary-500 text-base"></i>
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

export default function TrendsCharts({ metrics, loading }: TrendsChartsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="space-y-6">
          <ChartCard title="Noticias por día"><SkeletonChart height="h-64" /></ChartCard>
          <ChartCard title="Publicaciones por hora"><SkeletonChart height="h-64" /></ChartCard>
        </div>
        <div className="space-y-6">
          <ChartCard title="Principales fuentes"><SkeletonChart height="h-64" /></ChartCard>
          <ChartCard title="Distribución por fuente"><SkeletonChart height="h-64" /></ChartCard>
        </div>
      </div>
    );
  }

  if (!metrics) return null;

  const top10Sources = metrics.bySource.slice(0, 10);
  const donutData = metrics.bySource.slice(0, 7);
  const othersCount = metrics.bySource.slice(7).reduce((sum, s) => sum + s.count, 0);
  if (othersCount > 0) {
    donutData.push({ source: 'Otras', count: othersCount });
  }

  const lineData = metrics.byDay.map((d) => ({
    ...d,
    label: formatDateLabel(d.date),
  }));

  const barSourceData = top10Sources.map((s) => ({
    ...s,
    shortName: s.source.length > 18 ? s.source.slice(0, 18) + '...' : s.source,
  }));

  const hourData = metrics.byHour.map((h) => ({
    ...h,
    label: formatHourLabel(h.hour),
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* News by Day - Line Chart */}
      <ChartCard title="Noticias por día">
        {lineData.length === 0 ? (
          <p className="text-sm text-foreground-500 py-8 text-center">Sin datos disponibles</p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={lineData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--background-200) / 0.6)" />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'oklch(var(--foreground-600))' }} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: 'oklch(var(--foreground-600))' }} axisLine={false} tickLine={false} width={30} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'oklch(var(--background-50))',
                  border: '1px solid oklch(var(--background-200) / 0.7)',
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: 'oklch(var(--foreground-900))',
                }}
                labelFormatter={(label) => `Fecha: ${label}`}
                formatter={(value: number) => [`${value} noticias`, 'Cantidad']}
              />
              <Line type="monotone" dataKey="count" stroke="oklch(var(--primary-500))" strokeWidth={2.5} dot={{ r: 3, fill: 'oklch(var(--primary-500))' }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      {/* Top Sources - Horizontal Bar */}
      <ChartCard title="Principales fuentes">
        {barSourceData.length === 0 ? (
          <p className="text-sm text-foreground-500 py-8 text-center">Sin datos disponibles</p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barSourceData} layout="vertical" margin={{ top: 5, right: 20, left: 100, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--background-200) / 0.6)" horizontal={false} />
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: 'oklch(var(--foreground-600))' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="shortName" tick={{ fontSize: 11, fill: 'oklch(var(--foreground-600))' }} axisLine={false} tickLine={false} width={110} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'oklch(var(--background-50))',
                  border: '1px solid oklch(var(--background-200) / 0.7)',
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: 'oklch(var(--foreground-900))',
                }}
                formatter={(value: number, _: string, props: { payload: { source: string } }) => [`${value} noticias`, props.payload.source]}
                labelFormatter={() => ''}
              />
              <Bar dataKey="count" fill="oklch(var(--accent-500))" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      {/* Publications by Hour - Bar Chart */}
      <ChartCard title="Publicaciones por hora">
        {hourData.length === 0 ? (
          <p className="text-sm text-foreground-500 py-8 text-center">Sin datos disponibles</p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={hourData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--background-200) / 0.6)" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 10, fill: 'oklch(var(--foreground-600))' }} axisLine={false} tickLine={false} interval={3} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: 'oklch(var(--foreground-600))' }} axisLine={false} tickLine={false} width={30} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'oklch(var(--background-50))',
                  border: '1px solid oklch(var(--background-200) / 0.7)',
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: 'oklch(var(--foreground-900))',
                }}
                labelFormatter={(label) => `Hora: ${label}`}
                formatter={(value: number) => [`${value} noticias`, 'Cantidad']}
              />
              <Bar dataKey="count" fill="oklch(var(--secondary-500))" radius={[4, 4, 0, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      {/* Source Distribution - Donut */}
      <ChartCard title="Distribución por fuente">
        {donutData.length === 0 ? (
          <p className="text-sm text-foreground-500 py-8 text-center">Sin datos disponibles</p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={100}
                paddingAngle={2}
                dataKey="count"
                nameKey="source"
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
                formatter={(value: number, name: string) => [`${value} noticias`, name]}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                wrapperStyle={{ fontSize: '11px', color: 'oklch(var(--foreground-600))' }}
                formatter={(value: string) => value.length > 16 ? value.slice(0, 16) + '...' : value}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </ChartCard>
    </div>
  );
}