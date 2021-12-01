import AuthorizedPage from "@/layouts/authorized-page";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Loading } from "@/components/loader";
import { formatDateTimeLong, isNone, notEmptyJSON } from "@/lib/helper";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import EventProvider, { Event } from "@/context/event-provider";
import hljs from "highlight.js";
import json from 'highlight.js/lib/languages/json';
import CopiableLink from "@/components/copiable-link";

export { getServerSideProps } from "@/lib/middleware";

hljs.registerLanguage('json', json);


export default function EventPage(pageProps: any) {
  const Component: React.FC = () => {
    const router = useRouter();
    const { setLoading } = useContext(Loading);
    const { event, loading, loadEvent } = useContext(Event);
    const [data, setData] = useState<string>();
    const { id } = router.query;

    useEffect(() => { setLoading(loading); });
    useEffect(() => { (!isNone(loadEvent) && !loading) && loadEvent(id as string); }, [id]);
    useEffect(() => {
      if (event !== undefined) {
        setData(JSON.stringify(event?.data || {}, null, 2));
      }
    });

    return (
      <>
        {!isNone(event?.id) && <>

          <div className="columns my-1">
            <div className="column is-6">
              <span className="subtitle is-size-7 has-text-weight-semibold">EVENT</span>
              <br />
              <span className="title is-4 mr-2">{event?.type}</span>
            </div>

            <div className="column is-6 has-text-right pb-0">
              <CopiableLink text={event?.id as string} title="Copy ID" />
            </div>
          </div>

          <hr className="mt-1 mb-2" style={{ height: '1px' }} />

          <div className="columns mb-4">
            <div className="p-4 mr-4">
              <span className="subtitle is-size-7 my-4">Date</span><br />
              <span className="subtitle is-size-7 has-text-weight-semibold">{formatDateTimeLong(event?.created_at)}</span>
            </div>

            <div className="my-2" style={{ width: '1px', backgroundColor: '#ddd' }}></div>

            <div className="p-4 mr-4">
              <span className="subtitle is-size-7 my-4">Source</span><br />
              <span className="subtitle is-size-7 has-text-weight-semibold">Automatic</span>
            </div>
          </div>

          <h2 className="title is-5 my-4">Event data</h2>
          <hr className="mt-1 mb-2" style={{ height: '1px' }} />

          {notEmptyJSON(data) &&
            <div className="py-3">
              <pre>
                <code
                  dangerouslySetInnerHTML={{
                    __html: hljs.highlight(data as string, { language: 'json' }).value,
                  }}
                />
              </pre>
            </div>}

        </>}
      </>
    );
  };

  return AuthorizedPage(() => (
    <DashboardLayout>
      <Head><title>Event - {(pageProps as any).references?.app_name}</title></Head>
      <EventProvider>
        <Component />
      </EventProvider>
    </DashboardLayout>
  ), pageProps);
}
