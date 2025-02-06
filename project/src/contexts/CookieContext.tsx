import React, { createContext, useContext, useState, useEffect } from 'react';

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieContextType {
  consent: CookieConsent;
  showBanner: boolean;
  updateConsent: (consent: Partial<CookieConsent>) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  openPreferences: () => void;
  withdrawConsent: () => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

const COOKIE_CONSENT_KEY = 'cookie_consent';

export function CookieProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const [showBanner, setShowBanner] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (savedConsent) {
      setConsent(JSON.parse(savedConsent));
      setShowBanner(false);
    }
  }, []);

  const saveConsent = (newConsent: CookieConsent) => {
    setConsent(newConsent);
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newConsent));
    setShowBanner(false);
    setShowPreferences(false);
  };

  const updateConsent = (partialConsent: Partial<CookieConsent>) => {
    const newConsent = { ...consent, ...partialConsent };
    saveConsent(newConsent);
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const rejectAll = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  const openPreferences = () => {
    setShowPreferences(true);
  };

  const withdrawConsent = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  return (
    <CookieContext.Provider value={{
      consent,
      showBanner,
      updateConsent,
      acceptAll,
      rejectAll,
      openPreferences,
      withdrawConsent,
    }}>
      {children}
      {showBanner && <CookieBanner />}
      {showPreferences && <CookiePreferences onClose={() => setShowPreferences(false)} />}
    </CookieContext.Provider>
  );
}

function CookieBanner() {
  const context = useCookieConsent();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-base text-gray-700 mb-4 md:mb-0">
              Chez <span className="font-semibold">MayFly</span>, nous utilisons des cookies pour optimiser votre expérience
              sociale. Vous pouvez personnaliser vos préférences ou accepter tous les cookies pour profiter
              pleinement de notre plateforme. </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0 md:ml-6">
            <button
              onClick={context.openPreferences}
              className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Personnaliser </button>

            <button
              onClick={context.rejectAll}
              className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Refuser </button>

            <button
              onClick={context.acceptAll}
              className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Accepter tout </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CookiePreferences({ onClose }: { onClose: () => void }) {
  const context = useCookieConsent();
  const [localConsent, setLocalConsent] = useState(context.consent);

  const handleSave = () => {
    context.updateConsent(localConsent);
    onClose();
  };

  const cookieTypes = [
    {
      id: 'necessary',
      title: 'Cookies Techniques (Requis)',
      description: `Ces cookies sont essentiels au fonctionnement de MayFly.
      Ils permettent d'assurer une navigation fluide, une sécurité renforcée,
      ainsi que des fonctionnalités de base telles que la gestion de session utilisateur et
      la mémorisation des paramètres linguistiques. Sans ces cookies, certaines fonctionnalités
      critiques du site ne fonctionneraient pas correctement.`,
      required: true
    },
    {
      id: 'analytics',
      title: 'Cookies Analytiques',
      description: `Ces cookies collectent des informations sur la manière dont les utilisateurs
      interagissent sur MayFly, comme les pages les plus visitées, les posts les plus appréciés, le temps
      passé sur chaque section ou les éventuelles erreurs rencontrées. Ces données sont agrégées et
      anonymisées afin d'aider l'équipe à améliorer la navigation, l'ergonomie et les fonctionnalités de la plateforme.
      Ils ne permettent pas d'identifier un utilisateur spécifique, mais offrent une meilleure compréhension de
      la manière dont les utilisateurs utilisent Mayfly pour l'optimiser.`
    },
    {
      id: 'marketing',
      title: 'Cookies Publicitaires',
      description: `Ces cookies sont utilisés pour personnaliser les contenus publicitaires et
      vous proposer des offres adaptées à vos préférences. Ils permettent aussi de limiter la
      fréquence à laquelle une publicité vous est affichée et de mesurer l'efficacité des
      campagnes publicitaires. Ces cookies peuvent collecter des informations sur vos interactions
      avec les annonces publicitaires. Leur activation aide MayFly à fournir une expérience plus
      personnalisée et pertinente pour chaque utilisateur.`
    }
  ];

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Vos préférences en matière de cookies</h2>
        </div>
        <div className="px-6 py-4 space-y-8">
          {cookieTypes.map((cookieType) => (
            <div key={cookieType.id} className="border-b pb-6 last:border-b-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{cookieType.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {cookieType.description} </p>
                </div>
                <div className="pt-1">
                  <input
                    type="checkbox"
                    checked={localConsent[cookieType.id as keyof CookieConsent]}
                    disabled={cookieType.required}
                    onChange={(e) => setLocalConsent({
                      ...localConsent,
                      [cookieType.id]: e.target.checked
                    })}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"> Annuler </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"> Enregistrer </button>
        </div>
      </div>
    </div>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieProvider');
  }
  return context;
}