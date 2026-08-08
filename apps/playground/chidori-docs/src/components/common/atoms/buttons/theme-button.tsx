import { Button } from '@/components/ui/button';
import { useTheme, Themes } from '@rasenganjs/theme';

export default function ThemeButton() {
  const { isDark, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? Themes.light : Themes.dark)}
      className="text-foreground"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path
          d="M12 2a10 10 0 0 1 0 20"
          fill="currentColor"
          stroke="none"
        ></path>
      </svg>
    </Button>
  );
}
