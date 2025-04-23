import ctaLigthIllustration from '@/assets/images/illustrations/cta-light.png';
import ctaGridIllustration from '@/assets/images/illustrations/cta-grid.svg';
import Image from '@rasenganjs/image';
import { Link } from 'rasengan';
import Button from '../atoms/buttons/button';

export default function CTA() {
  return (
    <div className="relative max-w-[1000px] mx-auto overflow-hidden bg-[#000E24] border-[1px] border-border/60 rounded-2xl">
      <div className="z-20 relative flex flex-col items-center justify-center gap-4 p-4 pb-8">
        <Image
          src={'/rasengan.svg'}
          alt="Blue light illustration"
          className="object-cover"
          width={85}
          height={85}
        />

        <h2 className="text-3xl lg:text-[46px] font-lexend-medium text-center text-white">
          Speed & Simplicity, Unleashed.
        </h2>
        <p className="text-lg text-white/70 font-lexend-light text-center">
          Rasengan.js gives you the power to build ultra-fast, scalable web apps
          effortlessly.
        </p>
        <Link to="/docs/getting-started/introduction">
          <Button className="bg-primary text-primary-foreground">
            Get started now
          </Button>
        </Link>
      </div>

      <div className="z-0 absolute top-0 right-0">
        <Image
          src={ctaLigthIllustration}
          alt="Blue light illustration"
          className="w-full object-cover"
        />
      </div>
      <div className="z-10 absolute top-0 right-0 left-0 w-full opacity-40">
        <Image
          src={ctaGridIllustration}
          alt="Blue light illustration"
          className="w-full object-contain object-center"
          width={'100%'}
        />
      </div>
    </div>
  );
}
