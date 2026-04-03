import { useTheme } from '@rasenganjs/theme';
import { Moon, Sun } from 'lucide-react';

type Props = {
  size?: 'normal' | 'small';
};

export default function ThemeButton({ size = 'normal' }: Props) {
  const { setTheme, isDark } = useTheme();

  const handleThemeChange = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      id="theme-button"
      onClick={handleThemeChange}
      className={`relative  rounded-md border-[1px] border-primary/40 bg-primary/10 flex items-center justify-center overflow-hidden hover:cursor-pointer ${size === 'small' ? 'size-7' : 'size-8'}`}
    >
      {isDark ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Moon size={20} className="text-primary" />
        </div>
      ) : (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Sun size={20} className="text-primary" />
        </div>
      )}
    </button>
  );
}
