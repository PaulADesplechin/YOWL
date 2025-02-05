import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Heart, Trash2, Pencil, X, Check } from 'lucide-react';
import { useDarkMode } from '../components/DarkModeContext';

interface Post {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    username: string;
    avatar_url: string;
  };
  likes: {
    id: string;
    user_id: string;
  }[];
  likes_count: number;
}

function renderContentWithLinks(content: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = content.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 hover:underline"
        >
          {part}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export default function Home() {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState('');
  const [hasProfile, setHasProfile] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000;
  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);


  useEffect(() => {
    if (user) {
      checkProfile();
      fetchPosts();
    }
  }, [user]);

  async function checkProfile() {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setHasProfile(!!data);
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
          user_id,
          profiles (
            username,
            avatar_url
          ),
          likes (
            id,
            user_id
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        if (retryCount < MAX_RETRIES) {
          setRetryCount(prev => prev + 1);
          setTimeout(() => {
            fetchPosts();
          }, RETRY_DELAY * (retryCount + 1));
          return;
        }
        throw error;
      }

      const postsWithLikesCount = data?.map(post => ({
        ...post,
        likes_count: post.likes?.length || 0
      })) || [];

      setPosts(postsWithLikesCount);
      setError('');
      setRetryCount(0);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Impossible de charger les posts. Veuillez rafraîchir la page.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletePost(postId: string) {
    if (!user || deleting) return;

    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      return;
    }

    try {
      setDeleting(postId);
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)
        .eq('user_id', user.id);

      if (error) throw error;

      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Impossible de supprimer le post. Veuillez réessayer.');
    } finally {
      setDeleting(null);
    }
  }

  function startEditing(post: Post) {
    setEditingPost(post.id);
    setEditContent(post.content);
  }

  function cancelEditing() {
    setEditingPost(null);
    setEditContent('');
  }

  async function handleUpdatePost(postId: string) {
    if (!user || !editContent.trim()) return;

    try {
      const { error } = await supabase
        .from('posts')
        .update({ content: editContent.trim() })
        .eq('id', postId)
        .eq('user_id', user.id);

      if (error) throw error;

      setPosts(posts.map(post =>
        post.id === postId
          ? { ...post, content: editContent.trim() }
          : post
      ));
      setEditingPost(null);
      setEditContent('');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Impossible de modifier le post. Veuillez réessayer.');
    }
  }

  async function handleLike(postId: string) {
    if (!user) return;

    try {
      const isLiked = posts.find(p => p.id === postId)?.likes.some(like => like.user_id === user.id);

      if (isLiked) {
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('likes')
          .insert([
            {
              post_id: postId,
              user_id: user.id
            }
          ]);

        if (error) throw error;
      }

      await fetchPosts();
    } catch (error) {
      console.error('Error toggling like:', error);
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

if(loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
}

return (
  <div className="w-full max-w-[90%] mx-auto">
    <form onSubmit={handleSubmit} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-10 mb-10`}>
      {error && (
        <div className="mb-6 p-6 bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-xl text-lg">
          {error}
        </div>
      )}
      {!hasProfile && (
        <div className="mb-6 p-6 bg-yellow-50 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-200 rounded-xl text-lg">
          Pour pouvoir publier, vous devez d'abord <a href="/profile" className="underline font-medium">compléter votre profil</a>.
        </div>
      )}
      <div className={`relative rounded-2xl ${darkMode ? 'bg-gray-700' : 'bg-white'} overflow-hidden`}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Quoi de neuf ?"
          className={`w-full p-8 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[200px] text-2xl border-0 outline-none
            ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900'}`}
          rows={5}
        />
        <div className={`absolute bottom-6 right-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-base`}>
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
        {posts.map((post) => {
          const isLiked = user && post.likes.some(like => like.user_id === user.id);
          const isOwnPost = user && post.user_id === user.id;
          const isEditing = post.id === editingPost;

          return (
            <article
              key={post.id}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-10 hover:shadow-xl transition-shadow`}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-6">
                  {post.profiles.avatar_url ? (
                    <img
                      src={post.profiles.avatar_url}
                      alt={post.profiles.username}
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-100 dark:border-gray-700"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                      {post.profiles.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className={`font-bold text-2xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {post.profiles.username}
                    </h3>
                    <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: fr })}
                    </p>
                  </div>
                </div>
                {isOwnPost && (
                  <div className="flex items-center space-x-4">
                    {!isEditing && (
                      <>
                        <button
                          onClick={() => startEditing(post)}
                          className={`${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-400 hover:text-blue-500'} transition-colors`}
                          title="Modifier le post"
                        >
                          <Pencil size={24} />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          disabled={deleting === post.id}
                          className={`${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-500'} transition-colors disabled:opacity-50`}
                          title="Supprimer le post"
                        >
                          <Trash2 size={24} />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
              {isEditing ? (
                <div className="space-y-4">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className={`w-full p-4 border rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px] text-xl
                      ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-200'}`}
                    rows={4}
                  />
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={cancelEditing}
                      className={`px-6 py-2 ${darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-600 hover:text-gray-800'} transition-colors flex items-center space-x-2`}
                    >
                      <X size={20} />
                      <span>Annuler</span>
                    </button>
                    <button
                      onClick={() => handleUpdatePost(post.id)}
                      disabled={!editContent.trim()}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
                    >
                      <Check size={20} />
                      <span>Enregistrer</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className={`${darkMode ? 'text-gray-100' : 'text-gray-800'} text-2xl leading-relaxed whitespace-pre-wrap`}>
                  {renderContentWithLinks(post.content)}
                </div>
              )}
              <div className="mt-10 flex items-center text-gray-500">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-3 transition-colors ${
                    isLiked ? 'text-red-500' : `${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'}`
                  }`}
                >
                  <Heart size={28} fill={isLiked ? 'currentColor' : 'none'} />
                  <span className="text-xl">
                    {post.likes_count} {post.likes_count > 1 ? 'J\'aime' : 'J\'aime'}
                  </span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

