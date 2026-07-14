import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 border-t border-primary-700/30">
      <div className="px-4 md:px-6 py-10 md:py-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <Link to="/" className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-accent-500">
                  <i className="ri-newspaper-line text-lg text-background-50"></i>
                </div>
                <span className="text-lg font-heading font-bold text-background-50">NewsScope</span>
              </Link>
              <p className="text-background-400 text-sm leading-relaxed">{t('footer.tagline')}</p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-background-200 text-sm font-semibold mb-3">Navegación</h4>
              <div className="grid grid-cols-2 gap-2">
                <Link to="/" className="text-background-400 hover:text-background-200 text-sm transition-colors">Inicio</Link>
                <Link to="/explorar" className="text-background-400 hover:text-background-200 text-sm transition-colors">Explorar</Link>
                <Link to="/tendencias" className="text-background-400 hover:text-background-200 text-sm transition-colors">Tendencias</Link>
                <Link to="/comparador" className="text-background-400 hover:text-background-200 text-sm transition-colors">Comparador</Link>
                <Link to="/fuentes" className="text-background-400 hover:text-background-200 text-sm transition-colors">Fuentes</Link>
              </div>
            </div>

            {/* Info */}
            <div>
              <h4 className="text-background-200 text-sm font-semibold mb-3">Información</h4>
              <p className="text-background-400 text-sm leading-relaxed mb-2">
                {t('footer.powered')}{' '}
                <a href="https://newsapi.org" target="_blank" rel="nofollow noopener noreferrer" className="text-accent-400 hover:text-accent-300 underline transition-colors">
                  NewsAPI.org
                </a>
              </p>
              <p className="text-background-500 text-xs leading-relaxed">{t('footer.disclaimer')}</p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-primary-700/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-background-500 text-xs">&copy; {year} NewsScope. Todos los derechos reservados.</p>
            <p className="text-background-600 text-xs">Hecho con pasión por la información</p>
          </div>
        </div>
      </div>
    </footer>
  );
}