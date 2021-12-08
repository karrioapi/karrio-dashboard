import { p } from "@/lib/helper";
import Image from 'next/image';
import logger from "@/lib/logger";
import React from "react";


export default class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    logger.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <section className="hero is-fullheight">
          <div className="container">
            <div className="has-text-centered mt-4 mb-5">
              <a href={p`/`}>
                <Image src={p`/logo.svg`} width="130" height="100" alt="" />
              </a>
            </div>

            <div className="card isolated-card my-6">
              <div className="card-content has-text-centered ">
                <p>Something went wrong!</p>
              </div>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
