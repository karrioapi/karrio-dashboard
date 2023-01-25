import { useAPIReference } from '@/context/reference';
import React from 'react';


const Footer: React.FC = () => {
  const { OPENAPI, GRAPHQL } = useAPIReference();

  return (
    <footer className="footer pt-6 px-0">
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
