import { Link } from 'rasengan';
import Image from '@rasenganjs/image';
import { useTheme } from '@rasenganjs/theme';

type Props = {
  size?: 'sm' | 'md' | 'lg';
};

export default function AppLogo({ size = 'md' }: Props) {
  const { isDark } = useTheme();

  return (
    <Link to="/">
      <Image
        src={
          isDark ? '/rasengan-large-white.svg' : '/rasengan-large-normal.svg'
        }
        alt="Rasengan Logo"
        width={size === 'sm' ? 100 : size === 'md' ? 130 : 160}
        height={'auto'}
      />
    </Link>
  );
}
