interface TranslationOptions {
  [key: string]: string | number;
}
export declare const useTranslations: (
  namespace?: string
) => (key: string, options?: TranslationOptions) => string;
export {};
