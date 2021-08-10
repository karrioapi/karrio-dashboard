import React from "react";

type AppModeType = {
  basePath: string;
  testMode: boolean;
  switchMode: () => void;
};

export function computeMode() {
  // return window.location.pathname.startsWith('/test/');
  return true
};

export function computeBasePath() {
  return window.location.pathname.startsWith('/test/') ? '/test' : '';
};


// Init the APP client mode
export const AppMode = React.createContext<AppModeType>({
  testMode: false,
  basePath: '',
} as AppModeType);

const AppModeProvider: React.FC = ({ children }) => {
  const switchMode = () => {
    const { pathname } = window.location;

    if (computeMode()) window.location.replace(pathname.replace('test/', ''));
    else window.location.replace('/test' + pathname);
  };

  return (
    <AppMode.Provider value={{
      switchMode,
      testMode: computeMode(),
      basePath: computeBasePath()
    }}>
      {children}
    </AppMode.Provider>
  );
};

export default AppModeProvider;
