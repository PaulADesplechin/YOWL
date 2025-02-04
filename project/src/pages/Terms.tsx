import React from 'react';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Conditions d'Utilisation</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Acceptation des Conditions</h2>
          <p className="text-gray-700 leading-relaxed">
            En utilisant notre service, vous acceptez d'être lié par les présentes conditions d'utilisation.
            Ces conditions sont régies par le droit français et le Règlement Général sur la Protection des
            Données (RGPD - UE 2016/679).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Utilisation du Service</h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Vous devez avoir au moins 18 ans pour utiliser le service</li>
            <li>Vous êtes responsable de maintenir la confidentialité de votre compte</li>
            <li>Vous acceptez de ne pas utiliser le service à des fins illégales</li>
            <li>Vous vous engagez à ne pas publier de contenu offensant ou inapproprié</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Contenu des Utilisateurs</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            En publiant du contenu sur notre plateforme, vous :
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Conservez vos droits sur votre contenu</li>
            <li>Nous accordez une licence pour l'afficher sur notre plateforme</li>
            <li>Garantissez que vous avez le droit de publier ce contenu</li>
            <li>Acceptez que votre contenu puisse être vu par d'autres utilisateurs</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Protection des Données</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Conformément au RGPD, nous nous engageons à :
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Traiter vos données de manière licite, loyale et transparente</li>
            <li>Collecter vos données pour des finalités déterminées et légitimes</li>
            <li>Minimiser la collecte de données au strict nécessaire</li>
            <li>Assurer la sécurité et la confidentialité de vos données</li>
            <li>Respecter vos droits concernant vos données personnelles</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Modification et Résiliation</h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Nous pouvons modifier ces conditions à tout moment</li>
            <li>Vous serez notifié des changements importants</li>
            <li>Vous pouvez supprimer votre compte à tout moment</li>
            <li>Nous pouvons suspendre ou supprimer votre compte en cas de violation</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Limitation de Responsabilité</h2>
          <p className="text-gray-700 leading-relaxed">
            Dans les limites permises par la loi, nous ne sommes pas responsables :
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700">
            <li>Des contenus publiés par les utilisateurs</li>
            <li>Des pertes indirectes ou consécutives</li>
            <li>Des interruptions temporaires du service</li>
            <li>Des actions d'autres utilisateurs</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Contact</h2>
          <p className="text-gray-700 leading-relaxed">
            Pour toute question concernant ces conditions, contactez-nous :
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700">
            <li>Par email : terms@example.com</li>
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