import React, { useContext } from 'react';
import Image from 'next/image';
import { APIReference } from '@/context/references-provider';
import { References } from '@/api';


const SectionLayout: React.FC = ({ children }) => {
  const {
    app_name,
    app_website,
  } = useContext(APIReference) as References & { app_website: string };

  return (
    <section className="hero is-fullheight">

      <div className="container">
        <div className="has-text-centered my-6">
          <a href="/">
            <Image src="/logo.svg" width="100" height="100" alt={app_name} />
          </a>
        </div>

        {children}

      </div>

      <div className="hero-footer">
        <div className="content has-text-centered">
          <p>
            <a href={ app_website } className="button is-light">&copy; {app_name}</a>
            <a href="http://blog.purplship.com" className="button is-light">Blogs</a>
            <a href="https://docs.purplship.com" className="button is-light">Documentation</a>
          </p>
        </div>
      </div>

    </section>
  )
};

export default SectionLayout;
