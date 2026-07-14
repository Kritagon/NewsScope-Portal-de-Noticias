export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsSource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface SourcesResponse {
  status: string;
  sources: NewsSource[];
}

export interface NewsFilters {
  keyword?: string;
  dateFrom?: string;
  dateTo?: string;
  language?: string;
  sources?: string;
  sortBy?: 'publishedAt' | 'relevancy' | 'popularity';
  page?: number;
  pageSize?: number;
}

export interface HeadlinesParams {
  country?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}

export interface TrendMetrics {
  totalNews: number;
  totalSources: number;
  avgPerDay: number;
  peakDay: string;
  peakCount: number;
  byDay: { date: string; count: number }[];
  bySource: { source: string; count: number }[];
  byHour: { hour: number; count: number }[];
  frequentWords: { word: string; count: number }[];
}

export interface ComparisonResult {
  topicA: TrendMetrics;
  topicB: TrendMetrics;
  winner: 'A' | 'B' | 'tie';
  absoluteDifference: number;
  percentageDifference: number;
}

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error' | 'empty' | 'rate_limited';

export const CATEGORIES = [
  { id: 'general', icon: 'ri-global-line', labelKey: 'categories.general' },
  { id: 'business', icon: 'ri-briefcase-line', labelKey: 'categories.business' },
  { id: 'technology', icon: 'ri-computer-line', labelKey: 'categories.technology' },
  { id: 'science', icon: 'ri-flask-line', labelKey: 'categories.science' },
  { id: 'health', icon: 'ri-heart-pulse-line', labelKey: 'categories.health' },
  { id: 'sports', icon: 'ri-football-line', labelKey: 'categories.sports' },
  { id: 'entertainment', icon: 'ri-movie-line', labelKey: 'categories.entertainment' },
] as const;

export const LANGUAGES = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'pt', label: 'Português' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
] as const;

export const SORT_OPTIONS = [
  { value: 'publishedAt', labelKey: 'sort.newest' },
  { value: 'relevancy', labelKey: 'sort.relevancy' },
  { value: 'popularity', labelKey: 'sort.popularity' },
] as const;