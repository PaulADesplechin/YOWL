import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useDarkMode } from '../components/DarkModeContext';

interface Profile {
  username: string;
  full_name: string;
  avatar_url: string;
  bio: string;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export default function Profile() {
  const { user } = useAuth();
  const { darkMode } = useDarkMode();
  const [profile, setProfile] = useState<Profile>({
    username: '',
    full_name: '',
    avatar_url: '',
    bio: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  async function fetchProfile() {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('username, full_name, avatar_url, bio')
        .eq('id', user.id)
        .single();

      if (error) {
        if (retryCount < MAX_RETRIES) {
          setRetryCount(prev => prev + 1);
          setTimeout(() => {
            fetchProfile();
          }, RETRY_DELAY * (retryCount + 1));
          return;
        }
        throw error;
      }

      if (data) {
        setProfile(data);
        setError('');
        setRetryCount(0);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Impossible de charger le profil. Veuillez rafraîchir la page.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    try {
      setSaving(true);
      setError('');

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...profile,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      setError('');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Impossible de sauvegarder le profil. Veuillez réessayer.');
    } finally {
      setSaving(false);
    }
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !e.target.files[0] || !user) return;

    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError('L\'image ne doit pas dépasser 5MB.');
      return;
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];

    if (!fileExt || !allowedTypes.includes(fileExt)) {
      setError('Format d\'image non supporté. Utilisez JPG, PNG ou GIF.');
      return;
    }

    try {
      setError('');
      const filePath = `${user.id}/${Math.random()}.${fileExt}`;

      if (profile.avatar_url) {
        const oldPath = profile.avatar_url.split('/').pop();
        if (oldPath) {
          await supabase.storage
            .from('avatars')
            .remove([`${user.id}/${oldPath}`]);
        }
      }

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setProfile({ ...profile, avatar_url: data.publicUrl });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      setError('Impossible de télécharger l\'avatar. Veuillez réessayer.');
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mb-2"></div>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Chargement du profil...</p>
      </div>
    );
  }

  return (
    <div className={`max-w-2xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
      <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Profil</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className={`${
            darkMode ? 'bg-red-900/50 border-red-500 text-red-200' : 'bg-red-50 border-red-400 text-red-700'
          } border px-4 py-3 rounded flex items-center justify-between`}>
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setError('')}
              className={`${darkMode ? 'text-red-200 hover:text-red-100' : 'text-red-700 hover:text-red-900'}`}
            >
              ×
            </button>
          </div>
        )}

        <div className="flex items-center space-x-6">
          <div className="relative">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
              />
            ) : (
              <div className={`w-24 h-24 rounded-full ${
                darkMode ? 'bg-gray-700' : 'bg-gray-200'
              } flex items-center justify-center`}>
                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-2xl`}>👤</span>
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-purple-500 text-white p-2 rounded-full cursor-pointer hover:bg-purple-600 transition-colors">
            <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"/>
              <span style={{ fontSize: '1rem' }}>📷</span>
</label>

          </div>

          <div className="flex-1">
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Nom d'utilisateur
            </label>
            <input
              type="text"
              value={profile.username}
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Nom complet
          </label>
          <input
            type="text"
            value={profile.full_name}
            onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 ${
              darkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Bio
          </label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            rows={4}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 ${
              darkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
          >
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );
}