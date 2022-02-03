import React, { useContext } from 'react';
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
        <div className="has-text-centered my-6 pt-5">
          <a href={p`/`} className="is-size-4 has-text-primary has-text-weight-bold is-lowercase">{app_name}</a>
        </div>

        {children}

      </div>

      <div className="hero-footer">
        <div className="content has-text-centered">
          <p>
            <a href={app_website || ""} className="button is-white">&copy; {app_name}</a>
            <a href="https://docs.purplship.com" className="button is-white">Documentation</a>
          </p>
        </div>
      </div>

    </section>
  )
};

export default SectionLayout;
