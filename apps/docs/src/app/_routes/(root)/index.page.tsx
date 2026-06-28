import { AnnonceBadge } from '@/components/common/atoms/badges/badge';
import Button from '@/components/common/atoms/buttons/button';
import Image from '@rasenganjs/image';
import { Link, PageComponent } from 'rasengan';
import CopyButton from '@/components/common/atoms/buttons/copy-button';
import FeatureCard from '@/components/common/molecules/feature-card';
import rasenganIllustration from '@/assets/images/icons/rasengan-large.svg';
import { twMerge } from 'tailwind-merge';
import { ShowcaseCard } from '@/components/common/molecules/showcase-card';
import CTA from '@/components/common/molecules/cta';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Braces,
  Cpu,
  Zap,
  FileCog,
  RotateCw,
  Route,
  ImageIcon,
  Database,
  Palette,
  LayoutDashboard,
  Box,
} from 'lucide-react';

const features = [
  {
    title: 'Type-safe',
    description:
      'Seamless IntelliSense, built-in auto-imports, and full TypeScript support for an exceptional DX.',
    icon: Braces,
    gradient: 'from-sky-800/20',
  },
  {
    title: 'Easy to Learn',
    description:
      'Designed with simplicity in mind. Well-structured docs and intuitive APIs get you productive fast.',
    icon: Cpu,
    gradient: 'from-[#C657F6]/20',
  },
  {
    title: 'Blazing Fast',
    description:
      'Performance-first architecture. Vite-powered builds, lazy loading, and optimized bundles.',
    icon: Zap,
    gradient: 'from-[#F7719C]/20',
  },
];

const featureCards = [
  {
    title: 'Routing',
    description:
      'Define routes using config-based or file-based routing with full control over your app structure.',
    icon: Route,
  },
  {
    title: 'Image Optimization',
    description:
      'Built-in lazy loading and responsive support for faster performance and better UX.',
    icon: ImageIcon,
  },
  {
    title: 'Data Fetching',
    description:
      'Flexible data loading with server-side and client-side fetching via simple loader functions.',
    icon: Database,
  },
  {
    title: 'CSS Support',
    description:
      'CSS Modules, Sass, Less, Stylus, TailwindCSS, or plain CSS — no extra configuration needed.',
    icon: Palette,
  },
  {
    title: 'CSR & SSR',
    description:
      'Choose client-side or server-side rendering per page to balance speed and SEO.',
    icon: LayoutDashboard,
  },
  {
    title: 'SSG',
    description:
      'Build static sites with Static Site Generation for ultra-fast, deploy-anywhere content.',
    icon: FileCog,
  },
  {
    title: 'Lazy Loading',
    description:
      'Lazy load routes automatically to reduce initial bundle size and improve performance.',
    icon: RotateCw,
  },
  {
    title: 'Utility Packages',
    description:
      'An ecosystem of packages — Kurama, MDX, Image, Theme, i18n, and more.',
    icon: Box,
  },
];

const foundations = [
  {
    title: 'ReactJS',
    description:
      'The library for web and native UI. Rasengan.js harnesses React components to create high-quality applications.',
    href: 'https://react.dev',
    gradient: 'from-[#0288D1]/20',
    icon: (
      <svg width="31" height="31" viewBox="0 0 101 101" fill="none">
        <path
          d="M50.8013 43.804C49.5651 43.804 48.3568 44.1705 47.329 44.8573C46.3012 45.544 45.5001 46.5201 45.027 47.6622C44.554 48.8042 44.4302 50.0609 44.6714 51.2733C44.9125 52.4857 45.5078 53.5993 46.3819 54.4734C47.2559 55.3474 48.3696 55.9427 49.582 56.1839C50.7943 56.425 52.051 56.3013 53.193 55.8282C54.3351 55.3552 55.3112 54.5541 55.998 53.5263C56.6847 52.4985 57.0513 51.2901 57.0513 50.054C57.0513 48.3964 56.3928 46.8066 55.2207 45.6345C54.0486 44.4624 52.4589 43.804 50.8013 43.804Z"
          fill="#0288D1"
        />
        <path
          d="M50.8013 37.554C74.0638 37.554 88.3013 45.6477 88.3013 50.054C88.3013 54.4602 74.0638 62.554 50.8013 62.554C27.5388 62.554 13.3013 54.4602 13.3013 50.054C13.3013 45.6477 27.5388 37.554 50.8013 37.554ZM50.8013 31.304C26.6388 31.304 7.05127 39.6977 7.05127 50.054C7.05127 60.4102 26.6388 68.804 50.8013 68.804C74.9638 68.804 94.5513 60.4102 94.5513 50.054C94.5513 39.6977 74.9638 31.304 50.8013 31.304Z"
          fill="#0288D1"
        />
        <path
          d="M33.4829 17.2634C39.786 17.2634 52.036 27.1916 61.6266 43.8041C73.2579 63.9509 73.3673 80.3259 69.5516 82.5291C69.1115 82.7573 68.6188 82.8651 68.1235 82.8416C61.8204 82.8416 49.5673 72.9166 39.9766 56.3041C28.3454 36.1572 28.236 19.7822 32.0516 17.5791C32.4927 17.3503 32.9866 17.2393 33.4829 17.2634ZM33.4798 11.0166C31.8871 10.9877 30.3156 11.3836 28.9266 12.1634C19.9579 17.3416 22.4829 38.5041 34.5641 59.4291C44.8266 77.2103 58.6891 89.0947 68.1266 89.0947C69.7188 89.121 71.2892 88.723 72.6766 87.9416C81.6454 82.7666 79.1204 61.6041 67.0391 40.6791C56.7766 22.8978 42.9141 11.0134 33.4766 11.0134L33.4798 11.0166Z"
          fill="#0288D1"
        />
        <path
          d="M68.1228 17.2632C68.6181 17.2397 69.1108 17.3475 69.5509 17.5757C73.3666 19.782 73.2572 36.157 61.6259 56.3039C52.0322 72.9164 39.7822 82.8445 33.479 82.8445C32.9838 82.868 32.4911 82.7602 32.0509 82.532C28.2353 80.3226 28.3447 63.9476 39.9759 43.8039C49.5697 27.1914 61.8197 17.2632 68.1228 17.2632ZM68.1228 11.0132C58.6853 11.0132 44.8259 22.9007 34.5603 40.6789C22.4853 61.6039 19.9572 82.7664 28.9259 87.9414C30.3143 88.7234 31.8859 89.1214 33.479 89.0945C42.9165 89.0945 56.7759 77.207 67.0416 59.4289C79.1166 38.5039 81.6447 17.3414 72.6759 12.1664C71.2876 11.3844 69.716 10.9863 68.1228 11.0132Z"
          fill="#0288D1"
        />
      </svg>
    ),
  },
  {
    title: 'ViteJS',
    description:
      'Modern build tool combining robustness and speed. Rasengan.js leverages its performance for a great DX.',
    href: 'https://vitejs.dev',
    gradient: 'from-[#9C5DFE]/20',
    icon: (
      <svg width="30" height="30" viewBox="0 0 101 101" fill="none">
        <g clipPath="url(#vite0)">
          <path
            d="M50.3013 43.804C49.0651 43.804 47.8568 44.1705 46.829 44.8573C45.8012 45.544 45.0001 46.5201 44.527 47.6622C44.054 48.8042 43.9302 50.0609 44.1714 51.2733C44.4125 52.4857 45.0078 53.5993 45.8819 54.4734C46.7559 55.3474 47.8696 55.9427 49.082 56.1839C50.2943 56.425 51.551 56.3013 52.693 55.8282C53.8351 55.3552 54.8112 54.5541 55.498 53.5263C56.1847 52.4985 56.5513 51.2901 56.5513 50.054C56.5513 48.3964 55.8928 46.8066 54.7207 45.6345C53.5486 44.4624 51.9589 43.804 50.3013 43.804Z"
            fill="#0288D1"
          />
          <path
            d="M97.7746 15.3039L52.8981 95.5524C51.9707 97.2094 49.5903 97.2188 48.6504 95.5711L2.88323 15.3133C1.85745 13.5149 3.39261 11.3391 5.43089 11.7024L50.3559 19.7313C50.6426 19.7834 50.9364 19.7834 51.2231 19.7313L95.2075 11.7149C97.2371 11.3453 98.7817 13.5031 97.7746 15.3039Z"
            fill="url(#vite1)"
          />
          <path
            d="M71.7543 1.17109L38.5465 7.67734C38.2814 7.72913 38.0411 7.86749 37.8632 8.07069C37.6853 8.27389 37.58 8.53042 37.5637 8.79999L35.5191 43.3062C35.5082 43.4955 35.5414 43.6847 35.6162 43.8588C35.691 44.033 35.8053 44.1874 35.95 44.3097C36.0948 44.4321 36.2661 44.519 36.4503 44.5637C36.6345 44.6084 36.8266 44.6096 37.0113 44.5672L46.2582 42.4305C46.4574 42.3847 46.6648 42.3897 46.8615 42.4449C47.0582 42.5002 47.2379 42.604 47.3841 42.7467C47.5303 42.8895 47.6383 43.0667 47.6982 43.262C47.7581 43.4574 47.768 43.6647 47.727 43.8648L44.9793 57.3172C44.9373 57.5242 44.9498 57.7386 45.0155 57.9394C45.0812 58.1402 45.198 58.3205 45.3543 58.4626C45.5106 58.6047 45.7011 58.7039 45.9072 58.7503C46.1133 58.7967 46.3279 58.7888 46.5301 58.7273L52.2395 56.9906C53.1246 56.7219 53.9762 57.5 53.7902 58.4062L49.423 79.5367C49.1512 80.8586 50.909 81.5789 51.6418 80.4461L52.1301 79.6898L79.1926 25.682C79.6473 24.7758 78.8637 23.7445 77.8723 23.9367L68.3527 25.7742C68.1479 25.814 67.9363 25.8005 67.7382 25.7349C67.54 25.6693 67.3621 25.5539 67.2215 25.3998C67.0808 25.2456 66.9822 25.0579 66.935 24.8547C66.8878 24.6514 66.8936 24.4394 66.952 24.2391L73.1629 2.70624C73.2213 2.50519 73.2269 2.29247 73.1792 2.08862C73.1315 1.88476 73.0321 1.69663 72.8905 1.54236C72.749 1.38809 72.5701 1.27289 72.371 1.20786C72.172 1.14283 71.9596 1.13017 71.7543 1.17109Z"
            fill="url(#vite2)"
          />
        </g>
        <defs>
          <linearGradient
            id="vite1"
            x1="1.76464"
            y1="8.83485"
            x2="57.6192"
            y2="84.6897"
          >
            <stop stopColor="#41D1FF" />
            <stop offset="1" stopColor="#BD34FE" />
          </linearGradient>
          <linearGradient
            id="vite2"
            x1="47.7778"
            y1="2.9367"
            x2="57.8816"
            y2="72.2478"
          >
            <stop stopColor="#FFEA83" />
            <stop offset="0.083" stopColor="#FFDD35" />
            <stop offset="1" stopColor="#FFA800" />
          </linearGradient>
          <clipPath id="vite0">
            <rect
              width="100"
              height="100"
              fill="white"
              transform="translate(0.30127 0.0539551)"
            />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    title: 'React Router',
    description:
      'The best library for routing in React. Powers Rasengan.js routing system with loaders and actions.',
    href: 'https://reactrouter.com',
    gradient: 'from-sky-800/20',
    icon: (
      <svg width="31" height="31" viewBox="0 0 101 101" fill="none">
        <g clipPath="url(#rr0)">
          <path
            d="M50.8013 43.804C49.5651 43.804 48.3568 44.1705 47.329 44.8573C46.3012 45.544 45.5001 46.5201 45.027 47.6622C44.554 48.8042 44.4302 50.0609 44.6714 51.2733C44.9125 52.4857 45.5078 53.5993 46.3819 54.4734C47.2559 55.3474 48.3696 55.9427 49.582 56.1839C50.7943 56.425 52.051 56.3013 53.193 55.8282C54.3351 55.3552 55.3112 54.5541 55.998 53.5263C56.6847 52.4985 57.0513 51.2901 57.0513 50.054C57.0513 48.3964 56.3928 46.8066 55.2207 45.6345C54.0486 44.4624 52.4589 43.804 50.8013 43.804Z"
            fill="#0288D1"
          />
          <path
            d="M78.1763 39.3626C75.3279 38.4657 73.8576 38.768 70.8708 38.4407C66.2536 37.9368 64.4138 36.129 63.6333 31.4774C63.1966 28.8805 63.7122 25.0782 62.5974 22.7243C60.4654 18.2352 55.4763 16.2219 50.4646 17.3712C46.2326 18.343 42.7115 22.579 42.5161 26.9274C42.2935 31.8923 45.1177 36.129 49.9669 37.5915C52.2716 38.2868 54.7193 38.6368 57.1255 38.8141C61.5388 39.1368 61.8779 41.5938 63.0708 43.6165C63.824 44.8915 64.5529 46.1477 64.5529 49.9501C64.5529 53.7524 63.8193 55.0079 63.0716 56.2829C61.8779 58.3009 60.4052 59.6227 55.9919 59.9493C53.5857 60.1274 51.1325 60.4774 48.8341 61.1735C43.9841 62.6399 41.1599 66.8712 41.3825 71.8368C41.5779 76.1852 45.099 80.4212 49.331 81.393C54.3427 82.5462 59.3318 80.529 61.4638 76.0399C62.5833 73.686 63.1966 71.0188 63.6333 68.4227C64.4185 63.7704 66.2583 61.9626 70.8708 61.4579C73.8576 61.1313 76.949 61.4579 79.7482 59.8657C82.7052 57.7016 85.3482 54.4516 85.3482 49.9501C85.3482 45.4469 82.5005 40.7266 78.1763 39.3626ZM30.8013 60.5016C24.981 60.5016 20.2326 55.7376 20.2326 49.8962C20.2326 44.0548 24.9802 39.2915 30.8005 39.2915C36.6208 39.2915 41.3693 44.0555 41.3693 49.8962C41.3693 55.7321 36.6169 60.5016 30.8005 60.5016H30.8013ZM11.3326 82.054C5.52005 82.0399 0.787238 77.2571 0.801301 71.411C0.815363 65.5751 5.58177 60.8251 11.4068 60.8438C17.2224 60.8579 21.956 65.6407 21.938 71.486C21.924 77.3173 17.1568 82.068 11.3326 82.054ZM89.8575 82.054C84.0279 82.086 79.2435 77.3548 79.2099 71.5282C79.1779 65.6782 83.8927 60.8766 89.699 60.8438C95.5286 60.811 100.314 65.5423 100.347 71.3688C100.379 77.2141 95.6638 82.0212 89.8575 82.054Z"
            fill="#0288D1"
          />
        </g>
        <defs>
          <clipPath id="rr0">
            <rect
              width="100"
              height="100"
              fill="white"
              transform="translate(0.80127 0.0539551)"
            />
          </clipPath>
        </defs>
      </svg>
    ),
  },
];

const showcaseItems = [
  {
    image: '/assets/images/showcase/chunin.png',
    title: 'Chunin',
    link: 'https://chunin.rasengan.dev',
    area: 'a',
  },
  {
    image: '/assets/images/showcase/biccas.png',
    title: 'Biccas',
    link: 'https://www.hub.rasengan.dev/templates/rh_landing-biccas',
    area: 'b',
  },
  {
    image: '/assets/images/showcase/kronix.png',
    title: 'Kronix',
    link: 'https://www.hub.rasengan.dev/templates/rh_saas-kronix',
    area: 'c',
  },
  {
    image: '/assets/images/showcase/rasengan-ui.png',
    title: 'Rasengan UI',
    link: 'https://ui.rasengan.dev',
    area: 'd',
  },
  {
    image: '/assets/images/showcase/hano.png',
    title: 'Hano',
    link: 'https://www.hub.rasengan.dev/templates/rh_saas-hano',
    area: 'e',
  },
  {
    image: '/assets/images/showcase/rasengan.png',
    title: 'Rasengan',
    link: 'https://www.hub.rasengan.dev/templates/rh_saas-rasengan',
    area: 'f',
  },
];

const Page: PageComponent = () => {
  return (
    <section className="w-full overflow-hidden">
      <section className="w-full relative px-4 sm:px-6 lg:px-20 min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-16 pt-24 lg:pt-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-fulld lg:w-1/2 z-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex justify-center lg:justify-start"
          >
            <Link to="/blog/rasengan-v1-2-2">
              <AnnonceBadge
                text="Rasengan.js v1.2.2 is here 🚀"
                className="mb-4 hover:border-primary/30 border border-transparent"
              />
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[clamp(3rem,5vw,3.75rem)] leading-[1.1] font-bold text-foreground text-center lg:text-start"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-foreground to-primary">
              Rasengan.js
            </span>
            <br />A modern,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              high-performance
            </span>{' '}
            React framework
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-foreground/70 mt-4 text-lg lg:text-xl text-center lg:text-start max-w-[560px] mx-auto lg:mx-0 leading-relaxed"
          >
            Based on modern tools, Rasengan.js helps you create high-quality web
            applications with the power of React components.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <Link
              to="/docs/getting-started/introduction"
              className="w-full sm:w-auto group"
            >
              <Button className="bg-primary text-primary-foreground h-[48px] px-8 w-full sm:w-auto flex justify-center items-center gap-2">
                Get started
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
            <CopyButton
              text="npx create-rasengan@latest"
              textToDisplay="- npx create-rasengan@latest"
              className="border-[1px] border-border font-mono-light text-sm h-[48px] px-6 w-full sm:w-auto"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="absolute top-1/2 -translate-y-1/2 -right-20 dark:opacity-30 opacity-10 hidden lg:block"
        >
          <Image
            src={rasenganIllustration}
            alt="Rasengan.js"
            width={600}
            height="auto"
          />
        </motion.div>
      </section>

      <section className="px-4 sm:px-6 lg:px-20 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/40 rounded-2xl overflow-hidden border border-border/40">
          {features.map((feature, i) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={twMerge(
                'relative p-8 flex flex-col gap-4 bg-background',
                'hover:bg-muted/30 transition-colors duration-300'
              )}
            >
              <div
                className={twMerge(
                  'size-12 flex items-center justify-center rounded-xl bg-gradient-to-br',
                  feature.gradient
                )}
              >
                <feature.icon className="size-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="relative px-4 sm:px-6 lg:px-20 py-16 lg:py-24 border-y border-border/40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-16"
        >
          <h2 className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">
            What is Rasengan.js?
          </h2>
          <p className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold text-foreground max-w-[600px] leading-tight">
            A feature-rich framework for the frontend.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {featureCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <FeatureCard
                title={card.title}
                description={card.description}
                icon={<card.icon className="text-primary size-[18px]" />}
                className="h-full border border-border/40 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 bg-background"
              />
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 8 * 0.05, duration: 0.4 }}
          >
            <Link to="/blog/rasengan-v1-2-2" className="block h-full">
              <FeatureCard
                title="Rasengan 1.2.2"
                description="Latest release — error overlay, LLM support, and agent skills for AI-powered development."
                icon={<img src="/rasengan.svg" className="size-7" />}
                className="h-full bg-[#0B1A2F] dark border border-transparent hover:border-primary/30 transition-all duration-300"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 sm:px-6 lg:px-20 py-16 lg:py-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-16"
        >
          <h2 className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">
            Showcase
          </h2>
          <p className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold text-foreground max-w-[600px] leading-tight">
            Discover what developers are building with Rasengan.js
          </p>
        </motion.div>

        <div className="showcase-container">
          {showcaseItems.map((item) => (
            <ShowcaseCard
              key={item.title}
              image={item.image}
              title={item.title}
              link={item.link}
              className={item.area}
            />
          ))}
        </div>
      </section>

      <section className="relative px-4 sm:px-6 lg:px-20 py-16 lg:py-24 border-y border-border/40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-16 text-center"
        >
          <h2 className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">
            Foundation
          </h2>
          <p className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold text-foreground leading-tight">
            Built on top of a great foundation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {foundations.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link to={item.href} target="_blank" rel="noopener noreferrer">
                <article
                  className={twMerge(
                    'relative p-6 rounded-2xl border border-border/40 h-full',
                    'hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5',
                    'transition-all duration-300 group bg-gradient-to-br',
                    item.gradient,
                    'via-background to-background'
                  )}
                >
                  <span className="size-12 flex items-center justify-center rounded-full bg-background/80 mb-4">
                    {item.icon}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-20 py-16 lg:py-24">
        <CTA />
      </section>
    </section>
  );
};

Page.path = '/';

Page.metadata = {
  title: 'Welcome to Rasengan.js',
  description:
    'Rasengan.js is a modern JavaScript framework for building high-quality web applications.',
  openGraph: {
    title: 'Welcome to Rasengan.js',
    description:
      'Rasengan.js is a modern JavaScript framework for building high-quality web applications.',
    url: 'https://rasengan.dev',
    image: 'https://rasengan.dev/assets/images/metadata/home.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Welcome to Rasengan.js',
    description:
      'Rasengan.js is a modern JavaScript framework for building high-quality web applications.',
    image: 'https://rasengan.dev/assets/images/metadata/home.png',
  },
};

export default Page;
