import React, { useContext } from 'react';
import Image from 'next/image';
import { APIReference } from '@/context/references-provider';
import { References } from '@purplship/rest';
import { p } from '@/lib/helper';


const SectionLayout: React.FC = ({ children }) => {
  const {
    app_name,
    app_website,
  } = useContext(APIReference) as References;

  return (
    <section className="hero is-fullheight">

      <div className="container">
        <div className="has-text-centered mt-6 mb-4">
          <a href={p`/`}>
            <Image src={p`/logo.svg`} width="130" height="100%" alt={app_name} />
          </a>
        </div>

        {children}

      </div>

      <div className="hero-footer">
        <div className="content has-text-centered">
          <p>
            <a href={app_website} className="button is-white">&copy; {app_name}</a>
            <a href="http://blog.purplship.com" className="button is-white">Blogs</a>
            <a href="https://docs.purplship.com" className="button is-white">Documentation</a>
          </p>
        </div>
      </div>

    </section>
  )
};

export default SectionLayout;
