import React from 'react';
import { p } from '@/lib/helper';
import { Metadata } from '@/lib/types';


const SectionLayout: React.FC<{ metadata?: Metadata }> = ({ metadata, children }) => {
  return (
    <section className="hero is-fullheight">

      <div className="container">
        <div className="has-text-centered my-6 pt-5">
          <a href={p`/`} className="is-size-4 has-text-primary has-text-weight-bold is-lowercase">
            {metadata?.APP_NAME}
          </a>
        </div>

        {children}

      </div>

      <div className="hero-footer">
        <div className="content has-text-centered">
          <p>
            <a href={metadata?.APP_WEBSITE || ""} className="button is-white">&copy; {metadata?.APP_NAME}</a>
            <a href="https://docs.purplship.com" className="button is-white">Documentation</a>
          </p>
        </div>
      </div>

    </section>
  );
};

export default SectionLayout;
