import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 justify-self-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="logo" className="w-52 h-52 object-contain" />
          </Link>
        </div>
      </div>

      <h1 className="text-purple-400 text-9xl font-extrabold text-center mb-8 leading-tight sm:text-6xl">MayFly</h1>

      <h1 className="text-4xl font-bold mb-8 text-center sm:text-3xl">Conditions d'Utilisation</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-3xl font-semibold mb-4 sm:text-2xl">1. Acceptation des Conditions</h2>
          <p className="text-gray-700 leading-relaxed text-lg sm:text-base">
            En utilisant notre service Mayfly ("nous", "notre", "le Service"), vous acceptez d'être lié par les présentes Conditions Générales d'Utilisation ("CGU"). Ces CGU sont régies par la législation française et par le Règlement Général sur la Protection des Données (RGPD - UE 2016/679).
            <br /><br />
            Nous nous réservons le droit de modifier ces CGU à tout moment. En cas de modification substantielle, vous serez informé et devrez accepter à nouveau les conditions actualisées. Si vous refusez ces modifications, vous devrez cesser d'utiliser notre Service.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 sm:text-2xl">2. Utilisation du Service</h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700 text-lg sm:text-base">
            <li>Âge minimum : Vous devez avoir au moins 18 ans pour vous inscrire et utiliser nos services.</li>
            <li>Responsabilité du Compte : Vous êtes responsable de la confidentialité de vos identifiants de connexion. Toute activité sur votre compte vous incombe, y compris l'activité de tiers ayant accédé à votre compte avec ou sans votre autorisation.</li>
            <li>Utilisation légale : Vous vous engagez à ne pas utiliser notre Service à des fins illégales, immorales ou nuisibles. Vous vous engagez à respecter toutes les lois en vigueur dans votre pays de résidence.</li>
            <li>Respect des autres utilisateurs : Vous vous engagez à ne pas publier, partager ou diffuser des contenus qui seraient diffamatoires, discriminatoires, violents, abusifs, haineux ou incitant à la violence.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 sm:text-2xl">3. Contenu des Utilisateurs</h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-lg sm:text-base">
            Lorsque vous publiez du contenu sur Mayfly, vous conservez la propriété de ce contenu. Cependant, en le publiant sur notre plateforme, vous nous accordez une licence mondiale, non exclusive, gratuite et transférable pour héberger, afficher, partager et distribuer ce contenu dans le cadre de notre Service. Vous garantissez que vous avez tous les droits nécessaires pour publier le contenu et que ce contenu ne viole pas les droits de propriété intellectuelle ou toute autre législation.
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700 text-lg sm:text-base">
            <li>Responsabilité du contenu : Vous êtes responsable du contenu que vous publiez sur Mayfly. Nous nous réservons le droit de retirer tout contenu jugé inapproprié, illégal ou qui viole nos politiques sans préavis.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 sm:text-2xl">4. Protection des Données Personnelles</h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-lg sm:text-base">
            Conformément au RGPD, nous nous engageons à protéger vos données personnelles et à respecter vos droits en matière de confidentialité. Nous collectons, traitons et stockons vos données personnelles uniquement dans le respect des principes suivants :
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700 text-lg sm:text-base">
            <li>Légalité, loyauté et transparence : Nous traitons vos données de manière licite, loyale et transparente.</li>
            <li>Finalité : Vos données sont collectées pour des finalités légitimes et spécifiques, telles que l’amélioration de nos services, la gestion de votre compte et la personnalisation de l'expérience utilisateur.</li>
            <li>Minimisation des données : Nous collectons uniquement les données nécessaires à la réalisation de ces finalités.</li>
            <li>Sécurité : Nous mettons en place des mesures de sécurité appropriées pour protéger vos données contre toute perte, utilisation abusive ou accès non autorisé.</li>
            <li>Vos droits : Vous avez le droit d'accéder, de rectifier, de supprimer, de restreindre le traitement de vos données ou de vous opposer à leur utilisation. Vous pouvez également demander la portabilité de vos données.</li>
            <li>Délégué à la protection des données (DPD) : Si vous avez des questions concernant la gestion de vos données personnelles, vous pouvez contacter notre DPD à l'adresse suivante : dpo@mayfly.com.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 sm:text-2xl">5. Modification et Résiliation</h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700 text-lg sm:text-base">
            <li>Modification des CGU : Nous nous réservons le droit de modifier ces conditions à tout moment. Nous vous informerons de ces modifications par notification sur notre plateforme. L'utilisation continue de notre Service après une telle modification constitue votre acceptation des conditions mises à jour.</li>
            <li>Suppression du Compte : Vous pouvez supprimer votre compte à tout moment. En cas de suppression de votre compte, toutes les données associées seront supprimées, sous réserve des exigences légales de conservation des données.</li>
            <li>Suspension ou résiliation du compte : Nous pouvons suspendre ou résilier votre compte en cas de violation des CGU, notamment pour des activités frauduleuses ou illicites. Nous nous réservons également le droit de suspendre l'accès au Service en cas de maintenance ou de mise à jour.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 sm:text-2xl">6. Limitation de Responsabilité</h2>
          <p className="text-gray-700 leading-relaxed text-lg sm:text-base">
            Dans les limites autorisées par la loi, nous ne serons pas responsables des dommages directs ou indirects découlant de l'utilisation du Service, y compris mais sans se limiter aux pertes de données, aux interruptions temporaires du Service, ou aux actions de tiers utilisant le Service de manière non autorisée.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg sm:text-base">
            Nous ne serons pas non plus responsables des contenus publiés par les utilisateurs, et nous ne garantissons pas l'exactitude, la pertinence ou la légalité des informations partagées sur la plateforme.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 sm:text-2xl">7. Contact</h2>
          <p className="text-gray-700 leading-relaxed text-lg sm:text-base">
            Pour toute question concernant ces conditions, vous pouvez nous contacter par :
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700 text-lg sm:text-base">
            <li>Email : support@mayfly.com</li>
            <li>Adresse postale : 24 Rue Pasteur, 94270 Le Kremlin-Bicêtre, France</li>
            <li>Délégué à la protection des données (DPD) : dpo@mayfly.com</li>
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
