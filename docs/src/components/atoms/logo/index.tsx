import { Link } from 'rasengan';
import Image from '@rasenganjs/image';
import { useTheme } from '@rasenganjs/theme';
import useScreen from '@/hooks/use-screen';

type Props = {
  size?: 'sm' | 'md' | 'lg';
};

export default function AppLogo({ size = 'md' }: Props) {
  const { isDark } = useTheme();

  const screenSize = useScreen();

  return (
    <Link to="/">
      <Image
        src={
          ['xs', 'sm'].includes(screenSize)
            ? '/rasengan.svg'
            : isDark
              ? '/rasengan-large-white.svg'
              : '/rasengan-large-normal.svg'
        }
        alt="Rasengan Logo"
        width={['xs', 'sm'].includes(screenSize) ? 40 : 160}
        height={'auto'}
      />
    </Link>
  );
}
