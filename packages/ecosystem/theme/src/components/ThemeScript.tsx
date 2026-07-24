import { THEME_STORAGE_KEY } from '../utils/index.js';

const script = `
(function () {
  try {
    var saved = localStorage.getItem('${THEME_STORAGE_KEY}');
    var isDark =
      saved === 'dark' ||
      (saved !== 'light' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    document.documentElement.classList.toggle('dark', isDark);
  } catch (e) {}
})();
`;

/**
 * Applies the saved (or OS-preferred) theme to `<html>` before hydration,
 * so there's no flash of the wrong theme while the client bundle loads.
 *
 * Render this once in your document `<head>`, before any stylesheet that
 * depends on the `.dark` class:
 *
 * ```tsx
 * import { ThemeScript } from '@rasenganjs/theme';
 *
 * <Head>
 *   <ThemeScript />
 * </Head>
 * ```
 *
 * `Provider` takes over from there, keeping `<html>` in sync as the theme
 * changes at runtime — this component only handles the pre-hydration case.
 */
export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
