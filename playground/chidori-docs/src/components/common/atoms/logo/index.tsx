import { Link } from 'rasengan';
import Image from '@rasenganjs/image';
import { useTheme } from '@rasenganjs/theme';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

type Props = {
  size?: 'sm' | 'md' | 'lg';
};

export default function AppLogo({ size = 'md' }: Props) {
  const { isDark } = useTheme();

  return (
    <Link to="/">
      <div className="flex gap-2 items-center">
        <Button size={'icon'} variant="outline">
          <Zap />
        </Button>

        <span className="text-md font-semibold">Chidori</span>
      </div>
    </Link>
  );
}
