import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-4 justify-self-center">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="logo" className="w-52 h-52 object-contain" />
              </Link>
            </div>
      <h1 className="text-purple-400 text-9xl font-extrabold text-center mb-8 leading-tight sm:text-6xl">MayFly</h1>

      <h1 className="text-4xl font-bold mb-8 text-center sm:text-3xl">Politique de Confidentialité</h1>

      <p className="text-gray-700 text-lg sm:text-base mb-8">
        Dernière mise à jour : 06/02/2025
      </p>
      <p className="text-gray-700 leading-relaxed text-lg sm:text-base mb-8">
        Chez Mayfly, nous nous engageons à protéger la confidentialité de vos données personnelles et à respecter vos droits.
        Cette politique de confidentialité décrit les types de données que nous collectons, comment elles sont utilisées et stockées, ainsi que vos droits en matière de confidentialité.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-3xl font-semibold mb-4 sm:text-2xl">1. Collecte des Données</h2>
          <p className="text-gray-700 leading-relaxed text-lg sm:text-base">
            Conformément au Règlement Général sur la Protection des Données (RGPD - UE 2016/679), nous collectons et traitons les données suivantes :
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700 text-lg sm:text-base">
            <li>Données d'inscription : email, nom d'utilisateur, mot de passe (crypté), date de naissance.</li>
            <li>Données de profil : nom complet, biographie, avatar, photos de profil (facultatif).</li>
            <li>Données d'utilisation : contenu des posts, commentaires, likes, partages.</li>
            <li>Données techniques : adresse IP, données de connexion, type d’appareil, système d’exploitation, navigateur utilisé, logs de serveur.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 sm:text-2xl">2. Bases Légales du Traitement</h2>
          <p className="text-gray-700 leading-relaxed text-lg sm:text-base">
            Le traitement de vos données repose sur les bases légales suivantes, conformément au RGPD :
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700 text-lg sm:text-base">
            <li>Votre consentement (Article 6.1.a du RGPD) : Nous obtenons votre consentement explicite pour certaines opérations de traitement, notamment pour l’envoi de newsletters et notifications.</li>
            <li>Exécution du contrat (Article 6.1.b du RGPD) : Le traitement des données est nécessaire à la fourniture des services proposés par notre plateforme.</li>
            <li>Obligations légales (Article 6.1.c du RGPD) : Nous pouvons être amenés à traiter vos données pour respecter des obligations légales.</li>
            <li>Intérêts légitimes (Article 6.1.f du RGPD) : Nous pouvons traiter vos données dans le cadre de nos intérêts légitimes (par exemple, améliorer nos services ou prévenir des fraudes).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 sm:text-2xl">3. Vos Droits</h2>
          <p className="text-gray-700 leading-relaxed text-lg sm:text-base">
            En vertu du RGPD, vous disposez des droits suivants concernant vos données personnelles :
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700 text-lg sm:text-base">
            <li>Droit d'accès : Vous avez le droit de demander une copie des données que nous détenons à votre sujet.</li>
            <li>Droit de rectification : Vous pouvez demander la correction ou la mise à jour de vos données.</li>
            <li>Droit à l'effacement ("droit à l'oubli") : Vous pouvez demander la suppression de vos données dans certaines situations.</li>
            <li>Droit à la limitation du traitement : Vous pouvez demander la restriction du traitement de vos données dans certains cas.</li>
            <li>Droit à la portabilité : Vous avez le droit de recevoir vos données dans un format structuré et couramment utilisé, ou de les transférer à un autre responsable de traitement.</li>
            <li>Droit d'opposition : Vous pouvez vous opposer au traitement de vos données pour des raisons légitimes.</li>
            <li>Droit de retirer votre consentement : Vous pouvez retirer votre consentement à tout moment, ce qui n'affectera pas la légalité du traitement effectué avant le retrait.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 sm:text-2xl">4. Conservation des Données</h2>
          <p className="text-gray-700 leading-relaxed text-lg sm:text-base">
            Nous conservons vos données personnelles uniquement pour la durée nécessaire aux finalités pour lesquelles elles ont été collectées, conformément à la législation applicable :
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700 text-lg sm:text-base">
            <li>Données d'inscription : Tant que vous avez un compte actif sur Mayfly.</li>
            <li>Contenu des posts et interactions : Jusqu'à la suppression par vos soins.</li>
            <li>Données de connexion : Maximum 12 mois après la dernière utilisation de votre compte, sauf obligation légale contraire.</li>
            <li>Données liées à la facturation : En fonction des exigences fiscales et comptables, pendant 10 ans.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 sm:text-2xl">5. Sécurité des Données</h2>
          <p className="text-gray-700 leading-relaxed text-lg sm:text-base">
            Nous mettons en place des mesures techniques et organisationnelles rigoureuses pour garantir la sécurité de vos données personnelles, telles que :
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700 text-lg sm:text-base">
            <li>Cryptage des données sensibles (ex. mot de passe, transactions).</li>
            <li>Contrôles d’accès stricts : Seul un personnel autorisé a accès à vos données.</li>
            <li>Mise à jour régulière de nos systèmes de sécurité pour prévenir toute intrusion.</li>
            <li>Sensibilisation et formation de notre personnel en matière de protection des données.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 sm:text-2xl">6. Transfert des Données</h2>
          <p className="text-gray-700 leading-relaxed text-lg sm:text-base">
            Si nous transférons vos données en dehors de l'Espace Économique Européen (EEE), nous nous assurons que des garanties appropriées sont mises en place, conformément aux exigences du RGPD.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 sm:text-2xl">7. Cookies et Technologies Similaires</h2>
          <p className="text-gray-700 leading-relaxed text-lg sm:text-base">
            Nous utilisons des cookies et autres technologies similaires pour améliorer votre expérience sur notre plateforme. Pour en savoir plus, veuillez consulter notre Politique relative aux Cookies, disponible sur notre site.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 sm:text-2xl">8. Modifications de cette Politique</h2>
          <p className="text-gray-700 leading-relaxed text-lg sm:text-base">
            Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. En cas de changement, nous vous en informerons via une notification sur notre plateforme ou par email. La version mise à jour sera disponible sur cette page avec la date de révision.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 sm:text-2xl">9. Contact</h2>
          <p className="text-gray-700 leading-relaxed text-lg sm:text-base">
            Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, vous pouvez nous contacter à :
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700 text-lg sm:text-base">
            <li>Email : support@mayfly.com</li>
            <li>Adresse postale : 24 Rue Pasteur, 94270 Le Kremlin-Bicêtre, France</li>
            <li>Délégué à la protection des données (DPD) : privacy@mayfly.com</li>
          </ul>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t">
        <Link to="/" className="text-purple-500 hover:text-purple-600 block text-center sm:text-sm">
          ← Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
