import { PageComponent, Link } from 'rasengan';
import logo from '@/assets/logo.svg';
import Image from '@rasenganjs/image';
import { useLocale, useTranslations } from '@rasenganjs/i18n';

const Home: PageComponent = () => {
  const { locale, setLocale } = useLocale();
  const t = useTranslations();

  return (
    <section className="w-full h-full bg-white flex flex-col items-center py-8 px-[20px] md:px-[50px] xl:px-[200px] font-comfortaa">
      <header className="flex justify-between items-center w-full">
        <button
          className="px-4 py-2 hover:bg-primary hover:text-white transition-colors border border-[#EFEFEF] rounded-md"
          onClick={() => setLocale(locale === 'en' ? 'fr' : 'en')}
        >
          {locale === 'en' ? 'English' : 'Français'}
        </button>

        <div className="flex items-center">
          <span>{t('poweredBy')}</span>
          <Link to="https://beta.rasengan.dev" target="_blank">
            <Image src={logo} alt="Rasengan logo" width={120} height={40} />
          </Link>
        </div>
      </header>

      <div className="flex flex-col items-center mt-4">
        <h1 className="font-black text-[3rem] md:text-[4rem] text-center font-urbanist">
          <span>{t('welcome')}</span>{' '}
          <span className="text-primary">Rasengan</span>
        </h1>
        <p className="text-lg mt-4">
          {t('action')}{' '}
          <code className="text-sm ml-2 font-medium">{t('code')}</code>
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <div className="flex flex-col p-4 rounded-md border-[1px] border-[#EFEFEF] max-w-[500px] md:w-[300px] lg:w-[400px]">
          <h2 className="text-xl font-urbanist">{t('documentation')}</h2>
          <p className="my-2">{t('documentationDescription')}</p>
          <a
            href="https://beta.rasengan.dev/docs"
            target="_blank"
            className="mt-auto text-primary font-bold"
          >
            {t('readTheDocs')}
          </a>
        </div>

        <div className="flex flex-col p-4 rounded-md border-[1px] border-[#EFEFEF] max-w-[500px] md:w-[300px] lg:w-[400px]">
          <h2 className="text-xl font-urbanist">{t('learn')}</h2>
          <p className="my-2">{t('learnDescription')}</p>
          <a
            href="https://beta.rasengan.dev/learn"
            target="_blank"
            className="mt-auto text-primary font-bold"
          >
            {t('takeTheCourse')}
          </a>
        </div>

        <div className="flex flex-col p-4 rounded-md border-[1px] border-[#EFEFEF] max-w-[500px] md:w-[300px] lg:w-[400px]">
          <h2 className="text-xl font-urbanist">{t('examples')}</h2>
          <p className="my-2">{t('examplesDescription')}</p>
          <a
            href="https://github.com/rasengan-dev/rasenganjs-examples"
            target="_blank"
            className="mt-auto text-primary font-bold"
          >
            {t('viewExamples')}
          </a>
        </div>

        <div className="flex flex-col p-4 rounded-md border-[1px] border-[#EFEFEF] max-w-[500px] md:w-[300px] lg:w-[400px]">
          <h2 className="text-xl font-urbanist">{t('community')}</h2>
          <p className="my-2">{t('communityDescription')}</p>
          <a
            href="https://github.com/rasengan-dev/rasenganjs/discussions"
            target="_blank"
            className="text-primary font-bold mt-auto"
          >
            {t('joinTheCommunity')}
          </a>
        </div>
      </div>
    </section>
  );
};

Home.path = '/home';
Home.metadata = {
  title: 'Home',
  description: 'Home page',
};

export default Home;
