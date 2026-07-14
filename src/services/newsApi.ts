import type { NewsApiResponse, SourcesResponse, NewsFilters, HeadlinesParams, Article } from '@/types/news';
import { demoArticles, demoHeadlines, demoFeaturedArticle, demoSources } from '@/services/demoData';
import { demoInteligenciaArtificialArticles } from '@/services/trendsDemoData';
import { demoCiberseguridadArticles } from '@/services/compareDemoData';

const API_BASE = '/api/news';

let useDemo = false;
let demoChecked = false;

async function checkApiStatus(): Promise<boolean> {
  if (demoChecked) return useDemo;
  try {
    const res = await fetch(`${API_BASE}/top-headlines?country=us&pageSize=1`);

    if (res.status === 404) {
      console.info(
        "[NewsAPI] Proxy not available (404) — using demo data. Connect Supabase for real NewsAPI data in production."
      );
      useDemo = true;
    } else if (!res.ok) {
      const body = await res.json().catch(() => undefined);
      console.error("[NewsAPI] checkApiStatus failed", {
        endpoint: "/api/news/top-headlines",
        status: res.status,
        code: (body as Record<string, unknown>)?.code,
        message: (body as Record<string, unknown>)?.message,
      });
      if (res.status === 401) {
        console.error(
          "[NewsAPI] Received 401 — API Key is missing, invalid, or has incorrect format (check for extra quotes/spaces in .env)"
        );
        useDemo = true;
      } else if (res.status >= 500) {
        console.error("[NewsAPI] NewsAPI server error — will retry on next page load");
      } else {
        useDemo = true;
      }
    } else {
      console.log("[NewsAPI] checkApiStatus OK — using real NewsAPI data");
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (
      msg.includes("fetch") ||
      msg.includes("NetworkError") ||
      msg.includes("Failed to fetch")
    ) {
      console.info(
        "[NewsAPI] Network unavailable (expected without proxy) — using demo data."
      );
    } else {
      console.error("[NewsAPI] checkApiStatus network error", { error: msg });
    }
    useDemo = true;
  }
  demoChecked = true;
  return useDemo;
}

function buildQuery(params: Record<string, string | number | undefined>): string {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
  }
  return parts.join('&');
}

export async function fetchTopHeadlines(params: HeadlinesParams = {}): Promise<NewsApiResponse> {
  const isDemo = await checkApiStatus();
  if (isDemo) {
    await new Promise((r) => setTimeout(r, 600));
    const filtered = params.category && params.category !== 'general'
      ? demoArticles.filter(() => Math.random() > 0.4).slice(0, 6)
      : demoHeadlines;
    return {
      status: 'ok',
      totalResults: filtered.length,
      articles: filtered,
    };
  }

  const query = buildQuery({
    country: params.country || 'us',
    category: params.category || undefined,
    page: params.page,
    pageSize: params.pageSize || 8,
  });

  const res = await fetch(`${API_BASE}/top-headlines?${query}`);
  if (!res.ok) {
    if (res.status === 429) throw new Error('RATE_LIMITED');
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

export async function searchNews(filters: NewsFilters): Promise<NewsApiResponse> {
  const isDemo = await checkApiStatus();
  if (isDemo) {
    await new Promise((r) => setTimeout(r, 800));
    const keyword = filters.keyword?.toLowerCase() || '';
    const filtered = demoArticles.filter((a) => {
      if (keyword && !a.title.toLowerCase().includes(keyword) && !(a.description?.toLowerCase().includes(keyword))) return false;
      if (filters.language) return true;
      return true;
    });
    const page = filters.page || 1;
    const pageSize = filters.pageSize || 6;
    const start = (page - 1) * pageSize;
    return {
      status: 'ok',
      totalResults: filtered.length,
      articles: filtered.slice(start, start + pageSize),
    };
  }

  const from = filters.dateFrom ? new Date(filters.dateFrom).toISOString() : undefined;
  const to = filters.dateTo ? new Date(filters.dateTo).toISOString() : undefined;

  const query = buildQuery({
    q: filters.keyword || undefined,
    from,
    to,
    language: filters.language || undefined,
    sources: filters.sources || undefined,
    sortBy: filters.sortBy || 'publishedAt',
    page: filters.page || 1,
    pageSize: filters.pageSize || 6,
  });

  const res = await fetch(`${API_BASE}/everything?${query}`);
  if (!res.ok) {
    if (res.status === 429) throw new Error('RATE_LIMITED');
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

export async function fetchSources(
  filters: { category?: string; language?: string; country?: string } = {}
): Promise<SourcesResponse> {
  const isDemo = await checkApiStatus();
  if (isDemo) {
    await new Promise((r) => setTimeout(r, 500));
    let filtered = [...demoSources];
    if (filters.category) filtered = filtered.filter((s) => s.category === filters.category);
    if (filters.language) filtered = filtered.filter((s) => s.language === filters.language);
    if (filters.country) filtered = filtered.filter((s) => s.country === filters.country);
    return { status: 'ok', sources: filtered };
  }

  const query = buildQuery({
    category: filters.category || undefined,
    language: filters.language || undefined,
    country: filters.country || undefined,
  });

  const res = await fetch(`${API_BASE}/sources?${query}`);
  if (!res.ok) {
    if (res.status === 429) throw new Error('RATE_LIMITED');
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

export async function analyzeTrends(topic: string, dateFrom?: string, dateTo?: string, language?: string): Promise<Article[]> {
  const isDemo = await checkApiStatus();
  if (isDemo) {
    await new Promise((r) => setTimeout(r, 1000));
    const keyword = topic.toLowerCase();
    const filtered = demoInteligenciaArtificialArticles.filter((a) => {
      const title = a.title.toLowerCase();
      const desc = (a.description || '').toLowerCase();
      if (!title.includes(keyword) && !desc.includes(keyword)) return false;
      if (dateFrom && a.publishedAt < new Date(dateFrom).toISOString()) return false;
      if (dateTo && a.publishedAt > new Date(dateTo + 'T23:59:59').toISOString()) return false;
      return true;
    });
    return filtered;
  }

  const from = dateFrom ? new Date(dateFrom).toISOString() : undefined;
  const to = dateTo ? new Date(dateTo + 'T23:59:59').toISOString() : undefined;

  const query = buildQuery({
    q: topic,
    from,
    to,
    language: language || undefined,
    sortBy: 'publishedAt',
    pageSize: 100,
  });

  const res = await fetch(`${API_BASE}/everything?${query}`);
  if (!res.ok) {
    if (res.status === 429) throw new Error('RATE_LIMITED');
    throw new Error(`API error: ${res.status}`);
  }
  const data: NewsApiResponse = await res.json();
  return data.articles;
}

export async function compareTopics(
  topicA: string,
  topicB: string,
  dateFrom?: string,
  dateTo?: string,
  language?: string
): Promise<{ articlesA: Article[]; articlesB: Article[] }> {
  const isDemo = await checkApiStatus();
  if (isDemo) {
    await new Promise((r) => setTimeout(r, 1200));
    const keywordA = topicA.toLowerCase();
    const keywordB = topicB.toLowerCase();

    const filteredA = demoInteligenciaArtificialArticles.filter((a) => {
      const title = a.title.toLowerCase();
      const desc = (a.description || '').toLowerCase();
      if (!title.includes(keywordA) && !desc.includes(keywordA)) return false;
      if (dateFrom && a.publishedAt < new Date(dateFrom).toISOString()) return false;
      if (dateTo && a.publishedAt > new Date(dateTo + 'T23:59:59').toISOString()) return false;
      return true;
    });

    const filteredB = demoCiberseguridadArticles.filter((a) => {
      const title = a.title.toLowerCase();
      const desc = (a.description || '').toLowerCase();
      if (!title.includes(keywordB) && !desc.includes(keywordB)) return false;
      if (dateFrom && a.publishedAt < new Date(dateFrom).toISOString()) return false;
      if (dateTo && a.publishedAt > new Date(dateTo + 'T23:59:59').toISOString()) return false;
      return true;
    });

    return { articlesA: filteredA, articlesB: filteredB };
  }

  const from = dateFrom ? new Date(dateFrom).toISOString() : undefined;
  const to = dateTo ? new Date(dateTo + 'T23:59:59').toISOString() : undefined;

  const queryA = buildQuery({
    q: topicA,
    from,
    to,
    language: language || undefined,
    sortBy: 'publishedAt',
    pageSize: 100,
  });

  const queryB = buildQuery({
    q: topicB,
    from,
    to,
    language: language || undefined,
    sortBy: 'publishedAt',
    pageSize: 100,
  });

  const [resA, resB] = await Promise.all([
    fetch(`${API_BASE}/everything?${queryA}`),
    fetch(`${API_BASE}/everything?${queryB}`),
  ]);

  if (!resA.ok) {
    if (resA.status === 429) throw new Error('RATE_LIMITED');
    throw new Error(`API error A: ${resA.status}`);
  }
  if (!resB.ok) {
    if (resB.status === 429) throw new Error('RATE_LIMITED');
    throw new Error(`API error B: ${resB.status}`);
  }

  const [dataA, dataB] = await Promise.all([
    resA.json() as Promise<NewsApiResponse>,
    resB.json() as Promise<NewsApiResponse>,
  ]);

  return { articlesA: dataA.articles, articlesB: dataB.articles };
}

export function isDemoMode(): boolean {
  return useDemo;
}

export { demoArticles, demoHeadlines, demoFeaturedArticle, demoSources, demoInteligenciaArtificialArticles, demoCiberseguridadArticles };