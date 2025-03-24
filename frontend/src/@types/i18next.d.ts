import { resources, defaultNS } from "../i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    // Default namespace
    defaultNS: typeof defaultNS;
    
    // Resources type for better key autocompletion
    resources: typeof resources["he"];
    
    // Return type configuration
    returnNull: false;
    returnEmptyString: false;
  }
} 