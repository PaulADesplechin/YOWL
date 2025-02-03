/*
  # Configuration des politiques de stockage pour les avatars

  1. Politiques de sécurité
    - Lecture publique des avatars
    - Écriture limitée aux utilisateurs authentifiés
    - Suppression limitée aux propriétaires
*/

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