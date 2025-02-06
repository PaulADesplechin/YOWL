import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useDarkMode } from '../components/DarkModeContext';
import { Moon, Sun } from 'lucide-react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { darkMode, toggleDarkMode } = useDarkMode();

  function isAtLeast18(birthdate) {
    const today = new Date();
    const birthdateDate = new Date(birthdate);
    const age = today.getFullYear() - birthdateDate.getFullYear();
    const monthDiff = today.getMonth() - birthdateDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateDate.getDate())) {
      return age - 1 >= 18;
    }
    return age >= 18;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!birthdate) {
      setError('La date de naissance est requise.');
      return;
    }
    if (!isAtLeast18(birthdate)) {
      setError('Vous devez avoir au moins 18 ans pour vous inscrire.');
      return;
    }
    if (!username.trim()) {
      setError('Le nom d\'utilisateur est requis.');
      return;
    }
    try {
      setError('');
      setLoading(true);
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username.trim())
        .single();
      if (existingUser) {
        setError('Ce nom d\'utilisateur est déjà pris.');
        setLoading(false);
        return;
      }
      const { user, error: signUpError } = await signUp(email, password);
      if (signUpError) throw signUpError;
      if (!user) throw new Error('Création du compte impossible');
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: user.id, username: username.trim(), created_at: new Date().toISOString() }]);
      if (profileError) {
        await supabase.auth.admin.deleteUser(user.id);
        throw new Error('Impossible de créer le profil');
      }
      navigate('/profile');
    } catch (error) {
      setError('Échec de l\'inscription. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} flex flex-col justify-center py-12 sm:px-6 lg:px-8`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold">
          Créer un compte
        </h2>
      </div>
      <button onClick={toggleDarkMode} className="absolute top-4 right-4 px-4 py-2 rounded bg-purple-500 text-white">
        {darkMode ? <Sun/> : <Moon/>}
      </button>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className={`py-8 px-4 shadow sm:rounded-lg sm:px-10 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <div className="bg-red-500 text-white p-3 rounded">{error}</div>}
            <div>
              <label htmlFor="username" className="block text-sm font-medium">
                Nom d'utilisateur
              </label>
              <input id="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className={`mt-1 block w-full rounded-md shadow-sm ${darkMode ? 'bg-gray-700 text-white' : 'border-gray-300'}`} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={`mt-1 block w-full rounded-md shadow-sm ${darkMode ? 'bg-gray-700 text-white' : 'border-gray-300'}`} />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">Mot de passe</label>
              <div className="relative">
                <input id="password" type={passwordVisible ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} className={`mt-1 block w-full rounded-md shadow-sm ${darkMode ? 'bg-gray-700 text-white' : 'border-gray-300'}`} />
                <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {passwordVisible ? 'Masquer' : 'Voir'}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="birthdate" className="block text-sm font-medium">Date de naissance</label>
              <input id="birthdate" type="date" required value={birthdate} onChange={(e) => setBirthdate(e.target.value)} max={new Date().toISOString().split('T')[0]} className={`mt-1 block w-full rounded-md shadow-sm ${darkMode ? 'bg-gray-700 text-white' : 'border-gray-300'}`} />
            </div>
            <div>
              <button type="submit" disabled={loading} className="w-full py-2 px-4 rounded-md shadow-sm text-white bg-purple-500 hover:bg-purple-600">
                {loading ? 'Inscription...' : 'S\'inscrire'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
