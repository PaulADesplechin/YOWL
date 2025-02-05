import { Outlet, Link, useNavigate } from 'react-router-dom';
import { User, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Footer from './Footer';
import { useDarkMode } from '../components/DarkModeContext';
import logo from "../../assets/logo.png";

export default function Layout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${darkMode ? 'dark:bg-gray-900' : 'bg-gray-50'} flex flex-col`}>
      <nav className="bg-white border-purple-300 dark:bg-gray-800 border-b-2 dark:border-purple-400">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="flex space-x-8">
              <Link to="/" className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
              <img src={logo} alt="logo" className="w-20 h-20 object-contain"/>
              </Link>
              <Link to="/profile" className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
                <User size={20} />
                <span>Profil</span>
              </Link>
            </div>
            <div className="flex items-center justify-between space-x-4">
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