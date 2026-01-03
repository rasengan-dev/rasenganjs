import React from 'react';

type TabProps = {
  children: React.ReactNode;
  activeIndex?: number;
  tabs: Array<{
    title: string;
  }>;
};

type TabComponent = React.FC<TabProps> & {
  Item: React.FC<{ children: React.ReactNode }>;
};

type TabMenuItemProps = {
  title: string;
  active: boolean;
  onClick: () => void;
};

const Tab: TabComponent = ({ children, activeIndex, tabs }) => {
  const [active, setActive] = React.useState(activeIndex ?? 0);

  React.useEffect(() => {
    setActive(activeIndex ?? 0);
  }, [activeIndex]);

  const handleTabClick = (index: number) => {
    setActive(index);
  };

  return (
    <section className="w-full flex-col">
      <div className="relative w-full flex items-center gap-4 mb-8">
        {tabs.map((tab, index) => (
          <TabMenuItem
            key={index}
            title={tab.title}
            active={active === index}
            onClick={() => handleTabClick(index)}
          />
        ))}

        <div className="absolute bottom-0 w-full border-b-[1px] border-b-border z-0" />
      </div>

      <div className="w-full">
        {React.Children.map(children, (child, index) => {
          if (index === active) {
            return child;
          }
          return null;
        })}
      </div>
    </section>
  );
};

Tab.Item = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const TabMenuItem = ({ title, active, onClick }: TabMenuItemProps) => {
  return (
    <div
      className={`z-10 cursor-pointer ${active ? 'text-primary border-b-primary hover:border-b-primary hover:text-primary' : 'text-body hover:border-b-primary/70'} font-lexend-medium py-4 border-b-[1px] border-b-border transition-all`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default Tab;
