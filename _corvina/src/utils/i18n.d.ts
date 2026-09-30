export declare function getDomain(): string | null;
export declare function setCC2LocaleCookie(locale: string): void;
export declare const fixShortLocale: (locale: string) => any;
export declare function formatBytes(bytes: number, si?: boolean, dp?: number): string;
export declare function setLocale(i18n: any, host: string, newLocale: string): Promise<void>;
export declare const pluralizationRules: {
    en: (choice: any, choiceOptions: any) => number;
    'en-US': (choice: any, choiceOptions: any) => number;
    it: (choice: any, choiceOptions: any) => number;
    'it-IT': (choice: any, choiceOptions: any) => number;
    de: (choice: any, choiceOptions: any) => number;
    'de-DE': (choice: any, choiceOptions: any) => number;
    es: (choice: any, choiceOptions: any) => number;
    'es-ES': (choice: any, choiceOptions: any) => number;
    fr: (choice: any, choiceOptions: any) => number;
    'fr-FR': (choice: any, choiceOptions: any) => number;
};
