import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function HeroBanner() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/explorar?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative w-full pt-20 pb-16 md:pb-24 overflow-hidden animate-fade-in">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://readdy.ai/api/search-image?query=Abstract%20geometric%20world%20map%20composed%20of%20interconnected%20dots%20and%20lines%20in%20navy%20blue%20and%20electric%20blue%20tones%2C%20dark%20background%2C%20modern%20data%20visualization%20aesthetic%2C%20news%20and%20information%20network%20concept%2C%20clean%20minimalist%20style%2C%20professional%20corporate%20design&width=1600&height=700&seq=newsscope-hero-bg&orientation=landscape"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/85 via-primary-950/70 to-primary-950/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-4 md:px-6">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-500/20 rounded-full text-accent-300 text-xs font-medium">
            <i className="ri-flashlight-line"></i>
            Noticias en tiempo real
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-heading font-bold text-background-50 leading-tight mb-4">
          {t('home.heroTitle')}
        </h1>
        <p className="text-lg text-background-300/80 leading-relaxed mb-8 max-w-xl mx-auto">
          {t('home.heroText')}
        </p>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto">
          <div className="relative w-full">
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-background-400 text-lg"></i>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Inteligencia artificial, cambio climático, tecnología..."
              className="w-full pl-11 pr-4 py-3.5 bg-primary-800/60 backdrop-blur-sm border border-primary-600/40 rounded-xl text-background-50 placeholder:text-background-500 text-sm focus:outline-none focus:border-accent-500/60 focus:ring-2 focus:ring-accent-500/20 transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3.5 bg-accent-500 text-background-50 dark:text-foreground-950 rounded-xl text-sm font-semibold hover:bg-accent-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            {t('home.heroSearch')}
          </button>
        </form>
      </div>
    </section>
  );
}