import { useTheme } from '@rasenganjs/theme';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { twMerge } from 'tailwind-merge';

type Props = {
  size?: 'normal' | 'small';
};

export default function ThemeButton({ size = 'normal' }: Props) {
  const { setTheme, isDark } = useTheme();

  const handleThemeChange = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <motion.button
      onClick={handleThemeChange}
      className={twMerge(
        'relative  rounded-md border-[1px] border-primary/40 bg-primary/10 flex items-center justify-center overflow-hidden hover:cursor-pointer',
        size === 'small' ? 'size-7' : 'size-8'
      )}
      whileHover={{ scale: 1.05 }}
    >
      <AnimatePresence>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <Moon size={20} className="text-primary" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <Sun size={20} className="text-primary" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
