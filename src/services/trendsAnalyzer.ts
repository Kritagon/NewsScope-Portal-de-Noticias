import type { Article, TrendMetrics, ComparisonResult } from '@/types/news';

const STOP_WORDS_ES = new Set([
  'de', 'la', 'el', 'los', 'las', 'y', 'en', 'para', 'con', 'un', 'una',
  'que', 'es', 'por', 'del', 'al', 'se', 'no', 'su', 'lo', 'como',
  'más', 'pero', 'sus', 'le', 'ya', 'o', 'este', 'fue', 'fue',
  'entre', 'tras', 'sin', 'hasta', 'desde', 'sobre', 'cada', 'también',
  'todo', 'esta', 'han', 'año', 'dos', 'era', 'muy', 'hay', 'vez',
  'the', 'of', 'and', 'to', 'in', 'a', 'is', 'that', 'for', 'it',
  'on', 'with', 'as', 'was', 'at', 'by', 'an', 'be', 'this', 'from',
  'or', 'are', 'not', 'but', 'has', 'have', 'had', 'its', 'can',
  'which', 'will', 'all', 'their', 'more', 'new', 'one', 'than',
  'about', 'also', 'after', 'just', 'into', 'other', 'some', 'what',
  'when', 'who', 'how', 'would', 'could', 'been', 'may', 'these',
  'were', 'they', 'said', 'out', 'up', 'if', 'do', 'does', 'did',
  'he', 'she', 'we', 'us', 'them', 'then', 'now', 'over', 'only',
  'most', 'first', 'still', 'even', 'many', 'much', 'such', 'back',
  'while', 'during', 'through', 'under', 'where', 'there', 'those',
  'being', 'should', 'because', 'before', 'around', 'well', 'very',
]);

export function computeTrendMetrics(articles: Article[], topicName: string): TrendMetrics {
  const byDayMap: Record<string, number> = {};
  const bySourceMap: Record<string, number> = {};
  const byHourMap: Record<string, number> = {};
  const wordMap: Record<string, number> = {};
  const sources = new Set<string>();

  for (let i = 0; i < 24; i++) {
    byHourMap[i] = 0;
  }

  articles.forEach((article) => {
    const date = article.publishedAt.slice(0, 10);
    byDayMap[date] = (byDayMap[date] || 0) + 1;

    const sourceName = article.source.name || 'Desconocido';
    bySourceMap[sourceName] = (bySourceMap[sourceName] || 0) + 1;
    sources.add(sourceName);

    const hour = new Date(article.publishedAt).getUTCHours();
    byHourMap[hour] = (byHourMap[hour] || 0) + 1;

    const words = article.title
      .toLowerCase()
      .replace(/[^a-záéíóúüñ\s]/gi, '')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP_WORDS_ES.has(w));

    words.forEach((w) => {
      wordMap[w] = (wordMap[w] || 0) + 1;
    });
  });

  const byDay = Object.entries(byDayMap)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const bySource = Object.entries(bySourceMap)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);

  const byHour = Object.entries(byHourMap)
    .map(([hour, count]) => ({ hour: parseInt(hour), count }))
    .sort((a, b) => a.hour - b.hour);

  const frequentWords = Object.entries(wordMap)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 25);

  const totalNews = articles.length;
  const totalSources = sources.size;
  const dayCount = Object.keys(byDayMap).length;
  const avgPerDay = dayCount > 0 ? Math.round(totalNews / dayCount) : 0;

  let peakDay = '';
  let peakCount = 0;
  for (const { date, count } of byDay) {
    if (count > peakCount) {
      peakCount = count;
      peakDay = date;
    }
  }

  return {
    totalNews,
    totalSources,
    avgPerDay,
    peakDay,
    peakCount,
    byDay,
    bySource,
    byHour,
    frequentWords,
  };
}

export function computeComparisonResult(
  articlesA: Article[],
  topicA: string,
  articlesB: Article[],
  topicB: string
): ComparisonResult {
  const metricsA = computeTrendMetrics(articlesA, topicA);
  const metricsB = computeTrendMetrics(articlesB, topicB);

  let winner: 'A' | 'B' | 'tie';
  if (metricsA.totalNews > metricsB.totalNews) {
    winner = 'A';
  } else if (metricsB.totalNews > metricsA.totalNews) {
    winner = 'B';
  } else {
    winner = 'tie';
  }

  const absoluteDifference = Math.abs(metricsA.totalNews - metricsB.totalNews);
  const totalBoth = metricsA.totalNews + metricsB.totalNews;
  const percentageDifference = totalBoth > 0 ? Math.round((absoluteDifference / totalBoth) * 100) : 0;

  return {
    topicA: metricsA,
    topicB: metricsB,
    winner,
    absoluteDifference,
    percentageDifference,
  };
}

export function formatDateLabel(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}

export function formatHourLabel(hour: number): string {
  return `${hour.toString().padStart(2, '0')}:00`;
}