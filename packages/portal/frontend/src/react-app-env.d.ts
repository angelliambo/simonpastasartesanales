/// <reference types="react-scripts" />

interface Window {
  __INITIAL_STATE__?: {
    tenant: {
      id: string;
      subdomain: string;
      domain?: string;
      name: string;
      theme: {
        primaryColor: string;
        secondaryColor?: string;
        darkMode: boolean;
      };
      features: string[];
    } | null;
    brandDefault: {
      siteName: string;
      domain: string;
      supportEmail: string;
      theme: {
        primaryColor: string;
        secondaryColor: string;
        darkMode: boolean;
      };
    };
  };
}

