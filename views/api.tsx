import AuthorizedPage from "@/components/authorized-page";
import DashboardLayout from "@/components/dashboard-layout";
import GenerateAPIModal from "@/components/generate-api-dialog";
import { Loading } from "@/components/loader";
import { TokenData } from "@/context/token-provider";
import Head from "next/head";
import { useContext, useEffect, useRef, useState } from "react";


export default function APIPage() {
  return AuthorizedPage(() => {
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

          <header className="px-2 pt-1 pb-4">
            <span className="title is-4">API Key</span>
          </header>

          <hr />

          <div className="columns py-6">
            <div className="column is-5">
              <p className="subtitle is-6 py-1">Token</p>
              <p className="is-size-7 pr-6">Use this key to authenticate your API calls.</p>
              <p className="is-size-7 pr-6"><strong>Warning:</strong> must be kept securely. Click regenerate to revoke old keys.</p>
            </div>

            <div className="column is-5">
              <div className="field">
                <div className="control">
                  <input className="input is-small"
                    type="text"
                    title={isRevealed ? "Click to Copy" : ""}
                    value={isRevealed ? token?.key : "......................."}
                    style={{ maxWidth: "80%" }}
                    ref={tokenInput}
                    readOnly
                  />
                  <button className="button is-small is-light" onClick={copy} disabled={!isRevealed}>
                    <span className="icon is-small"><i className="fas fa-copy"></i></span>
                  </button>
                  <button className="button is-small is-light" onClick={() => setIsRevealed(!isRevealed)}>
                    {isRevealed ?
                      <span className="icon is-small"><i className="fas fa-eye-slash"></i></span> :
                      <span className="icon is-small"><i className="fas fa-eye"></i></span>}
                  </button>
                </div>
              </div>
              <GenerateAPIModal>
                <span>Regenerate API key...</span>
              </GenerateAPIModal>
            </div>
          </div>

        </>
      );
    };

    return (
      <DashboardLayout>
        <Head><title>API Keys</title></Head>
        <Component />
      </DashboardLayout>
    );
  })
}
