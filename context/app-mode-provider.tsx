import React, { useEffect } from "react";

type AppModeType = {
  basePath: string;
  testMode: boolean;
  switchMode: () => void;
};

export function computeMode() {
  return window.location.pathname.startsWith('/test');
};

export function computeBasePath() {
  return window.location.pathname.startsWith('/test') ? '/test' : '/';
};


// Init the APP client mode
export const AppMode = React.createContext<AppModeType>({} as AppModeType);

const AppModeProvider: React.FC = ({ children }) => {
  const hasWindow = typeof window !== 'undefined';
  const switchMode = () => {
    const { pathname } = window.location;

    if (computeMode()) window.location.replace(pathname.replace('test', ''));
    else window.location.replace('/test' + pathname);
  };
  const [mode, setMode] = React.useState<AppModeType>({ switchMode } as AppModeType);

  useEffect(() => {
    setMode({
      testMode: computeMode(),
      basePath: computeBasePath(),
      switchMode
    });
  }, [hasWindow]);

  return (
    <AppMode.Provider value={{ ...mode }}>
      {children}
    </AppMode.Provider>
  );
};

export default AppModeProvider;
