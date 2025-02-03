/*
  # Ajout de la fonctionnalité de likes

  1. Nouvelle Table
    - `likes`
      - `id` (uuid, clé primaire)
      - `user_id` (uuid, référence vers profiles)
      - `post_id` (uuid, référence vers posts)
      - `created_at` (timestamp)

  2. Sécurité
    - Active RLS sur la table `likes`
    - Ajoute des politiques pour la gestion des likes
*/

-- Création de la table likes
CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- Active RLS
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Politiques pour les likes
CREATE POLICY "Les likes sont visibles par tous"
  ON likes FOR SELECT
  USING (true);

CREATE POLICY "Les utilisateurs peuvent liker"
  ON likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Les utilisateurs peuvent unliker"
  ON likes FOR DELETE
  USING (auth.uid() = user_id);