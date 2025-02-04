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

  return (
    <CookieContext.Provider value={{
      consent,
      showBanner,
      updateConsent,
      acceptAll,
      rejectAll,
      openPreferences,
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
              Nous utilisons des cookies pour améliorer votre expérience. 
              Vous pouvez personnaliser vos préférences ou accepter l'utilisation par défaut.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0 md:ml-6">
            <button
              onClick={context.openPreferences}
              className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Personnaliser
            </button>
            <button
              onClick={context.rejectAll}
              className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Refuser tout
            </button>
            <button
              onClick={context.acceptAll}
              className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Accepter tout
            </button>
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

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Préférences des cookies</h2>
        </div>
        <div className="px-6 py-4 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Cookies nécessaires</h3>
                <p className="text-sm text-gray-500">
                  Ces cookies sont indispensables au fonctionnement du site.
                </p>
              </div>
              <input
                type="checkbox"
                checked={localConsent.necessary}
                disabled
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Cookies analytiques</h3>
                <p className="text-sm text-gray-500">
                  Nous aident à comprendre comment vous utilisez le site.
                </p>
              </div>
              <input
                type="checkbox"
                checked={localConsent.analytics}
                onChange={(e) => setLocalConsent({ ...localConsent, analytics: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Cookies marketing</h3>
                <p className="text-sm text-gray-500">
                  Utilisés pour vous montrer des publicités pertinentes.
                </p>
              </div>
              <input
                type="checkbox"
                checked={localConsent.marketing}
                onChange={(e) => setLocalConsent({ ...localConsent, marketing: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Enregistrer
          </button>
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