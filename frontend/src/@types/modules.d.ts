// Declaration file for modules without TypeScript definitions

declare module "i18next-browser-languagedetector" {
  import { BackendModule, InitOptions } from "i18next";
  
  export interface DetectorOptions {
    // Order of detection
    order?: string[];
    // Keys to lookup
    lookupQuerystring?: string;
    lookupCookie?: string;
    lookupLocalStorage?: string;
    lookupSessionStorage?: string;
    lookupFromPathIndex?: number;
    lookupFromSubdomainIndex?: number;
    // Cache user language
    caches?: string[];
    // Optional HTML attribute
    htmlTag?: string;
    // Cookie options
    cookieExpirationDate?: Date;
    cookieDomain?: string;
    cookieSecure?: boolean;
  }

  export default class I18nextBrowserLanguageDetector implements BackendModule {
    constructor(services?: any, options?: DetectorOptions);
    init(services: any, options?: DetectorOptions & InitOptions): void;
    type: "languageDetector";
    detect(): string;
    cacheUserLanguage(lng: string): void;
  }
}

declare module "i18next-http-backend" {
  import { BackendModule, InitOptions, Services } from "i18next";

  export interface BackendOptions {
    // Path where resources get loaded from, or a function
    // returning a path: function(lngs, namespaces) { return customPath; }
    // the returned path will interpolate lng, ns if provided like giving a static path
    loadPath?: string | ((lngs: string[], namespaces: string[]) => string);
    
    // Path to post missing resources
    addPath?: string | ((lng: string, namespace: string) => string);
    
    // Your backend server supports multiloading
    // /locales/resources.json?lng=de+en&ns=ns1+ns2
    // Set loadPath: '/locales/resources.json?lng={{lng}}&ns={{ns}}' to adapt to multiLoading
    allowMultiLoading?: boolean;
    
    // Parse data after it has been fetched
    // In case you need to parse data before it has been sent by your backend server
    parse?(data: string, languages: string | string[], namespaces: string | string[]): object;
    
    // Parse multiloaded resources to namespaces
    parseLoadPayload?(
      data: string, 
      languages: string | string[], 
      namespaces: string | string[]
    ): { [namespace: string]: { [language: string]: object }};
    
    // Allow cross domain requests
    crossDomain?: boolean;
    
    // Allow credentials on cross domain requests
    withCredentials?: boolean;
    
    // Define custom headers
    customHeaders?: { [headerName: string]: string };
    
    // Add query parameters to fetch URL
    queryStringParams?: { [paramName: string]: string };
    
    // Request timeout (ms)
    requestTimeout?: number;
    
    // Override the request implementation
    request?(
      options: {
        loadPath: string,
        url: string,
        payload: object | null | undefined,
        headers: { [key: string]: string },
        queryStringParams: { [key: string]: string },
        method: string,
        timeout: number,
      },
      callback: (error: Error | null, response: Response | null) => void,
    ): void;
  }

  export default class I18NextHttpBackend implements BackendModule {
    constructor(options?: BackendOptions);
    init(services: Services, options?: BackendOptions & InitOptions): void;
    type: "backend";
    services: Services;
    options: BackendOptions;
    read(language: string, namespace: string, callback: (err: Error | null, data: object | null) => void): void;
    create(languages: string[], namespace: string, key: string, fallbackValue: string, callback: (err: Error | null, data: object | null) => void): void;
  }
}

// Declaration for JSON imports
declare module "*.json" {
  const value: { [key: string]: any };
  export default value;
}

// Declaration for image imports
declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
} 