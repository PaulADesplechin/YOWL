import { Link } from 'react-router-dom';
import { useCookieConsent } from '../contexts/CookieContext';

export default function Footer() {
  const { openPreferences } = useCookieConsent();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t dark:border-gray-700 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <div className="space-x-4">
            <Link to="/privacy" className="text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300">Politique de confidentialité</Link>
            <span>•</span>
            <Link to="/terms" className="text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300">Conditions d'utilisation</Link>
            <span>•</span>
            <button onClick={openPreferences} className="text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300">
              Gérer les cookies
            </button>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} MayFly. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}