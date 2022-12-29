import AuthenticatedPage from "@/layouts/authenticated-page";
import DashboardLayout from "@/layouts/dashboard-layout";
import GenerateAPIModal from "@/components/generate-api-dialog";
import { Loading } from "@/components/loader";
import { TokenData } from "@/context/token-provider";
import Head from "next/head";
import { useContext, useEffect, useRef, useState } from "react";
import { Metadata } from "@/lib/types";
import { KARRIO_API } from "@/client/context";
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
        <header className="px-1 py-3 mb-6 is-flex is-justify-content-space-between">
          <span className="title is-4">API</span>
        </header>

        {/* APIs Overview */}
        <div className="card px-0 py-3">

          <div className="p-3">
            <span className="has-text-weight-bold is-size-6">Overview</span>
          </div>

          <hr className='my-1' style={{ height: '1px' }} />

          <div className="is-flex my-0 px-3">
            <div className="py-1" style={{ width: '40%' }}>API Version</div>
            <div className="py-1" style={{ width: '40%' }}><code>{metadata.VERSION}</code></div>
          </div>
          <div className="is-flex my-0 px-3">
            <div className="py-1" style={{ width: '40%' }}>REST API</div>
            <div className="py-1" style={{ width: '40%' }}>
              <CopiableLink className="button is-white py-2 px-1" text={KARRIO_API} />
            </div>
          </div>
          <div className="is-flex my-0 px-3">
            <div className="py-1" style={{ width: '40%' }}>GRAPHQL API</div>
            <div className="py-1" style={{ width: '40%' }}>
              <CopiableLink className="button is-white py-2 px-1" text={`${KARRIO_API}/graphql/`} />
            </div>
          </div>
        </div>

        {/* API Keys */}
        <div className="card px-0 py-3 mt-6">

          <div className="p-3">
            <span className="has-text-weight-bold is-size-6">API Keys</span>
          </div>

          <hr className='my-1' style={{ height: '1px' }} />

          <div className="is-flex my-0 px-3">
            <div className="py-1" style={{ width: '40%' }}>
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

            <div className="py-1" style={{ width: '40%' }}>
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
