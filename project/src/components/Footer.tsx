import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Protection des données</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Vos données personnelles sont protégées</li>
              <li>• Conformité RGPD (UE 2016/679)</li>
              <li>• Droit d'accès, de rectification et de suppression</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Utilisation des données</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Stockage sécurisé des informations</li>
              <li>• Pas de partage avec des tiers</li>
              <li>• Durée de conservation limitée</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Vos droits</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Droit à l'oubli</li>
              <li>• Portabilité des données</li>
              <li>• Opposition au traitement</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Tous droits réservés</p>
          <p className="mt-2">
            <Link to="/privacy" className="text-blue-600 hover:text-blue-500">Politique de confidentialité</Link>
            {' • '}
            <Link to="/terms" className="text-blue-600 hover:text-blue-500">Conditions d'utilisation</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}