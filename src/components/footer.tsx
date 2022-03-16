import React, { useContext } from 'react';
import { APIReference } from '@/context/references-provider';


const Footer: React.FC = () => {
  const { OPENAPI, GRAPHQL } = useContext(APIReference);

  return (
    <footer className="footer py-6">
      <div className="content columns">
        <div className="column has-text-right-desktop">
          <a className="button is-white footer-api-reference-link"
            target="_blank"
            rel="noreferrer"
            href={OPENAPI}>
            <span>API Reference</span>
            <span className="icon is-small">
              <i className="fas fa-external-link-alt"></i>
            </span>
          </a>
          <a className="button is-white footer-api-reference-link"
            target="_blank"
            rel="noreferrer"
            href={GRAPHQL}>
            <span>GraphQL</span>
            <span className="icon is-small">
              <i className="fas fa-external-link-alt"></i>
            </span>
          </a>
          <a className="button is-white footer-docs-link"
            target="_blank"
            rel="noreferrer"
            href="https://docs.karrio.io">
            <span>Docs</span>
            <span className="icon is-small">
              <i className="fas fa-external-link-alt"></i>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
