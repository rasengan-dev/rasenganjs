import I18nContext from '../contexts/index.js';
import { useContext } from 'react';

export function useLocale() {
  const { locale } = useContext(I18nContext);

  return {
    locale,
  };
}
