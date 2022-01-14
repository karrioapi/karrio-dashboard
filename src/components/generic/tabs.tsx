import React, { useContext, useEffect, useRef, useState } from 'react';

interface TabsComponent extends React.HTMLAttributes<HTMLDivElement> {
  onSwitch: (tab: string) => void;
  eventKey?: string;
  tabClass?: string;
  tabContainerClass?: string;
}
interface TabStateInterface {
  tabs: string[];
  disabledTabs?: string[];
  selected: string;
  selectTab: (tab: string, disabled?: string[] | undefined) => void;
}

export const TabStateContext = React.createContext<TabStateInterface>({} as TabStateInterface);

export const TabStateProvider: React.FC<{ tabs: string[]; disabledTabs?: string[]; }> = ({ children, tabs, disabledTabs }) => {
  const [selected, setSelected] = useState<string>(tabs[0]);

  const selectTab = (tab: string, disabled?: string[]) => {
    disabled = disabled || disabledTabs || [];
    if (!tabs.includes(tab)) { return; };
    if (disabled && disabled.includes(tab)) { return; };

    setSelected(tab);
  }

  return (
    <TabStateContext.Provider value={{
      tabs,
      disabledTabs,
      selected,
      selectTab,
    }}>
      {children}
    </TabStateContext.Provider>
  )
};

const Tabs: React.FC<TabsComponent> = ({ eventKey, tabClass, tabContainerClass, children, onSwitch, ...props }) => {
  const { tabs, disabledTabs, selected, selectTab } = useContext(TabStateContext);
  const ref = useRef<any>();

  const __ = (tab: string) => (_?: any) => { selectTab(tab); };
  ref?.current?.addEventListener((eventKey || 'tab-updated'), (e: CustomEvent<any>) => {
    setTimeout(() => __(e.detail.nextTab)(), e.detail.delay || 0);
  });

  useEffect(() => { onSwitch && onSwitch(selected) }, [selected]);

  return (
    <>

      <div className={`tabs ${tabContainerClass}`}>
        <ul>

          {(tabs || []).map((tab, index) => (
            <li key={index} className={`${tabClass} ${selected === tab ? "is-active" : ""}`}>
              <a onClick={__(tab)} data-name={tab} className={`is-capitalized ${(disabledTabs || []).includes(tab) ? "is-disabled" : ""}`}>
                {tab}
              </a>
            </li>
          ))}

        </ul>
      </div>

      <div {...props} ref={ref}>
        {React.Children.map(children, (child: any, index) => {
          const isActive = tabs && selected === tabs[index];
          return (
            <div key={index} className={`tab-content ${isActive ? "is-active" : ""}`}>
              {child}
            </div>
          );
        })}
      </div>

    </>
  )
};

export default Tabs;
