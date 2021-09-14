import React from 'react';

const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root" style={{ minHeight: "100vh" }} >{children}</div>
    </>
  )
};

export default MainLayout;
