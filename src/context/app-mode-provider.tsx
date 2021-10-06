import React from "react";

type AppModeType = {
  basePath: string;
  testMode?: boolean;
  switchMode: () => void;
};

export function computeMode(pathname?: string) {
  return pathname?.startsWith('/test');
};

export function computeBasePath(pathname?: string) {
  return pathname?.startsWith('/test') ? '/test' : '/';
};


// Init the APP client mode
export const AppMode = React.createContext<AppModeType>({} as AppModeType);

const AppModeProvider: React.FC<{ pathname: string }> = ({ children, pathname }) => {
  const switchMode = () => {
    const isTestMode = computeMode(pathname);

    if (isTestMode) window.location.pathname = pathname.replace('/test', '');
    else window.location.replace('/test' + pathname);
  };

  return (
    <AppMode.Provider value={{
      testMode: computeMode(pathname),
      basePath: computeBasePath(pathname),
      switchMode
    }}>
      {pathname && children}
    </AppMode.Provider>
  );
};

export default AppModeProvider;
