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
        whileHover={{ scale: 1.03 }}
        className={twMerge('h-full w-full')}
      >
        <Image
          src={image}
          alt="Showcase"
          className={twMerge('aspect-squareh rounded-3xl')}
          width={'100%'}
          height={'calc(100% - 60px)'}
        />

        <div className="flex items-center justify-start gap-4 mt-4 h-[40px]">
          <h3>{title}</h3>
          <span>
            <ExternalLink size={16} />
          </span>
        </div>
      </motion.article>
    </Link>
  );
};
