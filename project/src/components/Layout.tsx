import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Home, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Footer from './Footer';

export default function Layout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex space-x-8">
              <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                <Home size={20} />
                <span>Accueil</span>
              </Link>
              <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                <User size={20} />
                <span>Profil</span>
              </Link>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
            >
              <LogOut size={20} />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-4 py-6 flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}