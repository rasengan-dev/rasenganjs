import { useTheme } from '@rasenganjs/theme';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ThemeButton() {
  const { setTheme, isDark } = useTheme();

  const handleThemeChange = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <motion.button
      onClick={handleThemeChange}
      className="relative size-8 rounded-md border-[1px] border-primary/40 bg-primary/10 flex items-center justify-center overflow-hidden hover:cursor-pointer"
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
