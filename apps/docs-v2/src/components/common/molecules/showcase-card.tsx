import Image from '@rasenganjs/image';
import { ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'rasengan';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  image: string;
  title: string;
  link: string;
  className?: ComponentProps<'article'>['className'];
};

export const ShowcaseCard = ({ image, title, link, className }: Props) => {
  return (
    <Link
      to={link}
      target="_blank"
      className={twMerge('h-full w-full', className)}
    >
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, type: 'spring' }}
        whileHover={{ scale: 1.02, y: -4 }}
        className={twMerge(
          'h-full w-full group cursor-pointer',
          'border border-border/40 rounded-2xl overflow-hidden',
          'hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5',
          'bg-background'
        )}
      >
        <div className="relative overflow-hidden">
          <Image
            src={image}
            alt={title}
            className="aspect-[9/7] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            width="100%"
            height="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="flex items-center justify-between px-4 py-4">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <span className="size-8 flex items-center justify-center rounded-full bg-muted/50 group-hover:bg-primary/10 transition-colors">
            <ExternalLink
              size={14}
              className="text-foreground/40 group-hover:text-primary transition-colors"
            />
          </span>
        </div>
      </motion.article>
    </Link>
  );
};
