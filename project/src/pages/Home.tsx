import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MessageSquare, Heart } from 'lucide-react';

interface Post {
  id: string;
  content: string;
  created_at: string;
  profiles: {
    username: string;
    avatar_url: string;
  };
}

export default function Home() {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState('');
  const [hasProfile, setHasProfile] = useState(true);

  useEffect(() => {
    checkProfile();
    fetchPosts();
  }, []);

  async function checkProfile() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user?.id)
        .single();

      setHasProfile(!!data && !error);
    } catch (error) {
      console.error('Error checking profile:', error);
      setHasProfile(false);
    }
  }

  async function fetchPosts() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          content,
          created_at,
          profiles (
            username,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Impossible de charger les posts.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || publishing || !user) return;

    try {
      setPublishing(true);
      setError('');

      if (!hasProfile) {
        setError('Veuillez compléter votre profil avant de publier.');
        return;
      }

      const { error: insertError } = await supabase
        .from('posts')
        .insert([
          {
            content: content.trim(),
            user_id: user.id
          }
        ]);

      if (insertError) throw insertError;
      
      setContent('');
      await fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Impossible de publier le post. Veuillez réessayer.');
    } finally {
      setPublishing(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[90%] mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-10 mb-10">
        {error && (
          <div className="mb-6 p-6 bg-red-50 text-red-700 rounded-xl text-lg">
            {error}
          </div>
        )}
        {!hasProfile && (
          <div className="mb-6 p-6 bg-yellow-50 text-yellow-700 rounded-xl text-lg">
            Pour pouvoir publier, vous devez d'abord <a href="/profile" className="underline font-medium">compléter votre profil</a>.
          </div>
        )}
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Quoi de neuf ?"
            className="w-full p-8 border rounded-2xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[200px] text-2xl"
            rows={5}
          />
          <div className="absolute bottom-6 right-6 text-gray-400 text-base">
            {280 - content.length} caractères restants
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="px-10 py-5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xl font-medium shadow-sm"
            disabled={!content.trim() || publishing || !hasProfile}
          >
            {publishing ? 'Publication...' : 'Publier'}
          </button>
        </div>
      </form>

      <div className="space-y-10">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-2xl shadow-lg p-10 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-6 mb-8">
              {post.profiles.avatar_url ? (
                <img
                  src={post.profiles.avatar_url}
                  alt={post.profiles.username}
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                  {post.profiles.username.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h3 className="font-bold text-2xl text-gray-900">
                  {post.profiles.username}
                </h3>
                <p className="text-base text-gray-500">
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: fr })}
                </p>
              </div>
            </div>
            <div className="text-gray-800 text-2xl leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
            <div className="mt-10 flex items-center space-x-10 text-gray-500">
              <button className="flex items-center space-x-3 hover:text-blue-500 transition-colors">
                <MessageSquare size={28} />
                <span className="text-xl">Commenter</span>
              </button>
              <button className="flex items-center space-x-3 hover:text-red-500 transition-colors">
                <Heart size={28} />
                <span className="text-xl">J'aime</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}