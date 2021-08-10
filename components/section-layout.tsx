import React from 'react';
import Image from 'next/image';


const SectionLayout: React.FC = ({ children }) => {
  const APP_NAME = 'purplship';
  const APP_WEBSITE = 'https://purplship.com';

  return (
    <section className="hero is-fullheight">

      <div className="container">
        <div className="has-text-centered my-6">
          <a href="/">
            <Image src="/logo.svg" width="100" height="100" alt={APP_NAME} />
          </a>
        </div>

        {children}

      </div>

      <div className="hero-footer">
        <div className="content has-text-centered">
          <p>
            <a href={ APP_WEBSITE } className="button is-light">&copy; {APP_NAME}</a>
            <a href="http://blog.purplship.com" className="button is-light">Blogs</a>
            <a href="https://docs.purplship.com" className="button is-light">Documentation</a>
          </p>
        </div>
      </div>

    </section>
  )
};

export default SectionLayout;
