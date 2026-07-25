import { X } from 'lucide-react';
import Button from '../atoms/buttons/button';

export default function Banner({
  show,
  onClose,
  children,
}: {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-30">
      <div className="relative w-full h-[60px] bg-primary px-4 xl:px-20">
        <div className="flex h-full justify-center items-center gap-4 text-sm">
          {children}

          <Button
            className="absolute top-1/2 -translate-y-1/2 right-2 z-40 border border-white/30 hover:border-white/50 size-8 p-0 flex items-center justify-center"
            onClick={onClose}
          >
            <X size={16} className="text-primary-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
}
