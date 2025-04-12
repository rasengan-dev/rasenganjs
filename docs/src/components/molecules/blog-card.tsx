import Image from '@rasenganjs/image';
import Button from '../atoms/buttons/button';

export default function BlogCard() {
  return (
    <article className="w-full border-[1px] border-border/60 rounded-2xl overflow-hidden">
      <Image
        src={'/assets/images/metadata/home.png'}
        alt="Blog post image"
        width={400}
        height={300}
      />

      <div className="w-full p-4 bg-background">
        <div className="flex items-baseline justify-between">
          <span className="text-foreground/60 font-lexend-light text-sm">
            March 31, 2025
          </span>

          <div>
            <span className="text-foreground/80 font-lexend-light text-sm">
              5 min read
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-lexend-medium text-pretty my-3">
            How to use Shadcn with Rasengan.js ?
          </h3>
          <p className="text-foreground/70 font-lexend-light text-sm">
            Shadcn is one of the most used CSS Library built on top of
            TailwindCSS. You have to go through a list of some steps in order to
            setup shadcn in your Rasengan.js application
          </p>
        </div>

        <div className="flex items-center justify-between mt-3">
          <Button className="px-0 font-lexend-normal text-primary/80 hover:text-primary">
            Read More
          </Button>

          <div className="relative w-20 h-[30px]">
            <div className="absolute top-0 right-0">
              <Image
                src={'/assets/images/metadata/home.png'}
                alt="Blog post image"
                width={30}
                height={30}
                className="rounded-full border-1l border-border"
              />
            </div>
            <div className="absolute top-0 right-4">
              <Image
                src={'/assets/images/metadata/docs.png'}
                alt="Blog post image"
                width={30}
                height={30}
                className="rounded-full border-1l border-border"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
