import { Button } from '@/components/ui/button';
import { useTheme } from '@rasenganjs/theme';
import { Github } from 'lucide-react';
import { Link, PageComponent } from 'rasengan';

const registryUrl =
  import.meta.env['RASENGAN_REGISTRY_URL'] || 'https://registry.rasengan.dev';

const Page: PageComponent = () => {
  const { isDark } = useTheme();

  return (
    <section className="w-full max-w-[1000px] mx-auto mt-[60px] pt-24">
      {/* Hero Section */}
      <div className="relative w-full p-2">
        <div className="z-20 w-full flex flex-col items-center justify-center text-center px-4 pt-10">
          <h1 className="text-[60px] leading-[60px] max-w-[850px] font-bold text-center text-foreground">
            Write docs at lightning speed.
          </h1>
          <p className="text-md text-center text-foreground max-w-[600px] mt-4">
            <span className="font-bold">Chidori</span> is a documentation
            framework powered by <span className="font-bold">Rasengan.js</span>{' '}
            to build fast, elegant, and interactive documentation websites.
          </p>

          <div className="relative w-full flex items-center justify-center mt-6 py-4">
            {/* Lines */}
            <div className="absolute w-full top-0 -translate-x-1/2 left-1/2 h-[1px] bg-gradient-to-r from-0% to-100% from-transparent via-border to-transparent"></div>

            <div className="flex gap-4 mb-10">
              <Link to="/docs/introduction">
                <Button className="rounded-full p-6 text-sm">
                  Get Started for free
                </Button>
              </Link>

              <Link
                to="https://github.com/rasengan-dev/chidori"
                target="_blank"
                className="font-semibold underline underline-offset-4"
              >
                <Button
                  variant={'outline'}
                  className="rounded-full p-6! text-sm"
                >
                  <Github />
                  <span>Source code</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative w-full flex items-center justify-center mt-6 py-2">
          {/* Lines */}
          <div className="absolute top-0 -translate-x-1/2 left-1/2 h-[1px] w-full bg-gradient-to-r from-0% to-100% via-50% from-transparent via-border to-transparent"></div>

          <div className="w-full">
            <img
              src={`/static/images/${isDark ? 'hero2.png' : 'hero1.png'}`}
              alt="Background Image"
              className="object-cover w-full h-full rounded-3xl border"
              width={'100%'}
              height={'auto'}
            />
          </div>
        </div>

        {/* Lines */}
        <div className="absolute top-0 -translate-x-1/2 left-1/2 h-[1px] w-full bg-gradient-to-r from-0% to-100% via-50% from-transparent via-border to-transparent"></div>
        <div className="absolute bottom-0 -translate-x-1/2 left-1/2 h-[1px] w-full bg-gradient-to-r from-0% to-100% via-50% from-transparent via-border to-transparent"></div>

        <div className="absolute left-0 -translate-y-1/2 top-1/2 w-[1px] h-full bg-gradient-to-b from-0% to-100% via-50% from-transparent via-border to-transparent"></div>
        <div className="absolute right-0 -translate-y-1/2 top-1/2 w-[1px] h-full bg-gradient-to-b from-0% to-100% via-50% from-transparent via-border to-transparent"></div>
      </div>
    </section>
  );
};

export default Page;
