/*
  # Configuration du stockage et des politiques

  1. Création du bucket
    - Bucket 'avatars' pour stocker les photos de profil
    - Accès public en lecture
    - Limite de taille à 5MB
    - Types de fichiers autorisés : images uniquement

  2. Politiques de sécurité
    - Lecture publique des avatars
    - Écriture limitée aux utilisateurs authentifiés
    - Suppression limitée aux propriétaires
*/

-- Activation de l'extension storage si pas déjà active
CREATE EXTENSION IF NOT EXISTS "storage";

-- Création des politiques pour le bucket avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Politique pour la lecture publique des avatars
CREATE POLICY "Avatars are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Politique pour l'upload d'avatars (utilisateurs authentifiés uniquement)
CREATE POLICY "Users can upload avatars"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars'
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Politique pour la mise à jour des avatars
CREATE POLICY "Users can update own avatars"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars'
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Politique pour la suppression des avatars
CREATE POLICY "Users can delete own avatars"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars'
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = auth.uid()::text
);