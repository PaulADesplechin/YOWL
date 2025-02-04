import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="text-center text-sm text-gray-500">
          <div className="space-x-4">
            <Link to="/privacy" className="text-blue-600 hover:text-blue-500">Politique de confidentialité</Link>
            <span>•</span>
            <Link to="/terms" className="text-blue-600 hover:text-blue-500">Conditions d'utilisation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}