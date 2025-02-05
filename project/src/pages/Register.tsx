import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();
  const { signUp } = useAuth();

  function isAtLeast18(birthdate: string): boolean {
    const today = new Date();
    const birthdateDate = new Date(birthdate);
    const age = today.getFullYear() - birthdateDate.getFullYear();
    const monthDiff = today.getMonth() - birthdateDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateDate.getDate())) {
      return age - 1 >= 18;
    }

    return age >= 18;
  }

  async function handleSubmit(e: React.FormEvent) {
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

      if (signUpError) {
        throw signUpError;
      }

      if (!user) {
        throw new Error('Création du compte impossible');
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id,
            username: username.trim(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ]);

      if (profileError) {
        console.error('Erreur lors de la création du profil:', profileError);
        await supabase.auth.admin.deleteUser(user.id);
        throw new Error('Impossible de créer le profil');
      }

      navigate('/profile');
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setError('Échec de l\'inscription. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Créer un compte
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Nom d'utilisateur
              </label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={passwordVisible ? 'text' : 'password'} // Toggle input type
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {passwordVisible ? 'Masquer' : 'Voir'} {/* Toggle button text */}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
                Date de naissance
              </label>
              <input
                id="birthdate"
                type="date"
                required
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Vous devez avoir au moins 18 ans pour vous inscrire.
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
              >
                {loading ? 'Inscription...' : 'S\'inscrire'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Déjà un compte ?{' '}
                  <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
                    Se connecter
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
