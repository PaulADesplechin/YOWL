import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t dark:border-gray-700 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <div className="space-x-4">
            <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">Politique de confidentialité</Link>
            <span>•</span>
            <Link to="/terms" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">Conditions d'utilisation</Link>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} MonSite. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
