import React from 'react';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Collecte des Données</h2>
          <p className="text-gray-700 leading-relaxed">
            Conformément au Règlement Général sur la Protection des Données (RGPD - UE 2016/679), nous collectons et traitons les données suivantes :
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700">
            <li>Données d'inscription : email, nom d'utilisateur, date de naissance</li>
            <li>Données de profil : nom complet, biographie, avatar (optionnel)</li>
            <li>Données d'utilisation : contenu des posts, likes</li>
            <li>Données techniques : adresse IP, données de connexion</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Base Légale du Traitement</h2>
          <p className="text-gray-700 leading-relaxed">
            Nous traitons vos données sur les bases légales suivantes :
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700">
            <li>Votre consentement (Article 6.1.a du RGPD)</li>
            <li>L'exécution du contrat qui nous lie (Article 6.1.b du RGPD)</li>
            <li>Nos obligations légales (Article 6.1.c du RGPD)</li>
            <li>Nos intérêts légitimes (Article 6.1.f du RGPD)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Vos Droits</h2>
          <p className="text-gray-700 leading-relaxed">
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700">
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification de vos données</li>
            <li>Droit à l'effacement ("droit à l'oubli")</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité de vos données</li>
            <li>Droit d'opposition au traitement</li>
            <li>Droit de retirer votre consentement à tout moment</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Conservation des Données</h2>
          <p className="text-gray-700 leading-relaxed">
            Nous conservons vos données pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées :
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700">
            <li>Données de compte : pendant la durée de votre inscription</li>
            <li>Posts et interactions : jusqu'à leur suppression par vos soins</li>
            <li>Données de connexion : 1 an maximum</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Sécurité des Données</h2>
          <p className="text-gray-700 leading-relaxed">
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour assurer la sécurité de vos données :
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700">
            <li>Chiffrement des données sensibles</li>
            <li>Accès restreint aux données personnelles</li>
            <li>Surveillance régulière de nos systèmes</li>
            <li>Formation de notre personnel à la protection des données</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Contact</h2>
          <p className="text-gray-700 leading-relaxed">
            Pour exercer vos droits ou pour toute question concernant le traitement de vos données, vous pouvez nous contacter :
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700">
            <li>Par email : privacy@example.com</li>
            <li>Par courrier : [Adresse postale]</li>
          </ul>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t">
        <Link to="/" className="text-blue-500 hover:text-blue-600">
          ← Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}