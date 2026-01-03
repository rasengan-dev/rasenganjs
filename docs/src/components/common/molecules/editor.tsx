import { Markdown } from '@rasenganjs/mdx';
import { ComponentProps, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const configBasedCodes = [
  {
    id: 1,
    title: 'index.ts',
    code: `\`\`\`js\nimport { renderApp } from 'rasengan/client';\nimport App from './main';\nimport AppRouter from '@/app/app.router';\n\nrenderApp(App, AppRouter, { reactStrictMode: true });\n\`\`\``,
  },
  {
    id: 2,
    title: 'main.tsx',
    code: `\`\`\`jsx\nimport "@rasenganjs/image/css";\nimport "@/styles/index.css";\n\nexport default function App({ Component, children }: AppProps) {\n  return <Component>{children}</Component>;\n}\n\`\`\``,
  },
  {
    id: 3,
    title: 'app.router.ts',
    code: `\`\`\`ts\nimport { RouterComponent, defineRouter } from "rasengan";\nimport Home from "@/app/home.page";\nimport AppLayout from "@/app/app.layout";\n\nclass AppRouter extends RouterComponent {}\n\nexport default defineRouter({\n  imports: [],\n  layout: AppLayout,\n  pages: [Home],\n})(AppRouter);\n\`\`\``,
  },
  {
    id: 4,
    title: 'app.layout.tsx',
    code: `\`\`\`jsx\nimport React from "react";\nimport { Outlet, LayoutComponent } from "rasengan";\n\nconst AppLayout: LayoutComponent = () => {\n  return (\n    <React.Fragment>\n      <Outlet />\n    </React.Fragment>\n  );\n};\n\nAppLayout.path = "/";\n\nexport default AppLayout;\n\`\`\``,
  },
  {
    id: 5,
    title: 'home.page.tsx',
    code: `\`\`\`jsx\nimport { PageComponent, Link } from "rasengan";\nimport Image from "@rasenganjs/image";\n\nconst Home: PageComponent = () => {\n  return (\n    <section className="w-full h-full">\n      <h1>Home</h1>\n    </section>\n  );\n};\n\nHome.path = "/";\nHome.metadata = {\n  title: "Home",\n  description: "Home page",\n};\n\nexport default Home;\n\`\`\``,
  },
];

const fileBasedCodes = [
  {
    id: 1,
    title: 'index.ts',
    code: `\`\`\`js\nimport { renderApp } from 'rasengan/client';\nimport App from './main';\nimport AppRouter from '@/app/app.router';\n\nrenderApp(App, AppRouter, { reactStrictMode: true });\n\`\`\``,
  },
  {
    id: 2,
    title: 'main.tsx',
    code: `\`\`\`jsx\nimport "@rasenganjs/image/css";\nimport "@/styles/index.css";\n\nexport default function App({ Component, children }: AppProps) {\n  return <Component>{children}</Component>;\n}\n\`\`\``,
  },
  {
    id: 3,
    title: 'app.router.ts',
    code: `\`\`\`ts\nimport Router from "vitual:rasengan/router";\n\nexport default Router;\n\`\`\``,
  },
  {
    id: 4,
    title: 'layout.tsx',
    code: `\`\`\`jsx\nimport React from "react";\nimport { Outlet, LayoutComponent } from "rasengan";\n\nconst RootLayout: LayoutComponent = () => {\n  return (\n    <React.Fragment>\n      <Outlet />\n    </React.Fragment>\n  );\n};\n\nexport default RootLayout;\n\`\`\``,
  },
  {
    id: 5,
    title: 'index.page.tsx',
    code: `\`\`\`jsx\nimport { PageComponent, Link } from "rasengan";\nimport Image from "@rasenganjs/image";\n\nconst Page: PageComponent = () => {\n  return (\n    <section className="w-full h-full">\n      <h1>Home</h1>\n    </section>\n  );\n};\n\nPage.metadata = {\n  title: "Home",\n  description: "Home page",\n};\n\nexport default Page;\n\`\`\``,
  },
];

export default function Editor({
  children,
  className,
  ...props
}: ComponentProps<'div'>) {
  const [activeTab, setActiveTab] = useState(2);
  const [selectedRouting, setSelectedRouting] = useState<'file' | 'config'>(
    'file'
  );

  const getTabContent = () => {
    if (selectedRouting === 'config')
      return configBasedCodes.find((code) => code.id === activeTab);

    return fileBasedCodes.find((code) => code.id === activeTab);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-auto flex items-center justify-center gap-2 text-sm">
        <div
          onClick={() => setSelectedRouting('file')}
          className={twMerge(
            'rounded-lg border border-border py-2 px-4 cursor-pointer text-center text-xs sm:text-sm',
            selectedRouting === 'file' && 'bg-primary text-primary-foreground'
          )}
        >
          File-based Routing
        </div>
        <div
          onClick={() => setSelectedRouting('config')}
          className={twMerge(
            'rounded-lg border border-border py-2 px-4 cursor-pointer text-center text-xs sm:text-sm',
            selectedRouting === 'config' && 'bg-primary text-primary-foreground'
          )}
        >
          Config-based Routing
        </div>
      </div>
      <div className="w-full lg:h-[450px] lg:min-w-[600px] mt-4">
        <div className="w-full h-[50px] flex items-center bg-[#10141e] rounded-t-lg px-2 gap-2 overflow-x-auto">
          {(selectedRouting === 'file' ? fileBasedCodes : configBasedCodes).map(
            (code) => (
              <TabItem
                key={code.id}
                title={code.title}
                active={activeTab === code.id}
                onClick={() => setActiveTab(code.id)}
              />
            )
          )}
        </div>

        <div className="h-auto lg:h-[400px] max-h-[400px] min-h-[200px] overflow-auto editor bg-[#1c202a] rounded-b-lg">
          <Markdown className="p-0" content={getTabContent()?.code ?? ''} />
        </div>
      </div>
    </div>
  );
}

type TabItemprops = {
  active?: boolean;
  title: string;
  onClick?: () => void;
};

const TabItem = ({ active, title, onClick }: TabItemprops) => {
  return (
    <div
      className={twMerge(
        'w-full cursor-pointer max-w-[140px] h-[35px] rounded-md text-white/70 flex items-center px-2 text-sm transition-all duration-300',
        active ? 'bg-[#1c202a]' : 'hover:bg-[#1c202a]/60'
      )}
      onClick={onClick}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 6C11.722 6 14 7.295 14 8C14 8.705 11.722 10 8 10C4.278 10 2 8.705 2 8C2 7.295 4.278 6 8 6ZM8 5C4.134 5 1 6.343 1 8C1 9.657 4.134 11 8 11C11.866 11 15 9.657 15 8C15 6.343 11.866 5 8 5Z"
          fill="#0288D1"
        />
        <path
          d="M8 7C7.80222 7 7.60888 7.05865 7.44443 7.16853C7.27998 7.27841 7.15181 7.43459 7.07612 7.61732C7.00043 7.80004 6.98063 8.00111 7.01922 8.19509C7.0578 8.38907 7.15304 8.56725 7.29289 8.70711C7.43275 8.84696 7.61093 8.9422 7.80491 8.98079C7.99889 9.01937 8.19996 8.99957 8.38268 8.92388C8.56541 8.84819 8.72159 8.72002 8.83147 8.55557C8.94135 8.39112 9 8.19778 9 8C9 7.73478 8.89464 7.48043 8.70711 7.29289C8.51957 7.10536 8.26522 7 8 7Z"
          fill="#0288D1"
        />
        <path
          d="M5.22882 2.75342C6.23732 2.75342 8.19732 4.34192 9.73182 6.99992C11.5928 10.2234 11.6103 12.8434 10.9998 13.1959C10.9294 13.2324 10.8506 13.2497 10.7713 13.2459C9.76282 13.2459 7.80232 11.6579 6.26782 8.99992C4.40682 5.77642 4.38932 3.15642 4.99982 2.80392C5.0704 2.76731 5.14941 2.74956 5.22882 2.75342ZM5.22832 1.75392C4.9735 1.74931 4.72205 1.81264 4.49982 1.93742C3.06482 2.76592 3.46882 6.15192 5.40182 9.49992C7.04382 12.3449 9.26182 14.2464 10.7718 14.2464C11.0266 14.2506 11.2778 14.187 11.4998 14.0619C12.9348 13.2339 12.5308 9.84792 10.5978 6.49992C8.95582 3.65492 6.73782 1.75342 5.22782 1.75342L5.22832 1.75392Z"
          fill="#0288D1"
        />
        <path
          d="M10.7717 2.75362C10.8509 2.74986 10.9298 2.76711 11.0002 2.80362C11.6107 3.15662 11.5932 5.77662 9.7322 9.00012C8.1972 11.6581 6.2372 13.2466 5.2287 13.2466C5.14946 13.2504 5.07063 13.2331 5.0002 13.1966C4.3897 12.8431 4.4072 10.2231 6.2682 7.00012C7.8032 4.34212 9.7632 2.75362 10.7717 2.75362ZM10.7717 1.75362C9.2617 1.75362 7.0442 3.65562 5.4017 6.50012C3.4697 9.84812 3.0652 13.2341 4.5002 14.0621C4.72233 14.1872 4.97379 14.2509 5.2287 14.2466C6.7387 14.2466 8.9562 12.3446 10.5987 9.50012C12.5307 6.15212 12.9352 2.76612 11.5002 1.93812C11.2781 1.813 11.0266 1.74932 10.7717 1.75362Z"
          fill="#0288D1"
        />
      </svg>

      <span className="ml-2">{title}</span>
    </div>
  );
};
