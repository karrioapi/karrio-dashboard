import AuthenticatedPage from "@/layouts/authenticated-page";
import DashboardLayout from "@/layouts/dashboard-layout";
import GenerateAPIModal from "@/components/generate-api-dialog";
import { Loading } from "@/components/loader";
import { TokenData } from "@/context/token-provider";
import Head from "next/head";
import { useContext, useEffect, useRef, useState } from "react";
import { Metadata } from "@/lib/types";
import { PURPLSHIP_API } from "@/client/context";
import CopiableLink from "@/components/copiable-link";

export { getServerSideProps } from "@/lib/middleware";


export default function ApiPage(pageProps: { metadata: Metadata }) {
  const { metadata } = pageProps;

  const Component: React.FC<any> = () => {
    const { setLoading } = useContext(Loading);
    const { token, loading, load } = useContext(TokenData)
    const [isRevealed, setIsRevealed] = useState<boolean>(false);
    const tokenInput = useRef<HTMLInputElement>(null);

    const copy = (_: React.MouseEvent) => {
      tokenInput.current?.select();
      document.execCommand("copy");
    };

    useEffect(() => { (!loading && load) && load(); }, []);
    useEffect(() => { setLoading(loading); });

    return (
      <>
        <header className="px-0 py-4">
          <span className="title is-4">Overview</span>
        </header>

        <hr className="mt-1 mb-2" style={{ height: '1px' }} />

        <div className="py-3">
          <div className="columns my-0">
            <div className="column is-3 py-1">API Version</div>
            <div className="column is-8 py-1"><code>{metadata.VERSION}</code></div>
          </div>
          <div className="columns my-0">
            <div className="column is-3 py-1">API URL</div>
            <div className="column is-8 py-1">
              <CopiableLink className="button is-white py-2 px-1" text={PURPLSHIP_API} />
            </div>
          </div>
        </div>

        {/* API Keys */}
        <h2 className="subtitle is-5 mt-6">API Keys</h2>
        <hr className="mt-1 mb-2" style={{ height: '1px' }} />

        <div className="columns py-6">
          <div className="column is-6">
            <p className="subtitle is-6 py-1">Token</p>
            <p className="is-size-7 has-text-weight-semibold pr-6">
              <span>Use this key to authenticate your API calls. </span>
              <a
                className="has-text-link"
                href={`${metadata.OPENAPI}/#section/Authentication`}
                target="_blank"
                rel="noreferrer">
                Learn more
              </a>
            </p>
            <p className="is-size-7 pr-6"><strong>Warning:</strong> must be kept securely and never exposed to a client application.</p>
          </div>

          <div className="column is-6 pr-4">
            <div className="field has-addons">
              <p className="control is-expanded">
                <input className="input is-small"
                  type="text"
                  title={isRevealed ? "Click to Copy" : ""}
                  value={isRevealed ? token?.key : "key_......................."}
                  ref={tokenInput}
                  readOnly
                />
              </p>
              <p className="control">
                <button className="button is-small is-light px-4" title="Click to copy the token" onClick={copy} disabled={!isRevealed}>
                  <span className="icon is-small"><i className="fas fa-copy"></i></span>
                </button>
              </p>
              <p className="control">
                <button className="button is-small is-light px-4" title="Click to show or hide the token" onClick={() => setIsRevealed(!isRevealed)}>
                  {isRevealed ?
                    <span className="icon is-small"><i className="fas fa-eye-slash"></i></span> :
                    <span className="icon is-small"><i className="fas fa-eye"></i></span>}
                </button>
              </p>
              <div className="control">
                <GenerateAPIModal>
                  <button className="button is-primary is-light is-small px-4" title="Generate a new token">
                    <span className="icon is-small"><i className="fas fa-redo"></i></span>
                  </button>
                </GenerateAPIModal>
              </div>
            </div>

            <p className="is-size-7 has-text-weight-bold pr-6">
              <span>Click </span>
              <span className="icon is-small has-text-link"><i className="fas fa-redo"></i></span>
              <span> to revoke old keys and generate a new one.</span>
            </p>
          </div>
        </div>

      </>
    );
  };

  return AuthenticatedPage((
    <DashboardLayout>
      <Head><title>API Keys - {metadata?.APP_NAME}</title></Head>
      <Component />
    </DashboardLayout>
  ), pageProps)
}
