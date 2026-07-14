import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background-50 px-4">
      <div className="w-24 h-24 flex items-center justify-center rounded-full bg-secondary-100 mb-6">
        <i className="ri-error-warning-line text-4xl text-foreground-400"></i>
      </div>
      <h1 className="text-4xl font-heading font-bold text-foreground-900 mb-2">404</h1>
      <p className="text-foreground-600 mb-6 text-center">La página que buscas no existe o ha sido movida.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-accent-500 text-background-50 dark:text-foreground-950 rounded-lg text-sm font-semibold hover:bg-accent-600 transition-colors whitespace-nowrap"
      >
        Volver al inicio
      </Link>
    </div>
  );
}