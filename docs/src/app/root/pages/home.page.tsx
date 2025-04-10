import { AnnonceBadge } from '@/components/atoms/badges/badge';
import Button from '@/components/atoms/buttons/button';
import Image from '@rasenganjs/image';
import { Link, PageComponent } from 'rasengan';
import Editor from '@/components/molecules/editor';
import blueLigthIllustration from '@/assets/images/illustrations/blue-light.svg';
import lock from '@/assets/images/icons/lock.svg';
import folder from '@/assets/images/icons/folder.svg';
import speed from '@/assets/images/icons/speed.svg';
import CopyButton from '@/components/atoms/buttons/copy-button';
import Heading from '@/components/molecules/heading';
import FeatureCard from '@/components/molecules/feature-card';
import rasenganIllustration from '@/assets/images/icons/rasengan-large.svg';
import { useTheme } from '@rasenganjs/theme';
import { twMerge } from 'tailwind-merge';
import { ShowcaseCard } from '@/components/molecules/showcase-card';
import CTA from '@/components/molecules/cta';

const Home: PageComponent = () => {
  const { isDark } = useTheme();

  return (
    <section className="w-full overflow-hidden">
      <section className="w-full relative px-4 xl:px-20 lg:h-screen lg:max-h-[800px] lg:min-h-[800px] flex flex-col lg:flex-row justify-start lg:justify-between items-center gap-8 pt-[60px] overflow-hidden">
        <div className="w-full lg:w-1/2 mt-20 lg:mt-0">
          <div className="flex justify-center items-center lg:justify-start lg:items-start">
            <AnnonceBadge
              text="Rasengan.js v1 has been released 🚀"
              className="mb-2"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -top-6 right-3 translate-x-1/2 -translate-y-1/2"
              >
                <g opacity="0.973381">
                  <path
                    d="M7.77092 1.32895L10.8274 6.71486L16.8538 7.87076L11.5361 10.9664L10.3948 17.0701L7.33835 11.6842L1.31194 10.5283L6.62966 7.43264L7.77092 1.32895Z"
                    fill="url(#paint0_linear_288_1151)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_288_1151"
                    x1="7.77092"
                    y1="1.32895"
                    x2="10.4606"
                    y2="17.0588"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#2A7FFF" />
                    <stop offset="1" stop-color="white" />
                  </linearGradient>
                </defs>
              </svg>
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -top-2 -right-2 translate-x-1/2 -translate-y-1/2"
              >
                <g opacity="0.538418">
                  <path
                    d="M5.96768 13.5769L5.42822 8.76308L1.46905 6.04438L6.22188 5.498L8.90615 1.48806L9.44561 6.30183L13.4048 9.02054L8.65196 9.56692L5.96768 13.5769Z"
                    fill="url(#paint0_linear_288_1155)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_288_1155"
                    x1="5.96768"
                    y1="13.5769"
                    x2="8.97757"
                    y2="1.50586"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#2A7FFF" />
                    <stop offset="1" stop-color="white" />
                  </linearGradient>
                </defs>
              </svg>
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -top-2 right-3 translate-x-1/2 -translate-y-1/2"
              >
                <g opacity="0.409984">
                  <path
                    d="M5.39036 6.33858L3.64832 4.99506L1.50737 5.4599L2.83388 3.69552L2.37493 1.52712L4.11696 2.87064L6.25791 2.40579L4.9314 4.17017L5.39036 6.33858Z"
                    fill="url(#paint0_linear_288_1153)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_288_1153"
                    x1="5.39036"
                    y1="6.33858"
                    x2="2.31985"
                    y2="1.56253"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#2A7FFF" />
                    <stop offset="1" stop-color="white" />
                  </linearGradient>
                </defs>
              </svg>
            </AnnonceBadge>
          </div>

          <h1 className="text-[45px] leading-[50px] md:text-5xl md:leading-[55px] lg:text-[52px] text-foreground font-lexend-medium lg:leading-[60px] text-center lg:text-start">
            Rasengan.js: A modern,{' '}
            <span className="text-primary">high-performance</span> React
            framework
          </h1>
          <p className="text-foreground/80 mt-4 text-lg lg:text-xl text-center lg:text-start max-w-[600px] mx-auto lg:mx-0">
            Based on modern tools, Rasengan.js will help you to create
            high-quality web applications with the benefit of React components.
          </p>

          <div className="mt-8 flex flex-col md:flex-row items-center justify-center lg:justify-start gap-4">
            <Button
              hover
              tap
              className="bg-primary text-primary-foreground font-lexend-light h-[48px] px-6 w-full md:w-auto"
            >
              Get started
            </Button>
            <CopyButton
              text="npx create-rasengan@latest"
              textToDisplay="- npx create-rasengan@latest"
              className="border-[1px] border-border font-mono-light text-sm h-[48px] px-6 w-full md:w-auto"
            ></CopyButton>
            {/* <Button className="border-[1px] border-border font-mono-light text-sm h-[48px] px-6 w-full md:w-auto">
              - npx create-rasengan@latest
            </Button> */}
          </div>
        </div>

        <div className="relative lg:h-full z-20 w-full lg:w-1/2">
          <div className="lg:absolute lg:top-0 lg:right-0 lg:left-0 lg:bottom-0 flex items-center">
            <Editor />
          </div>
        </div>

        <div className="z-0 absolute top-0 right-0">
          <Image
            src={blueLigthIllustration}
            alt="Blue light illustration"
            className="w-full"
          />
        </div>
      </section>

      <section className="px-4 xl:px-20 py-20 pt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4">
        <article className="w-full rounded-lg md:rounded-none md:rounded-l-lg flex flex-col gap-4 p-6 border-[1px] border-border/60 bg-gradient-to-br from-sky-800/20 via-background to-background">
          <Image src={lock} alt="Lock" width={30} height={30} />

          <h3 className="font-lexend-medium text-2xl">Type-safe</h3>
          <p className="font-lexend-light text-foreground/80">
            We prioritize type safety, seamless{' '}
            <span className="text-primary font-lexend-regular">
              IntelliSense
            </span>
            , and built-in auto-imports for an exceptional developer experience.
          </p>
        </article>
        <article className="w-full flex flex-col gap-4 p-6 rounded-l-lg rounded-r-lg md:rounded-l-none lg:rounded-r-none border-l-[1px] border-r-[1px] md:border-l-none lg:border-r-none border-y-[1px] border-border/60 bg-gradient-to-br from-[#C657F6]/20 via-background to-background">
          <Image src={folder} alt="Lock" width={30} height={30} />

          <h3 className="font-lexend-medium text-2xl">Easy to Learn</h3>
          <p className="font-lexend-light text-foreground/80">
            Rasengan.js is designed with{' '}
            <span className="text-primary font-lexend-regular">Simplicity</span>{' '}
            in mind and backed by well-structured documentation.
          </p>
        </article>
        <article className="w-full rounded-l-lg lg:rounded-l-none rounded-r-lg flex flex-col gap-4 p-6 border-[1px] border-border/60 bg-gradient-to-br from-[#F7719C]/20 via-background to-background">
          <Image src={speed} alt="Lock" width={30} height={30} />

          <h3 className="font-lexend-medium text-2xl">
            Fast - Wherever it matters
          </h3>
          <p className="font-lexend-light text-foreground/80">
            <span className="text-primary font-lexend-regular">
              Performance
            </span>{' '}
            is the key point of Rasengan.js. It is designed to be fast and
            efficient.
          </p>
        </article>
      </section>

      <section className="relative px-4 xl:px-20 py-20 pt-20 border-y-[1px] border-border/60">
        <Heading
          title="What is Rasengan.js ?"
          description="A feature-rich framework for the frontend."
        />

        <div className="relative mt-20 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 z-10">
          <FeatureCard
            title="Routing"
            description="Define routes using configuration only—no file system dependency, giving you full control over your app structure."
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_394_1497)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.7278 3.7278C6.2136 1.2429 7.4556 0 9 0C10.5444 0 11.7864 1.242 14.2722 3.7278C16.758 6.2136 18 7.4556 18 9C18 10.5444 16.758 11.7864 14.2722 14.2722C11.7864 16.758 10.5444 18 9 18C7.4556 18 6.2136 16.758 3.7278 14.2722C1.242 11.7864 0 10.5444 0 9C0 7.4556 1.242 6.2136 3.7278 3.7278ZM10.6614 5.8068C10.5967 5.74617 10.5207 5.69888 10.4377 5.66762C10.3547 5.63637 10.2664 5.62177 10.1777 5.62465C10.0891 5.62753 10.0019 5.64785 9.92114 5.68443C9.84036 5.72101 9.76758 5.77314 9.70695 5.83785C9.64632 5.90256 9.59903 5.97858 9.56777 6.06156C9.53652 6.14455 9.52192 6.23288 9.5248 6.32151C9.52769 6.41013 9.548 6.49733 9.58458 6.57811C9.62116 6.65889 9.67329 6.73167 9.738 6.7923L10.8927 7.875H7.8003C7.3008 7.875 6.5601 8.01 5.922 8.4402C5.2488 8.8947 4.725 9.6615 4.725 10.8C4.725 10.979 4.79612 11.1507 4.9227 11.2773C5.04929 11.4039 5.22098 11.475 5.4 11.475C5.57902 11.475 5.75071 11.4039 5.8773 11.2773C6.00388 11.1507 6.075 10.979 6.075 10.8C6.075 10.1385 6.3513 9.7803 6.678 9.5598C7.01353 9.34567 7.40229 9.2297 7.8003 9.225H10.8927L9.738 10.3077C9.61048 10.4309 9.53654 10.5993 9.53216 10.7765C9.52778 10.9538 9.59331 11.1256 9.7146 11.2549C9.83588 11.3843 10.0032 11.4607 10.1803 11.4677C10.3575 11.4747 10.5303 11.4117 10.6614 11.2923L13.0617 9.0423C13.129 8.97917 13.1826 8.90291 13.2193 8.81824C13.256 8.73357 13.2749 8.64227 13.2749 8.55C13.2749 8.45773 13.256 8.36643 13.2193 8.28176C13.1826 8.19709 13.129 8.12083 13.0617 8.0577L10.6614 5.8068Z"
                    fill="#2A7FFF"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_394_1497">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            }
          />
          <FeatureCard
            title="Image Optimmization"
            description="Built-in lazy loading and responsive support for faster performance and better user experience."
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_394_907)">
                  <path
                    d="M6.1317 8.6508C6.543 8.3088 6.9579 8.3088 7.3791 8.6607L7.4763 8.7489L11.9637 13.2363L12.0483 13.311C12.2215 13.4452 12.4377 13.5117 12.6563 13.4979C12.875 13.4841 13.0811 13.391 13.2361 13.2361C13.391 13.0811 13.4841 12.875 13.4979 12.6563C13.5117 12.4377 13.4452 12.2215 13.311 12.0483L13.2363 11.9637L12.0735 10.8L12.3363 10.5363L12.4317 10.4508C12.843 10.1088 13.2579 10.1088 13.6791 10.4607L13.7763 10.5489L17.9829 14.7564C17.8977 15.6134 17.508 16.4115 16.8847 17.0058C16.2613 17.6002 15.4455 17.9513 14.5854 17.9955L14.4 18H3.6C2.70712 17.9999 1.84612 17.6681 1.18418 17.0688C0.522248 16.4696 0.106619 15.6458 0.018 14.7573L6.0363 8.7363L6.1317 8.6508ZM14.4 0C15.3236 -7.22479e-07 16.2119 0.354992 16.8811 0.991551C17.5504 1.62811 17.9493 2.49754 17.9955 3.42L18 3.6V12.2265L15.0363 9.2637L14.9013 9.1404C13.7709 8.1549 12.3363 8.1531 11.2149 9.1251L11.0763 9.2511L10.8 9.5265L8.7363 7.4637L8.6013 7.3404C7.4709 6.3549 6.0363 6.3531 4.9149 7.3251L4.7763 7.4511L0 12.2265V3.6C-7.22479e-07 2.67638 0.354992 1.78809 0.991551 1.11887C1.62811 0.449644 2.49754 0.050681 3.42 0.0045001L3.6 0H14.4ZM11.709 4.5L11.5947 4.5063C11.376 4.53232 11.1743 4.63766 11.0281 4.80237C10.8818 4.96708 10.801 5.17971 10.801 5.4C10.801 5.62029 10.8818 5.83292 11.0281 5.99763C11.1743 6.16234 11.376 6.26768 11.5947 6.2937L11.7 6.3L11.8143 6.2937C12.033 6.26768 12.2346 6.16234 12.3809 5.99763C12.5272 5.83292 12.608 5.62029 12.608 5.4C12.608 5.17971 12.5272 4.96708 12.3809 4.80237C12.2346 4.63766 12.033 4.53232 11.8143 4.5063L11.709 4.5Z"
                    fill="#2A7FFF"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_394_907">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            }
          />
          <FeatureCard
            title="Data Fetching"
            description="Flexible data loading with support for server-side and client-side fetching using a simple loader function."
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.4287 0H2.57157C2.21599 0 1.92871 0.287277 1.92871 0.642857V5.14286H16.0716V0.642857C16.0716 0.287277 15.7843 0 15.4287 0ZM4.50014 3.375C4.05617 3.375 3.69657 3.0154 3.69657 2.57143C3.69657 2.12746 4.05617 1.76786 4.50014 1.76786C4.94411 1.76786 5.30371 2.12746 5.30371 2.57143C5.30371 3.0154 4.94411 3.375 4.50014 3.375ZM1.92871 17.3571C1.92871 17.7127 2.21599 18 2.57157 18H15.4287C15.7843 18 16.0716 17.7127 16.0716 17.3571V12.8571H1.92871V17.3571ZM4.50014 14.625C4.94411 14.625 5.30371 14.9846 5.30371 15.4286C5.30371 15.8725 4.94411 16.2321 4.50014 16.2321C4.05617 16.2321 3.69657 15.8725 3.69657 15.4286C3.69657 14.9846 4.05617 14.625 4.50014 14.625ZM1.92871 11.5714H16.0716V6.42857H1.92871V11.5714ZM4.50014 8.19643C4.94411 8.19643 5.30371 8.55603 5.30371 9C5.30371 9.44397 4.94411 9.80357 4.50014 9.80357C4.05617 9.80357 3.69657 9.44397 3.69657 9C3.69657 8.55603 4.05617 8.19643 4.50014 8.19643Z"
                  fill="#2A7FFF"
                />
              </svg>
            }
          />
          <FeatureCard
            title="CSS Support"
            description="Use any styling method—CSS Modules, Sass, Less, Stylus, TailwindCSS or plain CSS—without extra configuration."
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_394_667)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.154424 0.225C0.21478 0.154437 0.289705 0.0977855 0.374046 0.0589443C0.458387 0.0201032 0.550141 -6.08998e-06 0.642996 1.89747e-08H17.3573C17.4502 -2.25548e-05 17.542 0.0200968 17.6264 0.0589722C17.7108 0.0978476 17.7858 0.154555 17.8461 0.225188C17.9065 0.295821 17.9508 0.378701 17.9761 0.468118C18.0013 0.557535 18.0069 0.651365 17.9924 0.743143L16.0639 12.9574C16.0505 13.0428 16.02 13.1246 15.9743 13.198C15.9285 13.2713 15.8685 13.3347 15.7977 13.3843L9.36914 17.8843C9.26102 17.9601 9.13218 18.0007 9.00014 18.0007C8.8681 18.0007 8.73926 17.9601 8.63114 17.8843L2.20257 13.3843C2.13179 13.3347 2.07174 13.2713 2.02601 13.198C1.98028 13.1246 1.94981 13.0428 1.93642 12.9574L0.00785276 0.743143C-0.00663323 0.651315 -0.00103092 0.557438 0.0242734 0.467986C0.0495777 0.378533 0.0939819 0.295632 0.154424 0.225ZM5.40014 3.16671C5.18702 3.16671 4.98263 3.25138 4.83193 3.40208C4.68123 3.55277 4.59657 3.75717 4.59657 3.97029C4.59657 4.18341 4.68123 4.3878 4.83193 4.5385C4.98263 4.6892 5.18702 4.77386 5.40014 4.77386H9.79728L6.41585 6.88757C6.26791 6.98003 6.15408 7.11813 6.09155 7.281C6.02903 7.44387 6.0212 7.62267 6.06927 7.79038C6.11733 7.95809 6.21866 8.1056 6.35796 8.21063C6.49727 8.31566 6.66696 8.3725 6.84142 8.37257H11.0779V10.7679L9.00014 12.3236L6.60228 10.5274C6.43179 10.3996 6.21747 10.3447 6.0065 10.3748C5.79552 10.4049 5.60515 10.5176 5.47728 10.6881C5.34941 10.8586 5.2945 11.0729 5.32464 11.2839C5.35478 11.4949 5.4675 11.6853 5.638 11.8131L8.518 13.9731C8.65709 14.0775 8.82627 14.1339 9.00014 14.1339C9.17401 14.1339 9.34319 14.0775 9.48228 13.9731L12.3623 11.8131C12.4617 11.7379 12.5425 11.6408 12.5982 11.5293C12.654 11.4178 12.6832 11.2949 12.6837 11.1703V7.57029C12.6834 7.35739 12.5986 7.15333 12.4479 7.00291C12.2972 6.85248 12.093 6.768 11.8801 6.768H9.643L13.0244 4.653C13.1723 4.5606 13.2861 4.42261 13.3486 4.25987C13.4112 4.09713 13.4191 3.91845 13.3712 3.75081C13.3233 3.58317 13.2222 3.43565 13.0831 3.33052C12.944 3.22539 12.7745 3.16835 12.6001 3.168L5.40014 3.16671Z"
                    fill="#2A7FFF"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_394_667">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            }
          />
          <FeatureCard
            title="Client & Server Rendering"
            description="Choose between client-side rendering (CSR) and server-side rendering (SSR) per page to balance speed and SEO."
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_394_335)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.1352 0.147961C8.90553 -0.000547536 7.66123 0.261446 6.59584 0.893197C5.53044 1.52495 4.70366 2.49105 4.24407 3.64125C3.28398 3.74747 2.37913 4.14399 1.65027 4.77788C0.92142 5.41178 0.403238 6.2529 0.164888 7.18897C-0.0734626 8.12505 -0.020643 9.11156 0.316297 10.0168C0.653237 10.9221 1.25827 11.7031 2.05064 12.2555C1.98095 11.85 2.00962 11.4336 2.13424 11.0414C2.25886 10.6492 2.47578 10.2926 2.76678 10.0017L5.33821 7.43025C5.57914 7.18935 5.86553 6.99873 6.18076 6.86946C6.49599 6.7402 6.83376 6.67486 7.17445 6.67725C7.51514 6.67965 7.85196 6.74972 8.16534 6.8834C8.47872 7.01708 8.76241 7.2117 8.99993 7.45596C9.35659 7.08911 9.81458 6.83699 10.3153 6.73187C10.816 6.62674 11.3368 6.67339 11.8108 6.86584C12.2849 7.05828 12.6908 7.38778 12.9766 7.81219C13.2624 8.23659 13.415 8.7366 13.4151 9.24825V11.8197C13.8001 11.8196 14.1802 11.906 14.5273 12.0724C14.8744 12.2389 15.1798 12.4812 15.4208 12.7814C16.2134 12.4539 16.8851 11.889 17.3437 11.1644C17.8023 10.4397 18.0252 9.59078 17.9818 8.73429C17.9384 7.87781 17.6308 7.05579 17.1013 6.38118C16.5718 5.70657 15.8464 5.21248 15.0248 4.96682C14.8571 3.7361 14.2862 2.59565 13.4016 1.72377C12.5169 0.851894 11.3682 0.297744 10.1352 0.147961ZM7.52521 8.35725C7.70144 8.43024 7.85205 8.55385 7.95801 8.71245C8.06397 8.87105 8.12052 9.05751 8.1205 9.24825V16.9625C8.1205 17.2183 8.01891 17.4635 7.83807 17.6444C7.65723 17.8252 7.41196 17.9268 7.15621 17.9268C6.90047 17.9268 6.6552 17.8252 6.47436 17.6444C6.29352 17.4635 6.19193 17.2183 6.19193 16.9625V11.5754L5.26621 12.5011C5.17793 12.5958 5.07148 12.6718 4.95319 12.7245C4.83491 12.7772 4.70722 12.8056 4.57774 12.8079C4.44827 12.8102 4.31966 12.7863 4.19959 12.7378C4.07952 12.6893 3.97045 12.6172 3.87888 12.5256C3.78731 12.434 3.71513 12.3249 3.66663 12.2049C3.61813 12.0848 3.59431 11.9562 3.5966 11.8267C3.59888 11.6972 3.62722 11.5696 3.67992 11.4513C3.73263 11.333 3.80862 11.2265 3.90336 11.1382L6.47478 8.56682C6.60955 8.43196 6.78126 8.34007 6.96822 8.30277C7.15519 8.26547 7.34902 8.28443 7.52521 8.35725ZM11.8079 9.24825C11.8079 8.9925 11.7063 8.74723 11.5255 8.56639C11.3447 8.38556 11.0994 8.28396 10.8436 8.28396C10.5879 8.28396 10.3426 8.38556 10.1618 8.56639C9.98095 8.74723 9.87936 8.9925 9.87936 9.24825V16.9625C9.87952 17.1531 9.93617 17.3394 10.0421 17.4978C10.1481 17.6562 10.2986 17.7797 10.4747 17.8526C10.6508 17.9255 10.8446 17.9446 11.0315 17.9075C11.2185 17.8704 11.3902 17.7786 11.5251 17.644L14.0965 15.0725C14.2668 14.8897 14.3596 14.648 14.3552 14.3981C14.3507 14.1483 14.2495 13.91 14.0729 13.7333C13.8962 13.5566 13.6578 13.4554 13.408 13.451C13.1582 13.4466 12.9164 13.5393 12.7336 13.7097L11.8079 14.6354V9.24825Z"
                    fill="#2A7FFF"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_394_335">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            }
          />
          <FeatureCard
            title="Rasengan.js 1.0.0"
            description="First release of Rasengan.js, built for creating high-quality web apps."
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.20925 1.71146e-05C3.81419 0.00109046 3.38745 0.0517779 3.01173 0.188464C0.792757 0.995729 1.15564 3.51567 1.42464 4.62336C1.48658 4.87842 1.6339 5.29484 1.84976 5.812C1.40448 6.76634 1.1733 7.80714 1.17253 8.86093C1.17331 9.79022 1.35328 10.7106 1.70251 11.5712C1.5814 11.8704 1.46056 12.1847 1.33425 12.5223C0.475896 14.8168 0.729112 17.1404 2.20336 17.8645C3.67761 18.5887 6.34286 16.1744 6.34286 16.1744C6.34286 16.1744 3.63218 17.8767 2.50662 16.6751C2.05204 16.1898 2.22196 14.9091 2.63405 13.5742L2.62759 13.5671C2.66494 13.4564 2.70351 13.3438 2.74379 13.2295C3.37289 11.4417 4.23686 9.95842 5.19761 8.73176C3.65182 6.27701 3.17505 4.15904 3.12572 3.92561C3.12523 3.92611 3.12473 3.92661 3.12423 3.92712C2.72125 1.92185 3.19058 0.872687 4.12589 0.471814C5.49971 -0.117013 7.55532 1.47576 7.55532 1.47576C7.55532 1.47576 6.66548 0.740398 6.34042 0.568457C5.99269 0.384526 5.46826 0.149954 5.03462 0.0705265C4.80463 0.0284021 4.51652 -0.000809727 4.20925 1.71146e-05ZM14.1862 1.30086C13.4811 1.30718 12.81 1.47613 12.3696 1.61457C12.0948 1.70094 11.6333 1.90275 11.0617 2.19406C10.2004 1.84084 9.27874 1.65914 8.34823 1.65909C6.5073 1.66048 4.73732 2.37193 3.40435 3.6463C3.76413 5.54057 4.47474 7.16622 5.3471 8.54323C8.5882 4.53479 12.8207 3.37515 12.9546 3.33926C12.953 3.3378 12.9513 3.33634 12.9497 3.33489C15.0591 2.71015 16.1957 3.10799 16.6716 4.05258C17.3456 5.39061 15.8942 7.55211 15.8942 7.55211C15.8942 7.55211 16.5681 6.61347 16.718 6.27684C16.8786 5.91671 17.078 5.37628 17.129 4.93684C17.1909 4.40413 17.1661 3.57174 16.8814 2.91841C16.32 1.62972 15.2168 1.29159 14.1862 1.30086ZM13.2398 3.5953C9.62585 4.52897 7.14336 6.71344 5.51552 8.80292C8.12906 12.7442 12.0279 14.5623 12.4618 14.7558C13.4065 14.0924 14.178 13.2104 14.7111 12.1842C15.2441 11.1581 15.523 10.0181 15.5239 8.86093C15.5234 7.87293 15.3204 6.89559 14.9274 5.98971C14.5345 5.08384 13.96 4.26881 13.2398 3.5953ZM5.36748 8.9957C3.70585 11.1919 2.99165 13.2158 2.88804 13.5255C3.56091 14.32 4.39761 14.9583 5.34035 15.3963C6.28308 15.8345 7.30935 16.0619 8.34823 16.0629C9.01156 16.0621 9.6716 15.9692 10.3095 15.7865C10.6952 15.9816 11.1056 16.1735 11.5591 16.3788C13.7851 17.3863 16.1118 17.2825 16.9269 15.8525C17.7418 14.4226 15.513 11.5977 15.513 11.5977C15.513 11.5977 17.031 14.4222 15.7637 15.4722C15.1865 15.9504 13.6546 15.5678 12.1894 14.9421C12.1914 14.9408 12.1934 14.9394 12.1953 14.9381C8.8841 13.377 6.73712 11.0861 5.36748 8.9957Z"
                  fill="#2A7FFF"
                />
              </svg>
            }
            className="bg-[#0B1A2F] dark"
          />
        </div>
        <div
          className={twMerge(
            'absolute top-0 left-0 w-full h-full z-0',
            isDark ? 'bg-white/2' : 'bg-black/2'
          )}
        ></div>
        <div className="absolute top-0 right-0 opacity-50">
          <Image src={rasenganIllustration} alt="Rasengan.js" />
        </div>
      </section>

      <section className="showcase-section relative px-4 xl:px-20 py-20 pt-20 overflow-hidden">
        <Heading
          title="Showcase"
          description="Discover what developers are building with Rasengan.js"
        />

        <div className="relative showcase-container mt-10 z-20">
          <ShowcaseCard
            image="/assets/images/showcase/biccas.png"
            title="Biccas"
            link="#"
            className="a"
          />
          <ShowcaseCard
            image="/assets/images/showcase/kronix.png"
            title="Kronix"
            link="#"
            className="b"
          />
          <ShowcaseCard
            image="/assets/images/showcase/enver.png"
            title="Enver"
            link="#"
            className="c"
          />
          <ShowcaseCard
            image="/assets/images/showcase/rasengan.png"
            title="Rasengan"
            link="#"
            className="d"
          />
          <ShowcaseCard
            image="/assets/images/showcase/hano.png"
            title="Hano"
            link="#"
            className="e"
          />
          <ShowcaseCard
            image="/assets/images/showcase/hano.png"
            title="Hano"
            link="#"
            className="f"
          />
        </div>

        {/* <div className="absolute top-0 right-0 left-0 opacity-30 z-0">
          <Image
            src={gridIllustration}
            alt="Grid"
            width={'100%'}
            height={'auto'}
            className='bg-repeat-y'
          />
        </div> */}
      </section>

      <section className="relative px-4 xl:px-20 py-20 pt-20">
        <Heading
          title="Foundation"
          description="Built on top of a great foundation."
          className="text-center items-center"
        />

        <div className="relative mt-20 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 z-10">
          <Link
            to="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FeatureCard
              title="ReactJS"
              description="The Library for web and native UI. Rasengan.js uses the power of React components to create high quality web applications."
              icon={
                <svg
                  width="31"
                  height="31"
                  viewBox="0 0 101 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
              }
              className="bg-gradient-to-tr from-[#0288D1]/20 via-background to-background border-[1px] border-background hover:border-primary/30 transition-all duration-300"
            />
          </Link>
          <Link
            to="https://vitejs.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FeatureCard
              title="ViteJS"
              description="Modern build tool, combines robustness and speed. Rasengan.js takes advantage of its performance to give you a great experience."
              icon={
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 101 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_412_155)">
                    <path
                      d="M50.3013 43.804C49.0651 43.804 47.8568 44.1705 46.829 44.8573C45.8012 45.544 45.0001 46.5201 44.527 47.6622C44.054 48.8042 43.9302 50.0609 44.1714 51.2733C44.4125 52.4857 45.0078 53.5993 45.8819 54.4734C46.7559 55.3474 47.8696 55.9427 49.082 56.1839C50.2943 56.425 51.551 56.3013 52.693 55.8282C53.8351 55.3552 54.8112 54.5541 55.498 53.5263C56.1847 52.4985 56.5513 51.2901 56.5513 50.054C56.5513 48.3964 55.8928 46.8066 54.7207 45.6345C53.5486 44.4624 51.9589 43.804 50.3013 43.804Z"
                      fill="#0288D1"
                    />
                    <path
                      d="M97.7746 15.3039L52.8981 95.5524C51.9707 97.2094 49.5903 97.2188 48.6504 95.5711L2.88323 15.3133C1.85745 13.5149 3.39261 11.3391 5.43089 11.7024L50.3559 19.7313C50.6426 19.7834 50.9364 19.7834 51.2231 19.7313L95.2075 11.7149C97.2371 11.3453 98.7817 13.5031 97.7746 15.3039Z"
                      fill="url(#paint0_linear_412_155)"
                    />
                    <path
                      d="M71.7543 1.17109L38.5465 7.67734C38.2814 7.72913 38.0411 7.86749 37.8632 8.07069C37.6853 8.27389 37.58 8.53042 37.5637 8.79999L35.5191 43.3062C35.5082 43.4955 35.5414 43.6847 35.6162 43.8588C35.691 44.033 35.8053 44.1874 35.95 44.3097C36.0948 44.4321 36.2661 44.519 36.4503 44.5637C36.6345 44.6084 36.8266 44.6096 37.0113 44.5672L46.2582 42.4305C46.4574 42.3847 46.6648 42.3897 46.8615 42.4449C47.0582 42.5002 47.2379 42.604 47.3841 42.7467C47.5303 42.8895 47.6383 43.0667 47.6982 43.262C47.7581 43.4574 47.768 43.6647 47.727 43.8648L44.9793 57.3172C44.9373 57.5242 44.9498 57.7386 45.0155 57.9394C45.0812 58.1402 45.198 58.3205 45.3543 58.4626C45.5106 58.6047 45.7011 58.7039 45.9072 58.7503C46.1133 58.7967 46.3279 58.7888 46.5301 58.7273L52.2395 56.9906C53.1246 56.7219 53.9762 57.5 53.7902 58.4062L49.423 79.5367C49.1512 80.8586 50.909 81.5789 51.6418 80.4461L52.1301 79.6898L79.1926 25.682C79.6473 24.7758 78.8637 23.7445 77.8723 23.9367L68.3527 25.7742C68.1479 25.814 67.9363 25.8005 67.7382 25.7349C67.54 25.6693 67.3621 25.5539 67.2215 25.3998C67.0808 25.2456 66.9822 25.0579 66.935 24.8547C66.8878 24.6514 66.8936 24.4394 66.952 24.2391L73.1629 2.70624C73.2213 2.50519 73.2269 2.29247 73.1792 2.08862C73.1315 1.88476 73.0321 1.69663 72.8905 1.54236C72.749 1.38809 72.5701 1.27289 72.371 1.20786C72.172 1.14283 71.9596 1.13017 71.7543 1.17109Z"
                      fill="url(#paint1_linear_412_155)"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_412_155"
                      x1="1.76464"
                      y1="8.83485"
                      x2="57.6192"
                      y2="84.6897"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#41D1FF" />
                      <stop offset="1" stop-color="#BD34FE" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_412_155"
                      x1="47.7778"
                      y1="2.9367"
                      x2="57.8816"
                      y2="72.2478"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FFEA83" />
                      <stop offset="0.083" stop-color="#FFDD35" />
                      <stop offset="1" stop-color="#FFA800" />
                    </linearGradient>
                    <clipPath id="clip0_412_155">
                      <rect
                        width="100"
                        height="100"
                        fill="white"
                        transform="translate(0.30127 0.0539551)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              }
              className="bg-gradient-to-tr from-[#9C5DFE]/20 via-background to-background border-[1px] border-background hover:border-primary/30 transition-all duration-300"
            />
          </Link>
          <Link
            to="https://reactrouter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FeatureCard
              title="React Router"
              description="Best Library for routing in React. It gives the possibility to Rasengan.js to handle the routing system nicely."
              icon={
                <svg
                  width="31"
                  height="31"
                  viewBox="0 0 101 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_412_1044)">
                    <path
                      d="M50.8013 43.804C49.5651 43.804 48.3568 44.1705 47.329 44.8573C46.3012 45.544 45.5001 46.5201 45.027 47.6622C44.554 48.8042 44.4302 50.0609 44.6714 51.2733C44.9125 52.4857 45.5078 53.5993 46.3819 54.4734C47.2559 55.3474 48.3696 55.9427 49.582 56.1839C50.7943 56.425 52.051 56.3013 53.193 55.8282C54.3351 55.3552 55.3112 54.5541 55.998 53.5263C56.6847 52.4985 57.0513 51.2901 57.0513 50.054C57.0513 48.3964 56.3928 46.8066 55.2207 45.6345C54.0486 44.4624 52.4589 43.804 50.8013 43.804Z"
                      fill="#0288D1"
                    />
                    <g clip-path="url(#clip1_412_1044)">
                      <path
                        d="M78.1763 39.3626C75.3279 38.4657 73.8576 38.768 70.8708 38.4407C66.2536 37.9368 64.4138 36.129 63.6333 31.4774C63.1966 28.8805 63.7122 25.0782 62.5974 22.7243C60.4654 18.2352 55.4763 16.2219 50.4646 17.3712C46.2326 18.343 42.7115 22.579 42.5161 26.9274C42.2935 31.8923 45.1177 36.129 49.9669 37.5915C52.2716 38.2868 54.7193 38.6368 57.1255 38.8141C61.5388 39.1368 61.8779 41.5938 63.0708 43.6165C63.824 44.8915 64.5529 46.1477 64.5529 49.9501C64.5529 53.7524 63.8193 55.0079 63.0716 56.2829C61.8779 58.3009 60.4052 59.6227 55.9919 59.9493C53.5857 60.1274 51.1325 60.4774 48.8341 61.1735C43.9841 62.6399 41.1599 66.8712 41.3825 71.8368C41.5779 76.1852 45.099 80.4212 49.331 81.393C54.3427 82.5462 59.3318 80.529 61.4638 76.0399C62.5833 73.686 63.1966 71.0188 63.6333 68.4227C64.4185 63.7704 66.2583 61.9626 70.8708 61.4579C73.8576 61.1313 76.949 61.4579 79.7482 59.8657C82.7052 57.7016 85.3482 54.4516 85.3482 49.9501C85.3482 45.4469 82.5005 40.7266 78.1763 39.3626ZM30.8013 60.5016C24.981 60.5016 20.2326 55.7376 20.2326 49.8962C20.2326 44.0548 24.9802 39.2915 30.8005 39.2915C36.6208 39.2915 41.3693 44.0555 41.3693 49.8962C41.3693 55.7321 36.6169 60.5016 30.8005 60.5016H30.8013ZM11.3326 82.054C5.52005 82.0399 0.787238 77.2571 0.801301 71.411C0.815363 65.5751 5.58177 60.8251 11.4068 60.8438C17.2224 60.8579 21.956 65.6407 21.938 71.486C21.924 77.3173 17.1568 82.068 11.3326 82.054ZM89.8575 82.054C84.0279 82.086 79.2435 77.3548 79.2099 71.5282C79.1779 65.6782 83.8927 60.8766 89.699 60.8438C95.5286 60.811 100.314 65.5423 100.347 71.3688C100.379 77.2141 95.6638 82.0212 89.8575 82.054Z"
                        fill="#0288D1"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_412_1044">
                      <rect
                        width="100"
                        height="100"
                        fill="white"
                        transform="translate(0.80127 0.0539551)"
                      />
                    </clipPath>
                    <clipPath id="clip1_412_1044">
                      <rect
                        width="100"
                        height="100"
                        fill="white"
                        transform="translate(0.80127 0.0539551)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              }
              className="bg-gradient-to-tr from-sky-800/20 via-background to-background border-[1px] border-background hover:border-primary/30 transition-all duration-300"
            />
          </Link>
        </div>
      </section>

      <section className="relative px-4 xl:px-20 py-20 pt-20">
        <CTA />
      </section>

      {/* <iframe
        src="https://templates.smadmail.com/ui/map.html?private_key=smad2502181548329b219035df&project_id=79afc233-432f-4d57-b8e0-4bc7c2bdd666&map_id=8b764bc7-dc08-45a2-b932-4af2ac3e59d4"
        scrolling="no"
      ></iframe> */}
    </section>
  );
};

Home.path = '/';
Home.metadata = {
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

export default Home;
