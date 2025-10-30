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
      <div className="md:hidden">
        <Image
          src={'/rasengan.svg'}
          alt="Rasengan Logo"
          width={40}
          height={'auto'}
        />
      </div>

      <div className="hidden md:block">
        <Image
          src={
            isDark ? '/rasengan-large-white.svg' : '/rasengan-large-normal.svg'
          }
          alt="Rasengan Logo"
          width={160}
          height={'auto'}
        />
      </div>
    </Link>
  );
}
