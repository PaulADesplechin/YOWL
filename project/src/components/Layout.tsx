import { Outlet, Link, useNavigate } from 'react-router-dom';
import { User, Sun, Moon, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Footer from './Footer';
import { useDarkMode } from '../components/DarkModeContext';
import logo from "../../assets/logo.png";
import { useState } from 'react';

export default function Layout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className={`min-h-screen bg-gray-50 ${darkMode ? 'dark:bg-gray-900' : 'bg-gray-50'} flex flex-col`}>
      <nav className="bg-white border-b-2 border-purple-300 dark:bg-gray-800 dark:border-purple-400">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="logo" className="w-16 h-16 object-contain" />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center space-x-8">
              <Link to="/profile" className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
                <User size={20} />
                <span>Profil</span>
              </Link>
              <button
                onClick={toggleDarkMode}
                className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                title="Toggle Dark Mode"
              >
                {darkMode ? <Sun size={24} className="text-purple-400" /> : <Moon size={24} className="text-purple-400" />}
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-red-600"
              >
                Déconnexion
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden">
              <button onClick={toggleMenu} className="p-2 text-gray-700 dark:text-gray-200">
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="sm:hidden bg-white dark:bg-gray-800 border-t border-purple-300 dark:border-purple-400">
            <Link
              to="/profile"
              className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              <User size={20} className="inline mr-2" /> Profil
            </Link>
            <button
              onClick={toggleDarkMode}
              className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun size={20} className="inline mr-2 text-purple-400" /> : <Moon size={20} className="inline mr-2 text-purple-400" />} Mode sombre
            </button>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-white bg-purple-400 hover:bg-red-600"
            >
              Déconnexion
            </button>
          </div>
        )}
      </nav>
      <main className="max-w-5xl mx-auto px-4 py-6 flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}