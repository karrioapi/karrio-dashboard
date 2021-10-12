import { isNone } from '@/lib/helper';
import React from 'react';

const MainLayout: React.FC<{ error?: string }> = ({ children, error }) => {
  return (
    <>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      {isNone(error)
        ? <div id="root" style={{ minHeight: "100vh" }} >{children}</div>
        : <div>{error}</div>
      }
    </>
  )
};

export default MainLayout;
